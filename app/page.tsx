import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  LifecycleHero,
  LifecycleWorkflow,
  EvidenceFeatures,
  LifecycleAudience,
  LifecycleSecurity,
  LifecycleFAQ,
  LifecycleCTA,
} from '@/components/marketing/MeetingLifecycle'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'ComplyVault | Client Conversations, Follow-Through & Evidence',
  description:
    'Review source-linked meeting notes, preserve decisions and export documentation. Explore the Prepare and Meet product previews for RIA teams.',
  openGraph: {
    title: 'ComplyVault | Better Conversations. Reviewable Evidence.',
    description:
      'Source-linked meeting review and documentation, with preparation and live capture previews for RIA teams.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ComplyVault | Better Conversations. Reviewable Evidence.',
    description:
      'Explore the current meeting review workflow and the Prepare and Meet previews.',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'en-GB': `${SITE_URL}/uk`,
      'x-default': SITE_URL,
    },
  },
}

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <LifecycleHero />
      <LifecycleWorkflow />
      <EvidenceFeatures />
      <LifecycleAudience />
      <LifecycleSecurity />
      <LifecycleFAQ />
      <LifecycleCTA />
      <Footer />
    </main>
  )
}
