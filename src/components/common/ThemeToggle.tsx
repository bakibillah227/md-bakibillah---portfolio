import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/helpers';

interface ThemeToggleProps {
  variant?: 'cycle' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'cycle', className = '' }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center p-1 bg-surface-secondary border border-border-subtle rounded-lg',
          className
        )}
        role="group"
        aria-label="Theme selection"
      >
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
            theme === 'light'
              ? 'bg-surface-card text-text-primary shadow-xs'
              : 'text-text-secondary hover:text-text-primary'
          )}
          aria-pressed={theme === 'light'}
          aria-label="Light mode"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Light</span>
        </button>

        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
            theme === 'dark'
              ? 'bg-surface-card text-text-primary shadow-xs'
              : 'text-text-secondary hover:text-text-primary'
          )}
          aria-pressed={theme === 'dark'}
          aria-label="Dark mode"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </button>

        <button
          onClick={() => setTheme('system')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
            theme === 'system'
              ? 'bg-surface-card text-text-primary shadow-xs'
              : 'text-text-secondary hover:text-text-primary'
          )}
          aria-pressed={theme === 'system'}
          aria-label="System preference"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">System</span>
        </button>
      </div>
    );
  }

  // Single cycle button
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg text-text-secondary hover:text-text-primary bg-surface-secondary hover:bg-surface-tertiary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green cursor-pointer',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {resolvedTheme === 'light' ? (
        <Moon className="w-4 h-4 text-text-primary transition-transform duration-200 hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-accent-orange transition-transform duration-200 hover:rotate-45" />
      )}
    </button>
  );
};
