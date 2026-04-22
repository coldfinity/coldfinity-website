export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span>© {year} COLDFINITY — YUDI</span>
      <div className="footer__right">
        <a href="https://github.com/coldfinity" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/yudi-wu-34bb98192/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:wuyd0815@gmail.com">Email</a>
      </div>
    </footer>
  )
}
