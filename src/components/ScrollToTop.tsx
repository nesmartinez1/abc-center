import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Puts every new page at the top.
 *
 * A browser keeps the window's scroll offset across a client-side navigation,
 * so following a link from halfway down a long page (the homepage's "Conoce la
 * fundación" button, say) used to drop you into the middle — or the bottom —
 * of the destination. React Router's own <ScrollRestoration> only works with a
 * data router; this app mounts <BrowserRouter> + <Routes>, so it does this
 * instead.
 *
 * Two cases are deliberately left alone:
 *  - POP (back/forward), where the reader expects to return to the spot they
 *    left, and the browser restores it for us.
 *  - Any URL carrying a #fragment, which is asking for a specific section —
 *    the homepage's #programas link and HashLink both rely on this.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  // useLayoutEffect, not useEffect: this runs before the browser paints, so the
  // new page never flashes at the old scroll offset first.
  useLayoutEffect(() => {
    if (navigationType === 'POP' || hash) return

    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}

export default ScrollToTop
