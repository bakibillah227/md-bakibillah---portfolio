/**
 * Core type definitions for Md Bakibillah's Engineering Portfolio.
 * Designed for strict maintainability, scalability, and type safety.
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'twitter' | 'mail' | 'file-text' | 'globe' | 'code';
  ariaLabel: string;
}

export interface PersonalInfo {
  name: string;
  preferredName?: string;
  title: string;
  headline: string;
  bio: string[];
  avatarUrl?: string;
  profileIconUrl?: string;
  location: {
    city: string;
    country: string;
    remoteAvailable: boolean;
    timezone: string;
  };
  availabilityStatus: {
    isAvailable: boolean;
    statusText: string;
    targetRoles: string[];
  };
  contact: {
    email: string;
    socials: SocialLink[];
    resumeUrl?: string;
  };
  focusAreas: string[];
}

export type ProjectCategory =
  | 'Educational Web Application'
  | 'Productivity Web Application'
  | 'Full-Stack'
  | 'Backend'
  | 'AI & Machine Learning'
  | 'Open Source'
  | 'System Architecture';

export interface ProjectLink {
  type: 'github' | 'live' | 'demo' | 'case-study';
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory | string;
  featured: boolean;
  technologies: string[];
  features: string[];
  highlights?: string[];
  architectureNotes?: string;
  links: ProjectLink[];
  date: string;
  status: 'Completed' | 'Active Development' | 'Maintained';
  previewImage?: string;
  imageAlt?: string;
}

export type SkillProficiency = 'Core / Production' | 'Proficient' | 'Exploring / Intermediate';

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai-cloud-tools' | 'fundamentals';
  level?: SkillProficiency;
  icon?: string;
  highlighted?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  category: 'professional' | 'engineering';
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'On-site';
  period: {
    startDate: string;
    endDate: string | 'Present';
  };
  summary: string;
  responsibilities: string[];
  transferableSkills?: string[];
  techStack?: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: {
    startYear: string;
    expectedGraduation: string;
  };
  academicStanding?: string;
  summary?: string;
  relevantCoursework?: string[];
  honors?: string[];
}

export interface EngineeringCapability {
  id: string;
  title: string;
  description: string;
  evidence: string[];
  technologies: string[];
}

export interface CurrentFocusData {
  learning: string[];
  building: {
    name: string;
    description: string;
    status: 'In Active Development' | 'Maintained' | 'Iterating';
  }[];
  goals: {
    goal: string;
    timeline: string;
  }[];
}

export interface VerifiedAchievement {
  id: string;
  title: string;
  context: string;
  detail: string;
  category: 'Competition' | 'Open Source' | 'Production Exposure' | 'Academic Recognition';
  badge: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string; // e.g. '#about', '#projects'
}
