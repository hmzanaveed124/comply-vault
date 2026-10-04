import type { Metadata } from 'next'
import { Navigation, Footer } from '@/components'
import { Button } from '@/components/Button'
import {
  ArrowRight,
  FileText,
  Download,
  FileCheck,
  Link2,
  History,
  FileStack,
  UserCheck
} from 'lucide-react'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sample Audit Pack | Comply Vault',
  description: 'Explore an illustrative ComplyVault evidence pack with fictional data including structured compliance notes, evidence maps, version history, and full transcripts.',
  keywords: ['audit pack example', 'compliance documentation sample', 'RIA audit trail', 'SEC exam documentation'],
  authors: [{ name: 'Comply Vault' }],
  alternates: {
    canonical: `${SITE_URL}/sample-audit-pack`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SampleAuditPackPage() {
  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-28 pb-20 overflow-hidden noise-texture">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-vault-green-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20">
              <FileCheck className="w-4 h-4" />
              <span>Illustrative Sample</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8 text-foreground">
              Sample <span className="text-gradient">Audit Pack</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
              See exactly what ComplyVault produces from a single client meeting recording. This is an illustrative sample
              with fictional data. It illustrates documentation formats, not a validated customer outcome or live RecordSeal/Object Lock custody.
            </p>

            <ul className="text-left text-muted-foreground space-y-2 max-w-2xl mx-auto mb-10">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-vault-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Timestamped evidence links — every claim sourced to the transcript</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-vault-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Reviewer sign-off page with full certification block</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-vault-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Exportable audit trail — version history from upload to finalization</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* What's Included Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
              What's Included in an <span className="text-vault-green-500">Audit Pack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed to support RIA supervision and exam documentation workflows — source-linked documentation that helps reviewers reconstruct the supervisory decision trail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: FileText,
                title: 'Structured Compliance Note (PDF)',
                description: 'Organized sections for topics discussed, recommendations made, disclosures provided, client decisions, and follow-up actions',
                included: ['Client & meeting details', 'Topics discussed', 'Recommendations', 'Disclosures', 'Decisions', 'Follow-ups'],
              },
              {
                icon: Link2,
                title: 'Evidence Map (CSV)',
                description: 'Links every claim in the compliance note to exact timestamps and transcript snippets',
                disclaimer: 'All values shown in the Evidence Map — including amounts, percentages, and figures — are illustrative placeholders only.',
                included: ['Claim text', 'Timestamp', 'Speaker', 'Transcript snippet', 'Confidence score'],
              },
              {
                icon: History,
                title: 'Version History (CSV)',
                description: 'Complete audit trail of all edits made before finalization',
                included: ['Edit timestamp', 'User', 'Field changed', 'Old value', 'New value', 'Action type'],
              },
              {
                icon: FileCheck,
                title: 'Full Transcript (TXT)',
                description: 'Complete meeting transcript with timestamps and speaker labels',
                included: ['Speaker labels', 'Timestamps', 'Full conversation', 'File metadata'],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-6 border border-border dark:border-white/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-vault-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    {'disclaimer' in item && (
                      <p className="text-xs italic text-muted-foreground mb-2 -mt-1">
                        {item.disclaimer}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {item.included.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-vault-green-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Document Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto bg-card dark:bg-[hsl(160_35%_10%)] rounded-3xl p-12 border border-border dark:border-white/10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-vault-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-10 h-10 text-vault-green-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-4">
                Download Sample Audit Pack
              </h2>
              <p className="text-muted-foreground mb-8">
                An illustrative sample showing the structure and format of a complete audit pack.
                All figures, names, and client details are entirely fictional.
              </p>

              <div className="flex flex-col items-center">
                <Button href="/downloads/ComplyVault_Sample_Audit_Pack.zip" size="lg" className="group">
                  <Download className="w-5 h-5 mr-2" />
                  Download Sample Pack (ZIP)
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Includes: Compliance Note PDF · Evidence Map CSV · Version History · Full Transcript
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  All uploads encrypted · Exportable audit log · Configurable retention policies
                </p>
              </div>

              <div className="mt-8 text-center space-y-2">
                <p className="text-foreground">
                  Source evidence → human review → supervisory decision → preserved evidence.
                </p>
                <p className="text-muted-foreground">
                  Want a sample pack from your own anonymised transcript?{' '}
                  <a href="/#cta" className="text-vault-green-500 hover:underline font-medium">
                    Book a demo
                  </a>
                  {' '}and we&apos;ll discuss the appropriate sample workflow.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div className="text-center p-4 bg-muted/50 dark:bg-white/5 rounded-xl">
                <FileStack className="w-6 h-6 text-vault-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">4 file formats</p>
                <p className="text-xs text-muted-foreground">PDF · CSV · TXT · ZIP</p>
              </div>
              <div className="text-center p-4 bg-muted/50 dark:bg-white/5 rounded-xl">
                <Link2 className="w-6 h-6 text-vault-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">23 evidence links</p>
                <p className="text-xs text-muted-foreground">Every claim timestamped</p>
              </div>
              <div className="text-center p-4 bg-muted/50 dark:bg-white/5 rounded-xl">
                <UserCheck className="w-6 h-6 text-vault-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Advisor sign-off included</p>
                <p className="text-xs text-muted-foreground">Reviewer approval</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-vault-green-500/10 to-vault-coral-500/10 dark:from-vault-green-500/20 dark:to-vault-coral-500/20 rounded-3xl p-12 border border-vault-green-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
              Ready to Create Your Own Audit Packs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a demo and we'll show you how to link source evidence to human review and supervisory decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/#cta"
                size="lg"
                className="group"
                eventName="book_demo_click"
                eventParams={{ location: 'sample_audit_pack_page' }}
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/ria-compliance-software" variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
