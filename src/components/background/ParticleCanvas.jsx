import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

const PARTICLE_COUNT = 40
const LINK_DISTANCE = 110
const COLORS = ['240, 165, 98', '226, 112, 122', '139, 109, 179']

function makeParticles(width, height) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    r: 0.8 + Math.random() * 1.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.25 + Math.random() * 0.35,
  }))
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const container = canvas.parentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let frameId = null

    function resize() {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = makeParticles(width, height)
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(240, 165, 98, ${0.08 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
      draw()
      frameId = requestAnimationFrame(step)
    }

    resize()
    draw()

    let resizeObserver
    if (!reduceMotion) {
      frameId = requestAnimationFrame(step)
    }
    resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(container)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
