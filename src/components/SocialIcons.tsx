import type { SVGProps } from 'react'

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.46.66.25 1.21.6 1.76 1.15.5.5.85 1.02 1.15 1.76.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.46-2.43.25-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.43 2.5c.64-.24 1.37-.41 2.43-.46C8.94 2.01 9.28 2 12 2m0 1.8c-2.67 0-2.99.01-4.04.06-.92.04-1.42.19-1.75.32-.44.17-.76.37-1.09.7s-.53.65-.7 1.09c-.13.33-.28.83-.32 1.75C4.05 8.97 4.04 9.29 4.04 12s.01 2.99.06 4.04c.04.92.19 1.42.32 1.75.17.44.37.76.7 1.09s.65.53 1.09.7c.33.13.83.28 1.75.32 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.92-.04 1.42-.19 1.75-.32.44-.17.76-.37 1.09-.7s.53-.65.7-1.09c.13-.33.28-.83.32-1.75.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.92-.19-1.42-.32-1.75a2.9 2.9 0 0 0-.7-1.09 2.9 2.9 0 0 0-1.09-.7c-.33-.13-.83-.28-1.75-.32C14.99 3.81 14.67 3.8 12 3.8m0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3m0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7m5.5-3.25a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 2h4.5l4.06 5.78L16.5 2H21l-6.94 8.34L21.5 22H17l-4.45-6.34L7.5 22H3l7.3-8.78z" />
    </svg>
  )
}

type SocialLink = {
  label: string
  href: string
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
}

const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Twitter / X', href: '#', Icon: XIcon },
]

function SocialIcons() {
  return (
    <ul className="social-icons">
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          {/* TODO: replace href="#" with the real social media URL */}
          <a href={href} aria-label={label} target="_blank" rel="noreferrer">
            <Icon className="social-icon" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialIcons
