/**
 * ABC Foundation.
 *
 * Identity, misión and visión are ABC's own words. Impact figures were marked
 * "Tentativo" and are therefore empty. The donation configuration reflects what
 * ABC asked for, but **no payment processor is connected** — see DonationTiers
 * and the note on `donationsEnabled` below.
 */

import type { EventItem, Partner, Stat, Testimonial } from './types'

/**
 * Hero photography. Source in assets-src/photos/foundation/; regenerate with
 * scripts/build-photos.py.
 */
export const heroImage = '/photos/foundation/hero.webp'

export const intro =
  'Promovemos el desarrollo de nuestras comunidades mediante iniciativas sociales, educativas y ambientales.'

export const about =
  'ABC Foundation canaliza los esfuerzos comunitarios de ABC Centro Familiar Integral mediante proyectos de servicio, voluntariado y desarrollo social. Trabajamos junto a aliados estratégicos para generar oportunidades que mejoren la calidad de vida de niños, jóvenes y familias.'

export const mission =
  'Impulsar iniciativas comunitarias que promuevan el bienestar social, educativo y ambiental.'

export const vision =
  'Construir comunidades más fuertes mediante la colaboración, el servicio y la participación ciudadana.'

/* ---- Donaciones ---------------------------------------------------------- */

/**
 * FALSE until ABC opens payment accounts. ABC asked for Stripe and ATH Móvil,
 * but "Plataformas para donaciones" is still on their own outstanding list, and
 * a processor account has to exist in the organisation's legal name first.
 *
 * While false, the Donar page renders its full design with the payment button
 * disabled and labelled "Próximamente". Flipping this to true is NOT enough to
 * take money — it also needs a real checkout integration.
 */
export const donationsEnabled = false

export const donationAmounts = ['$25', '$50', '$100']

export const donationFrequencies = [
  { id: 'once', label: 'Donación única' },
  { id: 'monthly', label: 'Donación mensual' },
]

/**
 * TODO(ABC): what each amount funds ("$50 cubre el equipo deportivo de un niño
 * por temporada"). Empty = the explanatory column is not rendered.
 */
export const donationImpact: { amount: string; description: string }[] = []

export const inKindNote =
  'También recibimos donaciones en especie —equipo deportivo, materiales educativos y artículos de primera necesidad— para apoyar directamente nuestras iniciativas.'

export const volunteerNote =
  'Si prefieres aportar tu tiempo, puedes unirte como voluntario a cualquiera de nuestras iniciativas comunitarias.'

/* ---- Aún pendiente de ABC ------------------------------------------------ */

/** Marked "Tentativo" by ABC — no verified figures yet. */
export const stats: Stat[] = []
export const testimonials: Testimonial[] = []
export const partners: Partner[] = []
export const events: EventItem[] = []
