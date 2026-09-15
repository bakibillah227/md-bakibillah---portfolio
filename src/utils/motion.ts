import type { Variants } from 'motion/react';

/**
 * Shared motion presets for consistent, restrained entrance animations.
 * Centralized so every section uses the same easing and rhythm.
 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_OUT
    }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT
    }
  }
};

/**
 * Synchronous, SSR-safe read of the `prefers-reduced-motion` preference.
 * Prefer this inside event handlers and animation loops that cannot use the
 * reactive `useReducedMotion` hook.
 */
export function isReducedMotionEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Synchronous, SSR-safe check for a coarse primary pointer (touchscreen).
 * Used to gate pointer-only interactions such as a custom cursor.
 */
export function isCoarsePointer(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches
  );
}
