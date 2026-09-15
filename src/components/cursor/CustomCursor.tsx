import { useEffect, useRef } from 'react';
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { resolveCursorState, smoothingFactor } from './cursorState';
import type { CursorState } from './cursorState';
import './cursor.css';

const DOT_TRACK_RATE = 18;
const RING_TRACK_RATE = 8;
const VISUAL_TRACK_RATE = 14;

const STATE_VISUALS: Record<
  CursorState,
  { ringScale: number; ringOpacity: number; dotOpacity: number }
> = {
  default: { ringScale: 1, ringOpacity: 0.55, dotOpacity: 1 },
  hover: { ringScale: 1.45, ringOpacity: 0.9, dotOpacity: 1 },
  view: { ringScale: 2.2, ringOpacity: 1, dotOpacity: 0 }
};

/**
 * Two-layer decorative cursor: a tight accent dot plus a lagging ring that
 * expands over interactive elements and fills in with a VIEW label over
 * project cards.
 *
 * All animation runs inside a single rAF loop that writes transform/opacity
 * directly to DOM nodes - no React state is touched while tracking the pointer,
 * so moving the mouse never triggers a re-render. Coarse pointer devices skip
 * the cursor entirely, and reduced-motion users get a minimal static cursor.
 */
export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coarsePointer) return;
    if (typeof document === 'undefined') return;

    const cursor = cursorRef.current;
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!cursor || !ringEl || !dotEl) return;

    const canAnimate = typeof requestAnimationFrame === 'function';

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = {
      x: pos.x,
      y: pos.y,
      scale: 1,
      opacity: STATE_VISUALS.default.ringOpacity,
      scaleTarget: STATE_VISUALS.default.ringScale,
      opacityTarget: STATE_VISUALS.default.ringOpacity
    };
    const dot = {
      x: pos.x,
      y: pos.y,
      scale: 1,
      opacity: 1,
      scaleTarget: 1,
      opacityTarget: 1
    };

    let state: CursorState = 'default';
    let pressed = false;
    let visible = false;
    let rafId: number | null = null;
    let lastTime: number | null = null;

    const computeTargets = () => {
      const visuals = STATE_VISUALS[state];
      const pressFactor = pressed ? 0.9 : 1;
      ring.scaleTarget = visuals.ringScale * pressFactor;
      ring.opacityTarget = visuals.ringOpacity;
      dot.scaleTarget = pressed ? 0.75 : 1;
      dot.opacityTarget = visuals.dotOpacity;
    };

    const setState = (next: CursorState) => {
      if (state !== next) {
        state = next;
        cursor.dataset.state = next;
        computeTargets();
      }
    };

    const setPressed = (active: boolean) => {
      if (pressed !== active) {
        pressed = active;
        cursor.dataset.pressed = String(active);
        computeTargets();
      }
    };

    const show = () => {
      if (!visible) {
        visible = true;
        cursor.classList.add('is-visible');
      }
    };

    const hide = () => {
      if (visible) {
        visible = false;
        cursor.classList.remove('is-visible');
      }
    };

    const snap = () => {
      dot.x = pos.x;
      dot.y = pos.y;
      ring.x = pos.x;
      ring.y = pos.y;
    };

    const frame = (time: number) => {
      const dt = lastTime === null ? 0.016 : (time - lastTime) / 1000;
      lastTime = time;

      const posFactor = reducedMotion ? 1 : smoothingFactor(DOT_TRACK_RATE, dt);
      const ringFactor = reducedMotion ? 1 : smoothingFactor(RING_TRACK_RATE, dt);
      const visualFactor = reducedMotion ? 1 : smoothingFactor(VISUAL_TRACK_RATE, dt);

      dot.x += (pos.x - dot.x) * posFactor;
      dot.y += (pos.y - dot.y) * posFactor;
      ring.x += (pos.x - ring.x) * ringFactor;
      ring.y += (pos.y - ring.y) * ringFactor;
      dot.scale += (dot.scaleTarget - dot.scale) * visualFactor;
      dot.opacity += (dot.opacityTarget - dot.opacity) * visualFactor;
      ring.scale += (ring.scaleTarget - ring.scale) * visualFactor;
      ring.opacity += (ring.opacityTarget - ring.opacity) * visualFactor;

      dotEl.style.opacity = String(dot.opacity);
      ringEl.style.opacity = String(ring.opacity);
      dotEl.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dot.scale})`;
      ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ring.scale})`;

      rafId = requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!visible) {
        snap();
        show();
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setState(resolveCursorState(target));
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.relatedTarget instanceof Element)) {
        setState('default');
      }
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);
    const onMouseLeave = () => hide();
    const onWindowBlur = () => {
      setPressed(false);
      hide();
    };

    document.documentElement.classList.add('mc-cursor-active');
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    if (canAnimate) rafId = requestAnimationFrame(frame);

    if (!reducedMotion) {
      document.addEventListener('pointerover', onPointerOver, { passive: true });
      document.addEventListener('pointerout', onPointerOut, { passive: true });
      window.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('pointerup', onPointerUp, { passive: true });
      window.addEventListener('blur', onWindowBlur);
    }

    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      if (rafId !== null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onWindowBlur);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.classList.remove('mc-cursor-active');
    };
  }, [reducedMotion, coarsePointer]);

  if (coarsePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="mc-cursor"
      data-state="default"
      data-pressed="false"
      aria-hidden="true"
    >
      <div ref={ringRef} className="mc-cursor__ring">
        <span className="mc-cursor__label">View</span>
      </div>
      <div ref={dotRef} className="mc-cursor__dot" />
    </div>
  );
};
