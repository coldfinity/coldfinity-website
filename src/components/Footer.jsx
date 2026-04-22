export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span>© {year} COLDFINITY — YUDI</span>
      <div className="footer__right">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:wuyd0815@gmail.com">Email</a>
      </div>
    </footer>
  )
}
