// Skill groups shown in the Skills section — Leo's working tech stack.
import type { SkillGroup } from '../types/portfolio'

export const skillGroups = [
  {
    title: 'Frontend & Mobile',
    blurb: 'Building responsive web interfaces and cross-platform mobile apps.',
    skills: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'React Native'],
  },
  {
    title: 'Backend',
    blurb: 'Server-side logic and APIs with modern frameworks and runtimes.',
    skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'REST APIs'],
  },
  {
    title: 'Databases',
    blurb: 'Modeling and querying both relational and NoSQL data stores.',
    skills: ['MySQL', 'MariaDB', 'MongoDB', 'Firebase'],
  },
  {
    title: 'Tools & Workflow',
    blurb: 'The version control, editor, and AI-assisted tooling I build with.',
    skills: ['Git', 'GitHub', 'VS Code', 'Codex', 'Claude Code'],
  },
] satisfies readonly SkillGroup[]
