import { useEffect, useRef, useState } from 'react'
import useActiveSection from '../../hooks/useActiveSection'
import './Nav.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'systems', label: 'Systems' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
]

const IDS = SECTIONS.map((s) => s.id)

export default function Nav() {
  const activeId = useActiveSection(IDS)
  const listRef = useRef(null)
  const itemRefs = useRef({})
  const [indicator, setIndicator] = useState({ top: 0, height: 0 })

  useEffect(() => {
    const activeEl = itemRefs.current[activeId]
    const listEl = listRef.current
    if (!activeEl || !listEl) return

    const update = () => {
      const listRect = listEl.getBoundingClientRect()
      const itemRect = activeEl.getBoundingClientRect()
      setIndicator({ top: itemRect.top - listRect.top, height: itemRect.height })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [activeId])

  function handleClick(e, id) {
    e.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav className="nav" aria-label="Section navigation">
      <ul className="nav__list" ref={listRef}>
        <span
          className="nav__indicator"
          style={{ transform: `translateY(${indicator.top}px)`, height: `${indicator.height}px` }}
          aria-hidden="true"
        />
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              ref={(el) => { itemRefs.current[section.id] = el }}
              href={`#${section.id}`}
              className={`nav__link ${activeId === section.id ? 'nav__link--active' : ''}`}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
