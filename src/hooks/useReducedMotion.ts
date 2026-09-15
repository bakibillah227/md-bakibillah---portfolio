import { useMediaQuery } from './useMediaQuery';

/**
 * Reactive view of the user's `prefers-reduced-motion` preference.
 * Use for JS-driven effects (background loops, cursor followers, entrance
 * animations) so they can be enabled/disabled live when the setting changes.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
