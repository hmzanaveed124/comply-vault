import { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import Link from 'next/link'
import { Navigation, Footer } from '@/components'
import { usPricingContent as content } from '@/src/content/us/pricing'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing | ComplyVault — Plans for RIAs & CCO Partners',
  description: 'ComplyVault is $199 per firm/month, or $149 per firm/month for partners with 3+ firms. Start with a $199 paid pilot. Standard onboarding included.',
  alternates: {
    canonical: `${SITE_URL}/pricing`,
    languages: { 'en-US': `${SITE_URL}/pricing`, 'en-GB': `${SITE_URL}/uk/pricing`, 'x-default': `${SITE_URL}/pricing` },
  },
}

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pb-20">
        <section className="px-4 pt-36 pb-12 sm:px-6 lg:pt-44 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-vault-green-500 mb-5">For RIAs and outsourced CCOs</p>
          <h1 className="text-4xl sm:text-5xl font-bold font-display max-w-3xl mx-auto leading-tight">{content.hero.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">{content.hero.description}</p>
          <p className="mt-5 text-sm text-muted-foreground">Per firm pricing · Standard onboarding included · Monthly plans</p>
        </section>

        <section aria-label="Monthly plans" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {content.plans.map((plan) => (
              <article key={plan.name} className={`rounded-2xl border p-6 sm:p-8 flex flex-col ${plan.name === 'Firm' ? 'border-vault-green-500 bg-vault-green-500/5' : 'border-border bg-card'}`}>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-muted-foreground mt-3 min-h-12">{plan.description}</p>
                <div className="mt-7 flex flex-wrap items-baseline gap-2"><span className="text-5xl font-bold tracking-tight">{plan.price}</span><span className="text-muted-foreground text-sm">{plan.unit}</span></div>
                <p className="text-sm text-muted-foreground mt-3 mb-7">{plan.note}</p>
                <p className="font-medium mb-4">Full review &amp; evidence workflow, plus:</p>
                <ul className="space-y-3 mb-8 flex-1">{plan.features.map(feature => <li key={feature} className="flex gap-3 text-sm"><CheckCircle2 aria-hidden="true" className="w-5 h-5 shrink-0 text-vault-green-500" /><span>{feature}</span></li>)}</ul>
                <Link href={plan.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-vault-green-500 hover:bg-vault-green-600 text-white px-5 py-3 font-semibold transition-colors">{plan.cta}<ArrowRight aria-hidden="true" className="w-4 h-4" /></Link>
              </article>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-5">USD. Applicable taxes additional. Higher volumes and custom integrations quoted separately.</p>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold flex items-center gap-3"><Shield aria-hidden="true" className="w-5 h-5 text-vault-green-500" />Included in both plans</h2>
            <ul className="grid sm:grid-cols-2 gap-4 mt-6">{content.features.map(feature => <li key={feature} className="flex gap-3 text-sm text-muted-foreground"><CheckCircle2 aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5 text-vault-green-500" /><span>{feature}</span></li>)}</ul>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12" aria-labelledby="pilot-heading">
          <div className="rounded-2xl border border-vault-green-500/30 bg-vault-green-500/5 p-6 sm:p-8">
            <p className="text-sm font-semibold text-vault-green-500 mb-3">Start with a real review task</p>
            <h2 id="pilot-heading" className="text-2xl sm:text-3xl font-bold">One firm. 30 days. $199.</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl">Work through your own records with guided setup. Compare the time spent reviewing communications and preparing evidence with your current process.</p>
            <ol className="grid sm:grid-cols-3 gap-6 my-7 text-sm">{['Agree sources, scope, and a baseline.', 'Review real matters and prepare a Candidate Pack.', 'Compare results and decide whether to continue.'].map((step, i) => <li key={step}><span className="block text-vault-green-500 font-semibold mb-2">0{i + 1}</span>{step}</li>)}</ol>
            <Link href="/#cta" className="inline-flex items-center gap-2 font-semibold text-vault-green-500 hover:underline">Book a pilot walkthrough<ArrowRight aria-hidden="true" className="w-4 h-4" /></Link>
            <p className="text-xs text-muted-foreground mt-4">One-time pilot fee. Firm plan allowances apply. No automatic renewal or additional setup fee for standard onboarding.</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl font-bold mb-8">A few practical details</h2>
          <div className="space-y-3">{content.faqs.map(faq => <details key={faq.question} className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-medium">{faq.question}</summary><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p></details>)}</div>
          <p className="mt-10 text-center text-muted-foreground">Need more mailboxes or a custom archive connection? <Link href="/contact" className="text-vault-green-500 font-medium hover:underline">Discuss your scope.</Link></p>
        </section>
      </main>
      <Footer />
    </>
  )
}
