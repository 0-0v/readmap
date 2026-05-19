interface BookCoverProps {
  color: string
  className?: string
}
export function BookCover({ color, className = '' }: BookCoverProps) {
  return (
    <div
      className={`relative rounded-sm shadow-sm overflow-hidden ${className}`}
      style={{
        backgroundColor: color,
      }}
    >
      {/* Spine highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-white/10 mix-blend-overlay" />
      <div className="absolute left-[10%] top-0 bottom-0 w-px bg-black/10" />

      {/* Subtle texture gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/10" />
    </div>
  )
}
