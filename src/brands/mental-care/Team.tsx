import PageHero from '../../components/PageHero'
import Section from '../../components/Section'
import TeamGrid from '../../components/TeamGrid'
import * as mc from '../../content/mental-care'

function MentalCareTeam() {
  return (
    <div>
      <PageHero
        compact
        title="Nuestro equipo"
        tagline="Profesionales licenciados comprometidos con tu bienestar emocional."
      />

      <Section
        heading="Conoce a quienes te atienden"
        intro="Nuestro equipo está compuesto por profesionales de la salud mental licenciados en Puerto Rico. Los perfiles completos —incluyendo licencias, especialidades y experiencia— estarán disponibles próximamente."
      >
        <TeamGrid
          members={mc.team}
          placeholderCount={mc.teamPlaceholderCount}
        />
      </Section>
    </div>
  )
}

export default MentalCareTeam
