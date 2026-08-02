import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

import CentroHome from './brands/centro/Home'
import MentalCareHome from './brands/mental-care/Home'
import FoundationHome from './brands/foundation/Home'
import OceanCareHome from './brands/ocean-care/Home'

// Más Que Atletas PR — fully built, ported from the standalone MQA repo.
import MqaHome from './brands/mas-que-atletas/Home'
import MqaSports from './brands/mas-que-atletas/Sports'
import MqaNews from './brands/mas-que-atletas/News'

// ABC Brilliant Brains — fully built, ported from the standalone
// abc_brilliant_brains repo. Its own layout route supplies the `.bb-scope`
// wrapper that confines Tailwind to this subtree.
import BrilliantBrainsLayout from './brands/brilliant-brains/Layout'
import BrilliantBrainsHome from './brands/brilliant-brains/Home'
import BrilliantBrainsServices from './brands/brilliant-brains/Services'
import BrilliantBrainsWorkshops from './brands/brilliant-brains/Workshops'
import BrilliantBrainsAbout from './brands/brilliant-brains/About'
import BrilliantBrainsContact from './brands/brilliant-brains/Contact'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Umbrella */}
        <Route index element={<CentroHome />} />

        {/* ABC Brilliant Brains (live) */}
        <Route path="brilliant-brains" element={<BrilliantBrainsLayout />}>
          <Route index element={<BrilliantBrainsHome />} />
          <Route path="servicios" element={<BrilliantBrainsServices />} />
          <Route path="talleres" element={<BrilliantBrainsWorkshops />} />
          <Route path="nosotros" element={<BrilliantBrainsAbout />} />
          <Route path="contacto" element={<BrilliantBrainsContact />} />
        </Route>

        {/* Top-level programs (prototypes) */}
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
