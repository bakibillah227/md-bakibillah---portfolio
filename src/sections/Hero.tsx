import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Terminal,
  Database,
  Layers,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { personalData } from '../data/personal';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { TechTicker } from '../components/common/TechTicker';
import { scrollToSection } from '../utils/helpers';
import { staggerContainer, fadeUpItem, isReducedMotionEnabled } from '../utils/motion';
import './hero.css';

const identities = [
  'Software Engineer',
  'Full-Stack MERN Developer',
  'Open Source Contributor',
  'AI Enthusiast'
];

const TILT_MAX_DEG = 6;

const capabilities = [
  {
    icon: Layers,
    title: 'Full-Stack MERN',
    accent: 'text-accent-green',
    text: 'End-to-end web applications with React frontend and structured Node/Express APIs.'
  },
  {
    icon: Database,
    title: 'Backend & REST APIs',
    accent: 'text-accent-orange',
    text: 'Schema modeling, MongoDB queries, authentication workflows, and modular architectures.'
  },
  {
    icon: Terminal,
    title: 'CS Fundamentals',
    accent: 'text-text-primary',
    text: 'Active focus on Data Structures, Algorithms, clean SOLID design, and scalable systems.'
  }
];

export const Hero: React.FC = () => {
  const [identityIndex, setIdentityIndex] = useState(0);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    // Respect user motion preferences
    if (reduced) return;

    const interval = setInterval(() => {
      setIdentityIndex((prev) => (prev + 1) % identities.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [reduced]);

  const handleScrollClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const handleTilt = (e: React.MouseEvent) => {
    const el = portraitRef.current;
    if (!el) return;
    if (isReducedMotionEnabled()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * TILT_MAX_DEG, ry: px * TILT_MAX_DEG });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      id="home"
      className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-24 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Layer: background atmosphere — static technical environment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        <div className="hero-glow-core w-[640px] h-[420px] left-1/2 -translate-x-1/2 top-4 blur-3xl" />
        <div className="hero-glow-cool w-[520px] h-[380px] -left-44 bottom-0 blur-3xl" />
        <div className="hero-glow-cool w-[460px] h-[400px] -right-52 top-10 blur-3xl" />
      </div>

      <Container size="lg">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10 sm:space-y-12"
        >
          {/* Main 2-Column Hero Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Text & CTA (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* 1. Location Badge */}
              <motion.div variants={fadeUpItem} className="mb-6">
                <div className="inline-flex items-center gap-2 text-xs text-text-secondary font-mono bg-surface-secondary/80 border border-border-subtle px-3 py-1 rounded-full shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  <MapPin className="w-3.5 h-3.5 text-accent-green" />
                  <span>
                    {personalData.location.city}, {personalData.location.country}
                  </span>
                  <span className="opacity-50">· UTC+6</span>
                </div>
              </motion.div>

              {/* 2. Professional Identity & Headline with Rotating Text */}
              <motion.div variants={fadeUpItem} className="space-y-3 mb-6 w-full">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-text-primary leading-[1.12] text-balance">
                  Hi, I'm <span className="text-text-primary">{personalData.name}</span>.
                </h1>

                {/* Reserved height wrapper prevents any vertical layout jump */}
                <div className="h-8 sm:h-9 lg:h-10 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={identities[identityIndex]}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-medium tracking-tight text-accent-green-dark dark:text-accent-green"
                    >
                      {identities[identityIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 3. Concise Value Proposition */}
              <motion.p
                variants={fadeUpItem}
                className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mb-8 font-normal"
              >
                I build scalable, reliable, user-focused web applications using modern JavaScript technologies, with a growing focus on backend engineering, system design, and AI-powered products.
              </motion.p>

              {/* 4. Action CTA: View Projects Only */}
              <motion.div variants={fadeUpItem} className="mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  href="#projects"
                  onClick={(e) => handleScrollClick(e, '#projects')}
                  icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  iconPosition="right"
                  className="group font-semibold text-sm sm:text-base"
                >
                  View Projects
                </Button>
              </motion.div>

              {/* 5. Horizontal Technology Ticker */}
              <motion.div variants={fadeUpItem} className="w-full">
                <TechTicker />
              </motion.div>
            </div>

            {/* Right Column: Layered Profile Composition (5 Cols) */}
            <motion.div
              variants={fadeUpItem}
              className="lg:col-span-5 flex items-center justify-center"
            >
              <div
                ref={portraitRef}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                }}
                className="relative group w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[400px] transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none"
              >
                {/* Atmospheric halo behind the portrait */}
                <div
                  aria-hidden="true"
                  className="hero-glow-portrait absolute -inset-5 sm:-inset-7 rounded-[3rem] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Orbital technical rings */}
                <div
                  aria-hidden="true"
                  className="absolute -top-12 -right-10 hidden sm:block w-44 h-44 rounded-full border border-dashed border-border-strong/50"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-10 -left-10 hidden sm:block w-36 h-36 rounded-full border border-dashed border-accent-green/20"
                />

                {/* HUD corner brackets */}
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -left-1 z-10 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-accent-green/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -right-1 z-10 h-5 w-5 rounded-br-lg border-r-2 border-b-2 border-accent-green/60"
                />

                {/* Softly rounded portrait frame */}
                <div className="relative rounded-[1.75rem] overflow-hidden border border-border-strong/80 bg-surface-card ring-1 ring-border-strong/40 hero-portrait-shadow aspect-[3/4] [transform-style:preserve-3d]">
                  {personalData.avatarUrl ? (
                    <img
                      src={personalData.avatarUrl}
                      alt={`Portrait of ${personalData.name}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] [transform:translateZ(0)]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono font-bold text-text-primary text-4xl">
                      MB
                    </div>
                  )}

                  {/* Technical base accent + grounding vignette */}
                  <div
                    aria-hidden="true"
                    className="hero-edge-accent absolute bottom-0 inset-x-0 h-[3px]"
                  />
                  <div
                    aria-hidden="true"
                    className="hero-photo-vignette absolute inset-0"
                  />
                </div>

                {/* Floating console chip */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -left-3 sm:-left-6 z-10 flex items-center gap-2 rounded-lg border border-border-strong bg-surface-card/95 px-3 py-1.5 shadow-lg backdrop-blur-sm"
                >
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-orange/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-green/80" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-tight text-text-secondary leading-none">
                    $ npm run portfolio
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 6. Engineering Focus Strip — cohesive technical band */}
          <motion.div variants={fadeUpItem} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-border-subtle bg-surface-secondary/40 shadow-2xs sm:divide-x sm:divide-border-subtle overflow-hidden">
              {capabilities.map((cap) => (
                <div key={cap.title} className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <cap.icon className={`w-4 h-4 ${cap.accent}`} />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                      {cap.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{cap.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
