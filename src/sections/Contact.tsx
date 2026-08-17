import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { personalData } from '../data/personal';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-32 scroll-mt-20 border-t border-border-subtle/60"
      aria-label="Contact and Collaboration"
    >
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-surface-secondary/35 border border-border-subtle/80 p-8 sm:p-14 lg:p-16 text-center space-y-6 sm:space-y-8 relative overflow-hidden"
        >
          {/* Subtle radial ambient highlight */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-primary/30 to-transparent opacity-60"
            aria-hidden="true"
          />

          {/* Content Wrapper */}
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
              Want to Collaborate Together?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-normal">
              Have a web application idea, a full-stack challenge, or an AI-powered product in mind? Let's collaborate and build something fast, reliable, and user-focused.
            </p>
          </div>

          {/* Primary Closing CTA */}
          <div className="relative z-10 pt-2 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              href={`mailto:${personalData.contact.email}`}
              icon={<Mail className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />}
              className="group text-sm sm:text-base font-semibold px-8 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
