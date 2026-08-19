import ParticleCanvas from '../background/ParticleCanvas'
import Nav from './Nav'
import SocialLinks from './SocialLinks'
import './LeftColumn.css'

export default function LeftColumn() {
  return (
    <header className="left-column">
      <ParticleCanvas />
      <div className="left-column__content">
        <div className="left-column__top">
          <div className="left-column__intro">
            <h1 className="left-column__name">Naveen Pogakula</h1>
            <p className="left-column__title">Senior Full Stack Java Developer</p>
            <p className="left-column__thesis">
              I build the systems that quietly move money, orders, and data — and try to leave each one
              easier to trust than I found it.
            </p>
          </div>
          <Nav />
        </div>
        <SocialLinks />
      </div>
    </header>
  )
}
