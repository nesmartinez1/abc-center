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

/** Confirmed topics for the monthly articles ABC plans to publish. */
export const resourceTopics: ResourceTopic[] = [
  {
    name: 'Ansiedad',
    description:
      'Cómo reconocer las señales de ansiedad en distintas edades y qué estrategias ayudan a manejarla.',
  },
  {
    name: 'TDAH',
    description:
      'Orientación sobre el diagnóstico, el acompañamiento escolar y el manejo en el hogar.',
  },
  {
    name: 'Crianza',
    description:
      'Herramientas prácticas para criar con límites sanos, comunicación y conexión.',
  },
  {
    name: 'Manejo emocional',
    description:
      'Recursos para identificar, expresar y regular las emociones en la vida diaria.',
  },
  {
    name: 'Salud mental infantil',
    description:
      'Qué esperar en cada etapa del desarrollo y cuándo buscar apoyo profesional.',
  },
]

/** TODO(ABC): monthly articles. Empty = the article list is not rendered. */
export const articles: Article[] = []

/** TODO(ABC): names, licence numbers, specialties, bios and portraits. */
export const team: TeamMember[] = []

/** Placeholder profile cards shown on Equipo until real team data arrives. */
export const teamPlaceholderCount = 3
