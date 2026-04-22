import { useEffect, useRef, useState } from 'react'

function InfinityLogo() {
  return (
    <svg width="60" height="30" viewBox="0 0 100 50" fill="none">
      <path
        d="M50,25 C50,13 62,5 72,12 C82,19 82,31 72,38 C62,45 50,37 50,25 C50,13 38,5 28,12 C18,19 18,31 28,38 C38,45 50,37 50,25 Z"
        stroke="#eb6f92"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Turtle() {
  const [pos, setPos] = useState(-80)
  const posRef = useRef(-80)
  const dirRef = useRef(1)

  useEffect(() => {
    let raf
    const speed = 0.3

    const tick = () => {
      posRef.current += speed * dirRef.current
      if (posRef.current > window.innerWidth + 80) dirRef.current = -1
      else if (posRef.current < -80) dirRef.current = 1
      setPos(posRef.current)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="infinity-float" style={{ left: pos }}>
      <InfinityLogo />
    </div>
  )
}
