import { useMediaQuery } from './useMediaQuery';

/**
 * True when the primary input is a coarse pointer (touchscreen/tablet).
 * Drives the responsive interaction strategy: no custom cursor, reduced
 * background intensity, and touch-friendly behavior on touch devices.
 */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery('(pointer: coarse)');
}
