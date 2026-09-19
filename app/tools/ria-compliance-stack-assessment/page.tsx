import type { Metadata } from 'next'
import { Navigation, Footer } from '@/components'
import { SITE_URL } from '@/lib/site'
import Assessment from './assessment'

export const metadata: Metadata = {
  title: 'Free RIA Compliance Stack Assessment | ComplyVault',
  description:
    'A free, non-technical assessment for RIAs and compliance teams. Map your current compliance stack, identify supervisory and evidence gaps, and see practical next steps.',
  alternates: {
    canonical: `${SITE_URL}/tools/ria-compliance-stack-assessment`,
  },
  openGraph: {
    title: 'Free RIA Compliance Stack Assessment | ComplyVault',
    description:
      'Map your archive, review, evidence and exam-readiness workflows in a few minutes and get a practical compliance stack snapshot.',
    type: 'website',
    url: `${SITE_URL}/tools/ria-compliance-stack-assessment`,
  },
}

export default function RIAComplianceStackAssessmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Assessment />
      <Footer />
    </main>
  )
}
