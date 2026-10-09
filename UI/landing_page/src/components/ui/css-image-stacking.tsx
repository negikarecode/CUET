import type { CSSProperties } from 'react'

type StackItem = {
  label: string
  image: string
  imageAlt: string
}

type CssImageStackingProps = {
  items: StackItem[]
}

export default function CssImageStacking({ items }: CssImageStackingProps) {
  return (
    <div className="admission-image-stack" aria-label="Explore university campuses">
      {items.map(({ label, image, imageAlt }, index) => {
        const stackStyle: CSSProperties & { '--stack-index': number } = {
          '--stack-index': index,
        }

        return (
          <article
            className="admission-stack-card"
            key={label}
            style={stackStyle}
          >
            <figure className="admission-stack-figure">
              <img src={image} alt={imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption className="admission-stack-caption">
                <span>0{index + 1}</span>
                <h3>{label}</h3>
              </figcaption>
            </figure>
          </article>
        )
      })}
    </div>
  )
}
