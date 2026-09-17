import { Link } from 'react-router-dom'
import FeatureCard from '../../components/FeatureCard'
import BrandLogo from '../../components/BrandLogo'
import { brands } from '../../config/brands'
import * as mqa from '../../content/mas-que-atletas'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        {/* Decorative: the <h1> beside it carries the meaning. Not lazy —
            this is the page's LCP element. */}
        <img
          className="home-hero-photo"
          src="/photos/mas-que-atletas/hero.webp"
          alt=""
        />
        <div className="home-hero-scrim" />
        <div className="home-hero-content">
          {/* This page has its own hero rather than the shared PageHero, so the
              logo chip is repeated here. Same treatment: the lockup's blue and
              green wordmark is unreadable against the dark scrim without it. */}
          <span className="brand-logo-chip">
            <BrandLogo brand={brands['mas-que-atletas']} decorative />
          </span>
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
            <img
              className="home-about-photo"
              src="/photos/mas-que-atletas/about.webp"
              alt="Tres integrantes de Más Que Atletas PR, en uniforme, unen las manos en el centro."
              loading="lazy"
            />
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
              title="Nosotros"
              description="Conoce nuestra misión, visión y el propósito que guía cada clínica, entrenamiento y experiencia que ofrecemos a niños y jóvenes."
            >
              <Link
                to="/fundacion/mas-que-atletas/nosotros"
                className="feature-card-cta"
              >
                Conócenos
              </Link>
            </FeatureCard>
            <FeatureCard
              title="Registro de Interés"
              description={mqa.interestFormBlurb}
            >
              <a
                className="feature-card-cta"
                href={mqa.interestFormUrl}
                target="_blank"
                rel="noreferrer"
              >
                Completar formulario
              </a>
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
