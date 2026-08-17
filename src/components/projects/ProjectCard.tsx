import React from 'react';
import {
  ExternalLink,
  Github,
  Check,
  Globe,
  Layers,
  Plus,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectCardProps {
  project: Project;
  layoutVariant?: 'horizontal' | 'standard';
  index: number;
  expanded: boolean;
  onExpand: () => void;
  onToggle: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  expanded,
  onExpand,
  onToggle
}) => {
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');

  return (
    <article
      className="group relative bg-surface-card border border-border-subtle hover:border-border-strong rounded-2xl p-6 sm:p-8 transition-all duration-300 ease-out shadow-xs hover:shadow-md hover:-translate-y-1 sm:hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none overflow-hidden"
      aria-expanded={expanded}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Toggle "+" icon on top-right of the card */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={expanded ? `Collapse ${project.title} details` : `Open ${project.title} details`}
        title={expanded ? 'Collapse details' : 'Open details'}
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-surface-secondary/90 border border-border-subtle text-text-primary opacity-90 hover:opacity-100 hover:bg-text-primary hover:text-surface-primary hover:border-text-primary shadow-xs transition-all duration-300 group-hover:border-border-strong cursor-pointer"
      >
        {expanded ? (
          <X className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        )}
      </button>

      {/* Collapsed Title Row - hovering or clicking the title opens the card */}
      <div
        className="flex items-center justify-between gap-4 pr-12"
        onMouseEnter={onExpand}
        onClick={onToggle}
      >
        <div className="min-w-0">
          <h3
            id={`project-title-${project.id}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-green-dark dark:group-hover:text-accent-green transition-colors duration-200 cursor-pointer"
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Expandable Project Details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* Left Column: Project Details & Actions - 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header metadata row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={project.category.includes('Educational') ? 'green' : 'orange'} size="sm">
                    {project.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-text-tertiary">
                    {project.date}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-accent-green-dark dark:text-accent-green flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse motion-reduce:animate-none" />
                  {project.status}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-medium text-text-secondary">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Key Technical Features List */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-2 pt-1">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary">
                    Key Technical Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom stack & links */}
            <div className="space-y-4 pt-4 border-t border-border-subtle group-hover:border-border-strong/60 transition-colors">
              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-surface-secondary text-text-primary border border-border-subtle group-hover:border-border-strong/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {liveLink && (
                  <Button
                    variant="primary"
                    size="sm"
                    href={liveLink.url}
                    isExternal
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    className="font-medium shadow-2xs hover:shadow-xs"
                  >
                    Live Application
                  </Button>
                )}

                {githubLink && (
                  <Button
                    variant="secondary"
                    size="sm"
                    href={githubLink.url}
                    isExternal
                    icon={<Github className="w-3.5 h-3.5" />}
                    iconPosition="left"
                    className="font-medium"
                  >
                    Source Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Project Preview Showcase - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="group/preview relative rounded-xl sm:rounded-2xl bg-surface-secondary/60 border border-border-subtle group-hover:border-border-strong/80 group-hover:bg-surface-secondary/80 transition-all duration-300 overflow-hidden flex flex-col shadow-2xs">
              {/* Browser window top bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface-secondary/90 border-b border-border-subtle group-hover:border-border-strong/60 transition-colors shrink-0">
                {/* Window dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 dark:bg-emerald-500/70" />
                </div>

                {/* URL pill */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-text-tertiary px-2 py-0.5 rounded-md bg-surface-card border border-border-subtle max-w-[180px] sm:max-w-[220px] truncate">
                  <Globe className="w-2.5 h-2.5 text-accent-green shrink-0" />
                  <span className="truncate">
                    {liveLink?.url.replace(/^https?:\/\//, '') || `${project.id}.github.io`}
                  </span>
                </div>
              </div>

              {/* Interactive Image Preview Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full bg-surface-primary/50 overflow-hidden">
                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={project.imageAlt || `${project.title} interface preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-all duration-300 ease-out opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  /* Fallback architectural view if image is absent */
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-surface-secondary/40">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                        <Layers className="w-3.5 h-3.5 text-accent-green" />
                        <span>Architecture & Implementation</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {project.architectureNotes ||
                          'Engineered with clean separation of concerns, modular functions, and responsive UI components.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Subtle hover gradient indicator at bottom of image */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </div>

              {/* Sub-preview status footer */}
              <div className="px-3.5 py-2 border-t border-border-subtle group-hover:border-border-strong/60 transition-colors flex items-center justify-between text-[11px] font-mono text-text-tertiary bg-surface-secondary/40">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  <span className="truncate">{project.category.replace(' Web Application', '')}</span>
                </span>
                <span className="text-accent-green-dark dark:text-accent-green font-medium shrink-0">
                  Interactive Preview
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </article>
  );
};