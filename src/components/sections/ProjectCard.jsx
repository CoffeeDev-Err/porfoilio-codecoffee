import MagicCard from '../MagicCard'

export function ProjectTags({ technologies }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <span
          key={technology}
          className="code-chip border border-white/10 bg-[#120f17]/55 px-3 py-1 font-mono text-[11px] text-[#86efac]/75"
        >
          #{technology.toLowerCase().replaceAll(' ', '-')}
        </span>
      ))}
    </div>
  )
}

export function TechnologyGroups({ groups }) {
  return (
    <dl className="space-y-3 border-t border-white/8 pt-5 font-mono text-[11px]">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-1 sm:grid-cols-[104px_1fr]">
          <dt className="text-[#93c5fd]">{group.label}:</dt>
          <dd className="text-white/55">{group.items.join(' · ')}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectCard({ project, index, onView, variant = 'client' }) {
  return (
    <MagicCard
      className={`project-card-surface h-full border backdrop-blur-md ${
        project.comingSoon ? 'border-dashed border-white/15' : 'border-white/10'
      }`}
      glowColor={project.comingSoon ? '192, 132, 252' : '134, 239, 172'}
      enableTilt={false}
      enableMagnetism={false}
      enableStars={false}
      spotlightRadius={360}
    >
      <article className="relative z-10 flex h-full flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/8 pb-3 font-mono text-[10px] text-white/30">
          <span className="truncate">{variant}_{String(index + 1).padStart(2, '0')}.project.json</span>
          <span className={`flex shrink-0 items-center gap-1.5 ${project.comingSoon ? 'text-[#fbbf24]/70' : 'text-[#86efac]/70'}`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            {project.comingSoon ? 'coming soon' : 'client project'}
          </span>
        </div>

        <p className="font-mono text-[11px] text-[#c084fc]">type: &apos;{project.type}&apos;</p>
        <h3 className="mt-4 font-mono text-xl font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/55">{project.description}</p>

        <div className="mt-auto pt-6">
          {project.technologyGroups
            ? <TechnologyGroups groups={project.technologyGroups} />
            : <ProjectTags technologies={project.technologies} />}

          <button
            type="button"
            onClick={() => onView(project)}
            className="code-control code-control--green mt-6 inline-flex items-center gap-2 border border-white/12 bg-[#120f17]/55 px-4 py-2.5 font-mono text-xs text-white/65"
            aria-label={`View details for ${project.title}`}
          >
            view()
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </button>
        </div>
      </article>
    </MagicCard>
  )
}

export default ProjectCard
