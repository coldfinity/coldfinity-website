import { useEffect, useRef, useState } from 'react'

function TurtleSVG() {
  return (
    <svg width="80" height="52" viewBox="0 0 80 52" style={{ overflow: 'visible' }}>
      {/* Tail */}
      <ellipse cx="8" cy="29" rx="8" ry="5" fill="#c4a7e7" />

      {/* Legs — a & b alternate to create walking gait */}
      <rect className="turtle-leg-a" x="14" y="37" width="9" height="13" rx="4" fill="#c4a7e7" />
      <rect className="turtle-leg-b" x="26" y="37" width="9" height="13" rx="4" fill="#c4a7e7" />
      <rect className="turtle-leg-b" x="40" y="37" width="9" height="13" rx="4" fill="#c4a7e7" />
      <rect className="turtle-leg-a" x="52" y="37" width="9" height="13" rx="4" fill="#c4a7e7" />

      {/* Shell */}
      <ellipse cx="36" cy="26" rx="28" ry="18" fill="#eb6f92" />

      {/* Shell pattern */}
      <ellipse cx="34" cy="23" rx="17" ry="11" fill="none" stroke="#f6c177" strokeWidth="1.5" strokeOpacity="0.75" />
      <line x1="34" y1="12" x2="34" y2="34" stroke="#f6c177" strokeWidth="1.2" strokeOpacity="0.65" />
      <line x1="17" y1="23" x2="51" y2="23" stroke="#f6c177" strokeWidth="1.2" strokeOpacity="0.65" />
      <line x1="21" y1="13" x2="13" y2="29" stroke="#f6c177" strokeWidth="1" strokeOpacity="0.45" />
      <line x1="47" y1="13" x2="55" y2="29" stroke="#f6c177" strokeWidth="1" strokeOpacity="0.45" />

      {/* Head */}
      <ellipse cx="63" cy="22" rx="10" ry="9" fill="#c4a7e7" />

      {/* Eye */}
      <circle cx="67" cy="19" r="2.5" fill="#191724" />
      <circle cx="68" cy="18.5" r="0.9" fill="white" />

      {/* Smile */}
      <path d="M 60 25 Q 63 28.5 67 25" stroke="#191724" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Turtle() {
  const [pos, setPos] = useState(-100)
  const [dir, setDir] = useState(1)
  const posRef = useRef(-100)
  const dirRef = useRef(1)

  useEffect(() => {
    let raf
    const speed = 0.3

    const tick = () => {
      posRef.current += speed * dirRef.current

      if (posRef.current > window.innerWidth + 100) {
        dirRef.current = -1
        setDir(-1)
      } else if (posRef.current < -100) {
        dirRef.current = 1
        setDir(1)
      }

      setPos(posRef.current)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.2rem',
      left: pos,
      transform: `scaleX(${dir})`,
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 50,
      filter: 'drop-shadow(0 0 8px rgba(235, 111, 146, 0.4))',
    }}>
      <TurtleSVG />
    </div>
  )
}
