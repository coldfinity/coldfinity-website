import React, {
  useEffect, useRef, useCallback, useImperativeHandle, forwardRef
} from 'react'

const HorizontalScroll = forwardRef(function HorizontalScroll({ children }, ref) {
  const trackRef = useRef(null)
  const idxRef  = useRef(1)   // start at 1 — position 0 is the clone of the last slide
  const lockRef = useRef(false)

  const slides = React.Children.toArray(children)
  const count  = slides.length

  // Layout: [clone-of-last] [slide 0..n-1] [clone-of-first]
  const allSlides = [
    <div className="slide" key="clone-last">  {slides[count - 1]}</div>,
    ...slides.map((s, i) => <div className="slide" key={i}>{s}</div>),
    <div className="slide" key="clone-first">{slides[0]}</div>,
  ]

  const moveTo = useCallback((i, animate = true) => {
    const track = trackRef.current
    if (!track) return
    if (!animate) {
      track.style.transition = 'none'
      track.getBoundingClientRect() // flush layout so the jump is instant
    } else {
      track.style.transition = 'transform 0.72s cubic-bezier(0.77, 0, 0.175, 1)'
    }
    track.style.transform = `translateX(calc(${-i} * 100vw))`
    idxRef.current = i
  }, [])

  const next = useCallback(() => {
    if (lockRef.current) return
    lockRef.current = true
    const to = idxRef.current + 1
    moveTo(to)
    setTimeout(() => {
      if (to === count + 1) moveTo(1, false) // clone-of-first → real first
      lockRef.current = false
    }, 740)
  }, [count, moveTo])

  const prev = useCallback(() => {
    if (lockRef.current) return
    lockRef.current = true
    const to = idxRef.current - 1
    moveTo(to)
    setTimeout(() => {
      if (to === 0) moveTo(count, false) // clone-of-last → real last
      lockRef.current = false
    }, 740)
  }, [count, moveTo])

  const goToSection = useCallback((sectionIdx) => {
    if (lockRef.current) return
    lockRef.current = true
    moveTo(sectionIdx + 1) // +1 because clone-of-last sits at position 0
    setTimeout(() => { lockRef.current = false }, 740)
  }, [moveTo])

  useImperativeHandle(ref, () => ({ goToSection }), [goToSection])

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (d > 15) next()
      else if (d < -15) prev()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev])

  // Arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); next() }
      if (['ArrowLeft',  'ArrowUp'  ].includes(e.key)) { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Touch / swipe
  useEffect(() => {
    let sx = 0
    const onStart = (e) => { sx = e.touches[0].clientX }
    const onEnd   = (e) => {
      const dx = sx - e.changedTouches[0].clientX
      if (dx >  60) next()
      if (dx < -60) prev()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [next, prev])

  return (
    <div className="hscroll-viewport">
      <div
        ref={trackRef}
        className="hscroll-track"
        style={{ width: `${allSlides.length * 100}vw`, transform: 'translateX(-100vw)' }}
      >
        {allSlides}
      </div>
    </div>
  )
})

export default HorizontalScroll
