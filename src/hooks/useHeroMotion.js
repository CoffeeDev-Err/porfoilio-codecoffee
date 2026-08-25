import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

const clampProgress = (value) => Math.min(Math.max(value, 0), 1)

export function useHeroIntro(sectionRef) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-intro="eyebrow"]', { y: 16, opacity: 0, duration: 0.55 })
        .from('[data-intro="name"]', { y: 24, opacity: 0, duration: 0.72 }, '-=0.28')
        .from('[data-intro="title"]', { y: 16, opacity: 0, duration: 0.45 }, '-=0.48')
        .from('[data-intro="description"]', { y: 16, opacity: 0, duration: 0.55 }, '-=0.28')
        .from(
          '[data-intro="portrait"]',
          { x: 28, scale: 0.97, opacity: 0, duration: 0.85 },
          '-=0.68',
        )
    }, sectionRef)

    return () => context.revert()
  }, [sectionRef])
}

export function useHeroParallax(sectionRef, contentRef) {
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const setY = gsap.quickTo(content, 'yPercent', {
      duration: 0.45,
      ease: 'power3.out',
    })
    const setOpacity = gsap.quickTo(content, 'opacity', {
      duration: 0.35,
      ease: 'power2.out',
    })

    let frameId = 0
    const update = () => {
      frameId = 0
      const sectionTop = section.getBoundingClientRect().top
      const progress = clampProgress(-sectionTop / Math.max(section.offsetHeight * 0.85, 1))
      setY(-9 * progress)
      setOpacity(1 - 0.72 * progress)
    }
    const scheduleUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    update()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId) cancelAnimationFrame(frameId)
      setY.tween.kill()
      setOpacity.tween.kill()
    }
  }, [contentRef, sectionRef])
}

export function useActionReveal(actionsRef, isVisible) {
  useLayoutEffect(() => {
    if (!isVisible || !actionsRef.current) return

    const buttons = actionsRef.current.querySelectorAll('[data-action-button]')
    const tween = gsap.fromTo(
      buttons,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform',
      },
    )

    return () => tween.kill()
  }, [actionsRef, isVisible])
}
