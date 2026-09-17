import Section from '../../components/Section'
import * as mqa from '../../content/mas-que-atletas'

/**
 * Registro — a dedicated home for the interest form.
 *
 * The same pitch and link also sit in a card on the home page; this page exists
 * so the form is reachable from the sub-nav instead of only by scrolling. Both
 * read their copy from content/mas-que-atletas.ts so they stay in sync.
 */
function Register() {
  return (
    <div className="register-page">
      <Section heading="Registro de Interés" narrow intro={mqa.interestFormBlurb}>
        <p>
          El formulario toma pocos minutos. No tienes que comprometerte a nada:
          nos sirve para saber quién está interesado y avisarte cuando abramos
          inscripciones en tu zona.
        </p>
        <a
          className="card-cta"
          href={mqa.interestFormUrl}
          target="_blank"
          rel="noreferrer"
        >
          Completar formulario
        </a>
      </Section>
    </div>
  )
}

export default Register
