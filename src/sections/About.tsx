import React from 'react';
import {
  Code2,
  Server,
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  GitBranch
} from 'lucide-react';
import { personalData } from '../data/personal';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SectionHeading } from '../components/common/SectionHeading';
import { Reveal } from '../components/common/Reveal';

const growthIcons: Record<string, React.ReactNode> = {
  'Backend engineering': <Server className="w-4 h-4 text-accent-green" />,
  'System design': <Layers className="w-4 h-4 text-accent-green" />,
  'Cloud technologies': <Cpu className="w-4 h-4 text-accent-orange" />,
  'AI-powered applications': <Sparkles className="w-4 h-4 text-accent-orange" />,
  'Data Structures & Algorithms': <Code2 className="w-4 h-4 text-accent-green" />
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 scroll-mt-20" aria-label="About Md Bakibillah">
      <Container size="lg">
        <SectionHeading
          title="About & Engineering Mindset"
          subtitle="How I approach building software, technical problem-solving, and continuous engineering growth."
        />

        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative - 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
              <p className="text-text-primary font-medium text-base sm:text-lg leading-relaxed">
                I am a Software Engineer passionate about building scalable, high-quality web applications with the MERN Stack.
              </p>

              <p>
                I have practical experience with backend development, RESTful API design, authentication, database architecture, and clean software engineering practices.
              </p>

              <p>
                I enjoy transforming ideas into reliable digital products through modern technologies, maintainable code, and user-focused design.
              </p>
            </div>

            {/* Core Engineering Principles */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-lg bg-surface-secondary/60 border border-border-subtle">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-accent-green" />
                  <span className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider">
                    Maintainable Code
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Clear separation of concerns, modular components, and predictable data flow.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-secondary/60 border border-border-subtle">
                <div className="flex items-center gap-2 mb-1">
                  <GitBranch className="w-4 h-4 text-accent-orange" />
                  <span className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider">
                    Practical Problem Solving
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Focusing on reliable execution, clean API contracts, and user satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Growth Vectors - 5 Columns */}
          <div className="lg:col-span-5">
            {/* Current Growth Focus */}
            <Card className="space-y-4 bg-surface-secondary/40 border-border-subtle">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-green" />
                  <h3 className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider">
                    Current Areas of Growth
                  </h3>
                </div>
                <Badge variant="green" size="sm">Active Practice</Badge>
              </div>

              <ul className="space-y-2.5">
                {personalData.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 p-2.5 rounded-md bg-surface-card border border-border-subtle/80 text-xs text-text-primary font-medium transition-all duration-150 hover:border-border-strong"
                  >
                    <span className="shrink-0">
                      {growthIcons[area] || <CheckCircle2 className="w-4 h-4 text-accent-green" />}
                    </span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
