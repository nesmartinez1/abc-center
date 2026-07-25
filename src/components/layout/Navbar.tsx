import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PlaceholderImage from '../PlaceholderImage'
import {
  brands,
  programNav,
  type Brand,
  type NavNode,
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

  const renderLeaf = (node: NavNode, nested: boolean) => {
    const brand = brands[node.id]
    return (
      <NavLink
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
        <PlaceholderImage label="Logo" ratio="1/1" className="navbar-logo" />
        <span className="navbar-title">ABC Centro Familiar Integral</span>
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
              {programNav.map((node) => (
                <div key={node.id} className="navbar-dropdown-group">
                  {renderLeaf(node, false)}
                  {node.children && (
                    <div className="navbar-dropdown-children">
                      {node.children.map((child) => (
                        <div key={child.id}>{renderLeaf(child, true)}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
