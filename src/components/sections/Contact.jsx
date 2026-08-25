import MagicCard from '../MagicCard'
import Reveal from '../Reveal'
import CodeWindowBar from '../ui/CodeWindowBar'
import SectionHeading from './SectionHeading'
import { sectionContent } from '../../data/content'
import { gmailComposeUrl, profile } from '../../data/profile'

const channels = [
  {
    label: 'Gmail',
    value: profile.email,
    href: gmailComposeUrl,
    external: true,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Leo Gannad',
    href: profile.linkedInUrl,
    external: true,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
      </>
    ),
  },
  {
    label: 'GitHub',
    value: 'codedev-tech',
    href: profile.githubUrl,
    external: true,
    icon: <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  },
]

function Contact() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <div className="code-surface overflow-hidden border border-white/10 bg-[#17131f]/65 backdrop-blur-md">
        <CodeWindowBar filename="terminal - contact.sh" status="ready" />

        <div className="px-6 py-14 sm:px-12 sm:py-16">
          <SectionHeading align="center" {...sectionContent.contact} />

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 0.08}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group block h-full"
                >
                  <MagicCard
                    className="flex h-full flex-col items-center gap-3 border border-white/10 bg-[#120f17]/60 p-6 text-center backdrop-blur-md"
                    glowColor="148, 163, 184"
                    enableTilt={false}
                    enableMagnetism={false}
                    enableStars={false}
                    clickEffect={false}
                    spotlightRadius={240}
                  >
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-[#93c5fd] transition group-hover:border-[#93c5fd]/40 group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {channel.icon}
                      </svg>
                    </span>
                    <span className="relative z-10">
                      <span className="block font-mono text-[10px] text-[#86efac]">
                        $ connect --via {channel.label.toLowerCase()}
                      </span>
                      <span className="mt-2 block break-all font-mono text-xs text-white/70">
                        {channel.value}
                      </span>
                    </span>
                  </MagicCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
