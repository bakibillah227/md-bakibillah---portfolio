import React, { useMemo, useRef } from 'react';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import type { ParallaxLayer } from '../../hooks/usePointerParallax';
import './heroEnvironment.css';

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

interface TechShapeProps {
  className: string;
  size: number;
  spin: string;
  reverse?: boolean;
  floatDuration?: string;
  colorClass: string;
  opacityClass: string;
  viewBox?: string;
  children: React.ReactNode;
}

/** A slowly rotating wireframe shape inside a gently floating wrapper. */
const TechShape: React.FC<TechShapeProps> = ({
  className,
  size,
  spin,
  reverse = false,
  floatDuration = '18s',
  colorClass,
  opacityClass,
  viewBox = '0 0 100 100',
  children
}) => (
  <div
    className={`hero-object hero-float ${className}`}
    style={{ width: size, height: size, '--hero-dur': floatDuration } as CSSVars}
  >
    <svg
      viewBox={viewBox}
      className={`hero-rotate ${reverse ? 'hero-rotate--rev' : ''} w-full h-full ${colorClass} ${opacityClass}`}
      style={{ '--hero-spin': spin } as CSSVars}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  </div>
);

interface NetworkNode {
  x: number;
  y: number;
  r?: number;
}

interface TechNetworkProps {
  className: string;
  width: number;
  height: number;
  paths: string[];
  nodes: NetworkNode[];
  colorClass: string;
  opacityClass: string;
  floatDuration?: string;
  breathe?: boolean;
  glow?: boolean;
}

/** A restrained node network: a few thin links and small nodes. */
const TechNetwork: React.FC<TechNetworkProps> = ({
  className,
  width,
  height,
  paths,
  nodes,
  colorClass,
  opacityClass,
  floatDuration = '20s',
  breathe = false,
  glow = false
}) => (
  <div
    className={`hero-object hero-float ${className}`}
    style={{ width, height, '--hero-dur': floatDuration } as CSSVars}
  >
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full ${colorClass} ${opacityClass} ${breathe ? 'hero-breathe' : ''} ${
        glow ? 'hero-node-glow' : ''
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r={node.r ?? 2.4} fill="currentColor" stroke="none" />
      ))}
    </svg>
  </div>
);

interface CrossProps {
  className: string;
  colorClass: string;
  opacityClass: string;
  size?: number;
  floatDuration?: string;
}

/** Small technical plus/tick marker. */
const Cross: React.FC<CrossProps> = ({
  className,
  colorClass,
  opacityClass,
  size = 14,
  floatDuration = '20s'
}) => (
  <div
    className={`hero-object hero-float ${className}`}
    style={{ width: size, height: size, '--hero-dur': floatDuration } as CSSVars}
  >
    <svg
      viewBox="0 0 14 14"
      className={`w-full h-full ${colorClass} ${opacityClass}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 0 V14 M0 7 H14" />
    </svg>
  </div>
);

/**
 * Intentional, hero-scoped technical environment.
 *
 * Composition is grouped into three conceptual depth layers so pointer
 * parallax can move them at different rates. Richness scales with the
 * breakpoint: desktop shows the full scene, tablet a reduced set, mobile just
 * a couple of accents plus the atmosphere. The area behind the headline stays
 * clear; stronger objects cluster around the portrait and the empty margins.
 */
export const HeroEnvironment: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  const layers = useMemo<ParallaxLayer[]>(
    () => [
      { ref: farRef, strength: 3 },
      { ref: midRef, strength: 7 },
      { ref: nearRef, strength: 11 }
    ],
    []
  );

  usePointerParallax(rootRef, layers);

  return (
    <div ref={rootRef} className="hero-env" aria-hidden="true">
      {/* FAR — faint structure, slowest movement */}
      <div ref={farRef} className="hero-env-layer">
        <TechNetwork
          className="hidden lg:block left-[-4%] top-[-1%]"
          width={180}
          height={110}
          paths={['M16 96 L58 56 L128 72 L166 34', 'M58 56 L96 16', 'M128 72 L96 16']}
          nodes={[
            { x: 16, y: 96 },
            { x: 58, y: 56 },
            { x: 128, y: 72, r: 2 },
            { x: 166, y: 34 },
            { x: 96, y: 16, r: 2 }
          ]}
          colorClass="hero-c-cool"
          opacityClass="opacity-25 dark:opacity-40"
          floatDuration="21s"
        />

        <TechNetwork
          className="hidden xl:block left-[-4%] top-[52%]"
          width={150}
          height={120}
          paths={['M8 104 L44 62 L104 74', 'M44 62 L74 20', 'M104 74 L136 52']}
          nodes={[
            { x: 8, y: 104, r: 2 },
            { x: 44, y: 62 },
            { x: 104, y: 74, r: 2 },
            { x: 74, y: 20 },
            { x: 136, y: 52, r: 2 }
          ]}
          colorClass="hero-c-violet"
          opacityClass="opacity-25 dark:opacity-35"
          floatDuration="25s"
        />

        {/* mobile / small-tablet accents */}
        <TechNetwork
          className="block sm:hidden left-[-5%] top-[30%]"
          width={140}
          height={110}
          paths={['M10 96 L48 58 L108 70', 'M48 58 L78 18', 'M108 70 L132 44']}
          nodes={[
            { x: 10, y: 96, r: 2 },
            { x: 48, y: 58 },
            { x: 108, y: 70, r: 2 },
            { x: 78, y: 18 },
            { x: 132, y: 44, r: 2 }
          ]}
          colorClass="hero-c-violet"
          opacityClass="opacity-25 dark:opacity-35"
          floatDuration="23s"
        />

        <Cross
          className="hidden lg:block left-[46%] top-[3%]"
          colorClass="hero-c-line"
          opacityClass="opacity-25 dark:opacity-30"
          size={12}
          floatDuration="22s"
        />
        <Cross
          className="hidden lg:block right-[41%] bottom-[7%]"
          colorClass="hero-c-line"
          opacityClass="opacity-20 dark:opacity-25"
          size={12}
          floatDuration="27s"
        />
      </div>

      {/* MID — geometric outlines, moderate movement */}
      <div ref={midRef} className="hero-env-layer">
        <TechShape
          className="hidden xl:block left-[1%] top-[15%]"
          size={70}
          spin="46s"
          floatDuration="17s"
          colorClass="hero-c-core"
          opacityClass="opacity-40 dark:opacity-55"
        >
          <path d="M50 12 L86 32 L86 70 L50 90 L14 70 L14 32 Z" />
          <path d="M14 32 L50 52 L86 32 M50 52 L50 90 M50 52 L50 12" />
        </TechShape>

        <TechShape
          className="hidden xl:block left-[0%] top-[71%]"
          size={62}
          spin="64s"
          reverse
          floatDuration="21s"
          colorClass="hero-c-violet"
          opacityClass="opacity-35 dark:opacity-50"
        >
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" />
        </TechShape>

        <TechShape
          className="hidden lg:block right-[11%] top-[3%]"
          size={52}
          spin="54s"
          floatDuration="19s"
          colorClass="hero-c-cool"
          opacityClass="opacity-35 dark:opacity-50"
        >
          <rect x="22" y="22" width="56" height="56" />
        </TechShape>

        {/* Connection line reaching toward the portrait */}
        <div className="hero-object hidden xl:block left-[12%] top-[8%] w-[50%] h-px bg-current hero-c-cool opacity-25 dark:opacity-40" />
        <div className="hero-object hidden xl:block left-[12%] top-[8%] w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-current hero-c-cool opacity-50" />
        <div className="hero-object hidden xl:block left-[46%] top-[8%] w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-current hero-c-cool opacity-50" />
        <div className="hero-object hidden xl:block left-[62%] top-[8%] w-2 h-2 -translate-y-1/2 rounded-full bg-current hero-c-core opacity-60" />
        <div className="hero-object hidden xl:block left-[62%] top-[8%] w-px h-[7%] bg-current hero-c-core opacity-30" />
      </div>

      {/* NEAR — strongest objects, fastest movement */}
      <div ref={nearRef} className="hero-env-layer">
        {/* Atmospheric fields reinforcing the portrait and lower corner */}
        <div
          className="hero-env-glow hero-env-glow--core right-[1%] top-[15%] w-[340px] h-[420px]"
          style={{ '--hero-op': '0.72', '--hero-dur': '28s' } as CSSVars}
        />
        <div
          className="hero-env-glow hero-env-glow--cool left-[-8%] bottom-[4%] w-[380px] h-[300px]"
          style={{ '--hero-op': '0.6', '--hero-dur': '34s' } as CSSVars}
        />
        <div
          className="hero-env-glow hero-env-glow--violet hidden sm:block left-[26%] top-[1%] w-[280px] h-[220px]"
          style={{ '--hero-op': '0.5', '--hero-dur': '31s' } as CSSVars}
        />

        {/* Large orbital ring passing behind the portrait frame */}
        <div
          className="hero-object hero-float hidden lg:block right-[2%] top-[12%]"
          style={{ width: 280, height: 280, '--hero-dur': '23s' } as CSSVars}
        >
          <div
            className="hero-rotate relative w-full h-full rounded-full border border-dashed border-current hero-c-core opacity-35 dark:opacity-55"
            style={{ '--hero-spin': '62s' } as CSSVars}
          >
            <span className="hero-node-glow absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-current" />
          </div>
        </div>

        {/* Inner counter-rotating ring */}
        <div
          className="hero-object hero-float hidden sm:block right-[13%] top-[33%]"
          style={{ width: 180, height: 180, '--hero-dur': '19s' } as CSSVars}
        >
          <div
            className="hero-rotate hero-rotate--rev w-full h-full rounded-full border border-current hero-c-cool opacity-25 dark:opacity-40"
            style={{ '--hero-spin': '46s' } as CSSVars}
          />
        </div>

        {/* Node cluster terminating near the portrait */}
        <TechNetwork
          className="hidden xl:block right-[30%] top-[19%]"
          width={170}
          height={130}
          paths={['M14 112 L52 68 L120 84 L156 40', 'M52 68 L92 22', 'M120 84 L92 22']}
          nodes={[
            { x: 14, y: 112, r: 2 },
            { x: 52, y: 68 },
            { x: 120, y: 84, r: 2 },
            { x: 156, y: 40, r: 3 },
            { x: 92, y: 22 }
          ]}
          colorClass="hero-c-core"
          opacityClass="opacity-45 dark:opacity-65"
          floatDuration="17s"
          breathe
          glow
        />

        {/* Floating shape beside the portrait */}
        <TechShape
          className="hidden lg:block right-[33%] top-[61%]"
          size={46}
          spin="40s"
          reverse
          floatDuration="15s"
          colorClass="hero-c-cool"
          opacityClass="opacity-40 dark:opacity-55"
        >
          <rect x="20" y="20" width="60" height="60" />
        </TechShape>

        <Cross
          className="hidden sm:block right-[5%] bottom-[13%]"
          colorClass="hero-c-violet"
          opacityClass="opacity-40 dark:opacity-55"
          size={16}
          floatDuration="18s"
        />

        {/* mobile-only accent */}
        <TechShape
          className="block sm:hidden right-[7%] top-[2%]"
          size={40}
          spin="44s"
          floatDuration="20s"
          colorClass="hero-c-cool"
          opacityClass="opacity-35 dark:opacity-50"
        >
          <rect x="20" y="20" width="60" height="60" />
        </TechShape>
      </div>
    </div>
  );
};
