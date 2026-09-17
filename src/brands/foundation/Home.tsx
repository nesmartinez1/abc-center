import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import { brands } from '../../config/brands'
import * as foundation from '../../content/foundation'
import BrandCardCta from '../../components/BrandCardCta'

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
        brand={brand}
        title={brand.name}
        tagline={foundation.intro}
        image={foundation.heroImage}
        imagePosition="center top"
      >
        <div className="page-hero-actions">
          <Link
            className="page-hero-cta page-hero-cta--primary"
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
              brand={initiative}
            >
              <BrandCardCta brand={initiative} />
            </FeatureCard>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default FoundationHome
