import PlaceholderImage from './PlaceholderImage'
import './Gallery.css'

type GalleryProps = {
  /** Real photo paths under /public. Empty until ABC sends photography. */
  images?: string[]
  /** Number of placeholder frames to show while `images` is empty. */
  placeholderCount?: number
}

/**
 * Photo grid. Degrades honestly: with no images it shows labelled
 * "Foto próximamente" frames, which reads as intentional rather than broken.
 */
function Gallery({ images = [], placeholderCount = 6 }: GalleryProps) {
  if (images.length === 0) {
    if (placeholderCount === 0) return null
    return (
      <div className="gallery">
        {Array.from({ length: placeholderCount }, (_, i) => (
          <PlaceholderImage key={i} label="Foto próximamente" ratio="4/3" />
        ))}
      </div>
    )
  }

  return (
    <div className="gallery">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" className="gallery-img" />
      ))}
    </div>
  )
}

export default Gallery
