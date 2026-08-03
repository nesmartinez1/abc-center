import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import ContactForm from '../../components/ContactForm'

function FoundationContact() {
  return (
    <div>
      <PageHero
        compact
        title="Contacto"
        tagline="Colabora, dona o propón una alianza con ABC Foundation."
      />

      <Section
        heading="Escríbenos"
        intro="Cuéntanos cómo te gustaría colaborar: voluntariado, donaciones en especie, alianzas o propuestas de proyectos comunitarios."
        narrow
      >
        <ContactForm
          defaultSubject="Colaboración — ABC Foundation"
          messageLabel="Cuéntanos"
        />
      </Section>
    </div>
  )
}

export default FoundationContact
