/**
 * Single source of truth for every program ("brand") that lives inside the ABC
 * Centro Familiar Integral site. Drives:
 *   - routing            (App.tsx maps over `brands`)
 *   - the dropdown menu   (Navbar reads `programNav`)
 *   - per-brand theming   (each id has a matching [data-brand="..."] block in brands.css)
 *   - active-brand lookup (useActiveBrand matches the longest `path` prefix)
 *
 * To add/adjust a program: edit this file (+ add a theme block in brands.css).
 */

export type BrandId =
  | 'centro'
  | 'brilliant-brains'
  | 'mental-care'
  | 'foundation'
  | 'mas-que-atletas'
  | 'ocean-care'

/** A page within a brand's own contextual sub-nav (only MQA has several today). */
export type BrandPage = {
  label: string
  /** Route path relative to the app root (absolute), e.g. '/fundacion/mas-que-atletas/deportes'. */
  to: string
  /** Pass `end` for the brand's index/home link so it isn't active on child routes. */
  end?: boolean
}

/** Real social-media profiles for a brand. Omitted keys fall back to a stub. */
export type BrandSocial = {
  facebook?: string
  instagram?: string
  twitter?: string
}

export type Brand = {
  id: BrandId
  /** Full display name, e.g. "ABC Brilliant Brains". */
  name: string
  /** Short label used in the dropdown menu. */
  menuLabel: string
  /** Absolute route path for the brand's home. */
  path: string
  /** One-line tagline shown on hero / cards. */
  tagline: string
  /** Short paragraph used on landing pages and program cards. */
  blurb: string
  /** Human-readable accent color name (the actual colors live in brands.css). */
  accentName: string
  /**
   * `true` for programs whose real content is built out (currently only
   * Más Que Atletas). `false` marks a prototype/placeholder section.
   */
  live: boolean
  /** Optional contextual sub-nav rendered when inside this brand. */
  pages?: BrandPage[]
  /** Real social profiles, if the program has them. */
  social?: BrandSocial
}

export const brands: Record<BrandId, Brand> = {
  centro: {
    id: 'centro',
    name: 'ABC Centro Familiar Integral',
    menuLabel: 'Inicio',
    path: '/',
    tagline: 'Una familia de programas para tu familia.',
    blurb:
      'ABC Centro Familiar Integral reúne bajo un mismo techo programas de educación, salud mental, desarrollo y servicio comunitario para niños, jóvenes y familias de Puerto Rico.',
    accentName: 'Índigo',
    live: false,
  },
  'brilliant-brains': {
    id: 'brilliant-brains',
    name: 'ABC Brilliant Brains',
    menuLabel: 'ABC Brilliant Brains',
    path: '/brilliant-brains',
    tagline:
      'Tutorías personalizadas que transforman el aprendizaje en una aventura emocionante.',
    blurb:
      'Programa educativo enfocado en el desarrollo cognitivo, la creatividad y el amor por el aprendizaje en niños y jóvenes: tutorías individualizadas, programa grupal, asistencia de homeschooling y actividades extracurriculares.',
    accentName: 'Ámbar',
    live: true,
    pages: [
      { label: 'Inicio', to: '/brilliant-brains', end: true },
      { label: 'Servicios', to: '/brilliant-brains/servicios' },
      { label: 'Talleres', to: '/brilliant-brains/talleres' },
      { label: 'Nosotros', to: '/brilliant-brains/nosotros' },
      { label: 'Contacto', to: '/brilliant-brains/contacto' },
    ],
    social: {
      facebook: 'https://www.facebook.com/share/1AFNu8LayJ/?mibextid=wwXIfr',
      instagram:
        'https://www.instagram.com/abcbrilliantbrains?igsh=ZXlrd3hkb3lwamF6&utm_source=qr',
    },
  },
  'mental-care': {
    id: 'mental-care',
    name: 'ABC Mental Care',
    menuLabel: 'ABC Mental Care',
    path: '/mental-care',
    tagline: 'Cuidando la salud mental de nuestras familias.',
    blurb:
      'Servicios de bienestar emocional y salud mental que acompañan a personas y familias en cada etapa de su vida.',
    accentName: 'Verde azulado',
    live: false,
  },
  foundation: {
    id: 'foundation',
    name: 'ABC Foundation',
    menuLabel: 'ABC Foundation',
    path: '/fundacion',
    tagline: 'Transformando comunidades a través del servicio.',
    blurb:
      'El brazo sin fines de lucro de ABC, que impulsa iniciativas de impacto comunitario como Más Que Atletas PR y ABC Ocean Care.',
    accentName: 'Violeta',
    live: false,
  },
  'mas-que-atletas': {
    id: 'mas-que-atletas',
    name: 'Más Que Atletas PR',
    menuLabel: 'Más Que Atletas PR',
    path: '/fundacion/mas-que-atletas',
    tagline: 'Más Que Un Deporte. Una Oportunidad.',
    blurb:
      'Organización sin fines de lucro que brinda oportunidades deportivas y de desarrollo personal a niños y jóvenes de Puerto Rico.',
    accentName: 'Verde',
    live: true,
    pages: [
      { label: 'Inicio', to: '/fundacion/mas-que-atletas', end: true },
      { label: 'Deportes', to: '/fundacion/mas-que-atletas/deportes' },
      {
        label: 'Noticias y Actualizaciones',
        to: '/fundacion/mas-que-atletas/noticias',
      },
    ],
  },
  'ocean-care': {
    id: 'ocean-care',
    name: 'ABC Ocean Care',
    menuLabel: 'ABC Ocean Care',
    path: '/fundacion/ocean-care',
    tagline: 'Protegiendo nuestro mar, educando nuestra gente.',
    blurb:
      'Iniciativa de conservación y educación ambiental dedicada a proteger las costas y los océanos de Puerto Rico.',
    accentName: 'Azul océano',
    live: false,
  },
}

/** All brands as an array (handy for routing / iteration). */
export const brandList: Brand[] = Object.values(brands)

/** A node in the dropdown-menu hierarchy. */
export type NavNode = {
  id: BrandId
  children?: NavNode[]
}

/**
 * The "Programas" dropdown hierarchy (excludes `centro`, which is the top-level
 * "Inicio" link). Mirrors the org chart: Foundation contains MQA + Ocean Care.
 */
export const programNav: NavNode[] = [
  { id: 'brilliant-brains' },
  { id: 'mental-care' },
  {
    id: 'foundation',
    children: [{ id: 'mas-que-atletas' }, { id: 'ocean-care' }],
  },
]
