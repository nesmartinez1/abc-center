// Hidden with the Únete page; the import is commented out with the section
// below (noUnusedLocals would flag it).
// import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import EventList from '../../components/EventList'
import * as oc from '../../content/ocean-care'

function OceanCareCalendar() {
  return (
    <div>
      <PageHero
        compact
        title="Calendario"
        tagline="Nuestras próximas actividades de conservación y educación."
        image={oc.calendarHeroImage}
      />

      <Section heading="Próximas actividades">
        <EventList events={oc.events} />
      </Section>

      {/* Hidden with the Únete page; uncomment with the Link import above. */}
      {/* <Section heading="No te pierdas la próxima" muted narrow>
        <p className="section-intro">
          Regístrate como voluntario y te contactaremos directamente cuando
          anunciemos nuevas fechas.
        </p>
        <Link to="/fundacion/ocean-care/unete" className="card-cta">
          Únete como voluntario
        </Link>
      </Section> */}
    </div>
  )
}

export default OceanCareCalendar
