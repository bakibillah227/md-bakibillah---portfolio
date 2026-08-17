import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { personalData } from '../../data/personal';

const bootSteps = [
  { id: 'init', label: 'initializing portfolio console' },
  { id: 'react', label: 'mounting ui modules & state trees' },
  { id: 'stack', label: 'bundling react · typescript · vite' },
  { id: 'ready', label: 'profile active · md bakibillah' }
];

export const Preloader: React.FC = () => {
  const [step, setStep] = useState(0);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setStep(bootSteps.length);
      return;
    }

    const timers = bootSteps.map((_, i) =>
      setTimeout(() => setStep(i + 1), 420 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const progress = Math.round((step / bootSteps.length) * 100);

  return (
    <motion.div
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface-primary font-mono p-4 overflow-hidden"
      aria-label="Loading Md Bakibillah portfolio"
    >
      {/* Subtle ambient glow matching the portfolio's accent */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[520px] h-[300px] bg-accent-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-secondary/60">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
              boot :: md-bakibillah-portfolio
            </span>
            <div className="w-9" aria-hidden="true" />
          </div>

          <div className="p-5 sm:p-6">
            {/* Identity mark */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center overflow-hidden shrink-0">
                {personalData.profileIconUrl ? (
                  <img
                    src={personalData.profileIconUrl}
                    alt={personalData.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-accent-green font-bold text-sm">MB</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-tight">
                  Md Bakibillah
                </p>
                <p className="text-[11px] text-text-tertiary truncate">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Boot sequence */}
            <div className="space-y-2.5">
              {bootSteps.map((s, i) => {
                const done = step > i;
                const active = step === i;
                return (
                  <div key={s.id} className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                        done
                          ? 'bg-accent-green border-accent-green text-surface-primary'
                          : active
                            ? 'border-accent-green/70 text-accent-green'
                            : 'border-border-strong text-text-tertiary/70'
                      }`}
                    >
                      {done ? (
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-current" />
                      )}
                    </span>
                    <span
                      className={`text-xs sm:text-sm transition-colors duration-300 ${
                        done
                          ? 'text-accent-green'
                          : active
                            ? 'text-text-primary'
                            : 'text-text-tertiary/60'
                      }`}
                    >
                      {s.label}
                      {active && (
                        <span
                          className="inline-block w-1.5 h-3.5 bg-accent-green/70 ml-1.5 align-middle animate-pulse"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress meter */}
            <div className="mt-6 pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between text-[10px] text-text-tertiary mb-1.5">
                <span className="uppercase tracking-[0.2em]">Diagnostic</span>
                <span className="text-accent-green font-semibold">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-surface-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-green-dark rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] font-mono text-text-tertiary">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse mr-1.5 align-middle" />
          loading experience
        </p>
      </div>
    </motion.div>
  );
};