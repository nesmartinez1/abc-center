import './PlaceholderImage.css'

type PlaceholderImageProps = {
  label?: string
  ratio?: string
  fill?: boolean
  className?: string
}

function PlaceholderImage({
  label = 'Foto próximamente',
  ratio = '16/9',
  fill = false,
  className = '',
}: PlaceholderImageProps) {
  const classes = [
    'placeholder-image',
    fill && 'placeholder-image--fill',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={fill ? undefined : { aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <svg
        className="placeholder-image-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          d="M4 5h16v14H4z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.5-5 3.5 3.5 3-3.5L20 16"
        />
        <circle cx="8.5" cy="9" r="1.5" fill="currentColor" />
      </svg>
      <span className="placeholder-image-label">{label}</span>
    </div>
  )
}

export default PlaceholderImage
