import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { SectionHeading } from '../components/common/SectionHeading';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-14 sm:py-16 lg:py-20 scroll-mt-20 border-t border-border-subtle/60" aria-label="Experience and Education">
      <Container size="lg">
        <SectionHeading
          title="Experience & Education"
          subtitle="Professional background, transferable communication skills, and academic computer science foundation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Professional Experience Column: 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent-green" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  Professional Experience
                </h3>
              </div>
              <span className="text-[11px] font-mono text-text-tertiary">
                Verified Career History
              </span>
            </div>

            {/* Timeline container */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-2.5 before:top-2.5 before:bottom-2.5 before:w-px before:bg-border-strong/70">
              {experienceData.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-surface-card border-2 border-accent-green flex items-center justify-center -translate-x-[3px] shadow-xs group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  </div>

                  <Card className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-200 p-5 sm:p-6 space-y-4 motion-reduce:transform-none">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <Badge variant="neutral" size="sm">
                          {exp.type}
                        </Badge>
                        <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period.startDate} — {exp.period.endDate}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-green-dark dark:group-hover:text-accent-green transition-colors">
                        {exp.role}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-accent-green-dark dark:text-accent-green mt-0.5">
                        <span className="font-semibold">{exp.company}</span>
                        <span className="text-text-tertiary">·</span>
                        <span className="text-text-tertiary flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    {/* Responsibilities list */}
                    <div className="space-y-2 pt-1">
                      <h5 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary">
                        Key Responsibilities & Deliverables
                      </h5>
                      <ul className="space-y-1.5 text-xs text-text-secondary">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Transferable Skills */}
                    {exp.transferableSkills && (
                      <div className="pt-3 border-t border-border-subtle">
                        <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block mb-2">
                          Transferable Engineering & Workflow Skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.transferableSkills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-secondary text-text-primary border border-border-subtle"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Foundation Column: 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent-orange" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  Academic Foundation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-text-tertiary">
                Undergraduate Studies
              </span>
            </div>

            {educationData.map((edu) => (
              <Card
                key={edu.id}
                className="bg-surface-card border-border-subtle hover:border-border-strong hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-200 p-5 sm:p-6 space-y-4 motion-reduce:transform-none group"
              >
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <Badge variant="orange" size="sm">
                      {edu.academicStanding}
                    </Badge>
                    <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period.startYear} — Expected {edu.period.expectedGraduation}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-orange transition-colors">
                    {edu.degree}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-accent-orange-dark dark:text-accent-orange mt-0.5">
                    <span className="font-semibold">{edu.field}</span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-text-tertiary flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {edu.institution}, {edu.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                {edu.summary && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                    {edu.summary}
                  </p>
                )}

                {/* Academic Recognition */}
                {edu.honors && edu.honors.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h5 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary">
                      Key Academic Achievements & Recognition
                    </h5>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {edu.honors.map((honor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-orange shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Core Computer Science Topics */}
                {edu.relevantCoursework && (
                  <div className="pt-3 border-t border-border-subtle">
                    <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block mb-2">
                      Core Computer Science Topics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCoursework.map((course) => (
                        <span
                          key={course}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-secondary text-text-primary border border-border-subtle"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
