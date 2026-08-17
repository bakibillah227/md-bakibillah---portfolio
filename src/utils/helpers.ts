/**
 * Utility helper functions for portfolio presentation and interactions.
 */

/**
 * Conditionally joins class names cleanly without external heavy dependencies.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Smoothly scrolls to an anchor element by ID.
 */
export function scrollToSection(sectionId: string): void {
  const targetId = sectionId.replace(/^#/, '');
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    // Update hash in URL without jumping
    window.history.pushState(null, '', `#${targetId}`);
  }
}
