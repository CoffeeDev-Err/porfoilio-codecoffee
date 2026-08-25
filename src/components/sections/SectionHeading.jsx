import Reveal from '../Reveal'

// Consistent eyebrow + title + optional description used atop each section.
function SectionHeading({ eyebrow, index, title, description, align = 'left', direction = 'up' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <Reveal direction={direction} className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-4 font-mono text-xs tracking-[0.14em]">
          {index && <span className="mr-3 text-[#c084fc]">{index}</span>}
          <span className="text-white/25">// </span>
          <span className="text-[#86efac]">{eyebrow.toLowerCase()}</span>
        </span>
      )}
      <h2 className="font-mono text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
        <span className="text-[#c084fc]">&lt;</span>
        {title}
        <span className="text-[#c084fc]"> /&gt;</span>
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl font-mono text-sm leading-7 text-white/55 sm:text-base ${align === 'center' ? 'mx-auto' : ''}`}>
          <span className="text-white/25">/* </span>
          {description}
          <span className="text-white/25"> */</span>
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeading
