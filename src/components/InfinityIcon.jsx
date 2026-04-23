// Shared infinity SVG — used in hero (animated), navbar (logo), sections (background)
export default function InfinityIcon({
  width     = 100,
  stroke    = '#eb6f92',
  strokeWidth = 3,
  animated  = false,   // draws itself on mount
  gradient  = false,   // rose→iris gradient stroke
  className = '',
  style     = {},
}) {
  const height = width / 2
  const gradId = 'infinityGrad'
  const path   = 'M50,25 C50,13 62,5 72,12 C82,19 82,31 72,38 C62,45 50,37 50,25 C50,13 38,5 28,12 C18,19 18,31 28,38 C38,45 50,37 50,25'

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 50"
      fill="none"
      className={className}
      style={style}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#eb6f92" />
            <stop offset="50%"  stopColor="#c4a7e7" />
            <stop offset="100%" stopColor="#eb6f92" />
          </linearGradient>
        </defs>
      )}
      <path
        d={path}
        stroke={gradient ? `url(#${gradId})` : stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={animated ? {
          strokeDasharray:  1,
          strokeDashoffset: 1,
          animation: 'drawInfinity 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards',
        } : undefined}
      />
    </svg>
  )
}
