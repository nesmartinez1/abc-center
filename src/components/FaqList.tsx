import type { Faq } from '../content/types'
import './FaqList.css'

type FaqListProps = {
  faqs: Faq[]
}

/**
 * Accordion built on native <details>/<summary> — keyboard-accessible and
 * screen-reader friendly with no JavaScript. Renders nothing when empty.
 */
function FaqList({ faqs }: FaqListProps) {
  if (faqs.length === 0) return null

  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-item">
          <summary>
            {faq.question}
            <svg className="faq-chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default FaqList
