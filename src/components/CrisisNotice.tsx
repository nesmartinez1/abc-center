import { crisisLines } from '../content/mental-care'
import './CrisisNotice.css'

/**
 * Crisis-line banner for ABC Mental Care. ABC explicitly asked for this, and it
 * renders on *every* Mental Care page via MentalCareLayout — someone in crisis
 * should never have to navigate to find these numbers.
 *
 * Styled as a always-visible band rather than a dismissible alert on purpose.
 */
function CrisisNotice() {
  return (
    <aside className="crisis-notice" aria-label="Líneas de ayuda en crisis">
      <div className="container crisis-notice-inner">
        <p className="crisis-notice-lead">
          <strong>¿Estás en crisis?</strong> Si tú o alguien que conoces necesita
          ayuda inmediata, comunícate ahora:
        </p>
        <ul className="crisis-notice-lines">
          {crisisLines.map((line) => (
            <li key={line.number}>
              <a href={line.href}>
                <span className="crisis-number">{line.number}</span>
                <span className="crisis-name">{line.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default CrisisNotice
