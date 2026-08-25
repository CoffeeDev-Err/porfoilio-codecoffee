import { useCallback, useState } from 'react'
import Reveal from '../Reveal'
import ProjectCard from './ProjectCard'
import ProjectDetailsModal from './ProjectDetailsModal'
import SectionHeading from './SectionHeading'
import { sectionContent } from '../../data/content'
import { academicProjects, clientProjects } from '../../data/projects'
import { profile } from '../../data/profile'

function ProjectGroup({ label, description, projects, variant, onView }) {
  return (
    <div className="mt-12">
      <Reveal direction="left" className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-sm font-semibold text-white">
            <span className="text-[#c084fc]">export const</span> {label.replaceAll(' ', '')}
          </p>
          <p className="mt-2 font-mono text-xs text-white/40">
            <span className="text-white/20">// </span>{description}
          </p>
        </div>
        <span className="font-mono text-[10px] text-[#86efac]">[{projects.length}] entries</span>
      </Reveal>

      <div className={`grid gap-6 ${variant === 'client' ? 'md:grid-cols-2' : ''}`}>
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index, 3) * 0.08}>
            <ProjectCard project={project} index={index} onView={onView} variant={variant} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const closeProject = useCallback(() => setSelectedProject(null), [])

  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading direction="right" {...sectionContent.projects} />

      <ProjectGroup
        label="Client Projects"
        description="Solutions built for real operational and business workflows."
        projects={clientProjects}
        variant="client"
        onView={setSelectedProject}
      />

      <ProjectGroup
        label="Academic Projects"
        description="School projects currently being documented for the portfolio."
        projects={academicProjects}
        variant="academic"
        onView={setSelectedProject}
      />

      <Reveal delay={0.1} className="mt-10">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="code-control code-control--purple inline-flex items-center gap-2 border border-[#c084fc]/35 bg-[#c084fc]/10 px-5 py-3 font-mono text-xs text-[#e9d5ff]"
        >
          git log --github
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </a>
      </Reveal>

      <ProjectDetailsModal project={selectedProject} onClose={closeProject} />
    </section>
  )
}

export default Projects
