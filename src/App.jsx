import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import HorizontalScroll from './components/HorizontalScroll'
import Turtle from './components/Turtle'
import './App.css'

function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + 'px'; dot.current.style.top  = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    const expand = () => ring.current?.classList.add('ring--hover')
    const shrink = () => ring.current?.classList.remove('ring--hover')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

// Section index map: Hero=0, About=1, Projects=2, Skills=3, Contact=4
export default function App() {
  const scrollRef = useRef(null)
  const goTo = (i) => scrollRef.current?.goToSection(i)

  return (
    <div className="app">
      <CustomCursor />
      <Navbar goTo={goTo} />
      <HorizontalScroll ref={scrollRef}>
        <Hero goTo={goTo} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </HorizontalScroll>
      <Turtle />
    </div>
  )
}
