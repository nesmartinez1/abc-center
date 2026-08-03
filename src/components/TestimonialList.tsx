import type { Testimonial } from '../content/types'
import './TestimonialList.css'

type TestimonialListProps = {
  testimonials: Testimonial[]
}

/** Renders nothing until ABC supplies quotes (with permission to publish). */
function TestimonialList({ testimonials }: TestimonialListProps) {
  if (testimonials.length === 0) return null

  return (
    <div className="testimonial-list">
      {testimonials.map((t) => (
        <figure key={t.author} className="testimonial">
          <blockquote>{t.quote}</blockquote>
          <figcaption>{t.author}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default TestimonialList
