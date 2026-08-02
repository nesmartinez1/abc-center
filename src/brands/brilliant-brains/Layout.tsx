import { Outlet } from 'react-router-dom'

/**
 * Route-level wrapper for every Brilliant Brains page.
 *
 * `.bb-scope` is what confines Tailwind to this program: the scoped Preflight
 * in reset.css hangs off it, and it forces `color-scheme: light` because BB was
 * designed light-only. Every BB page must render inside it — see
 * src/brilliant-brains.css for the full explanation.
 */
function BrilliantBrainsLayout() {
  return (
    <div className="bb-scope">
      <Outlet />
    </div>
  )
}

export default BrilliantBrainsLayout
