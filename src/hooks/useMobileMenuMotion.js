import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export function useMobileMenuMotion(panelRef, isOpen) {
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const items = Array.from(panel.querySelectorAll('[data-mobile-menu-item]'))
    const targets = [panel, ...items]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.killTweensOf(targets)

    if (reduceMotion) {
      gsap.set(panel, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        y: isOpen ? 0 : -8,
      })
      gsap.set(items, { opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -8 })
      return
    }

    const timeline = gsap.timeline()

    if (isOpen) {
      timeline
        .set(panel, { visibility: 'visible' })
        .to(panel, {
          height: 'auto',
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease: 'power3.out',
        })
        .to(items, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.045,
          ease: 'power2.out',
        }, 0.08)
    } else {
      timeline
        .to(items, {
          opacity: 0,
          x: -8,
          duration: 0.16,
          stagger: { each: 0.02, from: 'end' },
          ease: 'power1.in',
        })
        .to(panel, {
          height: 0,
          opacity: 0,
          y: -8,
          duration: 0.36,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
        }, 0.03)
    }

    return () => timeline.kill()
  }, [isOpen, panelRef])
}
