import { useRef } from 'react'
import useReducedMotionPause from '../hooks/useReducedMotionPause'

function DiagramFrame({ viewBox, label, filterId, children }) {
  const svgRef = useRef(null)
  useReducedMotionPause(svgRef)

  return (
    <div className="diagram-scroll">
      <svg
        ref={svgRef}
        className="diagram"
        viewBox={viewBox}
        role="img"
        aria-label={label}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  )
}

function ServiceNode({ x, y, w, h, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="diagram__node" />
      <text x={x + w / 2} y={y + h / 2} className="diagram__label" textAnchor="middle" dominantBaseline="middle">
        {label}
      </text>
    </g>
  )
}

function InfraNode({ x, y, w, h, header, body }) {
  const headerH = 20
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="diagram__node" />
      <line x1={x} y1={y + headerH} x2={x + w} y2={y + headerH} className="diagram__node-divider" />
      <text
        x={x + w / 2}
        y={y + headerH / 2}
        className="diagram__header-label"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {header}
      </text>
      <text
        x={x + w / 2}
        y={y + headerH + (h - headerH) / 2}
        className="diagram__label"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {body}
      </text>
    </g>
  )
}

function StoreNode({ x, y, w, h, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="diagram__node" />
      <line x1={x} y1={y + h + 5} x2={x + w} y2={y + h + 5} className="diagram__node-baseplate" />
      <text x={x + w / 2} y={y + h / 2} className="diagram__label" textAnchor="middle" dominantBaseline="middle">
        {label}
      </text>
    </g>
  )
}

function Connector({ id, d }) {
  return <path id={id} d={d} className="diagram__connector" />
}

function EdgeLabel({ x, y, text, fontSize = 9 }) {
  const width = text.length * fontSize * 0.62 + 12
  const height = fontSize + 8
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        className="diagram__chip"
      />
      <text x={x} y={y + 0.5} className="diagram__edgelabel" textAnchor="middle" dominantBaseline="middle" style={{ fontSize }}>
        {text}
      </text>
    </g>
  )
}

function FlowDot({ pathId, dur, begin, filterId }) {
  const durNum = parseFloat(dur)
  const beginNum = parseFloat(begin)
  const trail = [
    { r: 3.2, opacity: 1, offset: 0, glow: true },
    { r: 2.1, opacity: 0.45, offset: durNum * 0.05, glow: false },
    { r: 1.3, opacity: 0.2, offset: durNum * 0.1, glow: false },
  ]
  return (
    <>
      {trail.map((dot, i) => (
        <circle
          key={i}
          r={dot.r}
          className="diagram__dot"
          style={{ opacity: dot.opacity }}
          filter={dot.glow ? `url(#${filterId})` : undefined}
        >
          <animateMotion dur={dur} begin={`${(beginNum - dot.offset).toFixed(2)}s`} repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      ))}
    </>
  )
}

export function OrderPaymentDiagram() {
  const f = 'opp-glow'
  return (
    <DiagramFrame viewBox="0 0 840 156" label="Order-to-Payment event pipeline architecture diagram" filterId={f}>
      <Connector id="opp-c1" d="M130,96 L240,96" />
      <Connector id="opp-c2" d="M390,96 L480,96" />
      <Connector id="opp-c3" d="M650,96 L720,96" />
      <Connector id="opp-return" d="M565,74 C565,30 70,30 70,74" />

      <ServiceNode x={10} y={74} w={120} h={44} label="order-service" />
      <InfraNode x={240} y={68} w={150} h={56} header="orders.created" body="kafka" />
      <ServiceNode x={480} y={74} w={170} h={44} label="payment-ledger-svc" />
      <StoreNode x={720} y={73} w={110} h={46} label="ledger-db" />

      <EdgeLabel x={185} y={83} text="publish" />
      <EdgeLabel x={435} y={83} text="consume" />
      <EdgeLabel x={685} y={83} text="write" />
      <EdgeLabel x={317.5} y={26} text="PaymentCompleted" />

      <FlowDot pathId="opp-c1" dur="2.8s" begin="0s" filterId={f} />
      <FlowDot pathId="opp-c2" dur="2.6s" begin="1.6s" filterId={f} />
      <FlowDot pathId="opp-c3" dur="2.4s" begin="3.1s" filterId={f} />
      <FlowDot pathId="opp-return" dur="3.6s" begin="1.1s" filterId={f} />
    </DiagramFrame>
  )
}

export function DataAggregationDiagram() {
  const f = 'cea-glow'
  return (
    <DiagramFrame viewBox="0 0 620 236" label="Cross-environment data aggregation architecture diagram" filterId={f}>
      <Connector id="cea-c1" d="M140,52 C175,52 175,118 210,118" />
      <Connector id="cea-c2" d="M140,118 L210,118" />
      <Connector id="cea-c3" d="M140,184 C175,184 175,118 210,118" />
      <Connector id="cea-c4" d="M380,118 L450,118" />

      <ServiceNode x={10} y={30} w={130} h={44} label="dev" />
      <ServiceNode x={10} y={96} w={130} h={44} label="test" />
      <ServiceNode x={10} y={162} w={130} h={44} label="prod" />
      <ServiceNode x={210} y={90} w={170} h={56} label="aggregation-svc" />
      <ServiceNode x={450} y={96} w={150} h={44} label="admin-portal" />

      <EdgeLabel x={175} y={105} text="pull" />
      <EdgeLabel x={415} y={105} text="sync" />

      <FlowDot pathId="cea-c1" dur="3.2s" begin="0s" filterId={f} />
      <FlowDot pathId="cea-c2" dur="2.6s" begin="0.9s" filterId={f} />
      <FlowDot pathId="cea-c3" dur="3.4s" begin="1.6s" filterId={f} />
      <FlowDot pathId="cea-c4" dur="2.4s" begin="2.6s" filterId={f} />
    </DiagramFrame>
  )
}

export function LegacyModernizationDiagram() {
  const f = 'lpm-glow'
  return (
    <DiagramFrame viewBox="0 0 840 236" label="Legacy platform modernization architecture diagram" filterId={f}>
      <Connector id="lpm-c1" d="M140,118 L210,118" />
      <Connector id="lpm-c2" d="M380,118 C420,118 420,52 470,52" />
      <Connector id="lpm-c3" d="M380,118 L470,118" />
      <Connector id="lpm-c4" d="M380,118 C420,118 420,184 470,184" />
      <Connector id="lpm-c5" d="M620,52 C660,52 660,118 710,118" />
      <Connector id="lpm-c6" d="M620,118 L710,118" />
      <Connector id="lpm-c7" d="M620,184 C660,184 660,118 710,118" />

      <ServiceNode x={10} y={96} w={130} h={44} label="monolith" />
      <ServiceNode x={210} y={96} w={170} h={44} label="strangler-facade" />
      <ServiceNode x={470} y={30} w={150} h={44} label="orders-svc" />
      <ServiceNode x={470} y={96} w={150} h={44} label="inventory-svc" />
      <ServiceNode x={470} y={162} w={150} h={44} label="billing-svc" />
      <ServiceNode x={710} y={96} w={110} h={44} label="gateway" />

      <EdgeLabel x={175} y={105} text="proxy" />
      <EdgeLabel x={420} y={105} text="route-by-path" />
      <EdgeLabel x={660} y={105} text="expose" />

      <FlowDot pathId="lpm-c1" dur="2.4s" begin="0s" filterId={f} />
      <FlowDot pathId="lpm-c2" dur="2.8s" begin="1.1s" filterId={f} />
      <FlowDot pathId="lpm-c3" dur="2.6s" begin="1.4s" filterId={f} />
      <FlowDot pathId="lpm-c4" dur="3s" begin="1.7s" filterId={f} />
      <FlowDot pathId="lpm-c5" dur="2.5s" begin="3.2s" filterId={f} />
      <FlowDot pathId="lpm-c6" dur="2.3s" begin="3.5s" filterId={f} />
      <FlowDot pathId="lpm-c7" dur="2.7s" begin="3.8s" filterId={f} />
    </DiagramFrame>
  )
}
