/**
 * Canvas-based animated technical background engine for the portfolio.
 *
 * Renders a layered, clearly visible technical atmosphere behind the content:
 *
 * - soft radial glows (hero + a low cool wash) for atmospheric depth
 * - drifting nodes connected by faint lines
 * - thin-stroke geometric technical elements (wireframe cubes, rings, plus
 *   marks) that rotate slowly and float
 * - gentle depth-based parallax driven by the pointer, with each layer moving
 *   at its own speed
 *
 * All animation runs on the same single rAF loop, writing only to the canvas
 * and plain JS state — never to React. Colors are read from the theme tokens
 * so the background adapts to light/dark mode without hardcoded palettes.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type AmbientColorKind = 'accent' | 'primary' | 'cool';

export interface AmbientColors {
  /** Dominant accent (the portfolio's muted green). */
  accent: RGB;
  /** Primary text color, used for neutral shapes/nodes. */
  primary: RGB;
  /** Muted technical blue, adds restrained cool variety. */
  cool: RGB;
}

export interface AmbientParticle {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  /** Relative speed multiplier (0..1) so nodes drift at different rates. */
  speed: number;
  radius: number;
  /** Base per-node alpha (0..1); breathing is applied on top at draw time. */
  alphaBase: number;
  color: AmbientColorKind;
  /** Breathing phase (radians) so nodes pulse independently. */
  phase: number;
  /** Breathing speed in rad/s. */
  breatheRate: number;
}

export type AmbientShapeKind = 'cube' | 'ring' | 'plus';

export interface AmbientShape {
  kind: AmbientShapeKind;
  x: number;
  y: number;
  /** Base size (px): cube edge, ring radius, plus arm length. */
  size: number;
  /** Accumulated rotation in radians. */
  rotation: number;
  /** Rotation speed in rad/s. */
  rotationSpeed: number;
  /** Vertical float amplitude in px. */
  floatAmplitude: number;
  /** Horizontal sway amplitude in px. */
  swayAmplitude: number;
  /** Float period in seconds. */
  period: number;
  /** Slow upward drift in px/s (shapes rise gently and wrap around). */
  riseSpeed: number;
  alpha: number;
  color: AmbientColorKind;
  /** Parallax depth 0..1; higher = moves more with the pointer. */
  depth: number;
  phase: number;
}

export interface AmbientConfig {
  particleCount: number;
  /** Horizontal drift speed in px/second. */
  particleMaxSpeed: number;
  particleRadiusMin: number;
  particleRadiusMax: number;
  /** Maximum multiplayer applied to per-particle base alpha. */
  particleAlpha: number;
  /** Fraction of nodes drawn with the accent color. */
  accentRatio: number;
  /** Fraction of nodes drawn with the muted cool blue. */
  coolParticleRatio: number;
  /** Lines link nodes closer than this many px. */
  connectionDistance: number;
  connectionAlpha: number;
  /** Pointer influence radius in px; 0 disables pointer influence entirely. */
  mouseRadius: number;
  /** How strongly nearby nodes are pushed away, in px/second. */
  mouseStrength: number;
  /** Alpha of the soft radial wash in the hero area. */
  glowAlpha: number;
  /** Whether to also draw a secondary cool wash in the opposite corner. */
  secondGlow: boolean;
  /** Number of geometric technical elements. */
  shapeCount: number;
  /** Fraction of shapes drawn with the muted cool blue. */
  coolShapeRatio: number;
}

const FALLBACK_ACCENT: RGB = { r: 43, g: 102, b: 76 };
const FALLBACK_PRIMARY: RGB = { r: 25, g: 28, b: 26 };
const FALLBACK_COOL: RGB = { r: 79, g: 116, b: 158 };

const DPR_CAP = 2;
const EDGE_MARGIN = 48;

/** Layer offset (px) per normalized pointer unit, applied at full desktop depth. */
const PARALLAX = { glow: 12, particles: 18, shapes: 26 };
const TIER_PARALLAX = { mobile: 0.35, tablet: 0.6, desktop: 1 };
const SHAPE_MARGIN = 40;

/** Shape type weights (cube, ring, plus). */
const SHAPE_TYPES: AmbientShapeKind[] = ['cube', 'cube', 'cube', 'ring', 'ring', 'ring', 'plus', 'plus'];

/**
 * Resolves the background effect intensity for a viewport width and pointer
 * type. Desktop keeps the full visual treatment, tablet is reduced, mobile is
 * simplified to a couple of elements plus the atmosphere, and coarse pointers
 * (touch) always receive weaker/disabled mouse influence.
 */
export function getAmbientConfig(width: number, coarsePointer: boolean): AmbientConfig {
  if (width < 640) {
    return {
      particleCount: coarsePointer ? 6 : 10,
      particleMaxSpeed: 3.5,
      particleRadiusMin: 1,
      particleRadiusMax: 2.2,
      particleAlpha: 0.4,
      accentRatio: 0.4,
      coolParticleRatio: 0.3,
      connectionDistance: 90,
      connectionAlpha: 0.05,
      mouseRadius: 0,
      mouseStrength: 0,
      glowAlpha: 0.045,
      secondGlow: false,
      shapeCount: coarsePointer ? 1 : 2,
      coolShapeRatio: 0.4
    };
  }

  if (width < 1024) {
    return {
      particleCount: coarsePointer ? 12 : 20,
      particleMaxSpeed: 4.5,
      particleRadiusMin: 1,
      particleRadiusMax: 2.4,
      particleAlpha: 0.45,
      accentRatio: 0.4,
      coolParticleRatio: 0.3,
      connectionDistance: 120,
      connectionAlpha: 0.055,
      mouseRadius: coarsePointer ? 0 : 120,
      mouseStrength: coarsePointer ? 0 : 5,
      glowAlpha: 0.05,
      secondGlow: true,
      shapeCount: coarsePointer ? 2 : 3,
      coolShapeRatio: 0.4
    };
  }

  return {
    particleCount: coarsePointer ? 20 : 34,
    particleMaxSpeed: 5.5,
    particleRadiusMin: 1,
    particleRadiusMax: 2.6,
    particleAlpha: 0.5,
    accentRatio: 0.35,
    coolParticleRatio: 0.25,
    connectionDistance: 140,
    connectionAlpha: 0.06,
    mouseRadius: coarsePointer ? 0 : 160,
    mouseStrength: coarsePointer ? 0 : 6,
    glowAlpha: 0.06,
    secondGlow: true,
    shapeCount: coarsePointer ? 4 : 6,
    coolShapeRatio: 0.45
  };
}

/**
 * Exponential smoothing factor so layers ease toward their pointer target.
 * Mirrors the cursor engine's approach for consistent, frame-rate-independent
 * motion.
 */
export function smoothingFactor(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * dt);
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
 * Parses a token triplet like `"79 116 158"` (see the `--bg-tech-*` tokens)
 * into an RGB triplet. Returns null for unparsable input.
 */
export function tripletToRgb(value: string | null | undefined): RGB | null {
  if (!value) return null;
  const match = /^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/.exec(value);
  if (!match) return null;
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

/**
 * Reads the current theme colors from the existing design tokens so the
 * background adapts to light/dark mode without hardcoded colors.
 */
export function readAmbientColors(
  root: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): AmbientColors {
  if (!root) return { accent: FALLBACK_ACCENT, primary: FALLBACK_PRIMARY, cool: FALLBACK_COOL };
  const styles = root.ownerDocument?.defaultView?.getComputedStyle(root);
  if (!styles) return { accent: FALLBACK_ACCENT, primary: FALLBACK_PRIMARY, cool: FALLBACK_COOL };
  const accent = hexToRgb(styles.getPropertyValue('--accent-green') || '#2B664C');
  const primary = hexToRgb(styles.getPropertyValue('--text-primary') || '#191C1A');
  const cool = tripletToRgb(styles.getPropertyValue('--bg-tech-cool')) ?? FALLBACK_COOL;
  return { accent, primary, cool };
}

export interface ParallaxTarget {
  el: HTMLElement | null;
  /** Max translate in px per normalized pointer unit. */
  strength: number;
}

export interface AmbientEngineOptions {
  reducedMotion: boolean;
  coarsePointer: boolean;
  /** Non-canvas layers (atmosphere blobs, grid) shifted by the same loop. */
  parallaxTargets?: ParallaxTarget[];
}

/**
 * Drives the full-viewport background layer: directly updates the canvas and
 * writes small transforms to the CSS parallax wrappers it is given. All of it
 * runs inside a single rAF loop with no React involvement.
 *
 * Under reduced motion only a single static frame is painted — the CSS
 * atmosphere/grid layers are already fixed via the no-preference guards, so
 * the result is a calm, intentional static composition.
 */
export class AmbientBackgroundEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly reducedMotion: boolean;
  private readonly coarsePointer: boolean;
  private readonly parallaxTargets: ParallaxTarget[];
  private readonly pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private readonly mouse = { x: -9999, y: -9999 };
  private ctx: CanvasRenderingContext2D | null = null;
  private config: AmbientConfig;
  private colors: AmbientColors;
  private particles: AmbientParticle[] = [];
  private shapes: AmbientShape[] = [];
  private width = 0;
  private height = 0;
  private parallaxScale = 1;
  private time = 0;
  private rafId = 0;
  private lastTime = 0;
  private observer: MutationObserver | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(canvas: HTMLCanvasElement, options: AmbientEngineOptions) {
    this.canvas = canvas;
    this.reducedMotion = options.reducedMotion;
    this.coarsePointer = options.coarsePointer;
    this.parallaxTargets = options.parallaxTargets ?? [];
    this.config = getAmbientConfig(window.innerWidth, this.coarsePointer);
    this.colors = readAmbientColors(canvas.ownerDocument.documentElement);
    this.parallaxScale = this.resolveParallaxScale();
  }

  start(): void {
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.resize();
    this.buildParticles();
    this.buildShapes();
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
    if (this.width > 0) {
      this.pointer.tx = Math.max(-1, Math.min(1, (event.clientX / this.width) * 2 - 1));
    }
    if (this.height > 0) {
      this.pointer.ty = Math.max(-1, Math.min(1, (event.clientY / this.height) * 2 - 1));
    }
  };

  private onResize = (): void => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.config = getAmbientConfig(window.innerWidth, this.coarsePointer);
      this.parallaxScale = this.resolveParallaxScale();
      this.resize();
      this.buildParticles();
      this.buildShapes();
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

  private resolveParallaxScale(): number {
    if (this.width < 640) return TIER_PARALLAX.mobile;
    if (this.width < 1024) return TIER_PARALLAX.tablet;
    return TIER_PARALLAX.desktop;
  }

  private buildParticles(): void {
    const {
      particleCount,
      particleRadiusMin,
      particleRadiusMax,
      accentRatio,
      coolParticleRatio
    } = this.config;
    const particles: AmbientParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const roll = Math.random();
      particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        speed: 0.25 + Math.random() * 0.75,
        radius:
          particleRadiusMin + Math.random() * Math.max(particleRadiusMax - particleRadiusMin, 0.1),
        alphaBase: 0.4 + Math.random() * 0.6,
        color:
          roll < accentRatio ? 'accent' : roll < accentRatio + coolParticleRatio ? 'cool' : 'primary',
        phase: Math.random() * Math.PI * 2,
        breatheRate: 0.25 + Math.random() * 0.5
      });
    }
    this.particles = particles;
  }

  private buildShapes(): void {
    const { shapeCount, coolShapeRatio } = this.config;
    const shapes: AmbientShape[] = [];
    for (let i = 0; i < shapeCount; i++) {
      const kind = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]!;
      const roll = Math.random();
      const x = this.edgeBiasedX();
      const isCool = roll < coolShapeRatio;
      shapes.push({
        kind,
        x,
        y: Math.random() * this.height,
        size: this.shapeSize(kind),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: this.shapeSpin(kind),
        floatAmplitude: 6 + Math.random() * 10,
        swayAmplitude: 4 + Math.random() * 8,
        period: 10 + Math.random() * 10,
        riseSpeed: 1.5 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.08,
        color: isCool ? 'cool' : i % 2 === 0 ? 'accent' : 'primary',
        depth: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2
      });
    }
    this.shapes = shapes;
  }

  /** Keeps most shapes near the viewport edges so they never sit behind text. */
  private edgeBiasedX(): number {
    const { width } = this;
    const roll = Math.random();
    if (roll < 0.35) return SHAPE_MARGIN + Math.random() * width * 0.22;
    if (roll < 0.7) return width * 0.78 + Math.random() * width * 0.22 - SHAPE_MARGIN;
    return Math.random() * width;
  }

  private shapeSize(kind: AmbientShapeKind): number {
    if (kind === 'cube') return 24 + Math.random() * 20;
    if (kind === 'ring') return 20 + Math.random() * 20;
    return 12 + Math.random() * 10;
  }

  private shapeSpin(kind: AmbientShapeKind): number {
    if (kind === 'cube') return 0.14 + Math.random() * 0.16;
    if (kind === 'ring') return 0.05 + Math.random() * 0.08;
    return 0.06 + Math.random() * 0.1;
  }

  private loop = (now: number): void => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.time += dt;
    this.update(dt);
    this.drawFrame();
    this.applyParallax();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    const { particleMaxSpeed, mouseRadius, mouseStrength } = this.config;
    const influence = mouseStrength > 0 ? mouseRadius : 0;

    // Ease the normalized pointer target so parallax never snaps.
    const smooth = smoothingFactor(2.2, dt);
    this.pointer.x += (this.pointer.tx - this.pointer.x) * smooth;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * smooth;

    for (const p of this.particles) {
      // Gentle random walk keeps movement organic instead of synchronized.
      p.dirX += (Math.random() - 0.5) * 0.3 * dt;
      p.dirY += (Math.random() - 0.5) * 0.3 * dt;
      const magnitude = Math.hypot(p.dirX, p.dirY) || 1;
      p.dirX /= magnitude;
      p.dirY /= magnitude;

      p.x += p.dirX * p.speed * particleMaxSpeed * dt;
      p.y += p.dirY * p.speed * particleMaxSpeed * dt;

      // Soft pointer repulsion so nodes drift away from the cursor.
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

      // Softly wrap around edges so nodes never pop or bounce.
      if (p.x < -EDGE_MARGIN) p.x = this.width + EDGE_MARGIN;
      else if (p.x > this.width + EDGE_MARGIN) p.x = -EDGE_MARGIN;
      if (p.y < -EDGE_MARGIN) p.y = this.height + EDGE_MARGIN;
      else if (p.y > this.height + EDGE_MARGIN) p.y = -EDGE_MARGIN;
    }

    for (const s of this.shapes) {
      s.rotation += s.rotationSpeed * dt;
      s.y -= s.riseSpeed * dt;
      if (s.y < -SHAPE_MARGIN) {
        s.y = this.height + SHAPE_MARGIN;
        s.x = this.edgeBiasedX();
      }
    }
  }

  private applyParallax(): void {
    if (this.parallaxTargets.length === 0) return;
    const px = this.pointer.x;
    const py = this.pointer.y;
    for (const target of this.parallaxTargets) {
      if (!target.el) continue;
      const s = -target.strength * this.parallaxScale;
      target.el.style.transform = `translate3d(${(px * s).toFixed(2)}px, ${(py * s).toFixed(2)}px, 0)`;
    }
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const px = this.pointer.x;
    const py = this.pointer.y;
    const back = -PARALLAX.glow * this.parallaxScale;
    const mid = -PARALLAX.particles * this.parallaxScale;
    const front = -PARALLAX.shapes * this.parallaxScale;

    // Back layer: soft atmospheric glows.
    ctx.save();
    ctx.translate(px * back, py * back);
    this.drawGlows();
    ctx.restore();

    // Mid layer: nodes + connections.
    ctx.save();
    ctx.translate(px * mid, py * mid);
    this.drawLinks();
    this.drawParticles();
    ctx.restore();

    // Front layer: geometric technical elements (per-shape depth).
    for (const s of this.shapes) {
      ctx.save();
      ctx.translate(px * front * s.depth, py * front * s.depth);
      this.drawShape(s);
      ctx.restore();
    }
  }

  private drawGlows(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { glowAlpha, secondGlow } = this.config;
    const { accent, cool } = this.colors;
    const radius = Math.max(this.width, this.height) * 0.65;

    const heroX = this.width * 0.62;
    const heroY = this.height * 0.2;
    const heroGlow = ctx.createRadialGradient(heroX, heroY, 0, heroX, heroY, radius);
    heroGlow.addColorStop(0, `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${glowAlpha})`);
    heroGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = heroGlow;
    ctx.fillRect(0, 0, this.width, this.height);

    if (secondGlow) {
      const coolX = this.width * 0.15;
      const coolY = this.height * 0.85;
      const coolGlow = ctx.createRadialGradient(coolX, coolY, 0, coolX, coolY, radius * 0.6);
      coolGlow.addColorStop(0, `rgba(${cool.r}, ${cool.g}, ${cool.b}, ${glowAlpha * 0.6})`);
      coolGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coolGlow;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  private drawLinks(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { connectionDistance, connectionAlpha } = this.config;
    const { accent } = this.colors;

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
  }

  private drawParticles(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { particleAlpha } = this.config;
    const { accent, primary, cool } = this.colors;

    for (const p of this.particles) {
      const breath = 0.7 + 0.3 * Math.sin(p.phase + this.time * p.breatheRate);
      const alpha = Math.min(1, p.alphaBase * particleAlpha * breath);
      const color = p.color === 'accent' ? accent : p.color === 'cool' ? cool : primary;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private colorToRgb(color: AmbientColorKind): RGB {
    return color === 'accent' ? this.colors.accent : color === 'cool' ? this.colors.cool : this.colors.primary;
  }

  private drawShape(s: AmbientShape): void {
    const { x, y } = this.floatPosition(s);
    if (s.kind === 'cube') {
      this.drawCube(s, x, y);
    } else if (s.kind === 'ring') {
      this.drawRing(s, x, y);
    } else {
      this.drawPlus(s, x, y);
    }
  }

  private floatPosition(s: AmbientShape): { x: number; y: number } {
    const sway = Math.sin((this.time * Math.PI * 2) / (s.period * 0.7) + s.phase) * s.swayAmplitude;
    const bob =
      Math.sin((this.time * Math.PI * 2) / s.period + s.phase * 1.7) * s.floatAmplitude;
    return { x: s.x + sway, y: s.y + bob };
  }

  private drawCube(s: AmbientShape, cx: number, cy: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const color = this.colorToRgb(s.color);
    const half = s.size / 2;
    const yaw = Math.cos(s.rotation);
    const sway = Math.sin(s.rotation);
    const pitch = Math.cos(s.rotation * 0.4);
    const spit = Math.sin(s.rotation * 0.4);

    const corners = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1]
    ];
    const points = corners.map(([a, b, c]) => {
      const x1 = (a ?? 0) * half;
      const y1 = (b ?? 0) * half;
      let z1 = (c ?? 0) * half;
      const rx = x1 * yaw + z1 * sway;
      z1 = -x1 * sway + z1 * yaw;
      const ry = y1 * pitch - z1 * spit;
      return { x: cx + rx, y: cy + ry };
    });

    const edges: Array<[number, number, number]> = [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 1],
      [3, 0, 1],
      [4, 5, 0.5],
      [5, 6, 0.5],
      [6, 7, 0.5],
      [7, 4, 0.5],
      [0, 4, 0.65],
      [1, 5, 0.65],
      [2, 6, 0.65],
      [3, 7, 0.65]
    ];

    ctx.lineWidth = 1.25;
    for (const [from, to, edgeAlpha] of edges) {
      const a = points[from];
      const b = points[to];
      if (!a || !b) continue;
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${s.alpha * edgeAlpha})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  private drawRing(s: AmbientShape, cx: number, cy: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const color = this.colorToRgb(s.color);

    ctx.lineWidth = 1.25;
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${s.alpha})`;
    ctx.beginPath();
    ctx.arc(cx, cy, s.size, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([3, 8]);
    ctx.lineDashOffset = -s.rotation * 14;
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${s.alpha * 0.5})`;
    ctx.beginPath();
    ctx.arc(cx, cy, s.size * 0.72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  private drawPlus(s: AmbientShape, cx: number, cy: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const color = this.colorToRgb(s.color);
    const arm = s.size;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(s.rotation * 0.6);
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${s.alpha})`;
    ctx.beginPath();
    ctx.moveTo(-arm, 0);
    ctx.lineTo(arm, 0);
    ctx.moveTo(0, -arm);
    ctx.lineTo(0, arm);
    ctx.stroke();

    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${s.alpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}