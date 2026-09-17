import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './brands.css'
// Must load after index.css — see the header comment in brilliant-brains.css.
import './brilliant-brains.css'
import App from './App.tsx'
import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Must sit inside the router and above every route. */}
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
