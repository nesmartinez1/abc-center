import PlaceholderImage from '../../components/PlaceholderImage'
import FeatureCard from '../../components/FeatureCard'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <PlaceholderImage label="Foto próximamente" fill />
        <div className="home-hero-scrim" />
        <div className="home-hero-content">
          <h1>
            Formando Atletas.
            <br />
            Transformando Vidas.
          </h1>
          <p className="home-hero-sub">
            Desarrollando disciplina, liderazgo y confianza a través del
            deporte para niños y jóvenes de Puerto Rico.
          </p>
          <p className="home-hero-tagline">
            Más Que Un Deporte. Una Oportunidad.
          </p>
        </div>
      </section>

      <section className="home-about">
        <div className="container home-about-inner">
          <div className="home-about-media">
            <PlaceholderImage label="Foto próximamente" ratio="4/3" />
          </div>
          <div className="home-about-text">
            <h2 className="section-heading">
              Creando Líderes Dentro y Fuera del Campo
            </h2>
            <p>
              Más Que Atletas PR Inc. es una organización sin fines de lucro
              dedicada a brindar oportunidades deportivas y de desarrollo
              personal a niños y jóvenes de Puerto Rico. A través de clínicas,
              entrenamientos, mentoría y experiencias educativas, promovemos
              valores como la disciplina, el liderazgo, el trabajo en equipo,
              la resiliencia y el compromiso con la comunidad. Creemos que el
              deporte es mucho más que una competencia: es una herramienta
              para transformar vidas y abrir puertas hacia un mejor futuro.
            </p>
            <p className="home-tagline">Más Que Un Deporte. Una Oportunidad.</p>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="container">
          <div className="home-features-grid">
            <FeatureCard
              title="Programas Deportivos"
              description="Conoce nuestras clínicas y actividades deportivas diseñadas para desarrollar habilidades, disciplina y trabajo en equipo en niños y jóvenes."
            >
              <span className="feature-card-cta">Ver programas</span>
            </FeatureCard>
            <FeatureCard
              title="Registro de Interés"
              description="Completa nuestro formulario para recibir información sobre futuras clínicas, eventos deportivos y oportunidades disponibles en tu comunidad."
            >
              <span className="feature-card-cta">Próximamente</span>
            </FeatureCard>
            <FeatureCard
              title="Apoya Nuestra Misión"
              description="Tu apoyo nos ayuda a brindar más oportunidades deportivas a niños y jóvenes. Puedes colaborar mediante donaciones, auspicios o voluntariado."
            >
              <span className="feature-card-cta">Próximamente</span>
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
