import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    category: 'AI / ML',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    category: 'Mathematics',
    skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability', 'Optimisation'],
  },
  {
    category: 'Development',
    skills: ['React', 'Node.js', 'Git', 'Jupyter', 'Linux'],
  },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('revealed') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Skills() {
  const headerRef = useReveal()

  return (
    <div className="section-wrap">
      <section id="skills" className="section">
        <div className="section__header reveal" ref={headerRef}>
          <span className="section__eyebrow mono">03. skills</span>
          <h2 className="section__title">Tech Stack</h2>
        </div>

        <div className="skills__groups">
          {skillGroups.map(group => (
            <div key={group.category} className="skills__group">
              <span className="skills__category mono">{group.category}</span>
              <div className="skills__list">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
