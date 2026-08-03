import type { EventItem } from '../content/types'
import './EventList.css'

type EventListProps = {
  events: EventItem[]
  /** Shown when there's nothing scheduled. */
  emptyMessage?: string
}

/**
 * Upcoming-events list. Unlike most sections here it renders an explicit empty
 * state rather than disappearing — "no hay eventos programados" is useful
 * information, and a calendar page with nothing on it would otherwise be blank.
 */
function EventList({
  events,
  emptyMessage = 'No hay actividades programadas en este momento. Vuelve pronto o síguenos en redes sociales para enterarte de las próximas fechas.',
}: EventListProps) {
  if (events.length === 0) {
    return <p className="section-empty">{emptyMessage}</p>
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={`${event.title}-${event.date}`} className="event-item">
          <div className="event-date">
            {event.datetime ? (
              <time dateTime={event.datetime}>{event.date}</time>
            ) : (
              event.date
            )}
          </div>
          <div className="event-body">
            <h3>{event.title}</h3>
            {event.location && <p className="event-location">{event.location}</p>}
            {event.description && <p>{event.description}</p>}
            {event.url && (
              <a
                className="event-cta"
                href={event.url}
                target="_blank"
                rel="noreferrer"
              >
                Regístrate
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default EventList
