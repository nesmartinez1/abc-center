import SocialIcons from '../SocialIcons'
import type { Brand } from '../../config/brands'
import './Footer.css'

type FooterProps = {
  activeBrand: Brand
}

function Footer({ activeBrand }: FooterProps) {
  const isCentro = activeBrand.id === 'centro'

  return (
    <footer className="footer">
      <p className="footer-brand">{activeBrand.name}</p>
      {!isCentro && (
        <p className="footer-parent">Parte de ABC Centro Familiar Integral</p>
      )}
      <SocialIcons />
      <p className="footer-copy">
        COPYRIGHT @2026, ABC Centro Familiar Integral
      </p>
    </footer>
  )
}

export default Footer
