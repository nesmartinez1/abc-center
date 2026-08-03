import { useState } from 'react'
import {
  donationAmounts,
  donationFrequencies,
  donationImpact,
  donationsEnabled,
} from '../content/foundation'
import './DonationTiers.css'

/**
 * ABC Foundation's donation UI.
 *
 * The whole flow is built and interactive — amount, custom amount, and
 * once/monthly — but **no payment processor is connected**. ABC asked for
 * Stripe and ATH Móvil; neither account exists yet, so `donationsEnabled` is
 * false in content/foundation.ts and the submit button is disabled and labelled
 * "Próximamente".
 *
 * When accounts exist, this component is where checkout gets wired in: flip the
 * flag and replace the button's no-op with a call to the processor.
 */
function DonationTiers() {
  const [amount, setAmount] = useState(donationAmounts[1] ?? donationAmounts[0])
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState(donationFrequencies[0].id)

  const isCustom = amount === 'otro'

  return (
    <div className="donation">
      <fieldset className="donation-group">
        <legend>Frecuencia</legend>
        <div className="donation-options">
          {donationFrequencies.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`donation-option ${frequency === f.id ? 'is-selected' : ''}`}
              aria-pressed={frequency === f.id}
              onClick={() => setFrequency(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="donation-group">
        <legend>Cantidad</legend>
        <div className="donation-options">
          {donationAmounts.map((a) => (
            <button
              key={a}
              type="button"
              className={`donation-option ${amount === a ? 'is-selected' : ''}`}
              aria-pressed={amount === a}
              onClick={() => setAmount(a)}
            >
              {a}
            </button>
          ))}
          <button
            type="button"
            className={`donation-option ${isCustom ? 'is-selected' : ''}`}
            aria-pressed={isCustom}
            onClick={() => setAmount('otro')}
          >
            Otro
          </button>
        </div>

        {isCustom && (
          <label className="donation-custom">
            <span>Cantidad personalizada</span>
            <input
              type="number"
              min="1"
              inputMode="decimal"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="0.00"
            />
          </label>
        )}
      </fieldset>

      {donationImpact.length > 0 && (
        <ul className="donation-impact">
          {donationImpact.map((item) => (
            <li key={item.amount}>
              <strong>{item.amount}</strong> {item.description}
            </li>
          ))}
        </ul>
      )}

      <div className="donation-actions">
        <button type="button" className="donation-submit" disabled={!donationsEnabled}>
          {donationsEnabled ? 'Continuar' : 'Próximamente'}
        </button>
        {!donationsEnabled && (
          <p className="donation-pending">
            Estamos habilitando nuestras plataformas de donación en línea. Mientras
            tanto, comunícate con nosotros para coordinar tu aportación.
          </p>
        )}
      </div>
    </div>
  )
}

export default DonationTiers
