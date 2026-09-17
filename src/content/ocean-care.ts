/**
 * ABC Ocean Care.
 *
 * ⚠️  THE ACTIVITY LIST BELOW IS NOT CONFIRMED.
 *
 * ABC's response listed these under "Posibles actividades:" — possible, not
 * confirmed. Each entry needs a description, audience, frequency and joining
 * instructions from ABC before this program goes live.
 *
 * The identity paragraph and the program's active status ARE confirmed.
 */

import type { EventItem, Offering } from './types'

export const intro =
  'Promovemos la conservación marina mediante educación ambiental, voluntariado y acción comunitaria.'

export const about =
  'ABC Ocean Care desarrolla iniciativas orientadas a proteger los ecosistemas marinos de Puerto Rico mediante actividades educativas, limpiezas de playas y proyectos de conservación. Nuestro propósito es fomentar una cultura de responsabilidad ambiental en las nuevas generaciones.'

/**
 * ⚠️ DRAFT — see the file header. Optional fields left blank render nothing.
 */
export const activities: Offering[] = [
  { name: 'Limpiezas de playas' },
  { name: 'Talleres educativos' },
  { name: 'Campañas de concienciación' },
  { name: 'Restauración ambiental' },
  { name: 'Excursiones educativas' },
  { name: 'Conservación de especies' },
]

/** TODO(ABC): real dates. Empty = the calendar shows its empty state. */
export const events: EventItem[] = []

/**
 * TODO(ABC): the specifics were never provided — minimum age, whether a signed
 * liability waiver is required, and what volunteers should bring. These are
 * deliberately generic; confirm before publishing.
 */
export const volunteerRequirements = [
  'Edad mínima de participación: por confirmar.',
  'Relevo de responsabilidad firmado por el participante o su tutor legal.',
  'Materiales recomendados: por confirmar.',
]

export const volunteerNote =
  'Completa el formulario y te contactaremos con los detalles de la próxima actividad.'

/** Hero backgrounds. Decorative — the <h1> over each carries the meaning. */
export const heroImage = '/photos/ocean-care/hero.webp'
export const activitiesHeroImage = '/photos/ocean-care/hero-actividades.webp'
export const calendarHeroImage = '/photos/ocean-care/hero-calendario.webp'

/**
 * Activity photos supplied by ABC. Sources live in
 * assets-src/photos/ocean-care/; regenerate with scripts/build-photos.py.
 */
export const galleryImages = [
  '/photos/ocean-care/gallery-1.webp',
  '/photos/ocean-care/gallery-2.webp',
  '/photos/ocean-care/gallery-3.webp',
]
