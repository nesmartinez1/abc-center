import PlaceholderImage from './PlaceholderImage'
import type { Brand } from '../config/brands'
import './BrandLogo.css'

type BrandLogoProps = {
  brand: Brand
  /**
   * `full` is the complete lockup (symbol + wordmark) — use it at 100px+, on
   * light surfaces. `mark` is the cropped symbol, the only thing legible below
   * ~80px. See scripts/build-logos.py.
   */
  variant?: 'full' | 'mark'
  className?: string
  /**
   * Set when the brand name already appears as text right next to the logo, so
   * screen readers don't hear it twice.
   */
  decorative?: boolean
}

/**
 * Renders a brand's logo, falling back to the "Logo próximamente" placeholder
 * for brands that don't have one yet (today: ABC Nutrition). Call sites never
 * need to check.
 */
function BrandLogo({
  brand,
  variant = 'full',
  className = '',
  decorative = false,
}: BrandLogoProps) {
  const src = brand.logo?.[variant]
  const classes = ['brand-logo', `brand-logo--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  if (!src) {
    return (
      <PlaceholderImage
        label="Logo próximamente"
        ratio="1/1"
        className={classes}
      />
    )
  }

  return (
    <img
      src={src}
      alt={decorative ? '' : brand.name}
      aria-hidden={decorative || undefined}
      className={classes}
      loading="lazy"
      decoding="async"
    />
  )
}

export default BrandLogo
