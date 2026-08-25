import { useEffect, useRef } from 'react'
import CodeWindowBar from '../ui/CodeWindowBar'
import { ProjectTags, TechnologyGroups } from './ProjectCard'

function ProjectDetailsModal({ project, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!project) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose, project])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="code-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-white/12 bg-[#17131f]"
      >
        <CodeWindowBar filename={`projects/${project.id}.json`} />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="code-control code-control--purple absolute right-3 top-2.5 z-20 flex h-8 w-8 items-center justify-center border border-white/10 bg-[#120f17]/55 text-white/55"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs text-[#c084fc]">const project = &#123;</p>
          <p className="mt-4 font-mono text-xs text-[#93c5fd]">type: &apos;{project.type}&apos;,</p>
          <h3 className="mt-3 font-mono text-2xl font-semibold leading-snug text-white">{project.title}</h3>
          <p className="mt-5 text-sm leading-7 text-white/60">{project.description}</p>

          <div className="mt-7">
            {project.technologyGroups
              ? <TechnologyGroups groups={project.technologyGroups} />
              : <ProjectTags technologies={project.technologies} />}
          </div>

          <p className="mt-7 border-t border-white/8 pt-5 font-mono text-xs leading-6 text-white/40">
            <span className="text-[#fbbf24]">// </span>
            Project images and links will be added later.
          </p>
          <p className="mt-4 font-mono text-xs text-[#c084fc]">&#125;;</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsModal
