import type { ReactNode } from 'react'
import type { Offering } from '../content/types'
import './OfferingGrid.css'

type OfferingGridProps = {
  offerings: Offering[]
  /** Rendered inside each card, e.g. a "Solicitar" link. */
  action?: (offering: Offering) => ReactNode
  emptyMessage?: string
}

/**
 * Card grid for services (Mental Care) and activities (Ocean Care).
 *
 * Every field except `name` is optional and omitted when blank — both lists are
 * still unconfirmed by ABC, so a card with only a name renders cleanly instead
 * of showing empty labels. See the warnings in content/mental-care.ts and
 * content/ocean-care.ts.
 */
function OfferingGrid({ offerings, action, emptyMessage }: OfferingGridProps) {
  if (offerings.length === 0) {
    return emptyMessage ? <p className="section-empty">{emptyMessage}</p> : null
  }

  const meta = (offering: Offering) =>
    [
      offering.audience && { label: 'Dirigido a', value: offering.audience },
      offering.modality && { label: 'Modalidad', value: offering.modality },
      offering.duration && { label: 'Duración', value: offering.duration },
      offering.frequency && { label: 'Frecuencia', value: offering.frequency },
      offering.price && { label: 'Costo', value: offering.price },
    ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="offering-grid">
      {offerings.map((offering) => {
        const rows = meta(offering)
        return (
          <article key={offering.name} className="offering-card">
            <h3>{offering.name}</h3>
            {offering.description && (
              <p className="offering-description">{offering.description}</p>
            )}
            {rows.length > 0 && (
              <dl className="offering-meta">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {offering.howToJoin && (
              <p className="offering-join">{offering.howToJoin}</p>
            )}
            {action?.(offering)}
          </article>
        )
      })}
    </div>
  )
}

export default OfferingGrid
