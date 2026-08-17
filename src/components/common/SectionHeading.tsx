import React from 'react';
import { cn } from '../../utils/helpers';

interface SectionHeadingProps {
  index?: string; // e.g. "01", "02" or section identifier
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  subtitle,
  align = 'left',
  className = ''
}) => {
  return (
    <div
      className={cn(
        'mb-8 sm:mb-12',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl',
        className
      )}
    >
      <div className={cn('flex items-center gap-2 mb-2', align === 'center' ? 'justify-center' : 'justify-start')}>
        {index && (
          <span className="font-mono text-xs font-medium text-accent-green tracking-wider uppercase">
            {index}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2 font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
