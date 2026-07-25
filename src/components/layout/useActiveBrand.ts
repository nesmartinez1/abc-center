import { useLocation } from 'react-router-dom'
import { brandList, brands, type Brand } from '../../config/brands'

/**
 * Resolves the current URL to the brand whose `path` is the longest matching
 * prefix. Because `centro` lives at '/', it acts as the fallback (shortest
 * path), while deeper paths like '/fundacion/mas-que-atletas' correctly beat
 * '/fundacion'. Used to set `data-brand` (theme) and the contextual sub-nav.
 */
export function useActiveBrand(): Brand {
  const { pathname } = useLocation()

  let match: Brand = brands.centro
  for (const brand of brandList) {
    if (brand.path === '/') continue
    const isMatch = pathname === brand.path || pathname.startsWith(brand.path + '/')
    if (isMatch && brand.path.length > match.path.length) {
      match = brand
    }
  }
  return match
}
