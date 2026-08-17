import { PersonalInfo, NavItem } from '../types';
import profileImg from '../assets/profile.png';
import profileIcon from '../assets/profile_icon.jpg';

export const personalData: PersonalInfo = {
  name: 'Md Bakibillah',
  title: 'Software Engineer · Full-Stack MERN Developer',
  headline: 'Building scalable, reliable, user-focused web applications using modern JavaScript technologies, with a growing focus on backend engineering, system design, and AI-powered products.',
  avatarUrl: profileImg,
  profileIconUrl: profileIcon,
  bio: [
    'I am a Software Engineer passionate about building scalable, high-quality web applications with the MERN Stack.',
    'I have practical experience with backend development, RESTful API design, authentication, database architecture, and clean software engineering practices.',
    'I enjoy transforming ideas into reliable digital products through modern technologies, maintainable code, and user-focused design.'
  ],
  location: {
    city: 'Dhaka',
    country: 'Bangladesh',
    remoteAvailable: true,
    timezone: 'UTC+6'
  },
  availabilityStatus: {
    isAvailable: true,
    statusText: 'Available for full-time & remote software engineering roles',
    targetRoles: [
      'Full-Stack Software Engineer',
      'Backend Developer (Node.js / Express)',
      'Frontend / React Engineer',
      'MERN Stack Developer'
    ]
  },
  contact: {
    email: 'bakibillah227@gmail.com',
    socials: [
      {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/bakibillah227',
        iconName: 'github',
        ariaLabel: 'View GitHub Profile'
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/md-bakibillah-6943a227a/',
        iconName: 'linkedin',
        ariaLabel: 'Connect on LinkedIn'
      },
      {
        id: 'leetcode',
        name: 'LeetCode',
        url: 'https://leetcode.com/u/nexorithm/',
        iconName: 'code',
        ariaLabel: 'View LeetCode Profile'
      },
      {
        id: 'mail',
        name: 'Email',
        url: 'mailto:bakibillah227@gmail.com',
        iconName: 'mail',
        ariaLabel: 'Send an Email'
      }
    ],
    resumeUrl: 'https://drive.google.com/file/d/1eRHZQKgaMkmOTQlqdU4AxfOXo1qodvFy/view?usp=sharing'
  },
  focusAreas: [
    'Backend engineering',
    'System design',
    'Cloud technologies',
    'AI-powered applications',
    'Data Structures & Algorithms'
  ]
};

export const navigationItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'capabilities', label: 'Capabilities', href: '#capabilities' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'activity', label: 'Coding Activity', href: '#activity' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
