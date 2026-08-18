import { VerifiedAchievement } from '../types';

/**
 * Verified Achievements & Recognitions.
 * Presented with strict accuracy and zero exaggeration.
 */
export const verifiedAchievements: VerifiedAchievement[] = [
  {
    id: 'ach-deans-list',
    title: "Dean's List",
    context: 'Northern University Bangladesh',
    detail: 'Recognized on the academic Dean’s List for outstanding scholastic achievement and continuous high performance in computer science studies.',
    summary: 'Academic recognition for consistent performance.',
    category: 'Academic Recognition',
    badge: "Dean's Honor"
  },
  {
    id: 'ach-npc',
    title: 'National Programming Contest',
    context: 'Competitive Programming Participant',
    detail: 'Competed in national-level algorithmic problem-solving contests, applying C++ data structures, sorting algorithms, and mathematical logic under competitive time constraints.',
    summary: 'Participant.',
    category: 'Competition',
    badge: 'National Contestant'
  },
  {
    id: 'ach-opensource',
    title: 'Open Source',
    context: 'GitHub Ecosystem',
    detail: 'Active contributor on GitHub, maintaining open codebases, participating in software community discussions, and adhering to modular open source development standards.',
    summary: 'Active contributor.',
    category: 'Open Source',
    badge: 'Active Contributor'
  },
  {
    id: 'ach-production-exposure',
    title: 'Production Application Contribution',
    context: 'MERN Stack Developer',
    detail: 'Contributed to production web applications serving 10,000+ active users, gaining direct exposure to real-world performance, error monitoring, and traffic reliability.',
    summary: 'Shipped code to production apps serving 10K+ users.',
    category: 'Production Exposure',
    badge: '10K+ Users Impact'
  },
  {
    id: 'ach-academic-excellence',
    title: 'Academic Excellence',
    context: 'B.Sc. in Computer Science & Engineering',
    detail: 'Maintaining a 3.80+ cumulative CGPA across core computer science coursework including Data Structures, Algorithms, OOP, and Database Systems.',
    summary: '3.80+ CGPA across core CS coursework.',
    category: 'Academic Recognition',
    badge: '3.80+ CGPA'
  }
];