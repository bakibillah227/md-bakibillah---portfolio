import React from 'react';

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

// Crisp, lightweight inline vector icons for technologies
const techList: TechItem[] = [
  {
    name: 'JavaScript',
    icon: (
      <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3h18v18H3V3zm10.72 13.97c.75.44 1.63.71 2.58.71 1.69 0 2.6-.84 2.6-2.07 0-1.29-.85-1.84-2.34-2.48l-.7-.3c-1.85-.79-3.08-1.78-3.08-3.69 0-2.18 1.7-3.77 4.34-3.77 1.34 0 2.45.34 3.23.82l-.84 1.8c-.6-.37-1.44-.64-2.39-.64-1.43 0-2.26.75-2.26 1.77 0 1.13.78 1.65 2.18 2.26l.7.3c2.09.91 3.27 1.95 3.27 3.99 0 2.4-1.86 3.97-4.8 3.97-1.47 0-2.82-.44-3.68-1.02l.8-1.8zM7.5 17.6c.64.35 1.48.57 2.29.57 1.43 0 2.29-.69 2.29-2.24V6.5h-2.33v9.33c0 .59-.3.9-.84.9-.47 0-.96-.16-1.34-.37l-.07 1.24z" />
      </svg>
    )
  },
  {
    name: 'React',
    icon: (
      <svg className="w-4 h-4 text-cyan-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    icon: (
      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3zm0 4.2a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
      </svg>
    )
  },
  {
    name: 'Express.js',
    icon: (
      <svg className="w-4 h-4 text-text-primary fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    )
  },
  {
    name: 'MongoDB',
    icon: (
      <svg className="w-4 h-4 text-green-600 dark:text-green-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C12 2 6 8.5 6 14.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-6-6-12.5-6-12.5zm0 17.5c-2.48 0-4.5-2.02-4.5-4.5 0-3.5 3-7.5 4.5-9.5 1.5 2 4.5 6 4.5 9.5 0 2.48-2.02 4.5-4.5 4.5z" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg className="w-4 h-4 text-sky-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    )
  },
  {
    name: 'Next.js',
    icon: (
      <svg className="w-4 h-4 text-text-primary fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.8 14.6l-5.6-7.8V16H9.4V8h1.8l5.6 7.8V8h1.8v8.6h-1.8z" />
      </svg>
    )
  },
  {
    name: 'Firebase',
    icon: (
      <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 17.5L7.2 2.8c.1-.5.7-.7 1-.3l3.6 6.8-4.3 8.2zm14.5-.4l-2.1-4-2.9-5.5c-.3-.5-1-.5-1.3 0L10.3 12l4.9 5.2 3.8-.1zM11.6 13.2l-3.3-6.2-4.3 10.9 7.6-4.7zM12 22l6.8-4-4.8-5-2 9z" />
      </svg>
    )
  },
  {
    name: 'REST APIs',
    icon: (
      <svg className="w-4 h-4 text-accent-green fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
    )
  },
  {
    name: 'Git',
    icon: (
      <svg className="w-4 h-4 text-orange-600 dark:text-orange-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.7 10.7l-8.4-8.4a1.8 1.8 0 00-2.6 0l-1.9 1.9 2.4 2.4a2.2 2.2 0 012.8 2.8l2.3 2.3a2.2 2.2 0 11-1.3 1.3l-2.2-2.2v4.8a2.2 2.2 0 11-1.8 0v-4.9a2.2 2.2 0 01-1.2-2.9l-2.4-2.4-5.1 5.1a1.8 1.8 0 000 2.6l8.4 8.4a1.8 1.8 0 002.6 0l8.4-8.4a1.8 1.8 0 000-2.6z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="w-4 h-4 text-text-primary fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  }
];

export const TechTicker: React.FC = () => {
  // Duplicate list to achieve a seamless, mathematically infinite marquee loop
  const duplicatedTechList = [...techList, ...techList];

  return (
    <div
      className="w-full relative group overflow-hidden py-3 sm:py-3.5 my-2 rounded-xl bg-surface-secondary/40 border border-border-subtle/80"
      aria-label="Core Technologies Marquee"
    >
      {/* Left and Right Subtle Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-surface-primary via-surface-primary/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-surface-primary via-surface-primary/80 to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center gap-3 sm:gap-4 pl-3">
        {duplicatedTechList.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card/90 border border-border-subtle/90 text-xs font-mono font-medium text-text-primary shadow-2xs shrink-0 select-none hover:border-border-strong transition-colors"
          >
            <span className="shrink-0 flex items-center justify-center">
              {tech.icon}
            </span>
            <span className="whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
