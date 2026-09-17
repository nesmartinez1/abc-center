// Hidden with the Únete page; the import is commented out with the section
// below (noUnusedLocals would flag it).
// import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import OfferingGrid from '../../components/OfferingGrid'
import * as oc from '../../content/ocean-care'

/**
 * ⚠️ The activity list is NOT confirmed — ABC listed these as "posibles
 * actividades". See the warning in content/ocean-care.ts.
 */
function OceanCareActivities() {
  return (
    <div>
      <PageHero
        compact
        title="Actividades"
        tagline="Educación ambiental y acción directa por nuestras costas."
        image={oc.activitiesHeroImage}
      />

      <Section
        heading="Qué hacemos"
        intro="Nuestras actividades combinan educación y acción comunitaria. Consulta el calendario para conocer las próximas fechas."
      >
        <OfferingGrid offerings={oc.activities} />
      </Section>

      {/* Hidden with the Únete page; uncomment with the Link import above. */}
      {/* <Section heading="¿Quieres participar?" muted narrow>
        <p className="section-intro">
          Nuestras actividades están abiertas a la comunidad. Regístrate como
          voluntario y te avisaremos de la próxima fecha.
        </p>
        <Link to="/fundacion/ocean-care/unete" className="card-cta">
          Únete como voluntario
        </Link>
      </Section> */}
    </div>
  )
}

export default OceanCareActivities
