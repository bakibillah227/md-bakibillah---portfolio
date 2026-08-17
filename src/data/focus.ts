import { CurrentFocusData } from '../types';

/**
 * Current Technical Focus.
 * Clearly separates immediate active learning, ongoing software builds, and forward-looking engineering goals.
 */
export const currentFocusData: CurrentFocusData = {
  learning: [
    'Data Structures & Algorithms (Trees, Graphs, Dynamic Programming, Complexity Analysis)',
    'Next.js & Server Components Architecture (App Router, Server-Side Rendering)',
    'System Design Fundamentals (Scalability, Caching, Load Balancing, Microservices)',
    'Advanced Backend Engineering (REST Best Practices, Async Queues, Authentication Security)'
  ],
  building: [
    {
      name: 'Job Tracker',
      description: 'Streamlined job application workflow tracker with real-time counters and multi-status filtering.',
      status: 'Maintained'
    },
    {
      name: 'Personal Engineering Portfolio',
      description: 'Production portfolio built with React, TypeScript, and Tailwind CSS adhering to strict craftsmanship principles.',
      status: 'In Active Development'
    },
    {
      name: 'MERN Stack Projects',
      description: 'Full-stack applications exploring authentication, MongoDB data schemas, and RESTful service contracts.',
      status: 'Iterating'
    }
  ],
  goals: [
    {
      goal: 'Secure a Software Engineering Role',
      timeline: 'Near-Term Focus'
    },
    {
      goal: 'Solve LeetCode & Competitive Programming Problems',
      timeline: 'Ongoing Practice'
    },
    {
      goal: 'Contribute Actively to High-Impact Open Source Repositories',
      timeline: 'Continuous Goal'
    },
    {
      goal: 'Build & Deploy Scalable AI-Powered Full-Stack Applications',
      timeline: 'Forward Target'
    }
  ]
};
