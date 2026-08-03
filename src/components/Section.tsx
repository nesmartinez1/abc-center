import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  /** Omit for an unheaded section (e.g. a lead paragraph). */
  heading?: string
  /** Optional intro paragraph under the heading. */
  intro?: string
  children?: ReactNode
  /** Tinted background, for alternating bands down a long page. */
  muted?: boolean
  /** Constrain to reading width (~820px) instead of the full container. */
  narrow?: boolean
  id?: string
}

/**
 * Standard content band: vertical rhythm, `.container` width, and the
 * accent-underlined heading used across the site.
 */
function Section({
  heading,
  intro,
  children,
  muted,
  narrow,
  id,
}: SectionProps) {
  return (
    <section className={`section ${muted ? 'section--muted' : ''}`} id={id}>
      <div className={`container ${narrow ? 'section-narrow' : ''}`}>
        {heading && <h2 className="section-title">{heading}</h2>}
        {intro && <p className="section-intro">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

export default Section
