import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/layout/Preloader';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Capabilities } from './sections/Capabilities';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { FocusAndAchievements } from './sections/FocusAndAchievements';
import { Activity } from './sections/Activity';
import { Contact } from './sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => setIsLoading(false), reduced ? 500 : 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-surface-primary text-text-primary selection:bg-accent-green/20 selection:text-text-primary">
        {/* Boot Sequence Preloader */}
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>

        {/* Skip to Main Content for Screen Readers & Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-text-primary text-surface-primary rounded-lg shadow-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent-green transition-transform"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Header />

        {/* Main Content Sections */}
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {/* Hero Section */}
          <Hero />

          {/* About Me & Engineering Mindset */}
          <About />

          {/* Engineering Capabilities & Competencies */}
          <Capabilities />

          {/* Selected Engineering Projects */}
          <Projects />

          {/* Professional Experience & Academic Foundation */}
          <Experience />

          {/* Current Focus & Verified Achievements */}
          <FocusAndAchievements />

          {/* Coding Activity (GitHub & LeetCode) */}
          <Activity />

          {/* Contact & Closing CTA */}
          <Contact />
        </main>

        {/* Minimal Professional Footer */}
        <Footer />
      </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
