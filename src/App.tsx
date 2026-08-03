import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

import CentroHome from './brands/centro/Home'

// ABC Mental Care — its own layout adds the crisis-line banner to every page.
import MentalCareLayout from './brands/mental-care/Layout'
import MentalCareHome from './brands/mental-care/Home'
import MentalCareServices from './brands/mental-care/Services'
import MentalCareTeam from './brands/mental-care/Team'
import MentalCareResources from './brands/mental-care/Resources'
import MentalCareContact from './brands/mental-care/Contact'

// ABC Foundation
import FoundationHome from './brands/foundation/Home'
import FoundationInitiatives from './brands/foundation/Initiatives'
import FoundationImpact from './brands/foundation/Impact'
import FoundationDonate from './brands/foundation/Donate'
import FoundationContact from './brands/foundation/Contact'

// ABC Ocean Care
import OceanCareHome from './brands/ocean-care/Home'
import OceanCareActivities from './brands/ocean-care/Activities'
import OceanCareCalendar from './brands/ocean-care/Calendar'
import OceanCareJoin from './brands/ocean-care/Join'

// ABC Nutrition — announced only; generic prototype landing.
import AbcNutritionHome from './brands/abc-nutrition/Home'

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

        {/* ABC Mental Care */}
        <Route path="mental-care" element={<MentalCareLayout />}>
          <Route index element={<MentalCareHome />} />
          <Route path="servicios" element={<MentalCareServices />} />
          <Route path="equipo" element={<MentalCareTeam />} />
          <Route path="recursos" element={<MentalCareResources />} />
          <Route path="contacto" element={<MentalCareContact />} />
        </Route>

        {/* ABC Foundation + its initiatives */}
        <Route path="fundacion">
          <Route index element={<FoundationHome />} />
          <Route path="iniciativas" element={<FoundationInitiatives />} />
          <Route path="impacto" element={<FoundationImpact />} />
          <Route path="donar" element={<FoundationDonate />} />
          <Route path="contacto" element={<FoundationContact />} />

          {/* Más Que Atletas PR (live) */}
          <Route path="mas-que-atletas">
            <Route index element={<MqaHome />} />
            <Route path="deportes" element={<MqaSports />} />
            <Route path="noticias" element={<MqaNews />} />
          </Route>

          {/* ABC Ocean Care */}
          <Route path="ocean-care">
            <Route index element={<OceanCareHome />} />
            <Route path="actividades" element={<OceanCareActivities />} />
            <Route path="calendario" element={<OceanCareCalendar />} />
            <Route path="unete" element={<OceanCareJoin />} />
          </Route>

          {/* ABC Nutrition (announced) */}
          <Route path="abc-nutrition" element={<AbcNutritionHome />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
