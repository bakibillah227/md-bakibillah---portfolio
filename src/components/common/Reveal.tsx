import React from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from '../../utils/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Consistent scroll-reveal wrapper used across sections.
 * Respects reduced-motion via framer-motion's built-in handling.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
};