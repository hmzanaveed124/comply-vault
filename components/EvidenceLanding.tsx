import Link from 'next/link'
import { Navigation } from './Navigation'
import { Features } from './Features'
import { WhoItsFor } from './WhoItsFor'
import { HowItWorks } from './HowItWorks'
import { Outputs } from './Outputs'
import { Security } from './Security'
import { FAQ } from './FAQ'
import { CTA } from './CTA'
import { Footer } from './Footer'
import { marketing } from '@/lib/marketing'

interface EvidenceLandingProps {
  title: string
  secondaryMarket?: boolean
}

// Shared product truth keeps solution, feature, and secondary-market pages aligned.
export function EvidenceLanding({ title, secondaryMarket = false }: EvidenceLandingProps) {
  return (
    <main className="relative bg-background">
      <Navigation />
      <section className="relative pt-36 pb-20 noise-texture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-medium mb-6">{marketing.category}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground mb-8">{title}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">{marketing.description}</p>
          <p className="text-foreground font-medium mb-8">Keep your archive. Add the layer that helps you supervise it.</p>
          {secondaryMarket ? (
            <p className="max-w-3xl mx-auto mb-8 p-6 rounded-xl border border-border text-muted-foreground">
              Our primary market is US investment advisers. UK/FCA is a secondary market under exploration. Contact us to assess your workflow and current availability; this page does not promise FCA-specific rule coverage or regulatory approval.
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#cta" className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold">Book a demo</Link>
            <Link href="/sample-audit-pack" className="border border-border rounded-xl px-6 py-3 font-semibold">See a sample evidence pack</Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            { title: 'The problem', text: 'Firms retain their records, but people still manually identify what needs attention and reconstruct what happened later.' },
            { title: 'Your existing stack', text: 'Archive, email, CRM, meeting tools, and compliance procedures. Keep the systems that retain your records.' },
            { title: 'The missing layer', text: 'Help identify activity for review, record supervisory decisions, connect them to source evidence, and preserve the decision trail.' },
          ].map(item => (
            <div key={item.title} className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">{item.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <HowItWorks />
      <Features />
      <Outputs />
      <WhoItsFor />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
