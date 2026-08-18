import React from 'react';
import {
  BookOpen,
  Hammer,
  Target
} from 'lucide-react';
import { currentFocusData } from '../data/focus';
import { verifiedAchievements } from '../data/achievements';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SectionHeading } from '../components/common/SectionHeading';

export const FocusAndAchievements: React.FC = () => {
  return (
    <section id="focus-achievements" className="py-14 sm:py-16 lg:py-20 scroll-mt-20 border-t border-border-subtle/60" aria-label="Current Focus and Verified Achievements">
      <Container size="lg">
        {/* PART 1: CURRENT FOCUS (Current -> Learning -> Goals) */}
        <div className="mb-14">
          <SectionHeading
            title="Current Technical Focus & Roadmap"
            subtitle="Transparent progression separating what I am actively building today, deep dive engineering topics under study, and forward professional milestones."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Currently Building */}
            <Card className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 p-6 flex flex-col justify-between space-y-6 group motion-reduce:transform-none">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle group-hover:border-border-strong/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <Hammer className="w-4 h-4 text-accent-green" />
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                      Currently Building
                    </h3>
                  </div>
                  <Badge variant="green" size="sm">Active Code</Badge>
                </div>

                <div className="space-y-3">
                  {currentFocusData.building.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-lg bg-surface-secondary/50 border border-border-subtle hover:border-border-strong/60 hover:bg-surface-secondary/80 transition-all duration-150 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-text-primary">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono text-text-tertiary">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-text-tertiary border-t border-border-subtle/50">
                Step 1: Production Practice
              </div>
            </Card>

            {/* 2. Currently Learning */}
            <Card className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 p-6 flex flex-col justify-between space-y-6 group motion-reduce:transform-none">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle group-hover:border-border-strong/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent-orange" />
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                      Currently Learning
                    </h3>
                  </div>
                  <Badge variant="orange" size="sm">Deepening</Badge>
                </div>

                <ul className="space-y-2.5">
                  {currentFocusData.learning.map((topic, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg bg-surface-secondary/50 border border-border-subtle hover:border-border-strong/60 hover:bg-surface-secondary/80 transition-all duration-150 text-xs text-text-secondary leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-accent-orange font-bold mt-0.5">·</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[11px] font-mono text-text-tertiary border-t border-border-subtle/50">
                Step 2: Technical Depth
              </div>
            </Card>

            {/* 3. Forward Goals */}
            <Card className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 p-6 flex flex-col justify-between space-y-6 group motion-reduce:transform-none">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle group-hover:border-border-strong/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent-green" />
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                      Forward Milestones
                    </h3>
                  </div>
                  <Badge variant="neutral" size="sm">Aspirations</Badge>
                </div>

                <div className="space-y-2.5">
                  {currentFocusData.goals.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-surface-secondary/50 border border-border-subtle hover:border-border-strong/60 hover:bg-surface-secondary/80 transition-all duration-150 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary">
                        <span>Target {idx + 1}</span>
                        <span className="text-accent-green-dark dark:text-accent-green font-medium">
                          {item.timeline}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-text-primary leading-snug">
                        {item.goal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-text-tertiary border-t border-border-subtle/50">
                Step 3: Long-term Impact
              </div>
            </Card>
          </div>
        </div>

        {/* PART 2: RECOGNITIONS */}
        <div>
          <SectionHeading
            title="Recognitions"
            subtitle="A compact summary of academic, competitive, and open source recognition."
            className="mb-6"
          />

          <Card className="bg-surface-card border-border-subtle p-5 sm:p-6">
            <ul className="divide-y divide-border-subtle">
              {verifiedAchievements.map((item) => (
                <li
                  key={item.id}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                >
                  <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                  <span className="text-xs text-text-secondary sm:text-right">{item.summary}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
};
