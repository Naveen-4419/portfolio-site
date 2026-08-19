import './AuroraBackground.css'

export default function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--amber" />
      <div className="aurora__blob aurora__blob--coral" />
      <div className="aurora__blob aurora__blob--violet" />
    </div>
  )
}
