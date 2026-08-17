import { Experience } from '../types';

/**
 * Professional Experience data.
 * Structured to represent verified roles accurately and honestly,
 * while allowing future software engineering positions to be seamlessly appended.
 */
export const experienceData: Experience[] = [
  {
    id: 'exp-beup-tech',
    role: 'Foreign Communication Executive',
    company: 'BeUp Tech Agency',
    location: 'Dhaka, Bangladesh',
    category: 'professional',
    type: 'Full-time',
    period: {
      startDate: 'August 2025',
      endDate: 'June 2026'
    },
    summary:
      'Facilitated cross-border business communications, managed client interactions, and coordinated multi-stakeholder technical project requirements across global platforms.',
    responsibilities: [
      'Communicated with international clients to gather requirements, clarify expectations, and ensure clear alignment',
      'Managed ongoing client relationships, providing structured updates on deliverables and milestones',
      'Coordinated project discussions between global stakeholders and cross-functional teams',
      'Assisted business communication, correspondence, and documentation across international platforms'
    ],
    transferableSkills: [
      'International Communication',
      'Client Collaboration',
      'Project Coordination',
      'Cross-Cultural Communication',
      'Professional Workflow & Documentation'
    ]
  }
];
