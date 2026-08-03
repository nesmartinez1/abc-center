import type { Stat } from '../content/types'
import './StatGrid.css'

type StatGridProps = {
  stats: Stat[]
}

/** Row of headline figures. Renders nothing when ABC hasn't supplied any. */
function StatGrid({ stats }: StatGridProps) {
  if (stats.length === 0) return null

  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default StatGrid
