import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import Gallery from '../../components/Gallery'
import { brands } from '../../config/brands'
import * as oc from '../../content/ocean-care'

function OceanCareHome() {
  const brand = brands['ocean-care']

  return (
    <div>
      <PageHero
        brand={brand}
        title={brand.name}
        tagline={oc.intro}
      >
        <div className="page-hero-actions">
          <Link
            className="page-hero-cta page-hero-cta--primary"
            to="/fundacion/ocean-care/unete"
          >
            Únete como voluntario
          </Link>
          <Link
            className="page-hero-cta page-hero-cta--secondary"
            to="/fundacion/ocean-care/actividades"
          >
            Ver actividades
          </Link>
        </div>
      </PageHero>

      <Section heading="Sobre el programa" intro={oc.about} narrow />

      <Section heading="Cómo participamos" muted>
        <div className="section-grid">
          <FeatureCard
            title="Actividades"
            description="Limpiezas de playa, talleres educativos, restauración ambiental y conservación de especies."
          >
            <Link to="/fundacion/ocean-care/actividades" className="card-cta">
              Ver actividades
            </Link>
          </FeatureCard>
          <FeatureCard
            title="Calendario"
            description="Consulta las próximas fechas y regístrate para participar en la actividad que más te interese."
          >
            <Link to="/fundacion/ocean-care/calendario" className="card-cta">
              Ver calendario
            </Link>
          </FeatureCard>
          <FeatureCard
            title="Voluntariado"
            description="Suma tu tiempo a la conservación de nuestras costas. Toda ayuda cuenta, sin importar la experiencia."
          >
            <Link to="/fundacion/ocean-care/unete" className="card-cta">
              Únete
            </Link>
          </FeatureCard>
        </div>
      </Section>

      <Section heading="Galería">
        <Gallery placeholderCount={oc.galleryPlaceholderCount} />
      </Section>
    </div>
  )
}

export default OceanCareHome
