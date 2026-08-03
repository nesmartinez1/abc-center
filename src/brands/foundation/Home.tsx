import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import { brands } from '../../config/brands'
import * as foundation from '../../content/foundation'

const initiatives = [
  brands['mas-que-atletas'],
  brands['ocean-care'],
  brands['abc-nutrition'],
]

function FoundationHome() {
  const brand = brands.foundation

  return (
    <div>
      <PageHero
        title={brand.name}
        tagline={foundation.intro}
        badge={!brand.live ? 'Vista previa · Próximamente' : undefined}
      >
        <div className="page-hero-actions">
          <Link
            className="page-hero-cta page-hero-cta--primary"
            to="/fundacion/donar"
          >
            Apoya nuestra misión
          </Link>
          <Link
            className="page-hero-cta page-hero-cta--secondary"
            to="/fundacion/iniciativas"
          >
            Ver iniciativas
          </Link>
        </div>
      </PageHero>

      <Section heading="Sobre la fundación" intro={foundation.about} narrow />

      <Section muted>
        <div className="section-split">
          <div>
            <h2 className="section-title">Misión</h2>
            <p>{foundation.mission}</p>
          </div>
          <div>
            <h2 className="section-title">Visión</h2>
            <p>{foundation.vision}</p>
          </div>
        </div>
      </Section>

      <Section heading="Nuestras iniciativas">
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
    </div>
  )
}

export default FoundationHome
