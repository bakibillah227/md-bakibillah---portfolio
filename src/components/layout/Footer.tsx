import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code2, ExternalLink } from 'lucide-react';
import { personalData, navigationItems } from '../../data/personal';
import { Container } from '../common/Container';
import { scrollToSection } from '../../utils/helpers';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="border-t border-border-subtle bg-surface-secondary/40 py-12 mt-10" aria-label="Site Footer">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-start">
          {/* Identity & Mission (5 Cols) */}
          <div className="md:col-span-5 space-y-3">
            <div>
              <span className="font-bold text-base text-text-primary tracking-tight">
                {personalData.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              {personalData.title}. Focused on building scalable, reliable web applications and clean backend architectures.
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/bakibillah227"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                aria-label="GitHub Profile"
                title="GitHub: github.com/bakibillah227"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/md-bakibillah-6943a227a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://leetcode.com/u/nexorithm/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                aria-label="LeetCode Profile"
                title="LeetCode: @nexorithm"
              >
                <Code2 className="w-4 h-4 text-accent-orange" />
              </a>

              <a
                href={`mailto:${personalData.contact.email}`}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                aria-label="Email Md Bakibillah"
                title={`Email: ${personalData.contact.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-tertiary mb-3">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm text-text-secondary">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability & Contact Summary (3 Cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-tertiary mb-3">
              Status & Direct Mail
            </h4>
            <div className="text-xs text-text-secondary leading-relaxed">
              Available for full-time and remote software engineering opportunities.
            </div>
            <a
              href={`mailto:${personalData.contact.email}`}
              className="text-xs font-mono text-accent-green-dark dark:text-accent-green hover:underline block pt-1"
            >
              {personalData.contact.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
          <p>
            © {currentYear} {personalData.name}. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green px-2 py-1 rounded"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};
