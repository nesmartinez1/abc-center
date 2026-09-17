import type { ReactNode } from 'react'
import PlaceholderImage from './PlaceholderImage'
import BrandLogo from './BrandLogo'
import type { Brand } from '../config/brands'
import './PageHero.css'

type PageHeroProps = {
  title: ReactNode
  /** One-line supporting text under the title. */
  tagline?: string
  /** Shown above the title, e.g. "Vista previa · Próximamente". */
  badge?: string
  /**
   * Show this brand's logo above the title. Rendered on a white chip: the hero
   * sits on a dark scrim, and Mental Care's pale sage and Ocean Care's navy
   * would both disappear against it. The chip makes one treatment work for all.
   */
  brand?: Brand
  /**
   * Full-bleed background photo. Falls back to the placeholder frame for the
   * brands that haven't supplied photography yet.
   */
  image?: string
  /**
   * `object-position` for that photo. Default `center` suits a photograph, where
   * the subject is mid-frame. Foundation's hero is a promotional graphic with
   * its logos along the top edge, so it anchors to `center top` — whatever the
   * box crops comes off the bottom, never off the logos.
   */
  imagePosition?: string
  /** Buttons / links rendered under the tagline. */
  children?: ReactNode
  /** Shorter hero for sub-pages, which shouldn't each own a full viewport. */
  compact?: boolean
}

/**
 * Full-bleed hero shared by every plain-CSS page: background photo (placeholder
 * until real ones arrive), dark scrim, and centered text. Extracted from
 * BrandLanding so program sub-pages get the same header without duplicating it.
 */
function PageHero({
  title,
  tagline,
  badge,
  brand,
  image,
  imagePosition,
  children,
  compact,
}: PageHeroProps) {
  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`}>
      {image ? (
        /* Decorative: the <h1> beside it carries the meaning. Not lazy —
           this is the page's LCP element. */
        <img
          className="page-hero-photo"
          src={image}
          alt=""
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      ) : (
        <PlaceholderImage label="Foto próximamente" fill />
      )}
      <div className="page-hero-scrim" />
      <div className="page-hero-content">
        {badge && <span className="page-hero-badge">{badge}</span>}
        {brand?.logo && (
          <span className="brand-logo-chip">
            <BrandLogo brand={brand} decorative />
          </span>
        )}
        <h1>{title}</h1>
        {tagline && <p className="page-hero-tagline">{tagline}</p>}
        {children}
      </div>
    </section>
  )
}

export default PageHero
