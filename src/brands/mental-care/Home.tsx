import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import { brands } from '../../config/brands'
import * as mc from '../../content/mental-care'

function MentalCareHome() {
  const brand = brands['mental-care']

  return (
    <div>
      <PageHero
        title={brand.name}
        tagline={mc.intro}
        badge={!brand.live ? 'Vista previa · Próximamente' : undefined}
      >
        <div className="page-hero-actions">
          <a
            className="page-hero-cta page-hero-cta--primary"
            href={mc.intakeFormUrl}
            target="_blank"
            rel="noreferrer"
          >
            Solicita una cita
          </a>
          <Link
            className="page-hero-cta page-hero-cta--secondary"
            to="/mental-care/servicios"
          >
            Ver servicios
          </Link>
        </div>
      </PageHero>

      <Section heading="Sobre el programa" intro={mc.about} narrow />

      <Section heading="Cómo trabajamos" muted>
        <div className="section-grid">
          <FeatureCard
            title="Servicios"
            description="Evaluaciones, terapia y orientación profesional para niños, adolescentes, adultos y familias."
          >
            <Link to="/mental-care/servicios" className="card-cta">
              Ver servicios
            </Link>
          </FeatureCard>
          <FeatureCard
            title="Nuestro equipo"
            description="Profesionales licenciados que acompañan a cada paciente en un espacio seguro y confidencial."
          >
            <Link to="/mental-care/equipo" className="card-cta">
              Conoce al equipo
            </Link>
          </FeatureCard>
          <FeatureCard
            title="Recursos"
            description="Artículos y orientación sobre ansiedad, TDAH, crianza, manejo emocional y salud mental infantil."
          >
            <Link to="/mental-care/recursos" className="card-cta">
              Ver recursos
            </Link>
          </FeatureCard>
        </div>
      </Section>

      <Section heading="Junto a ABC Brilliant Brains" narrow>
        <p className="section-intro">{mc.relationshipWithBrilliantBrains}</p>
        <Link to="/brilliant-brains" className="card-cta">
          Conocer ABC Brilliant Brains
        </Link>
      </Section>
    </div>
  )
}

export default MentalCareHome
