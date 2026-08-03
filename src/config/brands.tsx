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
  | 'abc-nutrition'

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
    tagline: 'Un lugar para toda la familia.',
    blurb:
      'Un espacio integral donde niños, jóvenes, adultos y familias encuentran apoyo para aprender, crecer y alcanzar su máximo potencial.',
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
      'Programa educativo especializado que ofrece servicios de tutorías, enriquecimiento académico y apoyo al aprendizaje para estudiantes de distintas edades. Su objetivo es fortalecer las habilidades académicas y promover el éxito escolar mediante estrategias individualizadas.',
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
    tagline:
      'Brindamos servicios de salud mental profesionales para fortalecer el bienestar emocional de niños, adolescentes, adultos y familias.',
    blurb:
      'Programa de salud mental que brinda evaluaciones psicológicas, terapia y orientación profesional para niños, adolescentes, adultos y familias. Nuestro enfoque promueve el bienestar emocional y el desarrollo de herramientas para enfrentar los desafíos de la vida.',
    accentName: 'Verde azulado',
    live: false,
    pages: [
      { label: 'Inicio', to: '/mental-care', end: true },
      { label: 'Servicios', to: '/mental-care/servicios' },
      { label: 'Equipo', to: '/mental-care/equipo' },
      { label: 'Recursos', to: '/mental-care/recursos' },
      { label: 'Contacto', to: '/mental-care/contacto' },
    ],
  },
  foundation: {
    id: 'foundation',
    name: 'ABC Foundation',
    menuLabel: 'ABC Foundation',
    path: '/fundacion',
    tagline:
      'Promovemos el desarrollo de nuestras comunidades mediante iniciativas sociales, educativas y ambientales.',
    blurb:
      'Iniciativa comunitaria dedicada al desarrollo social mediante proyectos de servicio, voluntariado y programas de impacto que promueven el bienestar de nuestras comunidades.',
    accentName: 'Violeta',
    live: false,
    pages: [
      { label: 'Inicio', to: '/fundacion', end: true },
      { label: 'Iniciativas', to: '/fundacion/iniciativas' },
      { label: 'Impacto', to: '/fundacion/impacto' },
      { label: 'Donar', to: '/fundacion/donar' },
      { label: 'Contacto', to: '/fundacion/contacto' },
    ],
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
    tagline:
      'Promovemos la conservación marina mediante educación ambiental, voluntariado y acción comunitaria.',
    blurb:
      'ABC Ocean Care desarrolla iniciativas orientadas a proteger los ecosistemas marinos de Puerto Rico mediante actividades educativas, limpiezas de playas y proyectos de conservación.',
    accentName: 'Azul océano',
    live: false,
    pages: [
      { label: 'Inicio', to: '/fundacion/ocean-care', end: true },
      { label: 'Actividades', to: '/fundacion/ocean-care/actividades' },
      { label: 'Calendario', to: '/fundacion/ocean-care/calendario' },
      { label: 'Únete', to: '/fundacion/ocean-care/unete' },
    ],
  },
  'abc-nutrition': {
    id: 'abc-nutrition',
    name: 'ABC Nutrition',
    menuLabel: 'ABC Nutrition',
    path: '/fundacion/abc-nutrition',
    tagline: 'Nutrición como base del bienestar familiar.',
    blurb:
      'Próxima iniciativa de ABC Foundation enfocada en la nutrición y los hábitos alimentarios saludables de niños, jóvenes y familias. Los detalles del programa estarán disponibles próximamente.',
    accentName: 'Rosa',
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
    children: [
      { id: 'mas-que-atletas' },
      { id: 'ocean-care' },
      { id: 'abc-nutrition' },
    ],
  },
]
