import type { Metadata } from 'next'
import { getRecentPosts } from '@/src/sanity/fetch'
import { getImageUrl, getImageAlt } from '@/src/sanity/image'
import CapacityLab from './capacity-lab'

export const revalidate = 3600
export const metadata: Metadata = {
 title: 'How much review time could your team reclaim? | ComplyVault Capacity Lab',
 description: 'Explore your review workload, evidence coverage and first-year capacity with a transparent, interactive ComplyVault model.',
 alternates: { canonical: '/tools/compliance-capacity-calculator' },
 openGraph: {title:'How much review time could your team reclaim?',description:'Build and save an inspectable compliance capacity case using your own workload.',type:'website'},
 twitter: {card:'summary',title:'ComplyVault Capacity Lab',description:'Model the review time your team could reclaim.'},
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
