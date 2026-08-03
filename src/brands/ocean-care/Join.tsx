import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import ContactForm from '../../components/ContactForm'
import * as oc from '../../content/ocean-care'

function OceanCareJoin() {
  return (
    <div>
      <PageHero
        compact
        title="Únete como voluntario"
        tagline="Suma tu tiempo a la conservación de nuestras costas."
      />

      <Section
        heading="Regístrate"
        intro={oc.volunteerNote}
        narrow
      >
        <ContactForm
          defaultSubject="Voluntariado — ABC Ocean Care"
          messageLabel="¿Por qué te interesa participar?"
          submitLabel="Enviar registro"
        />
      </Section>

      <Section heading="Requisitos de participación" muted narrow>
        <ul className="requirement-list">
          {oc.volunteerRequirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

export default OceanCareJoin
