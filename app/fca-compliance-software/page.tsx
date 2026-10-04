import type { Metadata } from 'next'
import { EvidenceLanding } from '@/components/EvidenceLanding'
import { SITE_URL } from '@/lib/site'
import { marketing } from '@/lib/marketing'

export const metadata: Metadata = {
  title: "UK Supervisory Evidence Workflows | ComplyVault",
  description: "Explore supervisory evidence workflows. US RIAs are the primary market; UK/FCA is a secondary market under exploration.",
  alternates: { canonical: `${SITE_URL}/fca-compliance-software` },
  openGraph: { title: "UK Supervisory Evidence Workflows | ComplyVault", description: "Explore supervisory evidence workflows. US RIAs are the primary market; UK/FCA is a secondary market under exploration.", url: `${SITE_URL}/fca-compliance-software`, type: 'website' },
  twitter: { card: 'summary_large_image', title: "UK Supervisory Evidence Workflows | ComplyVault", description: "Explore supervisory evidence workflows. US RIAs are the primary market; UK/FCA is a secondary market under exploration." },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: marketing.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }).replace(/</g, '\\u003c') }} />
      <EvidenceLanding title="Explore supervisory evidence workflows for your UK firm" secondaryMarket={true} />
    </>
  )
}
