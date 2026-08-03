/**
 * ABC Centro Familiar Integral — página principal.
 *
 * Source: ABC's answers to the content questionnaire (Parte 1). The identity
 * paragraph, misión, visión, the five values and the founding story are ABC's
 * own words, used verbatim.
 *
 * The empty arrays at the bottom are sections ABC approved but has not sent
 * content for. They render nothing until filled — see content/types.ts.
 */

import type { Faq, Partner, Stat, Testimonial, TeamMember, EventItem } from './types'

/** ABC offered two slogans; the alternative is kept here so it's easy to swap. */
export const alternateSlogan =
  'Acompañando a cada familia en cada etapa de su crecimiento.'

export const intro =
  'Un espacio integral donde niños, jóvenes, adultos y familias encuentran apoyo para aprender, crecer y alcanzar su máximo potencial.'

export const about =
  'ABC Centro Familiar Integral es una organización dedicada a brindar servicios educativos, psicológicos y comunitarios que fortalecen el bienestar de niños, jóvenes, adultos y sus familias. A través de programas especializados, ofrecemos apoyo académico, servicios de salud mental e iniciativas de impacto social que responden a las necesidades de nuestra comunidad. Nuestro compromiso es acompañar a cada persona con profesionalismo, empatía y excelencia, promoviendo un desarrollo integral en todas las etapas de la vida.'

export const mission =
  'Brindar servicios integrales de educación, salud mental y desarrollo comunitario que fortalezcan el bienestar de las personas y las familias mediante intervenciones profesionales, accesibles y centradas en sus necesidades.'

export const vision =
  'Ser una organización líder en Puerto Rico reconocida por transformar vidas mediante servicios integrales de educación, salud mental y compromiso comunitario.'

export const values = [
  {
    name: 'Compromiso',
    description: 'Trabajamos con dedicación para ofrecer servicios de excelencia.',
  },
  {
    name: 'Empatía',
    description: 'Escuchamos y atendemos a cada persona con respeto y sensibilidad.',
  },
  {
    name: 'Integridad',
    description: 'Actuamos con honestidad, ética y responsabilidad profesional.',
  },
  {
    name: 'Excelencia',
    description: 'Buscamos la mejora continua en todos nuestros programas y servicios.',
  },
  {
    name: 'Colaboración',
    description:
      'Creemos que el trabajo en equipo fortalece a las familias y comunidades.',
  },
]

export const history =
  'ABC Centro Familiar Integral fue fundado en 2024 por Inarah Agueda Felix con el propósito de ofrecer servicios integrales que respondieran a las necesidades educativas, emocionales y sociales de las familias puertorriqueñas. Desde entonces, la organización ha crecido incorporando programas especializados que impactan distintas áreas del desarrollo humano.'

/**
 * TODO(ABC): no scheduling destination was provided. This points at Mental
 * Care's Google Form — the only real intake channel that exists today. Replace
 * with a booking link or `tel:` number once ABC confirms one.
 */
export const scheduleUrl = 'https://forms.gle/AQZJCmiC8nHuLvw1A'

/* ---- Approved by ABC, content still pending. Empty = section not rendered. -- */

/** TODO(ABC): bios, licences and portraits. ABC said Natalia would provide. */
export const team: TeamMember[] = []

export const stats: Stat[] = []
export const testimonials: Testimonial[] = []
export const faqs: Faq[] = []
export const partners: Partner[] = []
export const events: EventItem[] = []

/** Gallery renders N placeholder frames until real photos arrive. */
export const galleryPlaceholderCount = 6
