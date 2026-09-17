import type { ReactNode } from 'react'
import BrandLogo from './BrandLogo'
import type { Brand } from '../config/brands'
import './FeatureCard.css'

type FeatureCardProps = {
  title: string
  description: string
  /**
   * Show this brand's logo above the title. Cards are white and generously
   * sized — the best-fitting surface these full lockups have.
   */
  brand?: Brand
  children?: ReactNode
}

function FeatureCard({ title, description, brand, children }: FeatureCardProps) {
  return (
    <div className="feature-card">
      {/* Rendered for any brand, not just ones with a logo: BrandLogo falls back
          to a placeholder, which keeps titles aligned across a grid even if one
          card's brand is missing its logo. */}
      {brand && (
        <div className="feature-card-logo">
          <BrandLogo brand={brand} decorative />
        </div>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  )
}

export default FeatureCard
