/**
 * Canvas-based ambient background engine for the portfolio.
 *
 * Renders a quiet, technical atmosphere: a handful of tiny drifting dots,
 * extremely faint connecting lines, a soft radial wash near the top (hero),
 * and a very subtle pointer repulsion. Everything is designed to sit behind
 * the content and stay far below the design's own intensity.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface AmbientColors {
  /** Dominant accent (currently the portfolio's muted green). */
  accent: RGB;
  /** Primary text color, used for neutral dots. */
  primary: RGB;
}

export interface AmbientParticle {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  /** Relative speed multiplier (0..1) so particles drift at slightly different rates. */
  speed: number;
  radius: number;
  /** Relative opacity (0..1) so some dots are fainter than others. */
  alpha: number;
  /** Accent-colored dots vs neutral primary-colored dots. */
  isAccent: boolean;
}

export interface AmbientConfig {
  particleCount: number;
  /** Horizontal drift speed in px/second. */
  particleMaxSpeed: number;
  particleRadiusMax: number;
  /** Maximum per-particle alpha. */
  particleAlpha: number;
  /** Fraction of dots drawn with the accent color. */
  accentRatio: number;
  /** Lines link dots closer than this many px. */
  connectionDistance: number;
  connectionAlpha: number;
  /** Pointer influence radius in px; 0 disables pointer influence entirely. */
  mouseRadius: number;
  /** How strongly nearby dots are pushed away, in px/second. */
  mouseStrength: number;
  /** Alpha of the soft radial wash near the top of the viewport (hero area). */
  glowAlpha: number;
}

const FALLBACK_ACCENT: RGB = { r: 43, g: 102, b: 76 };
const FALLBACK_PRIMARY: RGB = { r: 25, g: 28, b: 26 };

/**
 * Resolves the ambient effect intensity for a viewport width and pointer type.
 * Desktop keeps the full subtle effect, tablet is reduced, mobile is minimal,
 * and coarse pointers (touch) always receive weaker/disabled mouse influence.
 */
export function getAmbientConfig(width: number, coarsePointer: boolean): AmbientConfig {
  if (width < 640) {
    return {
      particleCount: coarsePointer ? 5 : 8,
      particleMaxSpeed: 2.5,
      particleRadiusMax: 1.4,
      particleAlpha: 0.16,
      accentRatio: 0.5,
      connectionDistance: 100,
      connectionAlpha: 0.035,
      mouseRadius: 0,
      mouseStrength: 0,
      glowAlpha: 0.025
    };
  }

  if (width < 1024) {
    return {
      particleCount: coarsePointer ? 8 : 14,
      particleMaxSpeed: 3.2,
      particleRadiusMax: 1.6,
      particleAlpha: 0.18,
      accentRatio: 0.5,
      connectionDistance: 130,
      connectionAlpha: 0.04,
      mouseRadius: coarsePointer ? 0 : 110,
      mouseStrength: coarsePointer ? 0 : 4,
      glowAlpha: 0.03
    };
  }

  return {
    particleCount: coarsePointer ? 12 : 26,
    particleMaxSpeed: 4,
    particleRadiusMax: 1.8,
    particleAlpha: 0.2,
    accentRatio: 0.5,
    connectionDistance: 150,
    connectionAlpha: 0.045,
    mouseRadius: coarsePointer ? 0 : 150,
    mouseStrength: coarsePointer ? 0 : 7,
    glowAlpha: 0.035
  };
}

/**
 * Parses a `#RRGGBB` hex string into an RGB triplet.
 * Falls back to the accent color when the input cannot be parsed.
 */
export function hexToRgb(hex: string): RGB {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match || !match[1]) return FALLBACK_ACCENT;
  const value = Number.parseInt(match[1], 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

/**
 * Reads the current theme colors from the existing design tokens so the
 * background adapts to light/dark mode without hardcoded colors.
 */
export function readAmbientColors(
  root: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): AmbientColors {
  if (!root) return { accent: FALLBACK_ACCENT, primary: FALLBACK_PRIMARY };
  const styles = root.ownerDocument?.defaultView?.getComputedStyle(root);
  if (!styles) return { accent: FALLBACK_ACCENT, primary: FALLBACK_PRIMARY };
  const accent = hexToRgb(styles.getPropertyValue('--accent-green') || '#2B664C');
  const primary = hexToRgb(styles.getPropertyValue('--text-primary') || '#191C1A');
  return { accent, primary };
}

const DPR_CAP = 2;
const EDGE_MARGIN = 48;

export interface AmbientEngineOptions {
  reducedMotion: boolean;
  coarsePointer: boolean;
}

/**
 * Drives one full-screen canvas. The canvas is transparent: the page background
 * shows through, and the dots/lines are painted above it but below all content.
 *
 * The loop only mutates the canvas and plain JS state — it never touches React.
 */
export class AmbientBackgroundEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly reducedMotion: boolean;
  private readonly coarsePointer: boolean;
  private readonly mouse = { x: -9999, y: -9999 };
  private ctx: CanvasRenderingContext2D | null = null;
  private config: AmbientConfig;
  private colors: AmbientColors;
  private particles: AmbientParticle[] = [];
  private width = 0;
  private height = 0;
  private rafId = 0;
  private lastTime = 0;
  private observer: MutationObserver | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(canvas: HTMLCanvasElement, options: AmbientEngineOptions) {
    this.canvas = canvas;
    this.reducedMotion = options.reducedMotion;
    this.coarsePointer = options.coarsePointer;
    this.config = getAmbientConfig(window.innerWidth, this.coarsePointer);
    this.colors = readAmbientColors(canvas.ownerDocument.documentElement);
  }

  start(): void {
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.resize();
    this.buildParticles();
    this.attachListeners();

    if (this.reducedMotion) {
      this.drawFrame();
      return;
    }

    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  destroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.observer?.disconnect();
    this.observer = null;
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = null;
  }

  private attachListeners(): void {
    window.addEventListener('resize', this.onResize, { passive: true });
    if (!this.coarsePointer && !this.reducedMotion) {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    }

    this.observer = new MutationObserver(this.onThemeMutation);
    this.observer.observe(this.canvas.ownerDocument.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  private onThemeMutation = (): void => {
    this.colors = readAmbientColors(this.canvas.ownerDocument.documentElement);
    if (this.reducedMotion) this.drawFrame();
  };

  private onPointerMove = (event: PointerEvent): void => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  };

  private onResize = (): void => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.config = getAmbientConfig(window.innerWidth, this.coarsePointer);
      this.resize();
      this.buildParticles();
      if (this.reducedMotion) this.drawFrame();
    }, 150);
  };

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private buildParticles(): void {
    const { particleCount, particleRadiusMax, accentRatio } = this.config;
    const particles: AmbientParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        speed: 0.25 + Math.random() * 0.75,
        radius: 0.6 + Math.random() * Math.max(particleRadiusMax - 0.6, 0.1),
        alpha: 0.5 + Math.random() * 0.5,
        isAccent: Math.random() < accentRatio
      });
    }
    this.particles = particles;
  }

  private loop = (now: number): void => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.update(dt);
    this.drawFrame();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    const { particleMaxSpeed, mouseRadius, mouseStrength } = this.config;
    const influence = mouseStrength > 0 ? mouseRadius : 0;

    for (const p of this.particles) {
      // Gentle random walk: slowly steers each dot so movement feels organic
      // instead of a synchronized pattern.
      p.dirX += (Math.random() - 0.5) * 0.3 * dt;
      p.dirY += (Math.random() - 0.5) * 0.3 * dt;
      const magnitude = Math.hypot(p.dirX, p.dirY) || 1;
      p.dirX /= magnitude;
      p.dirY /= magnitude;

      p.x += p.dirX * p.speed * particleMaxSpeed * dt;
      p.y += p.dirY * p.speed * particleMaxSpeed * dt;

      // Very subtle pointer repulsion.
      if (influence > 0) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < influence * influence) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (1 - dist / influence) * mouseStrength * dt;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Softly wrap around the edges so dots never pop or bounce.
      if (p.x < -EDGE_MARGIN) p.x = this.width + EDGE_MARGIN;
      else if (p.x > this.width + EDGE_MARGIN) p.x = -EDGE_MARGIN;
      if (p.y < -EDGE_MARGIN) p.y = this.height + EDGE_MARGIN;
      else if (p.y > this.height + EDGE_MARGIN) p.y = -EDGE_MARGIN;
    }
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    // Soft radial wash near the top — a touch more presence around the hero.
    if (this.config.glowAlpha > 0) {
      const glowY = this.height * 0.18;
      const radius = Math.max(this.width, this.height) * 0.55;
      const glow = ctx.createRadialGradient(
        this.width / 2,
        glowY,
        0,
        this.width / 2,
        glowY,
        radius
      );
      glow.addColorStop(
        0,
        `rgba(${this.colors.accent.r}, ${this.colors.accent.g}, ${this.colors.accent.b}, ${this.config.glowAlpha})`
      );
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    const { connectionDistance, connectionAlpha, particleAlpha } = this.config;
    const { accent, primary } = this.colors;

    // Extremely faint connecting lines between nearby dots.
    ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];
      if (!a) continue;
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        if (!b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < connectionDistance * connectionDistance) {
          const dist = Math.sqrt(distSq) || 1;
          const alpha = (1 - dist / connectionDistance) * connectionAlpha;
          ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Tiny dots.
    for (const p of this.particles) {
      const color = p.isAccent ? accent : primary;
      ctx.globalAlpha = p.alpha * particleAlpha;
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
