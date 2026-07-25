import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SubNav from './SubNav'
import { useActiveBrand } from './useActiveBrand'

function Layout() {
  const activeBrand = useActiveBrand()

  return (
    // data-brand drives the per-brand accent theme (see brands.css)
    <div className="app-shell" data-brand={activeBrand.id}>
      <Navbar activeBrand={activeBrand} />
      <SubNav activeBrand={activeBrand} />
      <main>
        <Outlet />
      </main>
      <Footer activeBrand={activeBrand} />
    </div>
  )
}

export default Layout
