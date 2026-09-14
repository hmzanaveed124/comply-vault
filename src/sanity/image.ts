import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { sanityConfig, isSanityConfigured } from './client'
import type { SanityImage } from './types'

const builder = isSanityConfigured()
  ? createImageUrlBuilder({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
    })
  : null

export function urlForImage(source: SanityImage | SanityImageSource | null | undefined) {
  if (!builder || !source) {
    return null
  }

  try {
    return builder.image(source as SanityImageSource)
  } catch {
    return null
  }
}

export function getImageUrl(
  source: SanityImage | SanityImageSource | null | undefined,
  width = 1200
): string | null {
  const image = urlForImage(source)
  if (!image) {
    // Fall back to resolved asset URL from GROQ when builder is unavailable
    if (source && typeof source === 'object' && 'asset' in source) {
      const asset = (source as SanityImage).asset
      return asset?.url ?? null
    }
    return null
  }

  return image.width(width).auto('format').url()
}

export function getImageAlt(
  source: SanityImage | null | undefined,
  fallback = ''
): string {
  return source?.alt?.trim() || fallback
}
