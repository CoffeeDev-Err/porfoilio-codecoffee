export const clientProjects = [
  {
    id: 'pos-system-firebase',
    title: 'POS System',
    type: 'Web Application',
    description: 'A responsive point-of-sale system for managing products, sales transactions, and live data in a streamlined cashier workflow.',
    technologies: ['JavaScript', 'Firebase', 'React'],
  },
  {
    id: 'pos-system-laravel',
    title: 'POS System — Laravel Edition',
    type: 'Full-Stack Web Application',
    description: 'A full-stack POS application with inventory, transaction records, and a React interface backed by Laravel and MariaDB.',
    technologies: ['PHP', 'Laravel', 'React', 'MariaDB'],
  },
  {
    id: 'ticketing-app',
    title: 'Ticketing App',
    type: 'Mobile Application',
    description: 'A mobile ticketing workflow with local SQLite storage and REST API integration for issuing, recording, and managing tickets.',
    technologies: ['React Native', 'SQLite', 'REST API'],
  },
  {
    id: 'geosentri',
    title: 'GeoSentri — Police Operational Tracking and Monitoring System',
    type: 'Web & Mobile Platform',
    description: 'A web and mobile platform for real-time GPS tracking, map-based monitoring, and location-data integration to support police operational visibility and coordination.',
    technologyGroups: [
      { label: 'Frontend', items: ['React', 'React Native', 'MapLibre'] },
      { label: 'Backend', items: ['Node.js', 'Express.js'] },
      { label: 'Database', items: ['MongoDB'] },
      { label: 'IoT / Tracking', items: ['Flespi'] },
    ],
  },
]

export const academicProjects = [
  {
    id: 'academic-projects-coming-soon',
    title: 'More academic projects',
    type: 'Academic Projects',
    description: 'Selected school projects, screenshots, technical details, and source references are being prepared for this portfolio.',
    technologies: ['Case Studies', 'Screenshots', 'Source Code'],
    comingSoon: true,
  },
]
