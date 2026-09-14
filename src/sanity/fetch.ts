import { getSanityClient, isSanityConfigured } from './client'
import {
  allPostSlugsQuery,
  allPostsQuery,
  featuredPostsQuery,
  postBySlugQuery,
  postCategoryIdQuery,
  recentPostsQuery,
  relatedPostsQuery,
} from './queries'
import type { SanityPost, SanityPostListItem } from './types'

async function fetchSafe<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!isSanityConfigured()) {
    return fallback
  }

  const client = getSanityClient()
  if (!client) {
    return fallback
  }

  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('[sanity] fetch failed:', error)
    return fallback
  }
}

export async function getAllPosts(): Promise<SanityPostListItem[]> {
  return fetchSafe<SanityPostListItem[]>(allPostsQuery, {}, [])
}

export async function getAllPostSlugs(): Promise<string[]> {
  const rows = await fetchSafe<{ slug: string }[]>(allPostSlugsQuery, {}, [])
  return rows.map((row) => row.slug).filter(Boolean)
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return fetchSafe<SanityPost | null>(postBySlugQuery, { slug }, null)
}

export async function getFeaturedPosts(limit = 1): Promise<SanityPostListItem[]> {
  const posts = await fetchSafe<SanityPostListItem[]>(featuredPostsQuery, {}, [])
  return posts.slice(0, limit)
}

export async function getRecentPosts(limit = 6): Promise<SanityPostListItem[]> {
  return fetchSafe<SanityPostListItem[]>(recentPostsQuery, { limit }, [])
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<SanityPostListItem[]> {
  const meta = await fetchSafe<{ categoryId?: string; tags?: string[] } | null>(
    postCategoryIdQuery,
    { slug },
    null
  )

  if (!meta) {
    return []
  }

  return fetchSafe<SanityPostListItem[]>(
    relatedPostsQuery,
    {
      slug,
      categoryId: meta.categoryId ?? '',
      tags: meta.tags ?? [],
      limit,
    },
    []
  )
}
