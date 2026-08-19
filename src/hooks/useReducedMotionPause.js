import { useEffect } from 'react'

export default function useReducedMotionPause(svgRef) {
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (query.matches) {
        svg.pauseAnimations()
      } else {
        svg.unpauseAnimations()
      }
    }

    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [svgRef])
}
