import MagicCard from '../MagicCard'
import Reveal from '../Reveal'
import SectionHeading from './SectionHeading'
import { sectionContent } from '../../data/content'
import { skillGroups } from '../../data/skills'

function Skills() {
  return (
    <section id="skills" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading
        direction="right"
        {...sectionContent.skills}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.08}>
            <MagicCard
              className="h-full border border-white/10 bg-[#17131f]/75 p-7 backdrop-blur-md"
              glowColor="148, 163, 184"
              enableTilt={false}
              enableMagnetism={false}
              enableStars={false}
              spotlightRadius={320}
            >
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between border-b border-white/8 pb-3 font-mono text-xs">
                  <span className="text-[#93c5fd]">skills.config.ts</span>
                  <span className="text-white/20">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-mono text-lg font-semibold text-white">
                  <span className="text-[#c084fc]">export const</span>{' '}
                  {group.title.replaceAll(' ', '')}
                </h3>
                <p className="mt-3 font-mono text-xs leading-6 text-white/45">
                  <span className="text-white/20">// </span>{group.blurb}
                </p>
                <Reveal as="div" stagger={0.06} distance={18} className="mt-5 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="code-chip border border-white/10 bg-[#120f17]/55 px-3 py-1.5 font-mono text-xs text-[#86efac]/80"
                    >
                      &apos;{skill}&apos;
                    </span>
                  ))}
                </Reveal>
              </div>
            </MagicCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Skills
