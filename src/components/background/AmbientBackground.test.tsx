import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { AmbientBackground } from './AmbientBackground';

vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

afterEach(() => {
  cleanup();
});

describe('AmbientBackground', () => {
  it('renders a decorative pointer-transparent canvas in the background layer', () => {
    const { container } = render(<AmbientBackground />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
    expect(canvas?.getAttribute('aria-hidden')).toBe('true');
    expect(canvas?.className).toContain('pointer-events-none');
    expect(canvas?.className).toContain('fixed');
  });

  it('mounts and unmounts without errors (jsdom has no canvas context)', () => {
    const { unmount } = render(<AmbientBackground />);
    expect(() => unmount()).not.toThrow();
  });
});
