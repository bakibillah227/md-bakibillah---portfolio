import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Terminal,
  Database,
  Layers,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalData } from '../data/personal';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { TechTicker } from '../components/common/TechTicker';
import { scrollToSection } from '../utils/helpers';

// Staggered motion variants for restrained entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const identities = [
  'Software Engineer',
  'Full-Stack MERN Developer',
  'Open Source Contributor',
  'AI Enthusiast'
];

export const Hero: React.FC = () => {
  const [identityIndex, setIdentityIndex] = useState(0);

  useEffect(() => {
    // Respect user motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setIdentityIndex((prev) => (prev + 1) % identities.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <section
      id="home"
      className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[300px] sm:w-[700px] sm:h-[450px] bg-accent-green/3 dark:bg-accent-green/5 rounded-full blur-3xl" />
      </div>

      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10 sm:space-y-12"
        >
          {/* Main 2-Column Hero Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text & CTAs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* 1. Location Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs text-text-secondary font-mono bg-surface-secondary/80 border border-border-subtle px-3 py-1 rounded-full shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-accent-green" />
                  <span>{personalData.location.city}, {personalData.location.country}</span>
                </div>
              </motion.div>

              {/* 2. Professional Identity & Headline with Rotating Text */}
              <motion.div variants={itemVariants} className="space-y-3 mb-6 w-full">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-text-primary leading-[1.12]">
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
                variants={itemVariants}
                className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mb-8 font-normal"
              >
                I build scalable, reliable, user-focused web applications using modern JavaScript technologies, with a growing focus on backend engineering, system design, and AI-powered products.
              </motion.p>

              {/* 4. Action CTA: View Projects Only */}
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <Button
                  variant="primary"
                  size="lg"
                  href="#projects"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollClick(e, '#projects')}
                  icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  iconPosition="right"
                  className="group font-semibold text-sm sm:text-base"
                >
                  View Projects
                </Button>
              </motion.div>

              {/* 5. Horizontal Technology Ticker */}
              <motion.div variants={itemVariants} className="w-full">
                <TechTicker />
              </motion.div>
            </div>

            {/* Right Column: Modestly Enlarged Professional Profile Image Container (5 Cols) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 flex items-center justify-center lg:justify-end"
            >
              <div className="relative group w-full max-w-[290px] sm:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px]">
                {/* Clean framing card */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border-strong/80 bg-surface-card shadow-xs group-hover:border-border-strong transition-all duration-300 aspect-square">
                  {personalData.avatarUrl ? (
                    <img
                      src={personalData.avatarUrl}
                      alt={`Portrait of ${personalData.name}`}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono font-bold text-text-primary text-4xl">
                      MB
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 6. Subtle Credibility & Engineering Focus Strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4"
          >
            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle hover:border-border-strong transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-accent-green" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  Full-Stack MERN
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                End-to-end web applications with React frontend and structured Node/Express APIs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle hover:border-border-strong transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Database className="w-4 h-4 text-accent-orange" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  Backend & REST APIs
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Schema modeling, MongoDB queries, authentication workflows, and modular architectures.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle hover:border-border-strong transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Terminal className="w-4 h-4 text-text-primary" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  CS Fundamentals
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Active focus on Data Structures, Algorithms, clean SOLID design, and scalable systems.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
