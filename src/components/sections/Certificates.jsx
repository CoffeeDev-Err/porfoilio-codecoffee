import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Reveal from '../Reveal'
import SectionHeading from './SectionHeading'
import CertificateCard from './CertificateCard'
import CertificateLightbox from './CertificateLightbox'
import { categories, certificates } from '../../data/certificates'
import { sectionContent } from '../../data/content'

const COLLAPSED_COUNT = 6

function Certificates() {
  const gridRef = useRef(null)
  const animationRef = useRef(null)
  const expandStartHeightRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState(null)

  const counts = useMemo(() => {
    const map = { All: certificates.length }
    for (const category of categories) {
      if (category === 'All') continue
      map[category] = certificates.filter((cert) => cert.category === category).length
    }
    return map
  }, [])

  const filteredCertificates = useMemo(
    () =>
      activeCategory === 'All'
        ? certificates
        : certificates.filter((cert) => cert.category === activeCategory),
    [activeCategory],
  )

  const supportsSeeAll = activeCategory === 'All' || activeCategory === 'AWS'
  const hasMore = supportsSeeAll && filteredCertificates.length > COLLAPSED_COUNT
  const visibleCertificates = hasMore && !showAll
    ? filteredCertificates.slice(0, COLLAPSED_COUNT)
    : filteredCertificates

  useLayoutEffect(() => {
    const grid = gridRef.current
    const startHeight = expandStartHeightRef.current
    if (!grid || !showAll || startHeight === null) return

    expandStartHeightRef.current = null
    const items = Array.from(grid.querySelectorAll('[data-certificate-item]'))
    const extraItems = items.slice(COLLAPSED_COUNT)
    const endHeight = grid.getBoundingClientRect().height

    gsap.set(grid, { height: startHeight, overflow: 'hidden' })
    animationRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set(grid, { clearProps: 'height,overflow' })
        animationRef.current = null
      },
    })
      .fromTo(
        extraItems,
        { opacity: 0, y: 24, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.045, ease: 'power2.out' },
        0.08,
      )
      .to(grid, { height: endHeight, duration: 0.55, ease: 'power3.inOut' }, 0)

    return () => animationRef.current?.kill()
  }, [showAll, visibleCertificates.length])

  useEffect(() => {
    return () => animationRef.current?.kill()
  }, [])

  const selectCategory = (category) => {
    animationRef.current?.kill()
    animationRef.current = null
    expandStartHeightRef.current = null
    if (gridRef.current) gsap.set(gridRef.current, { clearProps: 'height,overflow' })
    setActiveCategory(category)
    setShowAll(false)
  }

  const toggleCertificates = () => {
    const grid = gridRef.current
    if (!grid) return

    animationRef.current?.kill()
    animationRef.current = null

    if (!showAll) {
      expandStartHeightRef.current = grid.getBoundingClientRect().height
      setShowAll(true)
      return
    }

    const items = Array.from(grid.querySelectorAll('[data-certificate-item]'))
    const collapsedItems = items.slice(0, COLLAPSED_COUNT)
    const extraItems = items.slice(COLLAPSED_COUNT)
    const gridRect = grid.getBoundingClientRect()
    const collapsedHeight = Math.max(...collapsedItems.map((item) => item.getBoundingClientRect().bottom)) - gridRect.top

    gsap.set(grid, { height: gridRect.height, overflow: 'hidden' })
    animationRef.current = gsap.timeline({
      onComplete: () => {
        setShowAll(false)
        gsap.set(grid, { clearProps: 'height,overflow' })
        animationRef.current = null
      },
    })
      .to(extraItems, {
        opacity: 0,
        y: 20,
        scale: 0.985,
        duration: 0.28,
        stagger: { each: 0.025, from: 'end' },
        ease: 'power2.in',
      }, 0)
      .to(grid, { height: collapsedHeight, duration: 0.5, ease: 'power3.inOut' }, 0)
  }

  return (
    <section id="certificate" className="relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8 lg:py-28">
      <SectionHeading
        direction="left"
        {...sectionContent.certificates}
      />

      {/* Filter tabs */}
      <Reveal className="mt-10">
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <span className="mr-1 text-xs text-white/25">filter:</span>
          {categories.map((category) => {
            const isActive = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCategory(category)}
                className={`code-control code-control--purple border px-3.5 py-2 text-xs ${
                  isActive
                    ? 'border-[#c084fc]/50 bg-[#c084fc]/15 text-[#e9d5ff]'
                    : 'border-white/10 bg-[#120f17]/55 text-white/45 hover:border-white/25 hover:text-white'
                }`}
              >
                {category.toLowerCase().replaceAll(' ', '_')}
                <span className={isActive ? 'text-[#e9d5ff]/45' : 'text-white/25'}>[{counts[category]}]</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <div ref={gridRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCertificates.map((cert, index) => (
          <div key={cert.id} data-certificate-item className="h-full">
            <Reveal delay={Math.min(index, 5) * 0.06} className="h-full">
              <CertificateCard certificate={cert} onOpen={setSelected} index={index} />
            </Reveal>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-label={showAll ? 'Show fewer certificates' : `See all ${activeCategory === 'All' ? 'certificates' : 'AWS certificates'}`}
            onClick={toggleCertificates}
            className="code-control code-control--purple inline-flex items-center gap-2 border border-[#c084fc]/35 bg-[#c084fc]/10 px-5 py-3 font-mono text-xs text-[#e9d5ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc]/60"
          >
            {showAll ? 'showLess()' : `seeAll(${activeCategory === 'All' ? "'all'" : "'aws'"})`}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}

      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Certificates
