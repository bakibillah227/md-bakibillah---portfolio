import { EngineeringCapability } from '../types';

/**
 * Engineering Capabilities & Technical Competencies.
 * Evidence-based breakdown of practical software engineering skills.
 */
export const capabilitiesData: EngineeringCapability[] = [
  {
    id: 'cap-fullstack',
    title: 'Full-Stack Web Development',
    description:
      'Designing and building end-to-end web applications with clean separation between client layers and server logic.',
    evidence: [
      'Engineered responsive web applications combining client-side rendering with structured backend APIs',
      'Implemented asynchronous data synchronization and state management for interactive interfaces',
      'Applied modular component architecture for maintainable and scalable codebases'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript ES6+', 'Tailwind CSS']
  },
  {
    id: 'cap-backend',
    title: 'Backend & REST APIs',
    description:
      'Architecting resilient server-side services, robust routing, and secure request/response lifecycles.',
    evidence: [
      'Designed RESTful API endpoints adhering to standard HTTP methods and status code conventions',
      'Implemented middleware patterns for request validation, error logging, and security headers',
      'Structured controllers and service layers to decouple business logic from transport protocols'
    ],
    technologies: ['Node.js', 'Express.js', 'REST Architecture', 'Middleware', 'JSON Web Tokens']
  },
  {
    id: 'cap-database',
    title: 'Database Architecture',
    description:
      'Schema modeling, document normalization, and efficient data access patterns.',
    evidence: [
      'Designed MongoDB document schemas with relationships, field validations, and indexing strategies',
      'Integrated Firebase real-time data services and authentication pipelines',
      'Ensured atomic operations and data consistency across application workflows'
    ],
    technologies: ['MongoDB', 'Mongoose ODM', 'Firebase', 'Data Modeling', 'Query Optimization']
  },
  {
    id: 'cap-frontend',
    title: 'Modern Frontend Development',
    description:
      'Building performant, accessible, and responsive user interfaces with modern CSS and reactive frameworks.',
    evidence: [
      'Built reactive UI components utilizing React hooks, custom context, and strict prop typing',
      'Implemented responsive design systems with Tailwind CSS and CSS Grid/Flexbox',
      'Integrated native browser APIs including Web Speech Synthesis and dynamic DOM query engines'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'DaisyUI', 'HTML5', 'CSS3', 'Web APIs']
  },
  {
    id: 'cap-problemsolving',
    title: 'Problem Solving & Algorithms',
    description:
      'Applying core computer science concepts, algorithmic reasoning, and data structure selection.',
    evidence: [
      'Active practice in Data Structures & Algorithms with C++ and JavaScript',
      'Participation in national-level competitive programming contests',
      'Systematic approach to time complexity (Big-O) and space optimization'
    ],
    technologies: ['C++', 'C', 'Data Structures', 'Algorithms', 'Big-O Analysis', 'Competitive Programming']
  },
  {
    id: 'cap-practices',
    title: 'Software Engineering Practices',
    description:
      'Adhering to professional workflow standards, version control discipline, and code hygiene.',
    evidence: [
      'Consistent Git branching workflows, descriptive commit conventions, and repository documentation',
      'Clean Code principles: DRY, single responsibility, and self-documenting naming conventions',
      'Automated type-checking and linting integration for code quality assurance'
    ],
    technologies: ['Git', 'GitHub', 'Clean Code', 'TypeScript', 'VS Code', 'Agile Principles']
  }
];
