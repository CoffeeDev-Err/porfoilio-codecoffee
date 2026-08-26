import type { Certificate, CertificateIssuer, RawCertificate } from '../types/portfolio'

// Certificate data for the portfolio. Cards and lightboxes use web-optimized
// images from the thumbnails and display folders.

export const issuers = {
  aws: { label: 'AWS Training & Certification', short: 'AWS', accent: '#FF9900', bg: '#232F3E' },
  huaweiTalent: { label: 'Huawei Talent', short: 'Huawei', accent: '#F8514B', bg: '#3a1113' },
  huaweiIct: { label: 'Huawei ICT Academy', short: 'Huawei', accent: '#F8514B', bg: '#3a1113' },
  itSpecialist: { label: 'IT Specialist · Certiport', short: 'IT Specialist', accent: '#22B8CC', bg: '#0c2b30' },
  asys: { label: 'A-Sys', short: 'A-Sys', accent: '#A855F7', bg: '#241447' },
  spup: { label: 'St. Paul University Philippines', short: 'SPUP', accent: '#2BB98A', bg: '#0b2a1f' },
} as const satisfies Record<string, CertificateIssuer>

// Filter tabs shown above the certificate grid.
export const categories = ['All', 'AWS', 'Huawei', 'IT Specialist', 'Seminars & Events'] as const

type IssuerKey = keyof typeof issuers
type CertificateCategory = Exclude<(typeof categories)[number], 'All'>
type CertificateSource = Omit<RawCertificate, 'issuerKey' | 'category'> & {
  issuerKey: IssuerKey
  category: CertificateCategory
}

const rawCertificates = [
  {
    id: 'aws-basic-audit',
    title: 'Performing a Basic Audit of your AWS Environment',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-08-24',
    dateLabel: 'August 24, 2026',
  },
  {
    id: 'aws-api-gateway',
    title: 'Introduction to Amazon API Gateway',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-05-06',
    dateLabel: 'May 6, 2026',
  },
  {
    id: 'aws-cloudfront',
    title: 'Introduction to Amazon CloudFront',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-04-15',
    dateLabel: 'April 15, 2026',
  },
  {
    id: 'aws-iam-2',
    title: 'Introduction to AWS Identity and Access Management (IAM)',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-04-15',
    dateLabel: 'April 15, 2026',
  },
  {
    id: 'aws-s3',
    title: 'Introduction to Amazon Simple Storage Service (S3)',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-04-08',
    dateLabel: 'April 8, 2026',
  },
  {
    id: 'aws-kms',
    title: 'Introduction to AWS Key Management Service',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-03-18',
    dateLabel: 'March 18, 2026',
  },
  {
    id: 'aws-vpc',
    title: 'Introduction to Amazon Virtual Private Cloud (VPC)',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-02-25',
    dateLabel: 'February 25, 2026',
  },
  {
    id: 'aws-iam-1',
    title: 'Introduction to AWS Identity and Access Management (IAM)',
    issuerKey: 'aws',
    category: 'AWS',
    type: 'Completion Certificate',
    date: '2026-02-11',
    dateLabel: 'February 11, 2026',
  },
  {
    id: 'its-databases',
    title: 'Databases',
    issuerKey: 'itSpecialist',
    category: 'IT Specialist',
    type: 'IT Specialist Certification',
    date: '2025-12-10',
    dateLabel: 'December 10, 2025',
    credentialId: 'Lu8W-s4q9',
    note: 'Valid for 5 years · verify.certiport.com',
  },
  {
    id: 'huawei-hcia-security',
    title: 'HCIA-Security V4.0 Course',
    issuerKey: 'huaweiIct',
    category: 'Huawei',
    type: 'Certificate of Completion',
    date: '2025-11-30',
    dateLabel: 'November 30, 2025',
    credentialId: 'EBG20251130002004',
  },
  {
    id: 'asys-seminar',
    title: 'A-Sys Online Seminar',
    issuerKey: 'asys',
    category: 'Seminars & Events',
    type: 'Certificate of Achievement',
    date: '2025-07-25',
    dateLabel: 'July 25, 2025',
    note: 'Recognized for outstanding performance and dedication',
  },
  {
    id: 'spup-ite-convention',
    title: 'Regional ITE Convention 2025',
    issuerKey: 'spup',
    category: 'Seminars & Events',
    type: 'Certificate of Participation',
    date: '2025-03-28',
    dateLabel: 'March 2025',
    credentialId: 'ITE-REF-20250329-835',
    note: 'Theme: “Innovate, Transform, Sustain: Shaping a Smarter World”',
  },
  {
    id: 'huawei-data-mgmt-cra',
    title: 'Data Management and Analysis (CRA Training Program)',
    issuerKey: 'huaweiTalent',
    category: 'Huawei',
    type: 'Certificate of Completion',
    date: '2025-03-11',
    dateLabel: 'March 11, 2025',
    credentialId: 'ICTCRA20250311000020',
  },
  {
    id: 'huawei-data-mgmt',
    title: 'Data Management and Analysis',
    issuerKey: 'huaweiTalent',
    category: 'Huawei',
    type: 'Certificate of Completion',
    date: '2025-03-11',
    dateLabel: 'March 11, 2025',
    credentialId: 'ICT20250311000020',
  },
] satisfies readonly CertificateSource[]

// Web-sized JPEGs keep the certificate grid and lightbox responsive.
export const certificates: Certificate[] = rawCertificates.map((cert) => ({
  ...cert,
  issuer: issuers[cert.issuerKey],
  image: `/certificates/display/${cert.id}.jpg`,
  thumbnail: `/certificates/thumbnails/${cert.id}.jpg`,
}))
