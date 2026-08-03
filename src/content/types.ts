/**
 * Shared shapes for the page copy in this directory.
 *
 * Everything ABC writes lives in `src/content/*.ts` as plain data — no JSX — so
 * that updating the site's words never means touching a component. Page
 * components map over these arrays and **skip the whole section when an array is
 * empty**, which is what lets us ship the structure ABC approved before they've
 * sent the content for it. Filling one in later is a data edit, nothing more.
 *
 * Keep this file free of imports from components so it stays cheap to import.
 */

/** A headline number: "500+" / "Estudiantes atendidos". */
export type Stat = {
  value: string
  label: string
}

/** A person shown in a team grid. Everything but `name` may be blank. */
export type TeamMember = {
  name: string
  role: string
  /** Professional licence number — expected for clinical staff. */
  license?: string
  specialties?: string[]
  bio?: string
}

export type Testimonial = {
  quote: string
  /** Who said it — a first name and relationship is enough ("Madre de dos"). */
  author: string
}

export type Faq = {
  question: string
  answer: string
}

export type Partner = {
  name: string
  /** Absolute path under /public once a real logo exists. */
  logo?: string
  url?: string
}

export type EventItem = {
  title: string
  /** Human-readable, e.g. "15 de septiembre, 2026". */
  date: string
  /** Machine-readable ISO date for <time dateTime>. */
  datetime?: string
  location?: string
  description?: string
  /** Registration link, if any. */
  url?: string
}

/**
 * A service or activity card. Only `name` is required; blank fields are simply
 * not rendered, so a half-specified offering still looks deliberate.
 */
export type Offering = {
  name: string
  description?: string
  /** Who it's for: "Niños de 6 a 12 años", "Familias"… */
  audience?: string
  /** "Presencial", "Virtual", "Presencial y virtual" */
  modality?: string
  duration?: string
  /** Only rendered when ABC decides to publish prices. */
  price?: string
  /** How someone takes part — used by Ocean Care's activities. */
  howToJoin?: string
  frequency?: string
}

/** A topic bucket on Mental Care's Recursos page. */
export type ResourceTopic = {
  name: string
  description: string
}

export type Article = {
  title: string
  date: string
  summary: string
  url?: string
}
