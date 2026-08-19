import About from '../sections/About'
import Systems from '../sections/Systems'
import Experience from '../sections/Experience'
import Work from '../sections/Work'
import Skills from '../sections/Skills'
import Footer from '../sections/Footer'
import './RightColumn.css'

export default function RightColumn() {
  return (
    <main className="right-column">
      <About />
      <Systems />
      <Experience />
      <Work />
      <Skills />
      <Footer />
    </main>
  )
}
