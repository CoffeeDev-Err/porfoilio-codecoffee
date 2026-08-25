import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { NAV_LINKS } from '../../config/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility'
import { useMobileMenuMotion } from '../../hooks/useMobileMenuMotion'

function CodeNavLabel({ label, isActive }) {
  return (
    <>
      <span className={`transition group-hover:text-[#c084fc] ${isActive ? 'text-[#c084fc]' : 'text-[#94a3b8]/55'}`}>&lt;</span>
      <span className={`transition group-hover:text-white ${isActive ? 'text-white' : 'text-white/50'}`}>{label}</span>
      <span className={`transition group-hover:text-[#c084fc] ${isActive ? 'text-[#c084fc]' : 'text-[#94a3b8]/55'}`}> /&gt;</span>
    </>
  )
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  )
}

function Header({ onNavigate, onToggleTheme, theme }) {
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeHref = useActiveSection()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  useHeaderVisibility(headerRef, { locked: menuOpen })
  useMobileMenuMotion(mobileMenuRef, menuOpen)

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
    )
    return () => tween.kill()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const handleNavigation = (event, href) => {
    setMenuOpen(false)
    onNavigate(event, href)
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-30 bg-[#120f17]/85 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <p className="font-mono text-xs tracking-wide" aria-label="Coffee dev">
            <span className="text-[#c084fc]">const</span>{' '}
            <span className="text-[#c2cede]">coffee</span>{' '}
            <span className="text-white/35">=</span>{' '}
            <span className="text-[#86efac]">&apos;dev&apos;</span>
            <span className="text-white/35">;</span>
          </p>

          <nav className="hidden items-center gap-4 font-mono text-xs lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                aria-label={link.label}
                aria-current={activeHref === link.href ? 'page' : undefined}
                className="group relative py-1 transition"
                href={link.href}
                onClick={(event) => handleNavigation(event, link.href)}
              >
                <CodeNavLabel label={link.label} isActive={activeHref === link.href} />
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-[#c084fc] transition-all duration-300 ${
                    activeHref === link.href ? 'w-full opacity-80' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="group hidden items-center gap-1.5 font-mono text-xs lg:inline-flex"
              download
              href={profile.resumeUrl}
            >
              <span className="text-[#c084fc] transition group-hover:text-[#d8b4fe]">./</span>
              <span className="text-white/50 transition group-hover:text-white">resume.pdf</span>
            </a>

            <button
              type="button"
              aria-label={`Switch to ${nextTheme} theme`}
              title={`Switch to ${nextTheme} theme`}
              onClick={onToggleTheme}
              className="code-control code-control--purple flex h-8 items-center justify-center gap-2 border border-white/10 px-2.5 font-mono text-white/55"
            >
              <ThemeIcon theme={theme} />
              <span className="hidden text-[10px] xl:inline">theme.{nextTheme}()</span>
            </button>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-8 w-8 items-center justify-end text-white/55 transition hover:text-white lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  className={`origin-center transition duration-300 ${menuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                />
                <path
                  d="M6 6l12 12M18 6L6 18"
                  className={`origin-center transition duration-300 ${menuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={`mobile-menu-panel overflow-hidden border-b font-mono lg:hidden ${
            menuOpen ? 'border-white/10' : 'pointer-events-none border-transparent'
          }`}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col py-3">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeHref === link.href ? 'page' : undefined}
                  onClick={(event) => handleNavigation(event, link.href)}
                  data-mobile-menu-item
                  className="mobile-menu-item group flex items-center gap-3 py-2.5 text-xs"
                >
                  <span className={activeHref === link.href ? 'text-[#c084fc]' : 'text-[#c084fc]/65'}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/25">//</span>
                  <span className={`transition group-hover:text-white ${activeHref === link.href ? 'text-white' : 'text-white/55'}`}>
                    {link.label}
                  </span>
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                data-mobile-menu-item
                className="mobile-menu-item group mt-1 flex items-center gap-1.5 border-t border-white/10 py-3 text-left text-xs"
              >
                <span className="text-[#c084fc] transition group-hover:text-[#d8b4fe]">./</span>
                <span className="text-white/55 transition group-hover:text-white">resume.pdf</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
