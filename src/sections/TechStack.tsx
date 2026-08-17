import React from 'react';
import {
  Code2,
  Layout,
  Server,
  Wrench,
  Database,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { skillCategories } from '../data/skills';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SectionHeading } from '../components/common/SectionHeading';

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-4 h-4 text-accent-green" />,
  frontend: <Layout className="w-4 h-4 text-accent-orange" />,
  'backend-database': <Server className="w-4 h-4 text-accent-green" />,
  tools: <Wrench className="w-4 h-4 text-text-primary" />
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-16 sm:py-20 scroll-mt-20 border-t border-border-subtle/60" aria-label="Technical Stack">
      <Container size="lg">
        <SectionHeading
          title="Technical Stack & Tooling"
          subtitle="A structured overview of programming languages, frameworks, databases, and developer tools I utilize to engineer reliable web applications."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {skillCategories.map((group) => {
            const icon = categoryIcons[group.id] || <Layers className="w-4 h-4 text-accent-green" />;

            return (
              <motion.div key={group.id} variants={cardVariants}>
                <Card
                  className="flex flex-col justify-between h-full bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-200 group"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-border-subtle group-hover:border-border-strong/60 transition-colors">
                      <div className="p-1.5 rounded-md bg-surface-secondary text-text-primary border border-border-subtle group-hover:border-border-strong/50 transition-colors">
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                          {group.title}
                        </h3>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-1.5">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between p-2 rounded-md bg-surface-secondary/40 border border-border-subtle/70 hover:bg-surface-secondary hover:border-border-strong/60 transition-all duration-150"
                        >
                          <span className="text-xs font-medium text-text-primary">
                            {skill.name}
                          </span>

                          {skill.highlighted && (
                            <span className="text-[10px] font-mono font-medium text-accent-green bg-accent-green/10 border border-accent-green/20 px-1.5 py-0.5 rounded">
                              Core
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border-subtle/70">
                    <p className="text-[11px] text-text-tertiary leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recruiter Quick Scan Summary */}
        <div className="mt-8 p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            <span className="font-mono text-text-primary font-medium">Stack Snapshot:</span>
            <span className="text-text-secondary">
              React · Next.js · Node.js · Express · MongoDB · Tailwind CSS · TypeScript · JavaScript · C++
            </span>
          </div>
          <span className="text-text-tertiary font-mono text-[11px]">
            Clean architecture & semantic markup
          </span>
        </div>
      </Container>
    </section>
  );
};
