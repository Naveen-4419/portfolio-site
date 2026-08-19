import useReveal from '../../hooks/useReveal'
import './About.css'

export default function About() {
  const ref = useReveal()

  return (
    <section className="section about" id="about">
      <div className="container reveal" ref={ref}>
        <h2 className="eyebrow">About</h2>
        <p className="about__line">
          I'm a senior full-stack engineer — twelve years of Java, Spring Boot, React, and Angular,
          most of them spent on systems where mistakes are expensive: order pipelines and payments
          at scale, banking transactions, cloud platforms.
        </p>
        <p className="about__line">
          I care most about the part under the surface — clean service boundaries, events over
          tangled calls, and code a teammate can pick up without a tour guide.
        </p>
      </div>
    </section>
  )
}
