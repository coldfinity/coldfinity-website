import { useEffect, useRef } from 'react'

const stats = [
  { value: 'AI',  label: 'Focus Area'      },
  { value: 'ML',  label: 'Specialisation'  },
  { value: '∑',   label: 'Mathematics'     },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('revealed') },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function About() {
  const ref = useReveal()

  return (
    <div className="section-wrap">
      <section id="about" className="section">
        <div className="section__header reveal" ref={ref}>
          <span className="section__eyebrow mono">01. about me</span>
          <h2 className="section__title">Who I Am</h2>
        </div>

        <div className="about__content">
          <div className="about__stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="about__stat">
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label mono">{label}</span>
              </div>
            ))}
          </div>

          <div className="about__text">
            <p>
              I'm <strong>Yudi</strong>, known online as <strong>Coldfinity</strong> —
              a student pursuing <strong>Artificial Intelligence</strong>,{' '}
              <strong>Machine Learning</strong>, and <strong>Mathematics</strong>.
            </p>
            <p>
              I'm fascinated by the math that makes intelligent systems work — from
              linear algebra and calculus to probability and optimisation. I enjoy
              turning theory into code and building projects that sit at the
              intersection of research and real-world application.
            </p>
            <p>
              Outside of studying, I build side projects, explore new models and
              papers, and keep pushing to understand things more deeply.
              Always learning, always building.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <a href="#" className="btn btn--outline">Download CV</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
