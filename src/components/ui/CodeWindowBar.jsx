function CodeWindowBar({ filename, status, className = '' }) {
  return (
    <div className={`code-window-bar flex items-center border-b border-white/10 px-4 py-3 font-mono text-[10px] text-white/35 ${className}`}>
      <span className="mr-1.5 h-2.5 w-2.5 rounded-full bg-[#f87171]/75" />
      <span className="mr-1.5 h-2.5 w-2.5 rounded-full bg-[#fbbf24]/75" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]/75" />
      <span className="ml-3 truncate">{filename}</span>
      {status && (
        <span className="ml-auto flex items-center gap-1.5 pl-3 text-[#86efac]/70">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      )}
    </div>
  )
}

export default CodeWindowBar
