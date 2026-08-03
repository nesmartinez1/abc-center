import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import * as mc from '../../content/mental-care'

/**
 * Intake deliberately links out to ABC's own Google Form instead of posting to
 * this site's `/api/contact`.
 *
 * Two reasons: it's the channel ABC already uses, and a plain web form is not a
 * secure or appropriate place for someone to describe a mental-health concern.
 * Keeping intake off-site avoids collecting health information here at all.
 */
function MentalCareContact() {
  return (
    <div>
      <PageHero
        compact
        title="Contacto"
        tagline="Da el primer paso. Estamos aquí para acompañarte."
      />

      <Section heading="Solicita una cita" narrow>
        <p className="section-intro">
          Completa nuestro formulario de solicitud y nos comunicaremos contigo.
          El tiempo estimado de respuesta es de <strong>{mc.waitTime}</strong>.
        </p>
        <a
          className="card-cta"
          href={mc.intakeFormUrl}
          target="_blank"
          rel="noreferrer"
        >
          Abrir formulario de solicitud
        </a>
        <p className="section-note">
          Por tu privacidad, te pedimos <strong>no incluir información
          clínica o detalles de salud</strong> en el formulario. Solo
          necesitamos tus datos de contacto para comunicarnos contigo y
          coordinar una cita.
        </p>
      </Section>

      <Section heading="Planes médicos" muted narrow>
        <p className="section-intro">{mc.insuranceNote}</p>
      </Section>
    </div>
  )
}

export default MentalCareContact
