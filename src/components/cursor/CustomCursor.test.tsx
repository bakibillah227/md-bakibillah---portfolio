import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';

function mockMatchMedia(matchingQuery: string | null) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query === matchingQuery,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.documentElement.classList.remove('mc-cursor-active');
});

describe('CustomCursor', () => {
  it('renders the layered dot/ring/label cursor and hides the native cursor', () => {
    const { container } = render(<CustomCursor />);

    const root = container.querySelector('.mc-cursor');
    expect(root).toBeTruthy();
    expect(root?.getAttribute('aria-hidden')).toBe('true');
    expect(root?.getAttribute('data-state')).toBe('default');
    expect(root?.getAttribute('data-pressed')).toBe('false');
    expect(root?.querySelector('.mc-cursor__ring')).toBeTruthy();
    expect(root?.querySelector('.mc-cursor__dot')).toBeTruthy();
    expect(root?.querySelector('.mc-cursor__label')?.textContent).toBe('View');
    expect(document.documentElement.classList.contains('mc-cursor-active')).toBe(true);
  });

  it('removes the native-cursor-hiding class when unmounted', () => {
    const { unmount } = render(<CustomCursor />);
    expect(document.documentElement.classList.contains('mc-cursor-active')).toBe(true);
    unmount();
    expect(document.documentElement.classList.contains('mc-cursor-active')).toBe(false);
  });

  it('expands over generic interactive elements', () => {
    const { container } = render(<CustomCursor />);
    const root = container.querySelector('.mc-cursor');
    const button = document.createElement('button');
    container.appendChild(button);

    fireEvent(button, new MouseEvent('pointerover', { bubbles: true }));
    expect(root?.getAttribute('data-state')).toBe('hover');
  });

  it('shows the VIEW state over data-cursor="view" content', () => {
    const { container } = render(<CustomCursor />);
    const root = container.querySelector('.mc-cursor');
    const card = document.createElement('article');
    card.setAttribute('data-cursor', 'view');
    container.appendChild(card);

    fireEvent(card, new MouseEvent('pointerover', { bubbles: true }));
    expect(root?.getAttribute('data-state')).toBe('view');
  });

  it('returns to default when the pointer leaves the viewport', () => {
    const { container } = render(<CustomCursor />);
    const root = container.querySelector('.mc-cursor');
    const button = document.createElement('button');
    container.appendChild(button);

    fireEvent(button, new MouseEvent('pointerover', { bubbles: true }));
    expect(root?.getAttribute('data-state')).toBe('hover');

    fireEvent(button, new MouseEvent('pointerout', { bubbles: true }));
    expect(root?.getAttribute('data-state')).toBe('default');
  });

  it('does not render for coarse pointers and never hides the native cursor', () => {
    mockMatchMedia('(pointer: coarse)');
    const { container } = render(<CustomCursor />);
    expect(container.querySelector('.mc-cursor')).toBeNull();
    expect(document.documentElement.classList.contains('mc-cursor-active')).toBe(false);
  });

  it('is not rendered for reduced-motion users and keeps the native cursor', () => {
    mockMatchMedia('(prefers-reduced-motion: reduce)');
    const { container } = render(<CustomCursor />);

    expect(container.querySelector('.mc-cursor')).toBeNull();
    expect(document.documentElement.classList.contains('mc-cursor-active')).toBe(false);
  });
});
