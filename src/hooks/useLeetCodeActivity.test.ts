import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

const mockProfile = {
  totalSolved: 42,
  easySolved: 12,
  mediumSolved: 20,
  hardSolved: 10,
  recentSubmissions: [
    { title: 'Two Sum', timestamp: '1700000000', statusDisplay: 'Accepted', lang: 'typescript' }
  ]
};

function mockFetchOnce(response: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: async () => response
    })
  );
}

describe('useLeetCodeActivity', () => {
  beforeEach(() => {
    // Fresh module registry so the in-memory cache never leaks between tests.
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads profile stats and normalizes the response', async () => {
    mockFetchOnce(mockProfile);

    const { useLeetCodeActivity } = await import('./useLeetCodeActivity');
    const { result } = renderHook(() => useLeetCodeActivity('nexorithm'));

    await waitFor(() => expect(result.current.totalSolved).toBe(42));
    expect(result.current.easySolved).toBe(12);
    expect(result.current.mediumSolved).toBe(20);
    expect(result.current.hardSolved).toBe(10);
    expect(result.current.loading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('sets the error flag when the API request fails', async () => {
    mockFetchOnce(null, false);

    const { useLeetCodeActivity } = await import('./useLeetCodeActivity');
    const { result } = renderHook(() => useLeetCodeActivity('nexorithm'));

    await waitFor(() => expect(result.current.hasError).toBe(true));
    expect(result.current.totalSolved).toBeNull();
  });
});
