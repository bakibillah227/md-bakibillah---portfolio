import React from 'react';
import { cn } from '../../utils/helpers';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'green' | 'orange' | 'outline' | 'dot';
  size?: 'sm' | 'md';
  dotPulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dotPulse = false,
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  const variantClasses = {
    neutral: 'bg-surface-secondary text-text-secondary border border-border-subtle font-medium',
    green: 'bg-accent-green/10 text-accent-green-dark dark:text-accent-green border border-accent-green/20 font-medium',
    orange: 'bg-accent-orange/10 text-accent-orange-dark dark:text-accent-orange border border-accent-orange/20 font-medium',
    outline: 'bg-transparent text-text-secondary border border-border-strong font-medium',
    dot: 'bg-surface-secondary text-text-primary border border-border-subtle font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full tracking-normal select-none transition-colors whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {(variant === 'dot' || dotPulse) && (
        <span className="relative flex h-2 w-2">
          {dotPulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
