import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BrandLogo from '../BrandLogo'
import {
  brands,
  programNav,
  type Brand,
  type BrandId,
} from '../../config/brands'
import './Navbar.css'

type NavbarProps = {
  activeBrand: Brand
}

function Navbar({ activeBrand }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false) // mobile hamburger panel
  const [programsOpen, setProgramsOpen] = useState(false) // desktop dropdown
  const dropdownRef = useRef<HTMLDivElement>(null)

  const closeAll = () => {
    setIsOpen(false)
    setProgramsOpen(false)
  }

  // Close the desktop dropdown on outside-click and Escape.
  useEffect(() => {
    if (!programsOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setProgramsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProgramsOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [programsOpen])

  const programsActive = activeBrand.id !== 'centro'

  const renderLeaf = (id: BrandId, nested: boolean) => {
    const brand = brands[id]
    return (
      <NavLink
        key={id}
        to={brand.path}
        end
        className={({ isActive }) =>
          [
            'navbar-dropdown-link',
            nested && 'navbar-dropdown-link--nested',
            isActive && 'active',
          ]
            .filter(Boolean)
            .join(' ')
        }
        onClick={closeAll}
      >
        <span>{brand.menuLabel}</span>
        {!brand.live && (
          <span className="navbar-dropdown-badge">Próximamente</span>
        )}
      </NavLink>
    )
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={closeAll}>
        {/* The mark, not the full lockup — the lockup's wordmark is illegible
            at 42px and would duplicate the title text beside it. */}
        <BrandLogo
          brand={brands.centro}
          variant="mark"
          className="navbar-logo"
          decorative
        />
        <span className="navbar-title">{brands.centro.name}</span>
      </NavLink>

      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={isOpen}
        aria-controls="navbar-menu"
        aria-label="Abrir menú"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="navbar-menu" className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeAll}
          >
            Inicio
          </NavLink>

          <div
            className={`navbar-dropdown ${programsOpen ? 'open' : ''}`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className={`navbar-dropdown-trigger ${programsActive ? 'active' : ''}`}
              aria-expanded={programsOpen}
              aria-controls="programs-menu"
              onClick={() => setProgramsOpen((open) => !open)}
            >
              Programas
              <svg
                className="navbar-dropdown-chevron"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>

            <div id="programs-menu" className="navbar-dropdown-panel">
              {programNav.map((group) => {
                const labelId = `programs-group-${group.label
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`
                const owner = group.owner ? brands[group.owner] : undefined

                return (
                  <div
                    key={group.label}
                    role="group"
                    aria-labelledby={labelId}
                    className={`navbar-dropdown-group ${
                      owner ? 'navbar-dropdown-group--owned' : ''
                    }`}
                  >
                    {owner ? (
                      // The group header IS the link to the owner's page, rather
                      // than a separate "Ver →" control competing with it.
                      <NavLink
                        to={owner.path}
                        end
                        id={labelId}
                        className={({ isActive }) =>
                          `navbar-group-owner ${isActive ? 'active' : ''}`
                        }
                        onClick={closeAll}
                      >
                        <span className="navbar-group-owner-name">
                          {group.label}
                        </span>
                        {group.description && (
                          <span className="navbar-group-owner-desc">
                            {group.description}
                          </span>
                        )}
                      </NavLink>
                    ) : (
                      <p id={labelId} className="navbar-group-label">
                        {group.label}
                      </p>
                    )}

                    <div
                      className={
                        owner ? 'navbar-dropdown-children' : undefined
                      }
                    >
                      {group.items.map((id) => renderLeaf(id, Boolean(owner)))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </nav>

        <form
          className="navbar-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="search" placeholder="Buscar..." aria-label="Buscar" />
        </form>
      </div>
    </header>
  )
}

export default Navbar
