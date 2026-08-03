import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import FeatureCard from './FeatureCard'
import type { Brand } from '../config/brands'
// Section.css owns the shared `.section-title` used below, and isn't pulled in
// by any component this page renders — import it explicitly or the heading is
// unstyled in dev (production bundles all CSS together and would hide this).
import './Section.css'
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
 * (or placeholders). Still powers the sections that have no bespoke pages of
 * their own. Themed automatically via the ancestor [data-brand].
 */
function BrandLanding({ brand, childBrands }: BrandLandingProps) {
  return (
    <div className="brand-landing">
      <PageHero
        title={brand.name}
        tagline={brand.tagline}
        badge={!brand.live ? 'Vista previa · Próximamente' : undefined}
      />

      <section className="brand-about">
        <div className="container brand-about-inner">
          <h2 className="section-title">Sobre el programa</h2>
          <p>{brand.blurb}</p>
        </div>
      </section>

      <section className="brand-programs">
        <div className="container">
          <h2 className="section-title">
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
                    <Link to={child.path} className="card-cta">
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
                    <span className="card-cta card-cta--muted">
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
