import { useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { OrderPaymentDiagram, DataAggregationDiagram, LegacyModernizationDiagram } from '../SystemDiagrams'
import './Systems.css'

const SYSTEMS = [
  {
    id: 'order-payment',
    title: 'Order-to-payment event pipeline',
    teaser: 'Event-driven settlement between order intake and payment capture.',
    Diagram: OrderPaymentDiagram,
    problem:
      'Order and payment state lived in two services that drifted out of sync under peak load, producing orders with no matching charge.',
    decision:
      'Replaced the synchronous call chain with a Kafka-backed pipeline: order-service emits orders.created, payment-ledger-service consumes it, writes the ledger, and emits PaymentCompleted back.',
    tradeoff:
      'Traded immediate consistency for throughput — the UI shows a pending state for a few hundred milliseconds while the event settles.',
  },
  {
    id: 'data-aggregation',
    title: 'Cross-environment data aggregation',
    teaser: 'Unified reporting across dev, test, and prod sources with independent schemas.',
    Diagram: DataAggregationDiagram,
    problem:
      'Leadership needed one view of activity across three environments that had each evolved their own schema and refresh cadence.',
    decision:
      'Built aggregation-svc as a scheduled normalizer that pulls from each source on its own cadence and lands a shared model behind admin-portal, rather than exposing sources directly.',
    tradeoff:
      'The portal trades real-time freshness for a stable contract — reporting lags the source systems by one sync interval.',
  },
  {
    id: 'legacy-modernization',
    title: 'Legacy platform modernization',
    teaser: 'Incremental extraction of a decade-old monolith without a stop-the-world rewrite.',
    Diagram: LegacyModernizationDiagram,
    problem:
      'A decade-old monolith handled orders, inventory, and billing in one deploy unit, making any single change risky to ship.',
    decision:
      'Introduced a strangler-facade that routes by path, letting orders-svc, inventory-svc, and billing-svc take over one capability at a time behind a single gateway.',
    tradeoff:
      'Favored shipping safety over migration speed — two architectures run side by side longer, adding short-term operational overhead for a rollback path at every step.',
  },
]

function SystemCard({ system, index }) {
  const [open, setOpen] = useState(index === 0)
  const ref = useReveal()
  const { Diagram } = system

  return (
    <li ref={ref} className="reveal system-card__item">
      <article className={`system-card ${open ? 'system-card--open' : ''}`}>
        <h3 className="system-card__heading-wrap">
          <button className="system-card__trigger" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <span className="system-card__heading">
              <span className="system-card__title">{system.title}</span>
              <span className="system-card__teaser">{system.teaser}</span>
            </span>
            <span className="system-card__toggle" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
          </button>
        </h3>

        <div className="system-card__panel">
          <div className="system-card__panel-inner">
            <div className="system-card__diagram">
              <Diagram />
            </div>
            <div className="system-card__copy">
              <p>
                <span className="eyebrow system-card__label">Problem</span>
                {system.problem}
              </p>
              <p>
                <span className="eyebrow system-card__label">Decision</span>
                {system.decision}
              </p>
              <p>
                <span className="eyebrow system-card__label">Trade-off</span>
                {system.tradeoff}
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default function Systems() {
  const headingRef = useReveal()

  return (
    <section className="section systems" id="systems">
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="eyebrow">Systems</p>
          <h2 className="section-heading">Three systems, expanded.</h2>
        </div>
        <ul className="system-card__list">
          {SYSTEMS.map((system, index) => (
            <SystemCard key={system.id} system={system} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
