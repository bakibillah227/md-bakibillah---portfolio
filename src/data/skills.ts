import { SkillCategoryGroup } from '../types';

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages for systems, algorithms, and web execution.',
    skills: [
      { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Core / Production', highlighted: true },
      { name: 'C++', category: 'fundamentals', level: 'Proficient', highlighted: true },
      { name: 'C', category: 'fundamentals', level: 'Proficient' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and high-performance user interfaces.',
    skills: [
      { name: 'React', category: 'frontend', level: 'Core / Production', highlighted: true },
      { name: 'Next.js', category: 'frontend', level: 'Proficient', highlighted: true },
      { name: 'Tailwind CSS', category: 'frontend', level: 'Core / Production', highlighted: true },
      { name: 'HTML5', category: 'frontend', level: 'Core / Production' },
      { name: 'CSS3', category: 'frontend', level: 'Core / Production' }
    ]
  },
  {
    id: 'backend-database',
    title: 'Backend & Database',
    description: 'Server architecture, RESTful endpoints, and persistent data storage.',
    skills: [
      { name: 'Node.js', category: 'backend', level: 'Core / Production', highlighted: true },
      { name: 'Express.js', category: 'backend', level: 'Core / Production', highlighted: true },
      { name: 'MongoDB', category: 'database', level: 'Core / Production', highlighted: true },
      { name: 'Firebase', category: 'database', level: 'Proficient', highlighted: true }
    ]
  },
  {
    id: 'tools',
    title: 'Development Tools & Workflow',
    description: 'Version control and professional developer environments.',
    skills: [
      { name: 'Git', category: 'ai-cloud-tools', level: 'Core / Production', highlighted: true },
      { name: 'GitHub', category: 'ai-cloud-tools', level: 'Core / Production', highlighted: true },
      { name: 'VS Code', category: 'ai-cloud-tools', level: 'Core / Production' }
    ]
  }
];
