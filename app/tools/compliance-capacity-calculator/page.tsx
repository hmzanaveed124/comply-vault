import type { Metadata } from 'next'
import { getRecentPosts } from '@/src/sanity/fetch'
import { getImageUrl, getImageAlt } from '@/src/sanity/image'
import CapacityLab from './capacity-lab'

export const revalidate = 3600
export const metadata: Metadata = {
 title: 'The cost of reconstructing compliance | ComplyVault Capacity Lab',
 description: 'Explore your review workload, evidence coverage and first-year capacity with a transparent, interactive ComplyVault model.',
 alternates: { canonical: '/tools/compliance-capacity-calculator' },
}
export default async function Page() {
 const posts = await getRecentPosts(3)
 const reading = posts.map(post => ({
  title: post.title, slug: post.slug, excerpt: post.excerpt,
  image: getImageUrl(post.heroImage, 900),
  alt: getImageAlt(post.heroImage, post.title),
 }))
 return <CapacityLab reading={reading} />
}
