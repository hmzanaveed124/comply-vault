import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { Navigation, Footer } from '@/components'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { getAllPosts, getFeaturedPosts } from '@/src/sanity/fetch'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'ComplyVault Blog | Regulatory analysis for RIA compliance teams',
  description:
    'Regulatory developments, examination lessons and practical compliance analysis for RIAs and compliance teams.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'ComplyVault Blog',
    description:
      'Regulatory developments, examination lessons and practical compliance analysis for RIAs and compliance teams.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'ComplyVault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ComplyVault Blog',
    description:
      'Regulatory developments, examination lessons and practical compliance analysis for RIAs and compliance teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 60

export default async function BlogIndexPage(): Promise<JSX.Element> {
  const [featuredPosts, allPosts] = await Promise.all([
    getFeaturedPosts(1),
    getAllPosts(),
  ])

  const featured = featuredPosts[0] ?? null
  const recent = featured
    ? allPosts.filter((post) => post._id !== featured._id)
    : allPosts

  const categories = Array.from(
    new Map(
      allPosts
        .filter((post) => post.category?.slug)
        .map((post) => [post.category!.slug, post.category!.title])
    ).entries()
  )

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen">
        <div className="bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 pt-32 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-vault-green-500/20 text-vault-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-vault-green-500/20">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              ComplyVault Blog
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Regulatory developments, examination lessons and practical compliance analysis for
              RIAs and compliance teams.
            </p>
          </div>
        </div>

        <div className="relative -mt-px bg-gradient-to-b from-vault-green-950/40 to-background pt-12 md:pt-16 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-16">
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map(([slug, title]) => (
                  <span
                    key={slug}
                    className="text-xs font-medium text-muted-foreground bg-muted/60 border border-border px-3 py-1.5 rounded-full"
                  >
                    {title}
                  </span>
                ))}
              </div>
            ) : null}

            {featured ? (
              <section>
                <p className="text-sm font-medium text-vault-green-600 dark:text-vault-green-400 mb-4">
                  Featured
                </p>
                <BlogPostCard post={featured} featured />
              </section>
            ) : null}

            {recent.length > 0 ? (
              <section>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-2">
                    Recent articles
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Practical analysis for teams building reconstructable compliance evidence.
                  </p>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recent.map((post) => (
                    <li key={post._id}>
                      <BlogPostCard post={post} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {allPosts.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Articles will appear here once the first post is published.
                </p>
              </div>
            ) : null}

            <p className="pt-8 border-t border-border text-sm text-muted-foreground text-center">
              Educational content, not legal or compliance advice.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
