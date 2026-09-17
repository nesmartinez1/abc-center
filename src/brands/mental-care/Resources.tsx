import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import FeatureCard from '../../components/FeatureCard'
import * as mc from '../../content/mental-care'

function MentalCareResources() {
  return (
    <div>
      <PageHero
        compact
        title="Recursos"
        tagline="Orientación práctica sobre salud mental para toda la familia."
        image={mc.resourcesHeroImage}
      />

      <Section
        heading="Profesionales disponibles"
        intro="Nuestro equipo interdisciplinario atiende la salud mental desde distintas especialidades, según lo que cada persona o familia necesite."
      >
        <div className="section-grid">
          {mc.resourceProfessionals.map((professional) => (
            <FeatureCard
              key={professional.name}
              title={professional.name}
              description={professional.description}
            />
          ))}
        </div>
        <p className="section-note">{mc.resourceProfessionalsNote}</p>
      </Section>

      <Section heading="Artículos" muted>
        {mc.articles.length > 0 ? (
          <div className="section-grid">
            {mc.articles.map((article) => (
              <FeatureCard
                key={article.title}
                title={article.title}
                description={article.summary}
              >
                {article.url && (
                  <a
                    className="card-cta"
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer artículo
                  </a>
                )}
              </FeatureCard>
            ))}
          </div>
        ) : (
          <p className="section-empty">
            Estamos preparando nuestros primeros artículos. Vuelve pronto o
            síguenos en redes sociales para no perdértelos.
          </p>
        )}
      </Section>
    </div>
  )
}

export default MentalCareResources
