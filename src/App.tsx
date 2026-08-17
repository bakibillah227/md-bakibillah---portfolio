import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Capabilities } from './sections/Capabilities';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { FocusAndAchievements } from './sections/FocusAndAchievements';
import { Activity } from './sections/Activity';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-surface-primary text-text-primary selection:bg-accent-green/20 selection:text-text-primary">
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
    </ThemeProvider>
  );
}
