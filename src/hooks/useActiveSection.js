import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../config/navigation'

const SECTION_IDS = NAV_LINKS.map(({ href }) => href.slice(1))

export function useActiveSection() {
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    let frameId = 0

    const updateActiveSection = () => {
      frameId = 0
      const activationLine = window.innerHeight * 0.38
      let currentHref = ''

      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id)
        if (section?.getBoundingClientRect().top <= activationLine) {
          currentHref = `#${id}`
        }
      })

      setActiveHref((current) => (current === currentHref ? current : currentHref))
    }

    const scheduleUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateActiveSection)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return activeHref
}
