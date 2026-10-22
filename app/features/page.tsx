import type { Metadata } from 'next'
import { Navigation, Footer } from '@/components'
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Users,
  FileCheck,
  Scale,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import {
  LifecycleWorkflow,
  EvidenceFeatures,
} from '@/components/marketing/MeetingLifecycle'

export const metadata: Metadata = {
  title: 'ComplyVault Features | Prepare, Meet & Follow Through',
  description:
    'Explore source-linked meeting review and documentation, plus clearly labelled preparation and live capture previews for RIA teams.',
  alternates: {
    canonical: `${SITE_URL}/features`,
  },
}

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-vault-green-500/20 text-vault-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-vault-green-500/20">
              <Users className="w-4 h-4" />
              <span>Built for Specific Firms</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Prepare. Meet.{' '}
              <span className="text-vault-green-300">Follow through.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Explore the current recording-to-documentation workflow and the
              preparation and live capture previews.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Best For Column */}
            <div className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-vault-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-vault-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Best For</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5 text-vault-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Solo RIAs and small teams
                    </h3>
                    <p className="text-muted-foreground">
                      who want a repeatable documentation and review workflow
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-vault-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      SEC-registered or state-registered RIAs
                    </h3>
                    <p className="text-muted-foreground">
                      who run ongoing client review meetings
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-vault-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Firms that want consistent documentation
                    </h3>
                    <p className="text-muted-foreground">
                      with disclosures + recommendations + follow-ups captured
                      consistently
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-vault-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Advisors/CCOs who need complete workflows
                    </h3>
                    <p className="text-muted-foreground">
                      with review + sign-off + audit trail in one place
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Not Ideal For Column */}
            <div className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Not Ideal For
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Firms that don't conduct advice meetings (or don't document
                    them)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Teams that already have end-to-end supervision + evidence
                    workflows locked down
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Broker-dealer only organizations needing primarily FINRA
                    comms surveillance
                  </p>
                </div>

                <div className="mt-12">
                  <div className="bg-muted/50 p-6 rounded-xl">
                    <p className="font-medium text-foreground mb-3">
                      Not sure?
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Book a quick fit check — we'll tell you honestly in 10
                      minutes.
                    </p>
                    <Link
                      href="#demo"
                      className="inline-flex items-center gap-2 text-vault-green-500 hover:text-vault-green-400 transition-colors"
                    >
                      Book a demo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LifecycleWorkflow />
        <EvidenceFeatures />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            href="/features/configurable-compliance-framework"
            className="flex flex-col sm:flex-row sm:items-center gap-6 rounded-2xl border border-vault-green-500/25 bg-vault-green-500/5 dark:bg-vault-green-500/10 px-8 py-6 mb-10 hover:border-vault-green-500/40 transition-colors group text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vault-green-500/15">
              <SlidersHorizontal
                className="h-7 w-7 text-vault-green-500"
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold font-display text-foreground mb-2">
                Configurable Compliance Framework
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Define what should be captured from adviser-client meetings,
                meeting types, disclosure categories and review expectations. AI
                drafts against your framework with transcript evidence for human
                review.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-vault-green-600 dark:text-vault-green-400">
                Learn how it works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>

        {/* CTA Section */}
        <div id="demo" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
              Ready to see if Comply Vault is right for you?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a quick fit check demo. We'll be honest about whether our
              solution matches your compliance needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg px-6 py-3"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
