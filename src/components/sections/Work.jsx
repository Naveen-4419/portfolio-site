import useReveal from '../../hooks/useReveal'
import './Work.css'

const PROJECTS = [
  {
    name: 'order-to-payment-system',
    description: 'The event-driven pipeline behind the Systems case study — order intake, Kafka settlement, ledger.',
    tags: ['Java', 'Kafka', 'Spring Boot', 'PostgreSQL'],
    url: 'https://github.com/Naveen-4419/order-to-payment',
  },
  {
    name: 'portfolio-site',
    description: 'This site — React and Vite, warm split-screen layout, animated system diagrams.',
    tags: ['React', 'Vite', 'CSS'],
    url: 'https://github.com/Naveen-4419/portfolio-site',
  },
]

function MiniPreview() {
  return (
    <svg viewBox="0 0 220 90" className="work-preview__svg" role="presentation" aria-hidden="true">
      <path d="M28,45 L92,45" className="work-preview__line" />
      <path d="M128,45 L192,45" className="work-preview__line" />
      <rect x="6" y="27" width="52" height="36" rx="8" className="work-preview__node" />
      <rect x="94" y="20" width="60" height="50" rx="8" className="work-preview__node work-preview__node--fill" />
      <rect x="164" y="27" width="50" height="36" rx="8" className="work-preview__node" />
      <circle cx="60" cy="45" r="2.4" className="work-preview__dot" />
      <circle cx="160" cy="45" r="2.4" className="work-preview__dot" />
    </svg>
  )
}

function WorkCard({ project }) {
  const ref = useReveal()
  return (
    <li ref={ref} className="reveal work-card">
      <a
        className="work-card__link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="work-card__preview">
          <MiniPreview />
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
