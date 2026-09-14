import { createClient, type SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2997lgct'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
}

export function isSanityConfigured(): boolean {
  return Boolean(projectId)
}

/**
 * Public read client — no token.
 * Published documents only (CDN). Safe for marketing pages.
 */
export function getSanityClient(): SanityClient | null {
  if (!projectId) {
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: 'published',
  })
}
