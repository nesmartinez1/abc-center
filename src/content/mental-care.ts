/**
 * ABC Mental Care.
 *
 * ⚠️  THE SERVICE LIST BELOW IS NOT CONFIRMED.
 *
 * ABC's questionnaire response introduced it with "La organización debe
 * confirmar su lista exacta. Ejemplo:" — these are the example services from
 * our own questionnaire, echoed back. They are carried here so the Servicios
 * page has a real layout to review, and the program is deliberately kept
 * `live: false` in config/brands.tsx so every page shows its
 * "Vista previa · Próximamente" badge.
 *
 * Publishing an unconfirmed service list for a licensed clinical practice is a
 * genuine liability. **Get ABC to confirm this list — including populations,
 * modality, duration and pricing — before the program is marked live.**
 *
 * The identity paragraph, the Brilliant Brains relationship, the wait time and
 * the crisis lines ARE confirmed; those are ABC's own words.
 */

import type { Article, Offering, ResourceTopic, TeamMember } from './types'

export const intro =
  'Brindamos servicios de salud mental profesionales para fortalecer el bienestar emocional de niños, adolescentes, adultos y familias.'

export const about =
  'ABC Mental Care ofrece servicios psicológicos basados en evidencia para atender las necesidades emocionales y conductuales de la comunidad. Nuestro equipo acompaña a cada paciente mediante evaluaciones, intervenciones terapéuticas y orientación profesional, promoviendo una mejor calidad de vida. Trabajamos de forma individualizada para ofrecer un espacio seguro, confidencial y de apoyo.'

/**
 * Hero photography. Source in assets-src/photos/mental-care/; regenerate with
 * scripts/build-photos.py.
 */
export const heroImage = '/photos/mental-care/hero.webp'
export const servicesHeroImage = '/photos/mental-care/hero-servicios.webp'
export const resourcesHeroImage = '/photos/mental-care/hero-recursos.webp'
export const contactHeroImage = '/photos/mental-care/hero-contacto.webp'

export const relationshipWithBrilliantBrains =
  'Aunque ambos programas pueden atender a las mismas familias, cada uno responde a necesidades distintas. Brilliant Brains se enfoca en el desarrollo educativo y académico, mientras que Mental Care ofrece servicios de salud mental. Cuando es apropiado, ambos programas colaboran para brindar un apoyo integral.'

/**
 * ⚠️ DRAFT — see the file header. `audience`, `modality`, `duration` and `price`
 * are intentionally blank: cards render only the fields that have values, so
 * nothing is invented on ABC's behalf.
 */
export const services: Offering[] = [
  { name: 'Evaluación psicológica' },
  { name: 'Terapia individual' },
  { name: 'Terapia infantil' },
  { name: 'Terapia para adolescentes' },
  { name: 'Terapia familiar' },
  { name: 'Terapia de pareja' },
  { name: 'Consejería' },
  { name: 'Talleres para padres' },
]

/** Confirmed by ABC. */
export const waitTime = '3 a 5 días laborables'

/** Confirmed by ABC: acuerdos con planes médicos still being negotiated. */
export const insuranceNote =
  'Actualmente estamos trabajando en acuerdos con planes médicos. Comunícate con nosotros para orientación sobre opciones de pago disponibles.'

/** ABC's own intake form. Deliberately not rebuilt as a form on this site — a
 *  web form is not a secure channel for health information. */
export const intakeFormUrl = 'https://forms.gle/AQZJCmiC8nHuLvw1A'

/** Confirmed by ABC — must appear on every Mental Care page. */
export const crisisLines = [
  { name: 'Línea Nacional de Crisis y Suicidio', number: '988', href: 'tel:988' },
  {
    name: 'Línea PAS de Puerto Rico',
    number: '1-800-981-0023',
    href: 'tel:18009810023',
  },
]

/**
 * The disciplines available through ABC Mental Care.
 *
 * ⚠️ Like the service list above, this is a claim about who practises here, and
 * it is the kind a licensing board cares about — "psiquiatras" in particular
 * implies prescribers on staff. Descriptions below stay at the level of what
 * each discipline does, and deliberately state no counts, names or licence
 * numbers. The Equipo page is still hidden for exactly that reason.
 *
 * Replaced the five article topics (Ansiedad, TDAH, Crianza, Manejo emocional,
 * Salud mental infantil) that used to live here; git history has them if the
 * article programme comes back.
 */
export const resourceProfessionals: ResourceTopic[] = [
  {
    name: 'Psicólogos',
    description:
      'Realizan evaluaciones psicológicas y ofrecen terapia individual, familiar y de pareja para niños, adolescentes y adultos.',
  },
  {
    name: 'Psiquiatras',
    description:
      'Atienden la dimensión médica de la salud mental, incluyendo la evaluación diagnóstica y el manejo de tratamiento cuando es necesario.',
  },
  {
    name: 'Trabajadores sociales',
    description:
      'Acompañan a las familias en la coordinación de servicios, el enlace con la escuela y la comunidad, y el acceso a recursos de apoyo.',
  },
]

/** Shown under the list above: the roster is still growing. */
export const resourceProfessionalsNote =
  'Seguimos ampliando nuestro equipo interdisciplinario. Próximamente estaremos añadiendo otras especialidades de la salud mental y el bienestar familiar.'

/** TODO(ABC): monthly articles. Empty = the article list is not rendered. */
export const articles: Article[] = []

/** TODO(ABC): names, licence numbers, specialties, bios and portraits. */
export const team: TeamMember[] = []

/** Placeholder profile cards shown on Equipo until real team data arrives. */
export const teamPlaceholderCount = 3
