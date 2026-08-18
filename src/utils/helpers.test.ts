import { describe, it, expect, vi, afterEach } from 'vitest';
import { cn, scrollToSection } from './helpers';

describe('cn', () => {
  it('joins truthy class names and drops falsy values', () => {
    expect(cn('a', undefined, false, null, 'b')).toBe('a b');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cn(false, undefined, null)).toBe('');
  });
});

describe('scrollToSection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('smooth-scrolls to the matching element and updates the hash', () => {
    Element.prototype.scrollIntoView = vi.fn();
    const el = document.createElement('div');
    el.id = 'projects';
    document.body.appendChild(el);

    scrollToSection('#projects');

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    expect(window.location.hash).toBe('#projects');
  });

  it('does nothing when the target element does not exist', () => {
    Element.prototype.scrollIntoView = vi.fn();
    scrollToSection('#missing-section');
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
