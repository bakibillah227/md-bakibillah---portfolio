import { describe, it, expect } from 'vitest';
import { resolveCursorState, smoothingFactor } from './cursorState';

describe('resolveCursorState', () => {
  it('treats nothing as the default state', () => {
    expect(resolveCursorState(null)).toBe('default');
  });

  it('treats plain content as the default state', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    try {
      expect(resolveCursorState(el)).toBe('default');
    } finally {
      document.body.removeChild(el);
    }
  });

  it('treats interactive elements as hover', () => {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    try {
      expect(resolveCursorState(btn)).toBe('hover');
    } finally {
      document.body.removeChild(btn);
    }
  });

  it('treats anchors and tabindex elements as hover', () => {
    const link = document.createElement('a');
    link.setAttribute('href', '#');
    document.body.appendChild(link);

    const tabbable = document.createElement('div');
    tabbable.setAttribute('tabindex', '0');
    document.body.appendChild(tabbable);

    const ignored = document.createElement('div');
    ignored.setAttribute('tabindex', '-1');
    document.body.appendChild(ignored);

    try {
      expect(resolveCursorState(link)).toBe('hover');
      expect(resolveCursorState(tabbable)).toBe('hover');
      expect(resolveCursorState(ignored)).toBe('default');
    } finally {
      document.body.removeChild(link);
      document.body.removeChild(tabbable);
      document.body.removeChild(ignored);
    }
  });

  it('resolves data-cursor="view" even inside nested interactive content', () => {
    const view = document.createElement('article');
    view.setAttribute('data-cursor', 'view');
    const button = document.createElement('button');
    const span = document.createElement('span');
    button.appendChild(span);
    view.appendChild(button);
    document.body.appendChild(view);
    try {
      expect(resolveCursorState(span)).toBe('view');
      expect(resolveCursorState(button)).toBe('view');
    } finally {
      document.body.removeChild(view);
    }
  });
});

describe('smoothingFactor', () => {
  it('produces a stronger approach for faster rates at the same step', () => {
    const dt = 0.016;
    const slow = smoothingFactor(8, dt);
    const fast = smoothingFactor(18, dt);
    expect(fast).toBeGreaterThan(slow);
  });

  it('clamps large frame gaps to the maximum window', () => {
    expect(smoothingFactor(8, 10)).toBe(smoothingFactor(8, 0.05));
  });

  it('never overshoots the target', () => {
    expect(smoothingFactor(100, 0.5)).toBeLessThanOrEqual(1);
  });
});
