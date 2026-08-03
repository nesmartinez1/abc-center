import { Outlet } from 'react-router-dom'
import CrisisNotice from '../../components/CrisisNotice'

/**
 * Route element wrapping every ABC Mental Care page.
 *
 * Its only job is to put <CrisisNotice/> on all of them — ABC explicitly asked
 * for the 988 and Línea PAS numbers, and someone in crisis should not have to
 * find the right page first. Placed after the outlet so it doesn't push the
 * hero down, but it's present on every route.
 */
function MentalCareLayout() {
  return (
    <>
      <Outlet />
      <CrisisNotice />
    </>
  )
}

export default MentalCareLayout
