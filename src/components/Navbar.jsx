import InfinityIcon from './InfinityIcon'

// Section indices: About=1, Projects=2, Skills=3, Contact=4
const links = [
  { label: 'About',    idx: 1 },
  { label: 'Projects', idx: 2 },
  { label: 'Skills',   idx: 3 },
  { label: 'Contact',  idx: 4 },
]

export default function Navbar({ goTo }) {
  return (
    <nav className="navbar navbar--scrolled">
      <button className="navbar__logo" onClick={() => goTo?.(0)} aria-label="Home">
        <InfinityIcon width={36} strokeWidth={4} />
      </button>
      <ul className="navbar__links">
        {links.map(({ label, idx }) => (
          <li key={label}>
            <button onClick={() => goTo?.(idx)}>{label}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
