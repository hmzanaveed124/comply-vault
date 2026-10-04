import type { Metadata } from 'next'
import {
  Navigation,
  Hero,
  TrustedBy,
  PainPoints,
  Outputs,
  Features,
  WhoItsFor,
  HowItWorks,
  Security,
  FAQ,
  CTA,
  Footer,
} from '@/components'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
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
      <Hero />
      <TrustedBy />
      <PainPoints />
      <Outputs />
      <Features />
      <WhoItsFor />
      <HowItWorks />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
