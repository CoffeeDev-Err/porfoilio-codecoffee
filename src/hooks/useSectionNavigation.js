import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HEADER_OFFSET } from '../config/navigation'
import { MOTION } from '../config/motion'

const SCROLL_CANCEL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'End',
  'Home',
  'PageDown',
  'PageUp',
  ' ',
])

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function getScrollDuration(distance) {
  return clamp(
    0.55 + distance / 2200,
    MOTION.scrollMinDuration,
    MOTION.scrollMaxDuration,
  )
}

export function useSectionNavigation() {
  const activeTweenRef = useRef(null)

  const stopActiveScroll = useCallback(() => {
    activeTweenRef.current?.kill()
    activeTweenRef.current = null
  }, [])

  const navigateToSection = useCallback((event, href) => {
    if (!href?.startsWith('#')) return

    const target = document.getElementById(href.slice(1))
    if (!target) return

    event?.preventDefault()
    stopActiveScroll()

    const currentY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = clamp(
      target.getBoundingClientRect().top + currentY - HEADER_OFFSET,
      0,
      maxScroll,
    )
    const scrollState = { y: currentY }

    activeTweenRef.current = gsap.to(scrollState, {
      y: targetY,
      duration: getScrollDuration(Math.abs(targetY - currentY)),
      ease: MOTION.scrollEase,
      overwrite: true,
      onUpdate: () => window.scrollTo(0, scrollState.y),
      onComplete: () => {
        activeTweenRef.current = null
      },
    })

    window.history.pushState(null, '', href)
  }, [stopActiveScroll])

  useEffect(() => {
    const cancelOnKey = (event) => {
      if (SCROLL_CANCEL_KEYS.has(event.key)) stopActiveScroll()
    }

    window.addEventListener('wheel', stopActiveScroll, { passive: true })
    window.addEventListener('touchstart', stopActiveScroll, { passive: true })
    window.addEventListener('keydown', cancelOnKey)

    return () => {
      window.removeEventListener('wheel', stopActiveScroll)
      window.removeEventListener('touchstart', stopActiveScroll)
      window.removeEventListener('keydown', cancelOnKey)
      stopActiveScroll()
    }
  }, [stopActiveScroll])

  return navigateToSection
}
