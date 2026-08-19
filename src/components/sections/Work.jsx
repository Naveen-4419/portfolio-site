import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import useReducedMotionPause from '../../hooks/useReducedMotionPause'
import useMediaQuery from '../../hooks/useMediaQuery'
import './Work.css'

const PROJECTS = [
  {
    name: 'order-to-payment-system',
    description: 'The event-driven pipeline behind the Systems case study — order intake, Kafka settlement, ledger.',
    tags: ['Java', 'Kafka', 'Spring Boot', 'PostgreSQL'],
    url: 'https://github.com/Naveen-4419/order-to-payment',
    Preview: OrderToPaymentPreview,
  },
  {
    name: 'portfolio-site',
    description: 'This site — React and Vite, warm split-screen layout, animated system diagrams.',
    tags: ['React', 'Vite', 'CSS'],
    url: 'https://github.com/Naveen-4419/portfolio-site',
    Preview: PortfolioSitePreview,
  },
]

function OrderToPaymentPreview() {
  const svgRef = useRef(null)
  useReducedMotionPause(svgRef)
  const compact = useMediaQuery('(max-width: 480px)')

  const nodes = compact
    ? [
        { x: 4, w: 62, label: 'order-svc' },
        { x: 88, w: 40, label: 'kafka' },
        { x: 150, w: 68, label: 'ledger-svc' },
      ]
    : [
        { x: 4, w: 62, label: 'order-svc' },
        { x: 86, w: 40, label: 'kafka' },
        { x: 146, w: 68, label: 'ledger-svc' },
        { x: 234, w: 30, label: 'db' },
      ]

  const cy = 32
  const nodeH = 30
  const nodeY = cy - nodeH / 2
  const viewW = compact ? 222 : 268
  const centers = nodes.map((n) => n.x + n.w / 2)
  const flowPath = `M${centers.map((cx) => `${cx},${cy}`).join(' L')}`
  const flowId = compact ? 'otp-flow-compact' : 'otp-flow-full'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewW} 64`}
      className="work-preview__svg"
      role="img"
      aria-label="order-svc publishes to Kafka, consumed by ledger-svc, written to the database"
    >
      {nodes.slice(0, -1).map((n, i) => {
        const next = nodes[i + 1]
        const start = n.x + n.w
        const end = next.x
        return (
          <g key={n.label}>
            <path d={`M${start},${cy} L${end},${cy}`} className="work-preview__line" />
            <circle cx={(start + end) / 2} cy={cy} r="2" className="work-preview__dot" />
          </g>
        )
      })}

      <path d={flowPath} id={flowId} className="work-preview__flow-path" />
      <circle r="2.4" className="work-preview__dot work-preview__flow-dot">
        <animateMotion dur="7s" repeatCount="indefinite">
          <mpath href={`#${flowId}`} />
        </animateMotion>
      </circle>

      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={nodeY} width={n.w} height={nodeH} rx="7" className="work-preview__node" />
          <text x={n.x + n.w / 2} y={cy} className="work-preview__node-label" textAnchor="middle" dominantBaseline="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function PortfolioSitePreview() {
  return (
    <svg viewBox="0 0 220 90" className="work-preview__svg" role="presentation" aria-hidden="true">
      <rect x="16" y="14" width="18" height="62" rx="5" className="work-preview__node work-preview__node--fill" />
      <path d="M54,28 L188,28" className="work-preview__line" />
      <path d="M54,45 L168,45" className="work-preview__line" />
      <path d="M54,62 L148,62" className="work-preview__line" />
    </svg>
  )
}

function WorkCard({ project }) {
  const ref = useReveal()
  const { Preview } = project
  return (
    <li ref={ref} className="reveal work-card">
      <a
        className="work-card__link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="work-card__preview">
          <Preview />
        </div>
        <div className="work-card__body">
          <div className="work-card__meta">
            <span className="work-card__name mono-label">{project.name}</span>
            <span className="work-card__status mono-label">
              github <span className="work-card__arrow">→</span>
            </span>
          </div>
          <p className="work-card__description">{project.description}</p>
          <ul className="work-card__tags">
            {project.tags.map((tag) => (
              <li key={tag} className="mono-label">{tag}</li>
            ))}
          </ul>
        </div>
      </a>
    </li>
  )
}

export default function Work() {
  const headingRef = useReveal()

  return (
    <section className="section work" id="work">
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-heading">Two repos worth pointing at.</h2>
        </div>
        <ul className="work-grid">
          {PROJECTS.map((project) => (
            <WorkCard key={project.name} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}
