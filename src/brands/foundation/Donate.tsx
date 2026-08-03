import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import DonationTiers from '../../components/DonationTiers'
import * as foundation from '../../content/foundation'

/**
 * The donation flow is fully designed but NOT connected to a payment processor.
 * ABC asked for Stripe and ATH Móvil; neither account exists yet. See
 * `donationsEnabled` in content/foundation.ts.
 */
function FoundationDonate() {
  return (
    <div>
      <PageHero
        compact
        title="Donar"
        tagline="Tu aportación sostiene nuestras iniciativas comunitarias."
      />

      <Section
        heading="Haz una donación"
        intro="Cada aportación se destina directamente a nuestros programas de servicio, voluntariado y desarrollo social."
        narrow
      >
        <DonationTiers />
      </Section>

      <Section heading="Otras formas de ayudar" muted>
        <div className="section-grid">
          <article className="offering-card">
            <h3>Voluntariado</h3>
            <p className="offering-description">{foundation.volunteerNote}</p>
            <Link to="/fundacion/contacto" className="card-cta">
              Quiero ser voluntario
            </Link>
          </article>
          <article className="offering-card">
            <h3>Donaciones en especie</h3>
            <p className="offering-description">{foundation.inKindNote}</p>
            <Link to="/fundacion/contacto" className="card-cta">
              Coordinar una entrega
            </Link>
          </article>
        </div>
      </Section>
    </div>
  )
}

export default FoundationDonate
