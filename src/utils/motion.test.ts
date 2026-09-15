import { describe, it, expect, vi, afterEach } from 'vitest';
import { isCoarsePointer, isReducedMotionEnabled } from './motion';

function stubMatchMedia(query: string, matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((q: string) => ({
      matches: q === query ? matches : false,
      media: q
    }))
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isReducedMotionEnabled', () => {
  it('returns true when prefers-reduced-motion matches', () => {
    stubMatchMedia('(prefers-reduced-motion: reduce)', true);
    expect(isReducedMotionEnabled()).toBe(true);
  });

  it('returns false when prefers-reduced-motion does not match', () => {
    stubMatchMedia('(prefers-reduced-motion: reduce)', false);
    expect(isReducedMotionEnabled()).toBe(false);
  });

  it('returns false when matchMedia is unavailable', () => {
    expect(isReducedMotionEnabled()).toBe(false);
  });
});

describe('isCoarsePointer', () => {
  it('returns true when the primary pointer is coarse', () => {
    stubMatchMedia('(pointer: coarse)', true);
    expect(isCoarsePointer()).toBe(true);
  });

  it('returns false for a fine pointer', () => {
    stubMatchMedia('(pointer: coarse)', false);
    expect(isCoarsePointer()).toBe(false);
  });

  it('returns false when matchMedia is unavailable', () => {
    expect(isCoarsePointer()).toBe(false);
  });
});
