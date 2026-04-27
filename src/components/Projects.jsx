import { useEffect, useRef } from 'react'
import InfinityIcon from './InfinityIcon'


const projects = [
  {
    num: '01',
    title: 'Transformer from Scratch',
    description:
      'Integrated/Replicated "Attention is all you need" by Google from sratch.',
    tech: ['Python', 'Pytorch', 'Tokenizer'],
    live: '#',
    repo: 'https://github.com/coldfinity/transformer-from-scratch',
  },
  {
    num: '02',
    title: 'Neural Network from Scratch',
    description:
      'Full MLP in C++ with no libtorch, eigen, ... . ',
    tech: ['C++'],
    live: '#',
    repo: '#',
  },
  {
    num: '03',
    title: 'ResNet from Scratch',
    description:
      'A creative experiment at the intersection of design and code. What did you explore? What surprised you while building it?',
    tech: ['Python', 'Pytorch'],
    live: '#',
    repo: '#',
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

function ProjectCard({ project, index }) {
  const ref = useReveal()
  return (
    <article
      className={`project-card reveal reveal-delay-${index + 1}`}
      ref={ref}
    >
      <span className="project-card__num mono">{project.num}</span>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tech">
        {project.tech.map(t => (
          <span key={t} className="tech-badge mono">{t}</span>
        ))}
      </div>
      <div className="project-card__links">
        <a href={project.live} className="project-card__link mono">Live ↗</a>
        <a href={project.repo} className="project-card__link mono">Repo ↗</a>
      </div>
      <div className="project-card__glow" />
    </article>
  )
}

export default function Projects() {
  const headerRef = useReveal()

  return (
    <div className="section-wrap">
      <InfinityIcon width={700} strokeWidth={1} className="infinity-bg-svg" style={{ top: '50%', left: '55%', transform: 'translate(-50%, -50%) rotate(10deg)' }} />
      <section id="projects" className="section">
        <div className="section__header reveal" ref={headerRef}>
          <span className="section__eyebrow mono">02. projects</span>
          <h2 className="section__title">Selected Work</h2>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
