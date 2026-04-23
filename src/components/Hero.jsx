export default function Hero({ goTo }) {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow mono">hello, world — I'm</p>
        <h1 className="hero__name">YUDI</h1>
        <p className="hero__alias mono">// COLDFINITY</p>
        <p className="hero__tagline">
          Student of AI, Machine Learning &amp; Mathematics
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => goTo?.(2)}>View Work</button>
          <button className="btn btn--outline" onClick={() => goTo?.(4)}>Contact Me</button>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="mono">scroll or arrow keys</span>
        <div className="hero__scroll-arrow">↓</div>
      </div>
    </section>
  )
}
