import type { Profile } from '../types/portfolio'

// Single source of truth for identity + links, shared across the site.
export const profile = {
  name: 'Leo B. Gannad',
  fullName: 'Leo Bucasas Gannad',
  role: 'Web & Mobile Developer',
  education: '4th Year BS Information Technology',
  location: 'Tuguegarao City, Philippines',
  imageUrl: '/cat.jpg',
  email: 'leo.b.gannad@isu.edu.ph',
  linkedInUrl: 'https://www.linkedin.com/in/leo-gannad-a66a48410',
  githubUrl: 'https://github.com/CoffeeDev-Err',
  resumeUrl: '/Leo-Gannad-Resume.pdf',
} satisfies Profile

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`
