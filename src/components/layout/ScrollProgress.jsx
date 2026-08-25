import { useEffect, useRef } from 'react'
import { subscribeToViewportUpdates } from '../../utils/viewportScheduler'

function ScrollProgress() {
  const indicatorRef = useRef(null)

  useEffect(() => {
    const indicator = indicatorRef.current
    if (!indicator) return

    const updateProgress = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableDistance > 0
        ? Math.min(Math.max(window.scrollY / scrollableDistance, 0), 1)
        : 0

      indicator.style.transform = `scaleX(${progress})`
    }

    return subscribeToViewportUpdates(updateProgress)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5"
    >
      <div
        ref={indicatorRef}
        data-scroll-progress
        className="h-full origin-left bg-gradient-to-r from-[#93c5fd] via-[#c084fc] to-[#86efac] shadow-[0_0_12px_rgba(192,132,252,0.7)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export default ScrollProgress
