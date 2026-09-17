import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import OfferingGrid from '../../components/OfferingGrid'
import * as mc from '../../content/mental-care'

/**
 * ⚠️ The service list rendered here is NOT confirmed by ABC — see the warning
 * at the top of content/mental-care.ts. The program stays `live: false` until
 * it is.
 */
function MentalCareServices() {
  return (
    <div>
      <PageHero
        compact
        title="Servicios"
        tagline="Evaluaciones, terapia y orientación profesional para cada etapa de la vida."
        image={mc.servicesHeroImage}
      />

      <Section
        heading="Nuestros servicios"
        intro="Trabajamos de forma individualizada para ofrecer un espacio seguro, confidencial y de apoyo. Comunícate con nosotros para orientación sobre el servicio que mejor responde a tu necesidad."
      >
        <OfferingGrid offerings={mc.services} />
      </Section>

      <Section heading="Citas y planes médicos" muted narrow>
        <p className="section-intro">
          El tiempo estimado para coordinar una primera cita es de{' '}
          <strong>{mc.waitTime}</strong>.
        </p>
        <p className="section-note">{mc.insuranceNote}</p>
        <a
          className="card-cta"
          href={mc.intakeFormUrl}
          target="_blank"
          rel="noreferrer"
        >
          Solicita una cita
        </a>
      </Section>
    </div>
  )
}

export default MentalCareServices
