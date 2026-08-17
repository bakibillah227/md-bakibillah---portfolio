import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  interactive?: boolean;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  as: Component = 'div',
  interactive = false,
  padded = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'bg-surface-card border border-border-subtle rounded-xl transition-all duration-200 shadow-xs',
        padded && 'p-5 sm:p-6',
        interactive &&
          'hover:border-border-strong hover:shadow-sm hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
