import { useState, useEffect, useRef, useCallback } from 'react'
import InfinityScene from './components/InfinityScene'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './App.css'

const TOTAL = 5

export default function App() {
  const [section, setSection] = useState(0)
  const sectionRef = useRef(0)
  const cooldownRef = useRef(false)
  const accRef = useRef(0)

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
    if (clamped === sectionRef.current || cooldownRef.current) return
    sectionRef.current = clamped
    setSection(clamped)
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 1200)
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      accRef.current += e.deltaY
      if (Math.abs(accRef.current) > 60) {
        goTo(sectionRef.current + (accRef.current > 0 ? 1 : -1))
        accRef.current = 0
      }
    }
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(sectionRef.current + 1)
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(sectionRef.current - 1)
    }
    let ty = 0
    const onTouchStart = (e) => { ty = e.touches[0].clientY }
    const onTouchEnd   = (e) => {
      const dy = ty - e.changedTouches[0].clientY
      if (Math.abs(dy) > 40) goTo(sectionRef.current + (dy > 0 ? 1 : -1))
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

  const labels = ['Hero', 'About', 'Projects', 'Skills', 'Contact']

  return (
    <div className="app">
      <InfinityScene section={section} />
      <Navbar goTo={goTo} />

      {/* Dot nav */}
      <nav className="orbit-dots" aria-label="Section navigation">
        {labels.map((label, i) => (
          <button
            key={i}
            className={`orbit-dot${i === section ? ' orbit-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={label}
            title={label}
          />
        ))}
      </nav>

      {/* Section overlays — all stacked, only active is visible */}
      <div className={`section-overlay section-overlay--hero${section === 0 ? ' section-overlay--active' : ''}`}>
        <Hero goTo={goTo} />
      </div>
      <div className={`section-overlay section-overlay--content${section === 1 ? ' section-overlay--active' : ''}`}>
        <About />
      </div>
      <div className={`section-overlay section-overlay--content${section === 2 ? ' section-overlay--active' : ''}`}>
        <Projects />
      </div>
      <div className={`section-overlay section-overlay--content${section === 3 ? ' section-overlay--active' : ''}`}>
        <Skills />
      </div>
      <div className={`section-overlay section-overlay--content${section === 4 ? ' section-overlay--active' : ''}`}>
        <Contact />
      </div>
    </div>
  )
}
