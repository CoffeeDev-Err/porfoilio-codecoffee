import { gmailComposeUrl, profile } from '../../data/profile'

function Footer() {
  const year = 2026

  return (
    <footer className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-6 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
        <p className="font-mono text-xs">
          <span className="text-white/25">//</span> &copy; {year} {profile.fullName}
        </p>
        <p className="font-mono text-xs text-white/35">
          <span className="text-[#c084fc]">export default</span> CoffeeDev;
        </p>
        <div className="flex items-center gap-5 font-mono text-xs">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="code-text-link">
            GitHub
          </a>
          <a href={profile.linkedInUrl} target="_blank" rel="noreferrer" className="code-text-link">
            LinkedIn
          </a>
          <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="code-text-link">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
