import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import { brands } from '../../config/brands'

const initiatives = [
  brands['mas-que-atletas'],
  brands['ocean-care'],
  brands['abc-nutrition'],
]

function FoundationInitiatives() {
  return (
    <div>
      <PageHero
        compact
        title="Iniciativas"
        tagline="Proyectos de servicio, voluntariado y desarrollo social en toda la isla."
      />

      <Section
        heading="Programas de la fundación"
        intro="Cada iniciativa atiende una necesidad distinta de nuestras comunidades: el deporte como herramienta de desarrollo, la conservación de nuestros ecosistemas marinos y la nutrición como base del bienestar familiar."
      >
        <div className="section-grid">
          {initiatives.map((initiative) => (
            <FeatureCard
              key={initiative.id}
              title={initiative.name}
              description={initiative.blurb}
            >
              <Link to={initiative.path} className="card-cta">
                {initiative.live ? 'Visitar programa' : 'Ver vista previa'}
              </Link>
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section heading="¿Quieres colaborar?" muted narrow>
        <p className="section-intro">
          Puedes apoyar nuestras iniciativas mediante donaciones, voluntariado o
          aportaciones en especie.
        </p>
        <Link to="/fundacion/donar" className="card-cta">
          Conoce cómo ayudar
        </Link>
      </Section>
    </div>
  )
}

export default FoundationInitiatives
