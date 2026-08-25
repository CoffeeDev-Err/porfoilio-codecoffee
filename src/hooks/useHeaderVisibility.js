import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TOP_THRESHOLD = 88
const DIRECTION_THRESHOLD = 4

export function useHeaderVisibility(headerRef, { locked = false } = {}) {
  const lastScrollYRef = useRef(0)
  const hiddenRef = useRef(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let frameId = 0
    lastScrollYRef.current = window.scrollY

    const setHidden = (hidden) => {
      if (hiddenRef.current === hidden) return
      hiddenRef.current = hidden

      gsap.to(header, {
        yPercent: hidden ? -110 : 0,
        duration: hidden ? 0.34 : 0.42,
        ease: hidden ? 'power2.in' : 'power3.out',
        overwrite: 'auto',
      })
    }

    const updateHeader = () => {
      frameId = 0
      const currentScrollY = Math.max(window.scrollY, 0)
      const delta = currentScrollY - lastScrollYRef.current

      if (locked || currentScrollY <= TOP_THRESHOLD) {
        setHidden(false)
      } else if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        setHidden(delta > 0)
      }

      lastScrollYRef.current = currentScrollY
    }

    const scheduleUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateHeader)
    }

    if (locked) setHidden(false)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      if (frameId) cancelAnimationFrame(frameId)
      gsap.killTweensOf(header, 'yPercent')
    }
  }, [headerRef, locked])
}
