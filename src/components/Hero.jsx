export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__grid" />
      <div className="hero__radial" />

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="mono">hello, world — I'm</span>
        </div>

        <h1 className="hero__name">YUDI</h1>

        <p className="hero__alias mono">// COLDFINITY</p>

        <p className="hero__tagline">
          Student of AI, Machine Learning &amp; Mathematics
        </p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">View Work</a>
          <a href="#contact" className="btn btn--outline">Contact Me</a>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="mono">scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
