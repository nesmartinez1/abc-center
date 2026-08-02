import { Link, useNavigate } from 'react-router-dom'
import type { ComponentProps, MouseEvent } from 'react'

/**
 * A <Link> that also scrolls to the `#fragment` in its target.
 *
 * The standalone Brilliant Brains site used `react-router-hash-link` for this,
 * but that package ships no types and its peer range predates react-router v7.
 * It was used in exactly one place (the carousel's "Ver más información"
 * buttons, which jump to a section of /brilliant-brains/servicios), so the
 * behaviour is reproduced here instead of taking the dependency.
 *
 * `smooth` is accepted for parity with the original API.
 */
type HashLinkProps = ComponentProps<typeof Link> & {
  to: string
  smooth?: boolean
}

/** Max frames to wait for the destination route to mount (~1s at 60fps). */
const MAX_FRAMES = 60

export function HashLink({ to, smooth, onClick, ...rest }: HashLinkProps) {
  const navigate = useNavigate()
  const hash = to.split('#')[1]

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || !hash) return

    e.preventDefault()
    navigate(to)

    // The target lives on the page we're navigating to, which has not rendered
    // yet. Poll across frames rather than assuming a single rAF is enough —
    // one frame lands before React commits the new route, which silently did
    // nothing at all.
    const scrollToTarget = (frame: number) => {
      const target = document.getElementById(hash)
      if (target) {
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      } else if (frame < MAX_FRAMES) {
        requestAnimationFrame(() => scrollToTarget(frame + 1))
      }
    }
    requestAnimationFrame(() => scrollToTarget(0))
  }

  return <Link to={to} onClick={handleClick} {...rest} />
}

export default HashLink
