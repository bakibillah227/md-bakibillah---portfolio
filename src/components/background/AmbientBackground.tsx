import { useEffect, useRef } from 'react';
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AmbientBackgroundEngine } from '../../utils/ambientBackground';
import './background.css';

interface AmbientBackgroundProps {
  className?: string;
}

/**
 * Full-viewport animated technical background behind all portfolio content.
 *
 * Three stacked layers paint together: large breathing gradient fields and a
 * faint technical grid (CSS, parallax-driven by the canvas engine) plus the
 * rich canvas layer (nodes, connections, geometric elements, glows). The shell
 * is decorative only: `pointer-events: none` and a negative z-index keep it
 * behind every clickable element. Animation only runs when the user has not
 * requested reduced motion, and pointer influence is skipped for coarse
 * pointers (touch devices).
 */
export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ className = '' }) => {
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new AmbientBackgroundEngine(canvas, {
      reducedMotion,
      coarsePointer,
      parallaxTargets: [
        { el: atmosphereRef.current, strength: 10 },
        { el: gridRef.current, strength: 12 }
      ]
    });
    engine.start();
    return () => engine.destroy();
  }, [reducedMotion, coarsePointer]);

  return (
    <div className={`bg-shell ${className}`} aria-hidden="true">
      {/* Breathing ambient gradient fields */}
      <div ref={atmosphereRef} className="bg-parallax">
        <div className="bg-atmosphere">
          <span className="bg-blob bg-blob--core" />
          <span className="bg-blob bg-blob--cool" />
          <span className="bg-blob bg-blob--violet" />
        </div>
      </div>

      {/* Faint technical grid */}
      <div ref={gridRef} className="bg-parallax">
        <div className="bg-grid" />
      </div>

      {/* Nodes, connections, geometric elements and glows */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 ${className}`}
      />
    </div>
  );
};