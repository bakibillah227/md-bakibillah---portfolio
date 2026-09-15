/**
 * Cursor interaction state - resolved from what sits under the pointer.
 *
 * `default`: plain content (no expansion)
 * `hover`:   interactive elements (links, buttons, inputs, etc.)
 * `view`:    rich preview surfaces flagged with `data-cursor="view"`
 */
export type CursorState = 'default' | 'hover' | 'view';

const VIEW_ATTR = '[data-cursor="view"]';

const INTERACTIVE_SELECTOR = `a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])`;

/**
 * Resolve the intended cursor state for the element currently under the pointer.
 * `data-cursor="view"` always wins over generic interactive detection so that
 * project cards can advertise a dedicated VIEW affordance.
 */
export function resolveCursorState(target: Element | null): CursorState {
  if (!target || typeof target.closest !== 'function') return 'default';
  if (target.closest(VIEW_ATTR)) return 'view';
  if (target.closest(INTERACTIVE_SELECTOR)) return 'hover';
  return 'default';
}

/**
 * Frame-rate independent exponential smoothing factor.
 * `dt` is clamped so long frame gaps (background tabs, throttling) cannot cause
 * the cursor to slide toward the target in a single large jump.
 */
export function smoothingFactor(rate: number, dt: number): number {
  const clampedDt = Math.min(Math.max(dt, 0), 0.05);
  return 1 - Math.exp(-rate * clampedDt);
}
