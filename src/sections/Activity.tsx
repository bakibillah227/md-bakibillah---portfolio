import React, { useState } from 'react';
import {
  Github,
  Code2,
  ExternalLink,
  Cpu,
  Activity as ActivityIcon,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useGithubActivity } from '../hooks/useGithubActivity';
import { useLeetCodeActivity } from '../hooks/useLeetCodeActivity';

export const Activity: React.FC = () => {
  const {
    data: githubData,
    loading: githubLoading,
    hasError: githubError,
    totalContributions,
    weeks,
    monthLabels
  } = useGithubActivity('bakibillah227');

  const {
    data: leetcodeData,
    loading: leetcodeLoading,
    hasError: leetcodeError,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    recentSubmissions
  } = useLeetCodeActivity('nexorithm');

  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Color mapper conforming strictly to portfolio theme tokens
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-accent-green/30 border-accent-green/40 hover:bg-accent-green/50';
      case 2:
        return 'bg-accent-green/55 border-accent-green/65 hover:bg-accent-green/70';
      case 3:
        return 'bg-accent-green/80 border-accent-green/90 hover:bg-accent-green/95';
      case 4:
        return 'bg-accent-green border-accent-green hover:bg-accent-green-dark';
      case 0:
      default:
        return 'bg-surface-secondary/70 border-border-subtle/50 hover:border-border-strong/60';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTimestamp = (ts: string) => {
    try {
      const num = parseInt(ts, 10);
      const d = new Date(num > 1e11 ? num : num * 1000);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section
      id="activity"
      className="py-14 sm:py-16 lg:py-20 scroll-mt-20 border-t border-border-subtle/60"
      aria-label="Developer and Problem Solving Activity"
    >
      <Container size="lg">
        <SectionHeading
          title="Coding Activity & Open Source"
          subtitle="Continuous practice across GitHub open-source repositories and algorithmic problem solving on LeetCode."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Dynamic GitHub Contribution & Activity - 6 Cols */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="bg-surface-card border-border-subtle hover:border-border-strong transition-all duration-200 p-6 space-y-6 h-full">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface-secondary text-text-primary border border-border-subtle shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                      <span>github.com/bakibillah227</span>
                    </h3>
                    <p className="text-xs font-mono text-text-tertiary">
                      Public GitHub Activity & Contributions
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  href="https://github.com/bakibillah227"
                  isExternal
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  View Profile
                </Button>
              </div>

              {/* Dynamic Contribution Area */}
              {githubLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-text-secondary text-xs">
                  <div className="w-6 h-6 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
                  <span className="font-mono text-text-tertiary">
                    Loading live GitHub contributions...
                  </span>
                </div>
              ) : githubError || !githubData ? (
                /* Graceful Fallback State */
                <div className="p-6 rounded-xl bg-surface-secondary/40 border border-border-subtle text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border-subtle mx-auto flex items-center justify-center text-text-secondary">
                    <AlertCircle className="w-5 h-5 text-accent-orange" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-text-primary">
                      GitHub activity is currently unavailable.
                    </h4>
                    <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                      You can explore all public repositories, commits, and contributions directly on GitHub.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      href="https://github.com/bakibillah227"
                      isExternal
                      icon={<Github className="w-4 h-4" />}
                      className="justify-center"
                    >
                      View GitHub Profile
                    </Button>
                  </div>
                </div>
              ) : (
                /* Live Contribution Heatmap View */
                <div className="space-y-4">
                  {/* Stats Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-text-primary font-medium">
                      <ActivityIcon className="w-3.5 h-3.5 text-accent-green" />
                      <span>
                        {totalContributions !== null
                          ? `${totalContributions} public contributions`
                          : 'Live Contribution Calendar'}
                      </span>
                      <span className="text-text-tertiary">in the last year</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-accent-green-dark dark:text-accent-green font-medium">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      <span>Live Data</span>
                    </div>
                  </div>

                  {/* Contribution Heatmap Container */}
                  <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-subtle overflow-x-auto scrollbar-thin">
                    <div className="min-w-[620px]">
                      {/* Months Row */}
                      <div className="flex text-[10px] font-mono text-text-tertiary mb-1.5 pl-6">
                        {monthLabels.map((m, i) => (
                          <span
                            key={i}
                            style={{
                              marginLeft:
                                i === 0
                                  ? `${m.index * 11}px`
                                  : `${Math.max(
                                      0,
                                      (m.index - (monthLabels[i - 1]?.index || 0)) * 11 - 24
                                    )}px`
                            }}
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>

                      {/* Heatmap Grid */}
                      <div className="flex gap-1 items-start">
                        {/* Day of Week Labels */}
                        <div className="flex flex-col gap-1 text-[9px] font-mono text-text-tertiary pr-1.5 pt-0.5 select-none">
                          <span className="h-2.5 leading-[10px]">Mon</span>
                          <span className="h-2.5 leading-[10px] opacity-0">Tue</span>
                          <span className="h-2.5 leading-[10px]">Wed</span>
                          <span className="h-2.5 leading-[10px] opacity-0">Thu</span>
                          <span className="h-2.5 leading-[10px]">Fri</span>
                          <span className="h-2.5 leading-[10px] opacity-0">Sat</span>
                          <span className="h-2.5 leading-[10px] opacity-0">Sun</span>
                        </div>

                        {/* Weeks Columns */}
                        <div className="flex gap-[3px] flex-1">
                          {weeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-[3px]">
                              {week.map((day) => (
                                <div
                                  key={day.date}
                                  onMouseEnter={() =>
                                    setHoveredDay({ date: day.date, count: day.count })
                                  }
                                  onMouseLeave={() => setHoveredDay(null)}
                                  className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-100 cursor-pointer ${getCellColor(
                                    day.level
                                  )}`}
                                  title={`${day.count} contribution${
                                    day.count === 1 ? '' : 's'
                                  } on ${day.date}`}
                                  aria-label={`${day.count} contributions on ${day.date}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hover Info & Legend */}
                      <div className="mt-3 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-[11px] font-mono text-text-tertiary">
                        <div className="min-h-[16px]">
                          {hoveredDay ? (
                            <span className="text-text-primary font-medium">
                              {hoveredDay.count} contribution
                              {hoveredDay.count === 1 ? '' : 's'} on {formatDate(hoveredDay.date)}
                            </span>
                          ) : (
                            <span>Hover over squares for details</span>
                          )}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-1.5 select-none">
                          <span className="text-[10px]">Less</span>
                          <span className="w-2 h-2 rounded-[2px] bg-surface-secondary/70 border border-border-subtle/50" />
                          <span className="w-2 h-2 rounded-[2px] bg-accent-green/30 border border-accent-green/40" />
                          <span className="w-2 h-2 rounded-[2px] bg-accent-green/55 border border-accent-green/65" />
                          <span className="w-2 h-2 rounded-[2px] bg-accent-green/80 border border-accent-green/90" />
                          <span className="w-2 h-2 rounded-[2px] bg-accent-green border border-accent-green" />
                          <span className="text-[10px]">More</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link Strip */}
                  <div className="pt-2 flex items-center justify-between text-xs text-text-secondary">
                    <span className="font-mono text-[11px] text-text-tertiary">
                      Profile: @bakibillah227
                    </span>
                    <a
                      href="https://github.com/bakibillah227"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-green-dark dark:text-accent-green hover:underline font-mono text-[11px]"
                    >
                      <span>Explore repositories on GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Column 2: Dynamic LeetCode & Problem Solving - 6 Cols */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="bg-surface-card border-border-subtle hover:border-border-strong transition-all duration-200 p-6 space-y-5 h-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-surface-secondary text-accent-orange border border-border-subtle shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">
                      LeetCode & Problem Solving
                    </h3>
                    <span className="text-xs font-mono text-text-tertiary block">
                      Handle: @nexorithm
                    </span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  href="https://leetcode.com/u/nexorithm/"
                  isExternal
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  View Profile
                </Button>
              </div>

              {/* Dynamic Content / Skeleton / Fallback */}
              {leetcodeLoading ? (
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 bg-surface-secondary rounded animate-pulse" />
                    <div className="h-4 w-16 bg-surface-secondary rounded animate-pulse" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 bg-surface-secondary/60 rounded-lg animate-pulse" />
                    <div className="h-16 bg-surface-secondary/60 rounded-lg animate-pulse" />
                    <div className="h-16 bg-surface-secondary/60 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-20 bg-surface-secondary/40 rounded-lg animate-pulse" />
                </div>
              ) : leetcodeError || !leetcodeData ? (
                /* Fallback State */
                <div className="p-5 rounded-xl bg-surface-secondary/40 border border-border-subtle text-center space-y-3">
                  <div className="w-9 h-9 rounded-full bg-surface-secondary border border-border-subtle mx-auto flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-accent-orange" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-primary">
                      LeetCode activity is temporarily unavailable.
                    </h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed max-w-xs mx-auto">
                      Explore solved algorithmic problems, topics, and contest submissions directly on LeetCode.
                    </p>
                  </div>
                  <div className="pt-1">
                    <Button
                      variant="primary"
                      size="sm"
                      href="https://leetcode.com/u/nexorithm/"
                      isExternal
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                      className="justify-center text-xs"
                    >
                      View LeetCode Profile
                    </Button>
                  </div>
                </div>
              ) : (
                /* Real Dynamic LeetCode Activity Details */
                <div className="space-y-4">
                  {/* Solved Problems Distribution Header */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-text-primary font-medium">
                      <Cpu className="w-3.5 h-3.5 text-accent-orange" />
                      <span>{totalSolved} Problems Solved</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-accent-green-dark dark:text-accent-green font-medium">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      <span>Live Data</span>
                    </div>
                  </div>

                  {/* Difficulty Breakdown Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Easy */}
                    <div className="p-3 rounded-lg bg-surface-secondary/60 border border-border-subtle text-center space-y-0.5">
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                        Easy
                      </span>
                      <span className="text-base font-bold text-text-primary">
                        {easySolved ?? 0}
                      </span>
                    </div>

                    {/* Medium */}
                    <div className="p-3 rounded-lg bg-surface-secondary/60 border border-border-subtle text-center space-y-0.5">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold block uppercase">
                        Medium
                      </span>
                      <span className="text-base font-bold text-text-primary">
                        {mediumSolved ?? 0}
                      </span>
                    </div>

                    {/* Hard */}
                    <div className="p-3 rounded-lg bg-surface-secondary/60 border border-border-subtle text-center space-y-0.5">
                      <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold block uppercase">
                        Hard
                      </span>
                      <span className="text-base font-bold text-text-primary">
                        {hardSolved ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Recent Activity / Submission if available */}
                  {recentSubmissions && recentSubmissions.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-surface-secondary/50 border border-border-subtle space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-text-tertiary">
                        <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                          <Clock className="w-3 h-3 text-accent-green" />
                          Recent Problem
                        </span>
                        <span>{formatTimestamp(recentSubmissions[0].timestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-text-primary truncate">
                          {recentSubmissions[0].title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                            {recentSubmissions[0].statusDisplay}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-card border border-border-subtle text-text-secondary uppercase">
                            {recentSubmissions[0].lang}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Focus Topics */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary block">
                      Core Problem Domains:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Arrays & Hashing',
                        'Two Pointers',
                        'Binary Search',
                        'Trees & BST',
                        'Dynamic Programming',
                        'Linked Lists'
                      ].map((topic) => (
                        <span
                          key={topic}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-secondary text-text-secondary border border-border-subtle"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
