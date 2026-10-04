import type { Metadata } from 'next'
import { EvidenceLanding } from '@/components/EvidenceLanding'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'UK Supervisory Evidence Enquiries | ComplyVault',
  description: 'Explore supervisory evidence workflows for UK firms. US RIAs are the primary market; UK/FCA is a secondary market under exploration.',
  alternates: { canonical: `${SITE_URL}/uk` },
}

export default function UKHomePage() {
  return <EvidenceLanding title="Explore supervisory evidence for your UK firm" secondaryMarket />
}
