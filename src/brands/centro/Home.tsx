import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import StatGrid from '../../components/StatGrid'
import TeamGrid from '../../components/TeamGrid'
import TestimonialList from '../../components/TestimonialList'
import FaqList from '../../components/FaqList'
import PartnerLogos from '../../components/PartnerLogos'
import EventList from '../../components/EventList'
import Gallery from '../../components/Gallery'
import { brands } from '../../config/brands'
import * as centro from '../../content/centro'
import './Home.css'

const programs = [
  brands['brilliant-brains'],
  brands['mental-care'],
  brands.foundation,
]

/**
 * ABC Centro Familiar Integral — the umbrella home.
 *
 * Copy comes from content/centro.ts (ABC's own words). Sections whose content
 * ABC approved but hasn't supplied — estadísticas, testimonios, aliados, FAQ —
 * are wired to empty arrays and render nothing at all, so the page never shows
 * an empty shell. Filling them is a data edit in content/centro.ts.
 */
function CentroHome() {
  const { centro: brand } = brands

  return (
    <div className="centro-home">
      <PageHero
        title={brand.name}
        tagline={brand.tagline}
        badge={!brand.live ? 'Vista previa · Próximamente' : undefined}
      >
        <div className="page-hero-actions">
          <a
            className="page-hero-cta page-hero-cta--primary"
            href={centro.scheduleUrl}
            target="_blank"
            rel="noreferrer"
          >
            Agenda una cita
          </a>
          <a className="page-hero-cta page-hero-cta--secondary" href="#programas">
            Conoce nuestros programas
          </a>
        </div>
      </PageHero>

      <Section heading="Quiénes somos" narrow>
        <p className="centro-lead">{centro.intro}</p>
        <p className="centro-body">{centro.about}</p>
      </Section>

      <Section muted>
        <div className="section-split">
          <div>
            <h2 className="section-title">Misión</h2>
            <p>{centro.mission}</p>
          </div>
          <div>
            <h2 className="section-title">Visión</h2>
            <p>{centro.vision}</p>
          </div>
        </div>
      </Section>

      <Section heading="Nuestros valores">
        <div className="section-grid">
          {centro.values.map((value) => (
            <FeatureCard
              key={value.name}
              title={value.name}
              description={value.description}
            />
          ))}
        </div>
      </Section>

      <Section heading="Nuestros programas" id="programas" muted>
        <div className="section-grid">
          {programs.map((program) => (
            <FeatureCard
              key={program.id}
              title={program.name}
              description={program.blurb}
            >
              <Link to={program.path} className="card-cta">
                {program.live ? 'Visitar programa' : 'Ver vista previa'}
              </Link>
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section heading="Nuestra historia" narrow>
        <p className="centro-body">{centro.history}</p>
      </Section>

      {centro.stats.length > 0 && (
        <Section heading="Nuestro impacto" muted>
          <StatGrid stats={centro.stats} />
        </Section>
      )}

      <Section heading="Nuestro equipo">
        <TeamGrid members={centro.team} placeholderCount={3} />
      </Section>

      {centro.testimonials.length > 0 && (
        <Section heading="Lo que dicen las familias" muted>
          <TestimonialList testimonials={centro.testimonials} />
        </Section>
      )}

      <Section heading="Galería" muted>
        <Gallery placeholderCount={centro.galleryPlaceholderCount} />
      </Section>

      <Section heading="Próximos eventos">
        <EventList events={centro.events} />
      </Section>

      {centro.faqs.length > 0 && (
        <Section heading="Preguntas frecuentes" muted>
          <FaqList faqs={centro.faqs} />
        </Section>
      )}

      {centro.partners.length > 0 && (
        <Section heading="Nuestros aliados">
          <PartnerLogos partners={centro.partners} />
        </Section>
      )}
    </div>
  )
}

export default CentroHome
