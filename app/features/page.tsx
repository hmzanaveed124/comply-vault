import type { Metadata } from 'next'
import { EvidenceLanding } from '@/components/EvidenceLanding'
import { SITE_URL } from '@/lib/site'
import { marketing } from '@/lib/marketing'

export const metadata: Metadata = {
  title: "Supervisory Review and Evidence Features | ComplyVault",
  description: "RIA compliance software that sits above your archive, routes supervisory attention, and preserves source-linked decisions. AI assists; humans remain accountable.",
  alternates: { canonical: `${SITE_URL}/features` },
  openGraph: { title: "Supervisory Review and Evidence Features | ComplyVault", description: "RIA compliance software that sits above your archive, routes supervisory attention, and preserves source-linked decisions. AI assists; humans remain accountable.", url: `${SITE_URL}/features`, type: 'website' },
  twitter: { card: 'summary_large_image', title: "Supervisory Review and Evidence Features | ComplyVault", description: "RIA compliance software that sits above your archive, routes supervisory attention, and preserves source-linked decisions. AI assists; humans remain accountable." },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: marketing.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }).replace(/</g, '\\u003c') }} />
      <EvidenceLanding title="Find. Review. Decide. Preserve." secondaryMarket={false} />
    </>
  )
}
