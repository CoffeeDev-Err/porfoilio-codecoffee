import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { subscribeToViewportUpdates } from '../utils/viewportScheduler'

const TOP_THRESHOLD = 88
const DIRECTION_THRESHOLD = 4

interface HeaderVisibilityOptions {
  locked?: boolean
}

export function useHeaderVisibility(
  headerRef: RefObject<HTMLElement | null>,
  { locked = false }: HeaderVisibilityOptions = {},
) {
  const lastScrollYRef = useRef<number>(0)
  const hiddenRef = useRef<boolean>(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    lastScrollYRef.current = window.scrollY

    const setHidden = (hidden: boolean) => {
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
      const currentScrollY = Math.max(window.scrollY, 0)
      const delta = currentScrollY - lastScrollYRef.current

      if (locked || currentScrollY <= TOP_THRESHOLD) {
        setHidden(false)
      } else if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        setHidden(delta > 0)
      }

      lastScrollYRef.current = currentScrollY
    }

    if (locked) setHidden(false)
    const unsubscribe = subscribeToViewportUpdates(updateHeader)

    return () => {
      unsubscribe()
      gsap.killTweensOf(header, 'yPercent')
    }
  }, [headerRef, locked])
}
