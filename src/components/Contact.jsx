import { useState, useEffect, useRef } from 'react'

const socials = [
  { label: 'GitHub',   href: 'https://github.com/coldfinity'   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yudi-wu-34bb98192/'  },
  { label: 'Email',    href: 'mailto:wuyd0815@gmail.com' },
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const headerRef = useReveal()

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire up your form handler here (e.g. EmailJS, Formspree, or a backend endpoint)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="section-wrap">
      <section id="contact" className="section">
        <div className="section__header reveal" ref={headerRef}>
          <span className="section__eyebrow mono">04. contact</span>
          <h2 className="section__title">Let's Talk</h2>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <p className="contact__lead">
              Have a project in mind? Want to collaborate? Or just want to say
              hi — I'm always open to a good conversation.
            </p>
            <div className="contact__socials">
              {socials.map(({ label, href }) => (
                <a key={label} href={href} className="social-link mono" target="_blank" rel="noopener noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label mono">Name</label>
              <input
                className="form-input"
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label mono">Email</label>
              <input
                className="form-input"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label mono">Message</label>
              <textarea
                className="form-input form-textarea"
                value={form.message}
                onChange={set('message')}
                placeholder="What's on your mind?"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
