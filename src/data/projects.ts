import { Project } from '../types';
import englishJanalaPreview from '../assets/projects/english-janala.svg';
import jobTrackerPreview from '../assets/projects/job-tracker.svg';

/**
 * Verified Projects dataset.
 * Structured for easy future extension: Adding new projects only requires appending an object here.
 * Screenshots can be replaced by placing new images in /src/assets/projects/ and updating imports.
 */
export const projectsData: Project[] = [
  {
    id: 'english-janala',
    title: 'English Janala',
    tagline: 'Modern vocabulary learning platform with speech synthesis and dynamic lessons.',
    description:
      'An educational web platform built to help language learners acquire and retain vocabulary through structured lesson modules, instant search indexing, and real-time audio pronunciation.',
    category: 'Educational Web Application',
    featured: true,
    technologies: ['HTML', 'Tailwind CSS', 'DaisyUI', 'JavaScript ES6/ES7'],
    previewImage: englishJanalaPreview,
    imageAlt: 'English Janala vocabulary learning platform interface with speech synthesis and lesson cards',
    features: [
      'Lesson-based vocabulary learning with structured difficulty modules',
      'Smart real-time word search and dynamic content filtering',
      'Native speech pronunciation using the Web Speech Synthesis API',
      'Fully responsive UI optimized for mobile and desktop screens',
      'Dynamic asynchronous content loading without page reloads'
    ],
    architectureNotes:
      'Modular client-side architecture incorporating Web Speech API for native browser audio synthesis alongside reactive DOM rendering routines.',
    links: [
      {
        type: 'live',
        label: 'Live Application',
        url: 'https://bakibillah227.github.io/english-janala/'
      },
      {
        type: 'github',
        label: 'GitHub Repository',
        url: 'https://github.com/bakibillah227/english-janala'
      }
    ],
    date: '2024',
    status: 'Completed'
  },
  {
    id: 'job-tracker',
    title: 'Job Tracker',
    tagline: 'Responsive job application management and workflow monitoring tool.',
    description:
      'A streamlined productivity web application enabling candidates to track their job search pipeline, manage submissions, filter applications by status, and monitor live metrics in real time.',
    category: 'Productivity Web Application',
    featured: true,
    technologies: ['HTML', 'Tailwind CSS', 'DaisyUI', 'JavaScript'],
    previewImage: jobTrackerPreview,
    imageAlt: 'Job Tracker application dashboard and pipeline management interface with status filters',
    features: [
      'Multi-criteria job application filtering by status and role',
      'Application lifecycle management with delete and status update actions',
      'Real-time application counters and pipeline statistics',
      'Clean, accessible responsive design tailored for fast daily entry'
    ],
    architectureNotes:
      'Event-driven DOM architecture with centralized state operations for record deletion, dynamic filter evaluation, and reactive metrics recalculation.',
    links: [
      {
        type: 'live',
        label: 'Live Application',
        url: 'https://bakibillah227.github.io/Assignment-04-B-13/'
      },
      {
        type: 'github',
        label: 'GitHub Repository',
        url: 'https://github.com/bakibillah227/Assignment-04-B-13'
      }
    ],
    date: '2024',
    status: 'Completed'
  }
];
