import AuroraBackground from './components/background/AuroraBackground'
import LeftColumn from './components/layout/LeftColumn'
import RightColumn from './components/layout/RightColumn'

export default function App() {
  return (
    <>
      <AuroraBackground />
      <div className="layout">
        <LeftColumn />
        <RightColumn />
      </div>
    </>
  )
}
