import React from 'react';
import {
  Code2,
  Server,
  Database,
  Layout,
  Cpu,
  GitBranch,
  ShieldCheck,
  Layers,
  Check
} from 'lucide-react';
import { capabilitiesData } from '../data/capabilities';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { SectionHeading } from '../components/common/SectionHeading';

const capabilityIcons: Record<string, React.ReactNode> = {
  'cap-fullstack': <Layers className="w-4 h-4 text-accent-green" />,
  'cap-backend': <Server className="w-4 h-4 text-accent-green" />,
  'cap-database': <Database className="w-4 h-4 text-accent-green" />,
  'cap-frontend': <Layout className="w-4 h-4 text-accent-orange" />,
  'cap-problemsolving': <Cpu className="w-4 h-4 text-accent-orange" />,
  'cap-practices': <GitBranch className="w-4 h-4 text-text-primary" />
};

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-16 sm:py-20 scroll-mt-20 border-t border-border-subtle/60" aria-label="Engineering Capabilities">
      <Container size="lg">
        <SectionHeading
          title="Engineering Capabilities & Competencies"
          subtitle="Evidence-based overview of technical capabilities across full-stack architecture, API design, database systems, and problem solving."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesData.map((cap) => {
            const icon = capabilityIcons[cap.id] || <Code2 className="w-4 h-4 text-accent-green" />;

            return (
              <Card
                key={cap.id}
                className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-1 hover:shadow-xs flex flex-col justify-between transition-all duration-200 p-6 space-y-5 group motion-reduce:transform-none"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-surface-secondary text-text-primary border border-border-subtle group-hover:border-border-strong/80 group-hover:bg-surface-secondary/80 transition-colors shrink-0">
                      {icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-accent-green-dark dark:group-hover:text-accent-green transition-colors">
                      {cap.title}
                    </h3>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {cap.description}
                  </p>

                  {/* Practical Evidence Points */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-tertiary block">
                      Practical Competencies:
                    </span>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {cap.evidence.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-3 border-t border-border-subtle group-hover:border-border-strong/60 transition-colors">
                  <div className="flex flex-wrap gap-1">
                    {cap.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-secondary text-text-secondary border border-border-subtle/80 group-hover:border-border-subtle transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
