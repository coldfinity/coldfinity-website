import React, {
  useEffect, useRef, useCallback, useImperativeHandle, forwardRef
} from 'react'

// Renders 3 copies of all slides side-by-side.
// scrollX is always kept in the middle copy range [total, 2*total).
// Reaching the end silently normalises back to the equivalent position in the
// middle copy — the content is identical so the jump is invisible.

const HorizontalScroll = forwardRef(function HorizontalScroll({ children }, ref) {
  const trackRef  = useRef(null)
  const slideRefs = useRef([])
  const scrollRef = useRef(0)
  const velRef    = useRef(0)
  const rafRef    = useRef(null)

  const slides = React.Children.toArray(children)
  const count  = slides.length

  // Normalise any x value into [total, 2*total) using modulo
  const normalise = useCallback((x) => {
    const total = count * window.innerWidth
    return ((x - total) % total + total) % total + total
  }, [count])

  // Apply scroll + update all 3×count slide 3D transforms (pure DOM, no React state)
  const applyScroll = useCallback((x) => {
    const slideW = window.innerWidth
    const nx     = normalise(x)
    scrollRef.current = nx

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-nx}px)`
    }

  }, [count, normalise])

  // Momentum
  const runMomentum = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const tick = () => {
      if (Math.abs(velRef.current) < 0.3) { velRef.current = 0; return }
      velRef.current *= 0.91
      applyScroll(scrollRef.current + velRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [applyScroll])

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      const raw   = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      const delta = e.deltaMode === 0 ? raw : raw * 40

      // Accumulate velocity so scroll speed builds up momentum
      velRef.current += delta * 0.4
      const maxVel = window.innerWidth * 0.5
      velRef.current = Math.max(-maxVel, Math.min(maxVel, velRef.current))

      applyScroll(scrollRef.current + delta)
      runMomentum()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [applyScroll, runMomentum])

  // Arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) return
      e.preventDefault()
      velRef.current = (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : -1) * window.innerWidth * 0.06
      runMomentum()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [runMomentum])

  // Touch
  useEffect(() => {
    let sx = 0, ss = 0, lx = 0, lt = 0
    const onStart = (e) => {
      sx = e.touches[0].clientX; ss = scrollRef.current
      lx = sx; lt = Date.now()
      velRef.current = 0
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    const onMove = (e) => {
      const now = Date.now()
      velRef.current = (e.touches[0].clientX - lx) / (now - lt + 1) * -16
      lx = e.touches[0].clientX; lt = now
      applyScroll(ss + (sx - lx))
    }
    const onEnd = () => runMomentum()
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove',  onMove,  { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove',  onMove)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [applyScroll, runMomentum])

  // Navigate to section — always takes the shortest path around the loop
  const goToSection = useCallback((sectionIdx) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    velRef.current = 0
    const slideW = window.innerWidth
    const total  = count * slideW
    const from   = scrollRef.current
    const target = total + sectionIdx * slideW // equivalent position in middle copy

    // Pick shorter direction
    let dist = target - from
    if (Math.abs(dist) > total / 2) dist = dist > 0 ? dist - total : dist + total

    const duration = 900
    const t0       = performance.now()
    const ease     = (t) => 1 - Math.pow(1 - t, 4)
    const step     = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      applyScroll(from + dist * ease(p))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [count, applyScroll])

  useImperativeHandle(ref, () => ({ goToSection }), [goToSection])

  // Initialise in middle copy (slide 0)
  useEffect(() => {
    applyScroll(count * window.innerWidth)
  }, [applyScroll, count])

  // 3 copies of all slides
  const tripled = [...slides, ...slides, ...slides]

  return (
    <div className="hscroll-viewport">
      <div
        ref={trackRef}
        className="hscroll-track"
        style={{ width: `${count * 3 * 100}vw` }}
      >
        {tripled.map((slide, i) => (
          <div key={i} className="slide">{slide}</div>
        ))}
      </div>
    </div>
  )
})

export default HorizontalScroll
