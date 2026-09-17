import PlaceholderImage from './PlaceholderImage'
import './Gallery.css'

/**
 * A plain string is a decorative photo (`alt=""`); the object form carries a
 * description. Both are accepted so call sites that predate alt text keep
 * working — see content/ocean-care.ts.
 */
export type GalleryImage = string | { src: string; alt: string }

type GalleryProps = {
  /** Real photo paths under /public. Empty until ABC sends photography. */
  images?: GalleryImage[]
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
      {images.map((image) => {
        const { src, alt } =
          typeof image === 'string' ? { src: image, alt: '' } : image
        return (
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            className="gallery-img"
          />
        )
      })}
    </div>
  )
}

export default Gallery
