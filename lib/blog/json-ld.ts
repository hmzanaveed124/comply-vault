import { SITE_URL } from '@/lib/site'
import { getImageUrl } from '@/src/sanity/image'
import type { SanityPost } from '@/src/sanity/types'

const DEFAULT_DISCLAIMER =
  'Educational content, not legal or compliance advice. Always confirm obligations against current regulations and your firm\'s counsel.'

export function getPostDisclaimer(post: Pick<SanityPost, 'disclaimer'>): string {
  return post.disclaimer?.trim() || DEFAULT_DISCLAIMER
}

export function buildArticleJsonLd(post: SanityPost): object {
  const url = `${SITE_URL}/blog/${post.slug}`
  const imageUrl =
    getImageUrl(post.ogImage, 1200) || getImageUrl(post.heroImage, 1200) || undefined

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'ComplyVault' },
    publisher: {
      '@type': 'Organization',
      name: 'ComplyVault',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  if (post.updatedAt) {
    data.dateModified = post.updatedAt
  } else {
    data.dateModified = post.publishedAt
  }

  if (imageUrl) {
    data.image = [imageUrl]
  }

  return data
}

export function buildBreadcrumbJsonLd(post: Pick<SanityPost, 'title' | 'slug'>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }
}

export function buildBlogPostJsonLd(post: SanityPost): object[] {
  return [buildArticleJsonLd(post), buildBreadcrumbJsonLd(post)]
}
