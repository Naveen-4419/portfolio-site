import { useEffect, useState } from 'react'

export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const visibility = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio)
        })
        const mostVisible = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0]
        if (mostVisible && mostVisible[1] > 0) {
          setActiveId(mostVisible[0])
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
