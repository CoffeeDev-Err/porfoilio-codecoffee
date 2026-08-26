import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../config/navigation'
import { subscribeToViewportUpdates } from '../utils/viewportScheduler'

const SECTION_IDS = NAV_LINKS.map(({ href }) => href.slice(1))

export function useActiveSection() {
  const [activeHref, setActiveHref] = useState<string>('')

  useEffect(() => {
    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.38
      let currentHref = ''

      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentHref = `#${id}`
        }
      })

      setActiveHref((current) => (current === currentHref ? current : currentHref))
    }

    const unsubscribe = subscribeToViewportUpdates(updateActiveSection)
    updateActiveSection()

    return () => {
      unsubscribe()
    }
  }, [])

  return activeHref
}
