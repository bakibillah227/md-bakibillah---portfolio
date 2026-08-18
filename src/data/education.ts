import { Education } from '../types';

export const educationData: Education[] = [
  {
    id: 'edu-nub-cse',
    degree: 'Bachelor of Science (B.Sc.)',
    field: 'Computer Science & Engineering',
    institution: 'Northern University Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: {
      startYear: '2024',
      expectedGraduation: '2028'
    },
    academicStanding: '3.80+ CGPA',
    summary:
      'Pursuing a Bachelor of Science in Computer Science & Engineering with strong academic standing, building a rigorous foundation in software development, algorithms, and database systems.',
    honors: [
      "Dean's List (Recognized for Academic Performance)",
      'Academic Excellence Award'
    ],
    relevantCoursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (C++ / Java)',
      'Database Management Systems',
      'Discrete Mathematics & Algorithms',
      'Computer Fundamentals & Programming in C'
    ]
  }
];
