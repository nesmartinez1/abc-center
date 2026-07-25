import { Link } from 'react-router-dom'
import PlaceholderImage from './PlaceholderImage'
import FeatureCard from './FeatureCard'
import type { Brand } from '../config/brands'
import './BrandLanding.css'

type BrandLandingProps = {
  brand: Brand
  /**
   * Child programs to feature as linked cards (used by the Centro umbrella home
   * and the Foundation landing). When omitted, three generic "Próximamente"
   * placeholder cards are shown instead.
   */
  childBrands?: Brand[]
}

/**
 * Reusable prototype landing: full-width hero + intro + a grid of program cards
 * (or placeholders). Powers every section except Más Que Atletas, which has its
 * own bespoke pages. Themed automatically via the ancestor [data-brand].
 */
function BrandLanding({ brand, childBrands }: BrandLandingProps) {
  return (
    <div className="brand-landing">
      <section className="brand-hero">
        <PlaceholderImage label="Foto próximamente" fill />
        <div className="brand-hero-scrim" />
        <div className="brand-hero-content">
          {!brand.live && (
            <span className="brand-hero-badge">Vista previa · Próximamente</span>
          )}
          <h1>{brand.name}</h1>
          <p className="brand-hero-tagline">{brand.tagline}</p>
        </div>
      </section>

      <section className="brand-about">
        <div className="container brand-about-inner">
          <h2 className="brand-section-heading">Sobre el programa</h2>
          <p>{brand.blurb}</p>
        </div>
      </section>

      <section className="brand-programs">
        <div className="container">
          <h2 className="brand-section-heading">
            {childBrands ? 'Nuestros Programas' : 'Qué encontrarás aquí'}
          </h2>
          <div className="brand-programs-grid">
            {childBrands
              ? childBrands.map((child) => (
                  <FeatureCard
                    key={child.id}
                    title={child.name}
                    description={child.blurb}
                  >
                    <Link to={child.path} className="brand-landing-cta">
                      {child.live ? 'Visitar programa' : 'Ver vista previa'}
                    </Link>
                  </FeatureCard>
                ))
              : Array.from({ length: 3 }, (_, i) => (
                  <FeatureCard
                    key={i}
                    title="Sección en desarrollo"
                    description="El contenido de esta sección estará disponible próximamente. Esta es una vista previa de la estructura del sitio."
                  >
                    <span className="brand-landing-cta brand-landing-cta--muted">
                      Próximamente
                    </span>
                  </FeatureCard>
                ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BrandLanding
