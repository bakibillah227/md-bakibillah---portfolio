import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Hammer,
  Target,
  Trophy,
  Award,
  Users,
  GitPullRequest,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Plus,
  X
} from 'lucide-react';
import { currentFocusData } from '../data/focus';
import { verifiedAchievements } from '../data/achievements';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SectionHeading } from '../components/common/SectionHeading';

const achievementCategoryIcons: Record<string, React.ReactNode> = {
  'Production Exposure': <Users className="w-4 h-4 text-accent-green" />,
  Competition: <Trophy className="w-4 h-4 text-accent-orange" />,
  'Open Source': <GitPullRequest className="w-4 h-4 text-accent-green" />,
  'Academic Recognition': <Award className="w-4 h-4 text-accent-orange" />
};

export const FocusAndAchievements: React.FC = () => {
  const [expandedAchievementId, setExpandedAchievementId] = useState<string | null>(null);

  const handleExpandAchievement = (id: string) => setExpandedAchievementId(id);
  const handleToggleAchievement = (id: string) =>
    setExpandedAchievementId((prev) => (prev === id ? null : id));
  return (
    <section id="focus-achievements" className="py-16 sm:py-24 scroll-mt-20 border-t border-border-subtle/60" aria-label="Current Focus and Verified Achievements">
      <Container size="lg">
        {/* PART 1: CURRENT FOCUS (Current -> Learning -> Goals) */}
        <div className="mb-20">
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

        {/* PART 2: VERIFIED ACHIEVEMENTS */}
        <div className="flex items-start justify-between gap-4 mb-6">
            <SectionHeading
              title="Verified Recognitions & Accomplishments"
              subtitle="Authentic milestones in competitive programming, open source contributions, production exposure, and academic performance."
              className="mb-0"
            />
            <Badge variant="green" size="sm" className="hidden sm:inline-flex mt-2 shrink-0">
              Verified
            </Badge>
          </div>

          <div className="space-y-4">
            {verifiedAchievements.map((item) => {
              const isGreen = item.category === 'Production Exposure' || item.category === 'Open Source';
              const icon = achievementCategoryIcons[item.category] || <Award className="w-4 h-4 text-accent-green" />;
              const expanded = expandedAchievementId === item.id;

              return (
                <div
                  key={item.id}
                  role="article"
                  aria-label={`${item.title} - ${item.context}`}
                  aria-expanded={expanded}
                  className="group relative bg-surface-card border border-border-subtle hover:border-border-strong focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md focus-visible:shadow-md hover:-translate-y-1 focus-visible:-translate-y-1 transition-all duration-200 ease-out outline-none motion-reduce:transform-none motion-reduce:transition-none overflow-hidden cursor-default"
                >
                  {/* Subtle top accent indicator line that expands on hover / focus */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                      isGreen
                        ? 'bg-gradient-to-r from-accent-green via-accent-green/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                        : 'bg-gradient-to-r from-accent-orange via-accent-orange/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Toggle "+" icon on top-right */}
                  <button
                    type="button"
                    onClick={() => handleToggleAchievement(item.id)}
                    aria-label={expanded ? `Collapse ${item.title} details` : `Open ${item.title} details`}
                    title={expanded ? 'Collapse details' : 'Open details'}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-surface-secondary/90 border border-border-subtle text-text-primary opacity-90 hover:opacity-100 hover:bg-text-primary hover:text-surface-primary hover:border-text-primary shadow-xs transition-all duration-300 group-hover:border-border-strong cursor-pointer"
                  >
                    {expanded ? (
                      <X className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="space-y-3">
                    {/* Header: Category Icon & Verification Badge */}
                    <div className="flex items-center justify-between gap-2 pr-8">
                      <div className="p-2 rounded-lg bg-surface-secondary border border-border-subtle group-hover:border-border-strong/70 group-focus-visible:border-border-strong/70 group-hover:bg-surface-secondary/90 transition-all duration-200 shrink-0">
                        <div className="transform group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-200 motion-reduce:transform-none">
                          {icon}
                        </div>
                      </div>
                      <Badge variant="neutral" size="sm" className="font-mono text-[10px] group-hover:border-border-strong/60 transition-colors">
                        {item.badge}
                      </Badge>
                    </div>

                    {/* Title & Context - hover or click opens the card */}
                    <div
                      onMouseEnter={() => handleExpandAchievement(item.id)}
                      onClick={() => handleToggleAchievement(item.id)}
                    >
                      <h4 className={`text-sm font-bold text-text-primary transition-colors duration-200 cursor-pointer ${
                        isGreen
                          ? 'group-hover:text-accent-green-dark dark:group-hover:text-accent-green group-focus-visible:text-accent-green-dark dark:group-focus-visible:text-accent-green'
                          : 'group-hover:text-accent-orange dark:group-hover:text-accent-orange group-focus-visible:text-accent-orange dark:group-focus-visible:text-accent-orange'
                      }`}>
                        {item.title}
                      </h4>
                      <span className={`text-[11px] font-mono block mt-1 font-medium ${
                        isGreen
                          ? 'text-accent-green-dark dark:text-accent-green'
                          : 'text-accent-orange'
                      }`}>
                        {item.context}
                      </span>
                    </div>

                    {/* Detail Description - visible when expanded */}
                    {expanded && (
                      <p className="text-xs text-text-secondary leading-relaxed font-normal">
                        {item.detail}
                      </p>
                    )}
                  </div>

                  {/* Footer Metadata Strip - visible when expanded */}
                  {expanded && (
                    <div className="pt-3 border-t border-border-subtle/70 group-hover:border-border-strong/60 group-focus-visible:border-border-strong/60 transition-colors flex items-center justify-between text-[11px] font-mono text-text-tertiary">
                      <span className="truncate">{item.category}</span>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-accent-green-dark dark:text-accent-green shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transform-none" />
                        <span>Verified</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
