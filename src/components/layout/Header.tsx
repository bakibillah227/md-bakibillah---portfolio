import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalData, navigationItems } from '../../data/personal';
import { Container } from '../common/Container';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { cn, scrollToSection } from '../../utils/helpers';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Section spy algorithm for active navigation indicator
      const sections = navigationItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-surface-primary/85 backdrop-blur-md border-b border-border-subtle shadow-xs py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded-lg py-1 px-1.5 -ml-1.5"
            aria-label="Md Bakibillah Portfolio - Back to top"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border-strong bg-surface-secondary shrink-0 shadow-2xs group-hover:border-text-primary group-hover:scale-105 transition-all">
              {personalData.profileIconUrl ? (
                <img
                  src={personalData.profileIconUrl}
                  alt={personalData.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono font-bold text-text-primary text-xs">
                  MB
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-text-primary group-hover:text-accent-green-dark dark:group-hover:text-accent-green transition-colors">
                {personalData.name}
              </span>
              <span className="text-[11px] font-mono text-text-tertiary hidden sm:inline leading-none mt-0.5">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-surface-secondary/70 border border-border-subtle rounded-full px-2 py-1 shadow-2xs backdrop-blur-xs"
            aria-label="Main Navigation"
          >
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150',
                    isActive
                      ? 'text-text-primary bg-surface-card shadow-xs font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/40'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & Resume CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <div className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                href={personalData.contact.resumeUrl || '#contact'}
                isExternal={Boolean(personalData.contact.resumeUrl && personalData.contact.resumeUrl !== '#')}
                icon={<FileText className="w-3.5 h-3.5 text-accent-orange" />}
                iconPosition="left"
                className="text-xs"
              >
                Resume
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            id="mobile-navigation"
            className="md:hidden absolute top-full inset-x-0 bg-surface-primary/95 backdrop-blur-xl border-b border-border-subtle shadow-lg z-40 max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain"
          >
            <Container size="lg" className="py-6">
              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-surface-secondary text-text-primary font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/60'
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                      )}
                    </a>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-border-subtle flex flex-col gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href={personalData.contact.resumeUrl || '#contact'}
                    isExternal={Boolean(personalData.contact.resumeUrl && personalData.contact.resumeUrl !== '#')}
                    icon={<FileText className="w-4 h-4 text-surface-primary" />}
                    iconPosition="left"
                    className="w-full justify-center"
                  >
                    Resume
                  </Button>

                  {/* Quick Socials in Mobile Menu */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-text-secondary">
                    <a
                      href={personalData.contact.socials.find((s) => s.id === 'github')?.url || 'https://github.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={personalData.contact.socials.find((s) => s.id === 'linkedin')?.url || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${personalData.contact.email}`}
                      className="p-2 hover:text-text-primary transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
