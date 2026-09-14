import type { PortableTextBlock } from '@portabletext/types'

export type SanityImage = {
  asset?: {
    _ref?: string
    _id?: string
    url?: string
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
        aspectRatio?: number
      }
      lqip?: string
    }
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export type SanityAuthor = {
  name: string
  slug?: string
  role?: string | null
  bio?: string | null
  image?: SanityImage | null
}

export type SanityCategory = {
  title: string
  slug: string
  description?: string | null
}

export type SanityRegulator = 'SEC' | 'FINRA' | 'FCA' | 'State Regulator' | 'Other'

export type SanityPostListItem = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  updatedAt?: string | null
  featured?: boolean | null
  regulator?: SanityRegulator | null
  tags?: string[] | null
  heroImage?: SanityImage | null
  category?: SanityCategory | null
  author?: Pick<SanityAuthor, 'name' | 'role'> | null
}

export type SanityPost = SanityPostListItem & {
  body: PortableTextBlock[]
  sourceUrl?: string | null
  sourceLabel?: string | null
  disclaimer?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  ogImage?: SanityImage | null
  author?: SanityAuthor | null
}
