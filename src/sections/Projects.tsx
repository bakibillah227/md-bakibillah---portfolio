import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories = ['All', 'Educational Web Application', 'Productivity Web Application'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedFilter);

  const handleExpand = (id: string) => setExpandedProjectId(id);
  const handleToggle = (id: string) =>
    setExpandedProjectId((prev) => (prev === id ? null : id));

  return (
    <section id="projects" className="py-14 sm:py-16 lg:py-20 scroll-mt-20 border-t border-border-subtle/60" aria-label="Selected Projects">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            title="Selected Engineering Projects"
            subtitle="Verified web applications showcasing responsive interface development, state management, API integration, and clean JavaScript architecture."
            className="mb-0"
          />

          {/* Optional Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-secondary/80 border border-border-subtle rounded-lg self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-surface-card text-text-primary shadow-xs font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat.replace(' Web Application', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <Reveal className="space-y-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              expanded={expandedProjectId === project.id}
              onExpand={() => handleExpand(project.id)}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </Reveal>

        {/* GitHub Repositories Footer Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-surface-secondary/40 border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-text-primary">
              Explore More Repositories & Experiments
            </h4>
            <p className="text-xs text-text-secondary">
              Review codebases, problem-solving repositories, and open source contributions on GitHub.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            href="https://github.com/bakibillah227"
            isExternal
            icon={<Github className="w-4 h-4" />}
            className="shrink-0"
          >
            Visit GitHub Profile
          </Button>
        </div>
      </Container>
    </section>
  );
};
