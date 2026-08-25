import MagicCard from '../MagicCard'
import Reveal from '../Reveal'
import CodeWindowBar from '../ui/CodeWindowBar'
import SectionHeading from './SectionHeading'
import { sectionContent } from '../../data/content'
import { educationHistory } from '../../data/education'

function Education() {
  return (
    <section id="education" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading direction="right" {...sectionContent.education} />

      <div className="relative mt-12 space-y-7 md:space-y-10">
        <span aria-hidden="true" className="education-rail absolute bottom-5 left-[11px] top-5 w-px md:left-1/2 md:-translate-x-1/2" />

        {educationHistory.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <div
              key={item.id}
              className="relative grid grid-cols-[24px_minmax(0,1fr)] items-center md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]"
            >
              <Reveal
                direction={isLeft ? 'left' : 'right'}
                delay={index * 0.1}
                className={`col-start-2 row-start-1 ${isLeft ? 'md:col-start-1' : 'md:col-start-3'}`}
              >
                <MagicCard
                  className="border border-white/10 bg-[#17131f]/75 backdrop-blur-md"
                  glowColor={item.status === 'current' ? '134, 239, 172' : '192, 132, 252'}
                  enableTilt={false}
                  enableMagnetism={false}
                  enableStars={false}
                  spotlightRadius={320}
                >
                  <CodeWindowBar
                    filename={`education_${String(index + 1).padStart(2, '0')}.json`}
                    status={item.status}
                  />
                  <div className="relative z-10 p-6 sm:p-7">
                    <p className="font-mono text-xs font-semibold text-[#c084fc]">{item.period}</p>
                    <h3 className="mt-4 font-mono text-xl font-semibold text-white">{item.program}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{item.school}</p>

                    <dl className="mt-6 grid gap-2 border-t border-white/8 pt-4 font-mono text-xs">
                      <div className="flex flex-wrap gap-2">
                        <dt className="text-[#93c5fd]">level:</dt>
                        <dd className="text-white/55">&apos;{item.level}&apos;</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="text-[#93c5fd]">status:</dt>
                        <dd className={item.status === 'current' ? 'text-[#86efac]' : 'text-white/55'}>
                          &apos;{item.status}&apos;
                        </dd>
                      </div>
                    </dl>
                  </div>
                </MagicCard>
              </Reveal>

              <div className="relative col-start-1 row-start-1 flex h-full items-center justify-center md:col-start-2">
                <span
                  aria-hidden="true"
                  className={`education-connector absolute left-1/2 h-px w-5 md:w-8 ${isLeft ? 'md:left-auto md:right-1/2' : ''}`}
                />
                <span
                  aria-hidden="true"
                  className={`education-node relative z-10 h-3 w-3 rounded-full ${item.status === 'current' ? 'education-node--current' : ''}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Education
