import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'

const VerticalScroll = forwardRef(function VerticalScroll({ children }, ref) {
  const slides = Array.isArray(children) ? children : [children]
  const count = slides.length
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(0)
  const cooldown = useRef(false)
  const wheelAcc = useRef(0)

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(count - 1, idx))
    if (clamped === currentRef.current || cooldown.current) return
    currentRef.current = clamped
    setCurrent(clamped)
    cooldown.current = true
    setTimeout(() => { cooldown.current = false }, 1100)
  }, [count])

  useImperativeHandle(ref, () => ({ goToSection: goTo }), [goTo])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      wheelAcc.current += e.deltaY
      if (Math.abs(wheelAcc.current) > 60) {
        goTo(currentRef.current + (wheelAcc.current > 0 ? 1 : -1))
        wheelAcc.current = 0
      }
    }
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(currentRef.current + 1)
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(currentRef.current - 1)
    }
    let touchStartY = 0
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 40) goTo(currentRef.current + (dy > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo])

  return (
    <div className="vscroll-viewport">
      <div className="vscroll-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`vscroll-dot${i === current ? ' vscroll-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`vscroll-slide${
            i === current ? ' vscroll-slide--active' :
            i < current   ? ' vscroll-slide--past'   :
                            ' vscroll-slide--future'
          }`}
        >
          {slide}
        </div>
      ))}
    </div>
  )
})

export default VerticalScroll
