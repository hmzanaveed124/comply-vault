import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getImageAlt, getImageUrl } from '@/src/sanity/image'
import type { SanityPostListItem } from '@/src/sanity/types'

type BlogPostCardProps = {
  post: SanityPostListItem
  featured?: boolean
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps): JSX.Element {
  const imageUrl = getImageUrl(post.heroImage, featured ? 1400 : 800)
  const imageAlt = getImageAlt(post.heroImage, post.title)

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border bg-card dark:bg-[hsl(160_35%_10%)] hover:border-vault-green-500/30 transition-colors"
      >
        <div className="relative min-h-[240px] lg:min-h-[360px] bg-muted/40">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900" />
          )}
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.category?.title ? (
              <span className="text-xs font-medium text-vault-green-600 dark:text-vault-green-400 bg-vault-green-500/10 border border-vault-green-500/20 px-3 py-1 rounded-full">
                {post.category.title}
              </span>
            ) : null}
            <time
              dateTime={post.publishedAt}
              className="text-xs font-mono text-muted-foreground"
            >
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground group-hover:text-vault-green-600 dark:group-hover:text-vault-green-400 transition-colors leading-snug mb-4">
            {post.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-vault-green-600 dark:text-vault-green-400">
            Read article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card dark:bg-[hsl(160_35%_10%)] hover:border-vault-green-500/30 transition-colors h-full"
    >
      {imageUrl ? (
        <div className="relative aspect-[16/10] bg-muted/40">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {post.category?.title ? (
            <span className="text-xs font-medium text-vault-green-600 dark:text-vault-green-400">
              {post.category.title}
            </span>
          ) : null}
          <time
            dateTime={post.publishedAt}
            className="text-xs font-mono text-muted-foreground"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-vault-green-600 dark:group-hover:text-vault-green-400 transition-colors leading-snug mb-3">
          {post.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-vault-green-600 dark:text-vault-green-400">
          Read article
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
