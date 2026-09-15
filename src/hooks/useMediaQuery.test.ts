import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mql = {
    matches: initialMatches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn((_: string, cb: (event: MediaQueryListEvent) => void) => {
      listeners.add(cb);
    }),
    removeEventListener: vi.fn((_: string, cb: (event: MediaQueryListEvent) => void) => {
      listeners.delete(cb);
    }),
    dispatchEvent: vi.fn()
  };
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mql));
  return { mql, listeners };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useMediaQuery', () => {
  it('reflects the current media query state on mount', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
    expect(result.current).toBe(true);
  });

  it('updates reactively when the media query changes', () => {
    const { mql, listeners } = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));

    expect(result.current).toBe(false);

    mql.matches = true;
    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current).toBe(true);
  });
});
