import { Link } from 'react-router-dom'
import type { Brand } from '../config/brands'

type BrandCardCtaProps = {
  brand: Brand
}

/**
 * The CTA at the foot of a program card.
 *
 * A brand that isn't `live` has no page worth visiting yet, so it renders an
 * inert "Próximamente" chip instead of a link — the same treatment the
 * "Programas" dropdown gives it. Shared by the four grids that list programs
 * (centro/Home, foundation/Home, foundation/Initiatives, BrandLanding) so they
 * can't drift apart and leave one of them linking to a hidden page.
 */
function BrandCardCta({ brand }: BrandCardCtaProps) {
  if (!brand.live) {
    return <span className="card-cta card-cta--muted">Próximamente</span>
  }

  return (
    <Link to={brand.path} className="card-cta">
      Visitar programa
    </Link>
  )
}

export default BrandCardCta
