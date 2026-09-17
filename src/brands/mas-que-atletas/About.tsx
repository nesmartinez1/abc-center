import Section from '../../components/Section'
import * as mqa from '../../content/mas-que-atletas'

/**
 * Nosotros — misión, visión y propósito.
 *
 * Uses the shared Section component and the global `.section-split` layout
 * rather than MQA's bespoke page CSS, so it needs no stylesheet of its own.
 * Same misión/visión treatment as brands/centro/Home.tsx.
 */
function About() {
  return (
    <div className="about-page">
      <Section heading="Nosotros" narrow intro={mqa.aboutLead} />

      <Section muted>
        <div className="section-split">
          <div>
            <h2 className="section-title">Misión</h2>
            <p>{mqa.mission}</p>
          </div>
          <div>
            <h2 className="section-title">Visión</h2>
            <p>{mqa.vision}</p>
          </div>
        </div>
      </Section>

      <Section heading="Propósito" narrow>
        <p>{mqa.purpose}</p>
      </Section>
    </div>
  )
}

export default About
