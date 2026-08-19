import useReveal from '../../hooks/useReveal'
import './About.css'

export default function About() {
  const ref = useReveal()

  return (
    <section className="section about" id="about">
      <div className="container reveal" ref={ref}>
        <h2 className="eyebrow">About</h2>
        <p className="about__line">
          I've spent the last twelve years turning messy, high-stakes systems — payments, order
          pipelines, a decade-old monolith — into things a team can trust at 2am.
        </p>
        <p className="about__line">
          I like the unglamorous work: naming things clearly, sketching the diagram before the code,
          and leaving a system easier to reason about than I found it.
        </p>
        <p className="about__line">Based in Pittsburgh, currently building event-driven platforms at Ansys.</p>
      </div>
    </section>
  )
}
