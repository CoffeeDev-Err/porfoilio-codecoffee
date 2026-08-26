export type Theme = 'light' | 'dark'

export interface Profile {
  name: string
  fullName: string
  role: string
  education: string
  location: string
  imageUrl: string
  email: string
  linkedInUrl: string
  githubUrl: string
  resumeUrl: string
}

export interface NavigationLink {
  label: string
  href: `#${string}`
}

export interface TechnologyGroup {
  label: string
  items: readonly string[]
}

export interface Project {
  id: string
  title: string
  type: string
  description: string
  technologies?: readonly string[]
  technologyGroups?: readonly TechnologyGroup[]
  comingSoon?: boolean
}

export interface EducationEntry {
  id: string
  period: string
  level: string
  program: string
  school: string
  status: 'completed' | 'current'
}

export interface SkillGroup {
  title: string
  blurb: string
  skills: readonly string[]
}

export interface CertificateIssuer {
  label: string
  short: string
  accent: string
  bg: string
}

export interface RawCertificate {
  id: string
  title: string
  issuerKey: string
  category: string
  type: string
  date: string
  dateLabel: string
  credentialId?: string
  note?: string
}

export interface Certificate extends RawCertificate {
  issuer: CertificateIssuer
  image: string
  thumbnail: string
}

export interface HeroContent {
  eyebrow: string
  description: string
}

export interface SectionContent {
  index: string
  eyebrow: string
  title: string
  description?: string
}
