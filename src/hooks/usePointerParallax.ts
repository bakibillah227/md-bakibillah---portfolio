import { useEffect, type RefObject } from 'react';
import { useIsCoarsePointer } from './useIsCoarsePointer';
import { useReducedMotion } from './useReducedMotion';
import { smoothingFactor } from '../utils/ambientBackground';

export interface ParallaxLayer {
  ref: RefObject<HTMLElement | null>;
  /** Maximum translate in px at the pointer extremes (far ~3, mid ~7, near ~11). */
  strength: number;
}

/** Ease rate for the smoothed pointer; low enough to feel weighty, not laggy. */
const TRACK_RATE = 3.2;

/**
 * Lightweight desktop pointer-parallax for a small set of depth layers.
 *
 * A single rAF loop smooths the normalized pointer position and writes a
 * `translate3d` transform directly to each layer — never to React state — so
 * moving the mouse never re-renders. It is intentionally independent from the
 * custom cursor and the full-page ambient engine.
 *
 * The loop is skipped entirely for reduced-motion users and coarse pointers
 * (touch), and is paused via IntersectionObserver while the host section is
 * offscreen, keeping the animation budget minimal.
 */
export function usePointerParallax(
  container: RefObject<HTMLElement | null>,
  layers: ParallaxLayer[]
): void {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    if (reducedMotion || coarsePointer) return;
    if (typeof window === 'undefined') return;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let rafId = 0;
    let lastTime = 0;

    const write = () => {
      for (const layer of layers) {
        const el = layer.ref.current;
        if (!el) continue;
        const x = (-pointer.x * layer.strength).toFixed(2);
        const y = (-pointer.y * layer.strength).toFixed(2);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const frame = (now: number) => {
      const dt = lastTime === 0 ? 0.016 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const factor = smoothingFactor(TRACK_RATE, dt);
      pointer.x += (pointer.tx - pointer.x) * factor;
      pointer.y += (pointer.ty - pointer.y) * factor;
      write();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafId || typeof requestAnimationFrame !== 'function') return;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (window.innerWidth > 0) {
        pointer.tx = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1));
      }
      if (window.innerHeight > 0) {
        pointer.ty = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1));
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let observer: IntersectionObserver | null = null;
    const host = container.current;
    if (host && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0 }
      );
      observer.observe(host);
    } else {
      start();
    }

    return () => {
      stop();
      observer?.disconnect();
      observer = null;
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reducedMotion, coarsePointer, layers]);
}
