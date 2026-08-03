import type { Partner } from '../content/types'
import './PartnerLogos.css'

type PartnerLogosProps = {
  partners: Partner[]
}

/**
 * Ally / sponsor strip. Falls back to the partner's name when no logo file has
 * been supplied, so a confirmed name can ship before its artwork does.
 */
function PartnerLogos({ partners }: PartnerLogosProps) {
  if (partners.length === 0) return null

  return (
    <ul className="partner-logos">
      {partners.map((partner) => {
        const content = partner.logo ? (
          <img src={partner.logo} alt={partner.name} loading="lazy" />
        ) : (
          <span className="partner-name">{partner.name}</span>
        )

        return (
          <li key={partner.name} className="partner-item">
            {partner.url ? (
              <a href={partner.url} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default PartnerLogos
