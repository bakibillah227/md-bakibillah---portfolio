import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

function collectFiles(
  dir: string,
  exts: string[],
  exclude: string[] = [],
  out: string[] = []
): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (exclude.some((e) => full.includes(e))) continue;
    if (statSync(full).isDirectory()) {
      collectFiles(full, exts, exclude, out);
    } else if (exts.includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

const sourceFiles = collectFiles(join(ROOT, 'src'), ['.ts', '.tsx', '.js', '.jsx'], [
  'node_modules'
]);
const allConfigFiles = [
  join(ROOT, 'index.html'),
  ...collectFiles(join(ROOT, 'public'), ['.txt', '.xml']),
  join(ROOT, 'netlify.toml'),
  join(ROOT, 'vite.config.ts'),
  join(ROOT, '.gitignore')
].filter((p) => existsSync(p));
const trackedFiles = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

describe('Security Hardening Suite', () => {
  it('T1: No hardcoded secrets or API keys in source code', () => {
    const secretPatterns = [
      /AKIA[0-9A-Z]{16}/,
      /AIza[0-9A-Za-z_-]{35}/,
      /sk-[A-Za-z0-9]{20,}/,
      /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/,
      /(?:api[_-]?key|secret|passwd|password)\s*[:=]\s*["'][A-Za-z0-9+/]{12,}["']/i,
      /xox[baprs]-[A-Za-z0-9-]{10,}/
    ];
    const violations: string[] = [];
    for (const file of [...sourceFiles, ...allConfigFiles]) {
      const content = readFileSync(file, 'utf8');
      for (const pattern of secretPatterns) {
        if (pattern.test(content)) {
          violations.push(`${file} matches ${pattern}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('T2: No XSS sinks (dangerouslySetInnerHTML, eval, innerHTML) in production code', () => {
    const xssPatterns = [
      /dangerouslySetInnerHTML/,
      /\.innerHTML\s*=/,
      /\.outerHTML\s*=/,
      /\beval\s*\(/,
      /document\.write\s*\(/,
      /insertAdjacentHTML\s*\(/,
      /new Function\s*\(/
    ];
    const violations: string[] = [];
    for (const file of sourceFiles.filter((f) => !f.includes('.test.'))) {
      const content = readFileSync(file, 'utf8');
      for (const pattern of xssPatterns) {
        if (pattern.test(content)) {
          violations.push(`${file} matches ${pattern}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('T3: No unsafe URL schemes (javascript:, data:text/html) or http:// mixed content', () => {
    const unsafePatterns = [/javascript:/i, /data:text\/html/i, /https?:\/\/[^"']*http:/];
    const httpLink = /(?:href|src)\s*=\s*["']http:\/\//i;
    const violations: string[] = [];
    for (const file of [...sourceFiles, join(ROOT, 'index.html')]) {
      const content = readFileSync(file, 'utf8');
      for (const pattern of unsafePatterns) {
        if (pattern.test(content)) {
          violations.push(`${file} matches ${pattern}`);
        }
      }
      if (httpLink.test(content)) {
        violations.push(`${file} uses http:// link (mixed content)`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('T4: All target="_blank" links include rel="noopener noreferrer"', () => {
    const violations: string[] = [];
    for (const file of sourceFiles) {
      const content = readFileSync(file, 'utf8');
      if (/target="_blank"/.test(content) && !/rel="noopener noreferrer"/.test(content)) {
        violations.push(`${file} has target="_blank" without noopener noreferrer`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('T5: Netlify security headers configured (CSP, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy)', () => {
    const netlifyToml = join(ROOT, 'netlify.toml');
    expect(existsSync(netlifyToml), 'netlify.toml must exist').toBe(true);
    const content = readFileSync(netlifyToml, 'utf8');
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'Strict-Transport-Security',
      'Referrer-Policy',
      'Permissions-Policy'
    ];
    for (const header of requiredHeaders) {
      expect(content, `netlify.toml must define ${header}`).toContain(header);
    }
  });

  it('T6: Sensitive/local files are not tracked by git', () => {
    const forbidden = [
      '.netlify/state.json',
      '.netlify/netlify.toml',
      'bun.lock',
      'metadata.json',
      '.log'
    ];
    const violations = trackedFiles.filter((f) =>
      forbidden.some((p) => f.includes(p))
    );
    const envViolations = trackedFiles.filter(
      (f) => /(^|\/)\.env($|\.)/.test(f) && !f.includes('.env.example')
    );
    expect([...violations, ...envViolations]).toEqual([]);
  });

  it('T7: API hooks are hardened (https, timeout, abort, response validation)', () => {
    const githubHook = readFileSync(join(ROOT, 'src/hooks/useGithubActivity.ts'), 'utf8');
    const leetcodeHook = readFileSync(join(ROOT, 'src/hooks/useLeetCodeActivity.ts'), 'utf8');
    for (const hook of [githubHook, leetcodeHook]) {
      expect(hook).toMatch(/https:\/\//);
      expect(hook).toContain('AbortController');
      expect(hook).toContain('setTimeout');
      expect(hook).toContain('!res.ok');
      expect(hook).toContain('controller.signal');
    }
    expect(githubHook).toMatch(/Array\.isArray\(json\.contributions\)/);
    expect(leetcodeHook).toMatch(/typeof json\.totalSolved === 'number'/);
  });

  it('T8: External resources load over HTTPS', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
    const external = [
      ...html.matchAll(/(?:src|href)\s*=\s*["'](https?:\/\/[^"']+)["']/g)
    ].map((m) => m[1]);
    expect(external.length).toBeGreaterThan(0);
    for (const url of external) {
      expect(url.startsWith('https://'), `${url} must use https`).toBe(true);
    }
  });

  it('T9: Clickjacking protection (frame-ancestors CSP and X-Frame-Options)', () => {
    const netlifyToml = join(ROOT, 'netlify.toml');
    expect(existsSync(netlifyToml)).toBe(true);
    const content = readFileSync(netlifyToml, 'utf8');
    expect(content).toContain("frame-ancestors 'none'");
    expect(content).toMatch(/X-Frame-Options\s*=\s*"DENY"/);
  });

  it('T10: Portable build config (relative publish path, no prod sourcemaps, SEO files exist)', () => {
    const netlifyToml = join(ROOT, 'netlify.toml');
    expect(existsSync(netlifyToml)).toBe(true);
    const netlifyContent = readFileSync(netlifyToml, 'utf8');
    expect(netlifyContent).toMatch(/publish\s*=\s*"dist"/);
    expect(netlifyContent).toMatch(/command\s*=\s*"npm run build"/);
    const viteConfig = readFileSync(join(ROOT, 'vite.config.ts'), 'utf8');
    expect(viteConfig).not.toMatch(/sourcemap\s*:\s*true/);
    expect(existsSync(join(ROOT, 'public/robots.txt'))).toBe(true);
    expect(existsSync(join(ROOT, 'public/sitemap.xml'))).toBe(true);
  });
});