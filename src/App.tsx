import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

import CentroHome from './brands/centro/Home'
import BrilliantBrainsHome from './brands/brilliant-brains/Home'
import MentalCareHome from './brands/mental-care/Home'
import FoundationHome from './brands/foundation/Home'
import OceanCareHome from './brands/ocean-care/Home'

// Más Que Atletas PR — the one fully-built program (its own bespoke pages).
import MqaHome from './brands/mas-que-atletas/Home'
import MqaSports from './brands/mas-que-atletas/Sports'
import MqaNews from './brands/mas-que-atletas/News'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Umbrella */}
        <Route index element={<CentroHome />} />

        {/* Top-level programs (prototypes) */}
        <Route path="brilliant-brains" element={<BrilliantBrainsHome />} />
        <Route path="mental-care" element={<MentalCareHome />} />

        {/* Foundation + its initiatives */}
        <Route path="fundacion">
          <Route index element={<FoundationHome />} />

          {/* Más Que Atletas PR (live) */}
          <Route path="mas-que-atletas">
            <Route index element={<MqaHome />} />
            <Route path="deportes" element={<MqaSports />} />
            <Route path="noticias" element={<MqaNews />} />
          </Route>

          {/* Ocean Care (prototype) */}
          <Route path="ocean-care" element={<OceanCareHome />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
