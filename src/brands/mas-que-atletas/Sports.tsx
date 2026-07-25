import PlaceholderImage from '../../components/PlaceholderImage'
import './Sports.css'

const galleryCount = 6

function Sports() {
  return (
    <div className="sports-page">
      <section className="sports-hero">
        <PlaceholderImage label="Foto próximamente" ratio="16/9" />
        <p>
          Explora imágenes de nuestros atletas, eventos y actividades
          deportivas. Cada fotografía refleja el esfuerzo, la dedicación y la
          alegría de nuestros niños y jóvenes mientras crecen dentro y fuera
          del deporte.
        </p>
      </section>

      <section className="sports-gallery">
        {Array.from({ length: galleryCount }, (_, i) => (
          <PlaceholderImage key={i} label="Foto próximamente" ratio="4/3" />
        ))}
      </section>
    </div>
  )
}

export default Sports
