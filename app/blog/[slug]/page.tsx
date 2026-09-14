import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navigation, Footer } from '@/components'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogPortableText } from '@/components/blog/BlogPortableText'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { JsonLd } from '@/components/blog/JsonLd'
import { buildBlogPostJsonLd, getPostDisclaimer } from '@/lib/blog/json-ld'
import { SITE_URL } from '@/lib/site'
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/src/sanity/fetch'
import { getImageAlt, getImageUrl } from '@/src/sanity/image'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const revalidate = 60

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      robots: { index: false, follow: false },
    }
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const title = post.seoTitle?.trim() || `${post.title} | ComplyVault`
  const description = post.seoDescription?.trim() || post.excerpt
  const ogImage =
    getImageUrl(post.ogImage, 1200) || getImageUrl(post.heroImage, 1200) || undefined

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      siteName: 'ComplyVault',
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: getImageAlt(post.ogImage || post.heroImage, post.title),
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = await getRelatedPosts(post.slug, 3)
  const heroUrl = getImageUrl(post.heroImage, 1600)
  const heroAlt = getImageAlt(post.heroImage, post.title)
  const disclaimer = getPostDisclaimer(post)

  return (
    <>
      <JsonLd data={buildBlogPostJsonLd(post)} />
      <Navigation />
      <main className="bg-background min-h-screen">
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-3xl mb-10">
            <Link
              href="/blog"
              className="inline-flex text-sm text-muted-foreground hover:text-vault-green-600 dark:hover:text-vault-green-400 transition-colors mb-6"
            >
              ← Blog
            </Link>

            {post.category?.title ? (
              <p className="text-sm font-medium text-vault-green-600 dark:text-vault-green-400 mb-3">
                {post.category.title}
              </p>
            ) : null}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>

            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-mono text-muted-foreground">
              {post.author?.name ? <span>{post.author.name}</span> : null}
              {post.author?.name ? <span>·</span> : null}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt ? (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </>
              ) : null}
              {post.regulator ? (
                <>
                  <span>·</span>
                  <span>{post.regulator}</span>
                </>
              ) : null}
            </div>
          </div>

          {heroUrl ? (
            <figure className="mb-12">
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border bg-muted/30">
                <Image
                  src={heroUrl}
                  alt={heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1152px"
                />
              </div>
              {post.heroImage?.caption ? (
                <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                  {post.heroImage.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14 items-start">
            <div>
              <BlogPortableText value={post.body} />

              {(post.sourceUrl || post.sourceLabel) && (
                <div className="mt-10 rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">Source</p>
                  {post.sourceUrl ? (
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vault-green-600 dark:text-vault-green-400 hover:underline break-all"
                    >
                      {post.sourceLabel || post.sourceUrl}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{post.sourceLabel}</p>
                  )}
                </div>
              )}

              <p className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                {disclaimer}
              </p>
            </div>

            <BlogCta variant="sidebar" />
          </div>

          {related.length > 0 ? (
            <section className="mt-16 md:mt-20 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold font-display text-foreground mb-8">
                Related articles
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item._id}>
                    <BlogPostCard post={item} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-16 md:mt-20">
            <BlogCta variant="slab" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
