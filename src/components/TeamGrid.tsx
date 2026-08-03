import PlaceholderImage from './PlaceholderImage'
import type { TeamMember } from '../content/types'
import './TeamGrid.css'

type TeamGridProps = {
  members: TeamMember[]
  /**
   * How many blank profile cards to show when `members` is empty. ABC approved
   * showing the team but hasn't sent bios or portraits, so the grid still
   * communicates "there are people here" without inventing any.
   */
  placeholderCount?: number
}

function TeamGrid({ members, placeholderCount = 0 }: TeamGridProps) {
  if (members.length === 0) {
    if (placeholderCount === 0) return null
    return (
      <div className="team-grid">
        {Array.from({ length: placeholderCount }, (_, i) => (
          <article key={i} className="team-card team-card--empty">
            <PlaceholderImage label="Foto próximamente" ratio="1/1" />
            <div className="team-card-body">
              <h3>Perfil próximamente</h3>
              <p className="team-role">
                Los perfiles del equipo estarán disponibles próximamente.
              </p>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="team-grid">
      {members.map((member) => (
        <article key={member.name} className="team-card">
          <PlaceholderImage label="Foto próximamente" ratio="1/1" />
          <div className="team-card-body">
            <h3>{member.name}</h3>
            {member.role && <p className="team-role">{member.role}</p>}
            {member.license && (
              <p className="team-license">Lic. {member.license}</p>
            )}
            {member.specialties && member.specialties.length > 0 && (
              <ul className="team-specialties">
                {member.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
            {member.bio && <p className="team-bio">{member.bio}</p>}
          </div>
        </article>
      ))}
    </div>
  )
}

export default TeamGrid
