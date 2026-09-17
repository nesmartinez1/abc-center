import { Link, NavLink } from 'react-router-dom'
import { parentBrandOf, type Brand } from '../../config/brands'
import './SubNav.css'

type SubNavProps = {
  activeBrand: Brand
}

/**
 * Slim secondary nav for the active program's own pages. Only rendered for
 * brands that define `pages`. Single-page sections render nothing.
 *
 * Programs owned by another brand (today: everything under ABC Foundation) get
 * a breadcrumb prefix, so the parent relationship is visible on every page of
 * those sections rather than only in the dropdown. Foundation itself gets no
 * crumb — it's the owner, not the owned.
 */
function SubNav({ activeBrand }: SubNavProps) {
  const parent = parentBrandOf(activeBrand.id)

  if (!activeBrand.pages || activeBrand.pages.length === 0) return null

  return (
    <nav className="subnav" aria-label={`Secciones de ${activeBrand.name}`}>
      <div className="subnav-inner">
        {parent && (
          <span className="subnav-crumb">
            <Link to={parent.path}>{parent.name}</Link>
            <span aria-hidden="true" className="subnav-crumb-sep">
              ›
            </span>
          </span>
        )}
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
