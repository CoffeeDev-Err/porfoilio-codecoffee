import MagicCard from '../MagicCard'
import Reveal from '../Reveal'
import CodeWindowBar from '../ui/CodeWindowBar'
import SectionHeading from './SectionHeading'
import { certificates } from '../../data/certificates'
import { sectionContent } from '../../data/content'

const stats = [
  { value: String(certificates.length), label: 'Certifications' },
  { value: 'Web', label: 'Primary Focus' },
  { value: 'Mobile', label: 'App Focus' },
  { value: '4th Yr', label: 'BS Info. Tech' },
]

function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading
        direction="left"
        {...sectionContent.about}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <Reveal direction="left" className="code-surface overflow-hidden border border-white/10 bg-[#120f17]/60 backdrop-blur-md">
          <CodeWindowBar filename="src/content/about.md" status="saved" />
          <div className="space-y-5 border-l border-[#c084fc]/25 px-6 py-7 text-base leading-8 text-white/65 sm:px-8 sm:text-lg">
            <p>
              I&rsquo;m <span className="font-semibold text-white">Leo Bucasas Gannad</span>, a fourth-year
              BS Information Technology student at Isabela State University - Cabagan Campus.
            </p>
            <p>
              My focus is full-stack <span className="text-[#93c5fd]">web and mobile development</span>{' '}
              &mdash; building responsive interfaces, reliable APIs, and well-structured applications backed by
              secure databases and <span className="text-[#93c5fd]">cloud services</span>.
            </p>
            <p>
              I&rsquo;ve earned {certificates.length} certifications across AWS, Huawei, and Certiport. They
              complement my development work with a stronger foundation in cloud services, data, security,
              and the infrastructure behind modern applications.
            </p>
          </div>
        </Reveal>

        <Reveal as="div" direction="right" delay={0.1} className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <MagicCard
              key={stat.label}
              className="border border-white/10 bg-[#17131f]/75 p-6 backdrop-blur-md"
              glowColor="148, 163, 184"
              enableTilt={false}
              enableMagnetism={false}
              enableStars={false}
              spotlightRadius={260}
            >
              <div className="relative z-10">
                <div className="font-mono text-3xl font-semibold tracking-[-0.03em] text-[#86efac] sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-xs text-white/45">
                  <span className="text-[#c084fc]">const</span> {stat.label.toLowerCase().replaceAll(' ', '_')}
                </div>
              </div>
            </MagicCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default About
