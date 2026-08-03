import { NavLink } from 'react-router-dom'
import type { Brand } from '../../config/brands'
import './SubNav.css'

type SubNavProps = {
  activeBrand: Brand
}

/**
 * Slim secondary nav for the active program's own pages. Only rendered for
 * brands that define `pages` (today: Más Que Atletas). Single-page prototype
 * sections render nothing.
 */
function SubNav({ activeBrand }: SubNavProps) {
  if (!activeBrand.pages || activeBrand.pages.length === 0) return null

  return (
    <nav className="subnav" aria-label={`Secciones de ${activeBrand.name}`}>
      <div className="subnav-inner">
        <span className="subnav-brand">{activeBrand.name}</span>
        {/* Sub-pages don't carry the hero's preview badge, so surface the
            program's status here — it's on every page of the section. */}
        {!activeBrand.live && (
          <span className="subnav-preview">Vista previa</span>
        )}
        <div className="subnav-links">
          {activeBrand.pages.map((page) => (
            <NavLink
              key={page.to}
              to={page.to}
              end={page.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {page.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default SubNav
