import { useEffect, useRef } from 'react';
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AmbientBackgroundEngine } from '../../utils/ambientBackground';

interface AmbientBackgroundProps {
  className?: string;
}

/**
 * Full-viewport decorative canvas behind all portfolio content.
 *
 * The canvas is transparent and never receives pointer events, so it cannot
 * block clicks, text selection, or scrolling. Animated frames only run when
 * the user has not requested reduced motion, and pointer influence is skipped
 * for coarse pointers (touch devices).
 */
export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new AmbientBackgroundEngine(canvas, { reducedMotion, coarsePointer });
    engine.start();
    return () => engine.destroy();
  }, [reducedMotion, coarsePointer]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[-1] ${className}`}
    />
  );
};
