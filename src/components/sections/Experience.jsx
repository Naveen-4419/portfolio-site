import useReveal from '../../hooks/useReveal'
import './Experience.css'

const ENTRIES = [
  {
    range: '2024 — now',
    company: 'Ansys Inc',
    role: 'Senior Software Engineer',
    impact:
      'Building the Cloud Services Platform — an Angular 17 admin portal and Spring Boot services managing packages and accounts across environments.',
  },
  {
    range: '2023 — 2024',
    company: 'Photon Infotech / Citi Bank',
    role: 'Senior Software Engineer',
    impact:
      'Built banking-transaction platform features across React, Angular, and Spring — streaming transaction events through Kafka.',
  },
  {
    range: '2015 — 2021',
    company: 'Amazon',
    role: 'Software Development Engineer',
    impact:
      'Led a legacy migration and served as point of contact across Ordering, Address, and Payments — Java microservices, Kafka pipelines, AWS.',
  },
  {
    range: '2012 — 2015',
    company: 'Wipro Technologies',
    role: 'Project Engineer',
    impact: 'Built Spring Boot microservices on Pivotal Cloud Foundry, including a fraud transaction detection system.',
  },
]

function LogRow({ entry }) {
  const ref = useReveal()
  return (
    <li ref={ref} className="reveal exp-row">
      <span className="exp-row__range mono-label">{entry.range}</span>
      <span className="exp-row__content">
        <span className="exp-row__title-line">
          <span className="exp-row__company">{entry.company}</span>
          <span className="exp-row__role">{entry.role}</span>
        </span>
        <span className="exp-row__impact">{entry.impact}</span>
      </span>
    </li>
  )
}

export default function Experience() {
  const headingRef = useReveal()

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="eyebrow">Experience</p>
          <h2 className="section-heading">Twelve years, four teams.</h2>
        </div>
        <ul className="exp-log">
          {ENTRIES.map((entry) => (
            <LogRow key={entry.company} entry={entry} />
          ))}
        </ul>
      </div>
    </section>
  )
}
