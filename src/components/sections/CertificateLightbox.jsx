import { useEffect, useRef, useState } from 'react'

// Full-screen viewer for a single certificate. Renders when `certificate` is
// set; closes on Escape, backdrop click, or the close button.
function CertificateLightbox({ certificate, onClose }) {
  const closeButtonRef = useRef(null)
  const [failedId, setFailedId] = useState(null)

  // Derive failure from the current certificate's id — resets automatically
  // when a different certificate opens, no effect/cascading render needed.
  const imageFailed = certificate ? failedId === certificate.id : false

  useEffect(() => {
    if (!certificate) return

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [certificate, onClose])

  if (!certificate) return null

  const { title, type, dateLabel, credentialId, note, issuer, image } = certificate

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} certificate`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="code-surface relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-white/12 bg-[#17131f] shadow-[0_40px_120px_rgba(0,0,0,0.6)] lg:flex-row"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-white/15 bg-black/60 text-white/70 transition hover:border-[#c084fc]/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Image */}
        <div className="flex min-h-[240px] flex-1 items-center justify-center overflow-auto bg-[#0d0b12] p-4 sm:p-6 lg:min-h-[420px]">
          {!imageFailed ? (
            <img
              src={image}
              alt={`${title} certificate`}
              onError={() => setFailedId(certificate.id)}
              className="max-h-[70vh] w-auto max-w-full object-contain shadow-lg"
            />
          ) : (
            <div
              className="flex aspect-[4/3] w-full max-w-md flex-col items-center justify-center gap-3 p-8 text-center"
              style={{ background: `linear-gradient(150deg, ${issuer.bg}, #0d0b12 85%)` }}
            >
              <span className="text-4xl font-bold uppercase tracking-[0.14em]" style={{ color: issuer.accent }}>
                {issuer.short}
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-white/40">Image coming soon</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full shrink-0 border-t border-white/10 p-6 font-mono sm:p-7 lg:w-80 lg:border-l lg:border-t-0">
          <span className="inline-flex items-center gap-2 border border-white/12 bg-white/5 px-3 py-1 text-[10px] text-white/70">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: issuer.accent }} />
            {issuer.label}
          </span>

          <p className="mt-5 text-xs text-[#c084fc]">const credential = &#123;</p>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{title}</h3>
          <p className="mt-2 text-xs text-white/45"><span className="text-[#93c5fd]">type:</span> &apos;{type}&apos;,</p>

          <dl className="mt-6 space-y-4 text-xs">
            <div>
              <dt className="text-[#93c5fd]">issued:</dt>
              <dd className="mt-0.5 text-white/85">{dateLabel}</dd>
            </div>
            {credentialId && (
              <div>
                <dt className="text-[#93c5fd]">credentialId:</dt>
                <dd className="mt-0.5 break-all font-mono text-[13px] text-white/85">{credentialId}</dd>
              </div>
            )}
            {note && (
              <div>
                <dt className="text-[#93c5fd]">note:</dt>
                <dd className="mt-0.5 text-white/70">{note}</dd>
              </div>
            )}
          </dl>
          <p className="mt-5 text-xs text-[#c084fc]">&#125;;</p>
        </div>
      </div>
    </div>
  )
}

export default CertificateLightbox
