import ShapeGrid from '../ShapeGrid'

function SiteBackground({ theme }) {
  const isLight = theme === 'light'

  return (
    <>
      <div className="fixed inset-0 z-0">
        <ShapeGrid
          speed={0.18}
          squareSize={38}
          direction="diagonal"
          borderColor={isLight ? '#E0D8E7' : '#2F293A'}
          hoverFillColor={isLight ? '#A78BFA' : '#94a3b8'}
          fadeColor={isLight ? '#F7F5FA' : '#120F17'}
          shape="hexagon"
          hoverTrailAmount={1}
        />
      </div>
      <div
        className={`pointer-events-none fixed inset-0 z-0 transition-colors duration-500 ${
          isLight
            ? 'bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_36%),linear-gradient(180deg,rgba(248,246,251,0.05),rgba(248,246,251,0.62))]'
            : 'bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.12),transparent_34%),linear-gradient(180deg,rgba(18,15,23,0.05),rgba(18,15,23,0.55))]'
        }`}
      />
    </>
  )
}

export default SiteBackground
