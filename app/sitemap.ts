import { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/sanity/fetch'
import { SITE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let blogPosts: MetadataRoute.Sitemap = []

    try {
        const posts = await getAllPosts()
        blogPosts = posts.map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || post.publishedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('[sitemap] Failed to load Sanity posts:', error)
    }

    return [
        {
            url: `${SITE_URL}/blog`,
            lastModified: blogPosts[0]?.lastModified ?? new Date('2026-06-10'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...blogPosts,
        {
            url: SITE_URL,
            lastModified: new Date('2026-01-22'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/ria-compliance-software`,
            lastModified: new Date('2026-01-23'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/fca-compliance-software`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/pricing`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/uk`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/uk/fca-compliance-software`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/uk/pricing`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Success page intentionally excluded from sitemap as it's not meant for direct navigation

        {
            url: `${SITE_URL}/features`,
            lastModified: new Date('2026-01-27'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/features/configurable-compliance-framework`,
            lastModified: new Date('2026-05-06'),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${SITE_URL}/sample-audit-pack`,
            lastModified: new Date('2026-01-23'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date('2026-01-22'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date('2026-01-22'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: new Date('2026-01-22'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified: new Date('2026-01-22'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]
}
