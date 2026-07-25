import type { ReactNode } from 'react'
import './FeatureCard.css'

type FeatureCardProps = {
  title: string
  description: string
  children?: ReactNode
}

function FeatureCard({ title, description, children }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  )
}

export default FeatureCard
