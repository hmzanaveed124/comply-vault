import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { getImageAlt, getImageUrl } from '@/src/sanity/image'
import type { SanityImage } from '@/src/sanity/types'
import type { PortableTextBlock } from '@portabletext/types'

type BlogPortableTextProps = {
  value: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-muted-foreground leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-vault-green-500 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 pl-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 pl-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      const blank = Boolean(value?.blank)
      return (
        <a
          href={href}
          className="text-vault-green-600 dark:text-vault-green-400 font-medium hover:underline"
          {...(blank
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage
      const src = getImageUrl(image, 1200)
      if (!src) return null
      const alt = getImageAlt(image, '')
      const caption = image.caption

      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted/30">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {caption ? (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function BlogPortableText({ value }: BlogPortableTextProps): JSX.Element {
  return (
    <div className="max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
