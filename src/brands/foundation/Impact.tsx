import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import StatGrid from '../../components/StatGrid'
import TestimonialList from '../../components/TestimonialList'
import PartnerLogos from '../../components/PartnerLogos'
import * as foundation from '../../content/foundation'

/**
 * Every data source here is empty: ABC marked its impact figures "Tentativo"
 * and hasn't confirmed testimonials or allies. Rather than invent numbers, the
 * page states plainly that verified figures are on the way. Each section
 * appears the moment its array in content/foundation.ts is filled.
 */
function FoundationImpact() {
  const hasContent =
    foundation.stats.length > 0 ||
    foundation.testimonials.length > 0 ||
    foundation.partners.length > 0

  return (
    <div>
      <PageHero
        compact
        title="Impacto"
        tagline="El resultado del trabajo conjunto con nuestras comunidades."
      />

      {foundation.stats.length > 0 && (
        <Section heading="En números">
          <StatGrid stats={foundation.stats} />
        </Section>
      )}

      {foundation.testimonials.length > 0 && (
        <Section heading="Testimonios" muted>
          <TestimonialList testimonials={foundation.testimonials} />
        </Section>
      )}

      {foundation.partners.length > 0 && (
        <Section heading="Aliados y auspiciadores">
          <PartnerLogos partners={foundation.partners} />
        </Section>
      )}

      {!hasContent && (
        <Section heading="Midiendo nuestro impacto" narrow>
          <p className="section-intro">
            Estamos recopilando y verificando las cifras de participación y
            alcance de nuestras iniciativas. Publicaremos aquí nuestros
            resultados, testimonios de las familias que hemos acompañado y los
            aliados que hacen posible este trabajo.
          </p>
        </Section>
      )}
    </div>
  )
}

export default FoundationImpact
