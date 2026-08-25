import { useRef } from 'react'
import { heroContent } from '../../data/content'
import { profile } from '../../data/profile'
import { useActionReveal, useHeroIntro, useHeroParallax } from '../../hooks/useHeroMotion'
import MagicCard from '../MagicCard'
import CodeWindowBar from '../ui/CodeWindowBar'
import VariableProximity from '../VariableProximity'

function Hero({ onNavigate }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const nameRef = useRef(null)
  const actionsRef = useRef(null)

  useHeroIntro(sectionRef)
  useHeroParallax(sectionRef, contentRef)
  useActionReveal(actionsRef, true)

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-screen items-center">
      <div ref={contentRef} className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          <div className="max-w-3xl">
            <div
              data-intro="eyebrow"
              className="mb-6 inline-flex items-center font-mono text-xs tracking-[0.14em] text-[#86efac]"
            >
              <span className="mr-2 text-white/25">//</span>
              {heroContent.eyebrow}
            </div>

            <div ref={nameRef} data-intro="name" className="relative max-w-2xl">
              <span className="mb-2 block font-mono text-sm text-[#c084fc]">const developer =</span>
              <VariableProximity
                label="'Leo B. Gannad';"
                className="block font-mono text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl"
                fromFontVariationSettings="'wght' 620, 'opsz' 14"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={nameRef}
                radius={140}
                falloff="gaussian"
              />
            </div>

            <p data-intro="title" className="mt-5 font-mono text-sm text-[#93c5fd] sm:text-base">
              <span className="text-white/30">role:</span> &apos;{profile.role}&apos;
            </p>
            <p data-intro="title" className="mt-2 font-mono text-xs text-white/40 sm:text-sm">
              <span className="text-white/25">education:</span> &apos;{profile.education}&apos;
            </p>

            <p
              data-intro="description"
              className="mt-4 max-w-2xl font-mono text-sm leading-7 text-white/60 sm:text-base"
            >
              {heroContent.description}
            </p>

            <div
              ref={actionsRef}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                data-action-button
                className="code-control code-control--purple border border-[#c084fc]/45 bg-[#c084fc]/10 px-5 py-3 font-mono text-xs text-[#e9d5ff]"
                href="#projects"
                onClick={(event) => onNavigate(event, '#projects')}
              >
                ./view-projects
              </a>
              <a
                data-action-button
                className="code-control code-control--green border border-white/12 bg-[#120f17]/55 px-5 py-3 font-mono text-xs text-white/65"
                href={profile.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                git checkout github
              </a>
              <a
                data-action-button
                className="code-control code-control--blue border border-white/12 bg-[#120f17]/55 px-5 py-3 font-mono text-xs text-white/65"
                href={profile.linkedInUrl}
                rel="noreferrer"
                target="_blank"
              >
                npm run connect
              </a>
            </div>
          </div>

          <div data-intro="portrait" className="relative hidden justify-self-end lg:block">
            <div className="absolute -inset-5 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.2),transparent_60%)] blur-2xl" />
            <MagicCard
              className="relative border border-white/10 bg-[#17131f]/80 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-md"
              enableBorderGlow
              enableSpotlight
              enableTilt
              glowColor="148, 163, 184"
              spotlightRadius={420}
            >
              <CodeWindowBar filename={`public${profile.imageUrl}`} status="online" className="-mx-3 -mt-3 mb-3" />
              <div className="overflow-hidden border border-white/8 bg-[#110e17]">
                <img alt={`${profile.name} profile`} className="h-[390px] w-[320px] object-cover object-center" src={profile.imageUrl} />
              </div>
            </MagicCard>
          </div>
        </div>

        <div className="mt-16 hidden lg:block">
          <a
            href="#about"
            onClick={(event) => onNavigate(event, '#about')}
            className="code-scroll-link inline-flex items-center gap-3 font-mono text-xs text-white/35"
          >
            <span className="code-scroll-track flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <span className="code-scroll-dot h-2 w-1 animate-bounce rounded-full bg-white/50" />
            </span>
            scroll.init()
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
