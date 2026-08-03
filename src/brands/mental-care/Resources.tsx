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
      />

      <Section
        heading="Temas que cubrimos"
        intro="Publicamos orientación mensual escrita por nuestro equipo. Estos son los temas en los que nos enfocamos."
      >
        <div className="section-grid">
          {mc.resourceTopics.map((topic) => (
            <FeatureCard
              key={topic.name}
              title={topic.name}
              description={topic.description}
            />
          ))}
        </div>
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
