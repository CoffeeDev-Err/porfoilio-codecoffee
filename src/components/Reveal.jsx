import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MOTION } from '../config/motion'
import { subscribeToViewportUpdates } from '../utils/viewportScheduler'

const OFFSETS = {
  up: (distance) => ({ x: 0, y: distance }),
  down: (distance) => ({ x: 0, y: -distance }),
  left: (distance) => ({ x: -distance, y: 0 }),
  right: (distance) => ({ x: distance, y: 0 }),
}

function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  direction = 'up',
  distance = MOTION.revealDistance,
  delay = 0,
  duration = MOTION.revealDuration,
  stagger = 0,
  once = false,
}) {
  const elementRef = useRef(null)

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    const targets = stagger ? Array.from(element.children) : element
    if (Array.isArray(targets) && targets.length === 0) return

    let revealState = 'hidden'
    let hasAnimatedOnce = false

    const setRevealState = (state) => {
      revealState = state
      element.dataset.revealState = state
    }

    const getLayoutBounds = () => {
      const rect = element.getBoundingClientRect()

      // GSAP transforms the observed element for non-staggered reveals. Remove
      // that visual offset so viewport checks always use its real layout box.
      const currentY = Array.isArray(targets)
        ? 0
        : Number(gsap.getProperty(element, 'y')) || 0

      return {
        top: rect.top - currentY,
        bottom: rect.bottom - currentY,
      }
    }

    const getHiddenOffset = (position) => {
      if (direction === 'left' || direction === 'right') {
        return OFFSETS[direction](distance)
      }

      return position === 'above'
        ? { x: 0, y: -distance }
        : { x: 0, y: distance }
    }

    const hide = (position = 'below') => {
      gsap.killTweensOf(targets)
      gsap.set(targets, {
        ...getHiddenOffset(position),
        opacity: 0,
        willChange: 'transform, opacity',
      })
      setRevealState('hidden')
    }

    const reveal = () => {
      if (revealState === 'animating' || revealState === 'visible') return
      setRevealState('animating')

      gsap.to(targets, {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay: hasAnimatedOnce ? 0 : delay,
        stagger,
        ease: MOTION.revealEase,
        force3D: true,
        overwrite: 'auto',
        clearProps: 'transform,opacity,willChange',
        onComplete: () => setRevealState('visible'),
      })

      hasAnimatedOnce = true
    }

    const initialRect = getLayoutBounds()
    hide(initialRect.bottom <= 0 ? 'above' : 'below')

    const evaluatePosition = () => {
      const rect = getLayoutBounds()
      const revealLine = window.innerHeight * 0.9
      const isInsideRevealZone = rect.bottom > 0 && rect.top < revealLine
      const isOutsideViewport = rect.bottom <= 0 || rect.top >= window.innerHeight

      if (isInsideRevealZone) {
        reveal()
      } else if (!once && revealState !== 'hidden' && isOutsideViewport) {
        hide(rect.bottom <= 0 ? 'above' : 'below')
      }
    }

    const unsubscribe = subscribeToViewportUpdates(evaluatePosition)

    return () => {
      unsubscribe()
      gsap.killTweensOf(targets)
      gsap.set(targets, { clearProps: 'transform,opacity,willChange' })
      delete element.dataset.revealState
    }
  }, [delay, direction, distance, duration, once, stagger])

  return (
    <Tag ref={elementRef} className={className}>
      {children}
    </Tag>
  )
}

export default Reveal
