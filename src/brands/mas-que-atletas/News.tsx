import PlaceholderImage from '../../components/PlaceholderImage'
import './News.css'

function News() {
  return (
    <div className="news-page">
      <section className="news-hero">
        <PlaceholderImage label="Foto próximamente" ratio="16/9" />
        <p>
          Descubre las últimas noticias, eventos y oportunidades de Más Que
          Atletas PR. Comparte con nosotros cada paso de este movimiento que
          busca transformar vidas a través del deporte.
        </p>
      </section>

      <section className="news-article">
        <PlaceholderImage label="Foto próximamente" ratio="16/9" />

        <h2>
          ⚽🏆 ¡Se acerca algo grande para el deporte juvenil en Puerto Rico!
          🏆⚽
        </h2>

        <p>
          Más Que Atletas PR, en colaboración con DRD, se encuentra
          trabajando en lo que será nuestro primer torneo de fútbol, una
          experiencia diseñada para promover la sana competencia, el trabajo
          en equipo, la disciplina y el desarrollo integral de nuestros
          jóvenes atletas.
        </p>

        <p>
          Próximamente estaremos anunciando las fechas oficiales, categorías
          participantes, ubicación, proceso de inscripción y todos los
          detalles necesarios para formar parte de este gran evento.
        </p>

        <p>
          Mantente pendiente a nuestras redes sociales y comparte esta
          publicación con atletas, familias, entrenadores y equipos
          interesados. ¡Lo mejor está por venir!
        </p>

        <p className="news-hashtags">
          #MasQueAtletasPR #TorneoDeSoccer #FutbolPR #DeporteJuvenil
          #FormandoAtletasTransformandoVidas
        </p>
      </section>
    </div>
  )
}

export default News
