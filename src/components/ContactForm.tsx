import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './ContactForm.css'

type ContactFormProps = {
  /** Prefills "Asunto" — e.g. "Voluntariado — ABC Ocean Care". */
  defaultSubject?: string
  /** Replaces the message field's label and placeholder. */
  messageLabel?: string
  submitLabel?: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Plain-CSS contact form used by ABC Foundation and ABC Ocean Care.
 *
 * POSTs to the existing `/api/contact` handler, which is brand-agnostic
 * (nombre / email / telefono / asunto / mensaje) — the same endpoint Brilliant
 * Brains uses. That handler still has no credentials configured
 * (GMAIL_USER / GMAIL_APP_PASSWORD), so submissions currently fail and land in
 * the error state below. See .env.example.
 *
 * Note this is NOT reusable by Brilliant Brains, whose own form is Tailwind
 * markup scoped inside `.bb-scope`.
 */
function ContactForm({
  defaultSubject = '',
  messageLabel = 'Mensaje',
  submitLabel = 'Enviar',
}: ContactFormProps) {
  const empty = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: defaultSubject,
    mensaje: '',
  }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (response.ok) {
        setStatus('sent')
        setForm(empty)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label>
          <span>Nombre *</span>
          <input
            required
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </label>
        <label>
          <span>Email *</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
          />
        </label>
      </div>

      <div className="contact-form-row">
        <label>
          <span>Teléfono</span>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="787-000-0000"
          />
        </label>
        <label>
          <span>Asunto *</span>
          <input
            required
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            placeholder="Tema"
          />
        </label>
      </div>

      <label>
        <span>{messageLabel} *</span>
        <textarea
          required
          rows={6}
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos cómo podemos ayudarte"
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : submitLabel}
        </button>
        {status === 'sent' && (
          <p className="contact-form-ok" role="status">
            Gracias, te contactaremos pronto.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-form-error" role="alert">
            No pudimos enviar el mensaje. Intenta de nuevo más tarde o
            comunícate con nosotros directamente.
          </p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
