import { useState } from 'react'

// A single certificate thumbnail. Shows the scanned image; if it fails to
// load, falls back to a branded placeholder so the grid never looks broken.
function CertificateCard({ certificate, onOpen, index = 0 }) {
  const { title, type, dateLabel, issuer, thumbnail } = certificate
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <button
      type="button"
      onClick={() => onOpen(certificate)}
      className="code-surface code-card group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#17131f]/75 text-left backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd]/60"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[10px] text-white/30">
        <span>certificate_{String(index + 1).padStart(2, '0')}.json</span>
        <span className="text-[#86efac]/70">verified</span>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/8">
        {!imageFailed ? (
          <img
            src={thumbnail}
            alt={`${title} certificate`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center"
            style={{ background: `linear-gradient(150deg, ${issuer.bg}, #0d0b12 85%)` }}
          >
            <span
              className="text-2xl font-bold uppercase tracking-[0.14em]"
              style={{ color: issuer.accent }}
            >
              {issuer.short}
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-white/40">Certificate</span>
          </div>
        )}

        {/* Issuer badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] text-white/85 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: issuer.accent }} />
          {issuer.short}
        </span>

        {/* View hint */}
        <span className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="bg-[#86efac] px-3 py-1 font-mono text-[10px] font-semibold text-[#120f17]">
            open()
          </span>
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-5 font-mono">
        <h3 className="text-sm font-semibold leading-snug text-white line-clamp-2">{title}</h3>
        <div className="mt-auto pt-4 text-[11px] text-white/45">
          <p className="truncate"><span className="text-[#c084fc]">type:</span> &apos;{type}&apos;</p>
          <p className="mt-1 text-white/35"><span className="text-[#93c5fd]">date:</span> {dateLabel}</p>
        </div>
      </div>
    </button>
  )
}

export default CertificateCard
