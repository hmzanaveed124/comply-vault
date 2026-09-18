'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Shield, FileCheck, CheckCircle2, Scale } from 'lucide-react'
import { Button } from './Button'

export function Hero() {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false
  
  const badgeText = isUK
    ? 'Built for FCA supervision & recordkeeping'
    : 'Built for SEC & state RIA exams'

  const supportingCopy = isUK
    ? 'When an examiner asks how a client matter was handled, bring together the communications, source evidence and CCO decisions in one reviewable pack.'
    : 'When an SEC or state examiner asks how a client matter was handled, bring together the communications, source evidence, and CCO decisions in one reviewable pack.'

  return (
    <section className="cv-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="relative z-20 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Scale className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold font-display leading-[1.1] tracking-tight mb-6 text-foreground">
              Find what needs attention.{' '}
              <span className="block text-vault-green-600 dark:text-[#b9cfb8]">Prove how it was handled.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              {supportingCopy}
            </p>

            <p className="mb-8 text-sm text-muted-foreground">
              Works with your existing archive, or on its own with connected and uploaded records.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start mb-8 animate-fade-in-up animation-delay-200">
              <Button href="/sample-audit-pack" size="md" className="group whitespace-nowrap">
                See an evidence pack
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="#cta" variant="outline" size="md" className="group whitespace-nowrap">
                Book a walkthrough
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Indicators - Actually Built Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in-up animation-delay-300 mb-6">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Source-linked findings</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>CCO-only finalization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Audit trail logging</span>
              </div>
            </div>

          </div>

          <figure className="relative m-0 min-w-0">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-12 -inset-y-16 opacity-20">
              <Image src="/complyvault-hero-brush.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="cv-hero-art object-contain" />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10">
              <div className="flex items-start justify-between gap-3 border-b border-border p-5 sm:p-6">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Exam request workspace</p>
                  <h2 className="font-display text-xl font-semibold">Candidate Pack</h2>
                </div>
                <span className="rounded-full bg-[#b8954f]/10 px-3 py-1 text-xs font-medium text-[#806020] dark:text-[#d8b86f]">CCO review pending</span>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <p className="text-sm font-medium">Client fee disclosure review</p>
                  <p className="mt-1 text-sm text-muted-foreground">Request: communications, disclosures and supervisory decisions</p>
                </div>
                <div className="divide-y divide-border rounded-xl border border-border">
                  {[
                    ['Client email', 'Original message linked', 'Source linked'],
                    ['Adviser meeting', 'Transcript • 12:42–13:18', 'Source linked'],
                    ['Supervisory decision', 'Reviewer and rationale recorded', 'Recorded'],
                  ].map(([title, detail, status]) => (
                    <div key={title} className="flex items-start gap-3 p-3 sm:p-4">
                      <FileCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-vault-green-500 dark:text-[#b9cfb8]" />
                      <div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p><p className="mt-0.5 text-xs text-muted-foreground">{detail}</p></div>
                      <span className="text-xs text-muted-foreground">{status}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-[#b8954f]/30 bg-[#b8954f]/5 p-3 text-sm">
                  <p className="font-medium text-[#806020] dark:text-[#d8b86f]">Coverage gap: SMS records unavailable</p>
                  <p className="mt-1 text-muted-foreground">Missing evidence is flagged for review. No unsupported answer is generated.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Shield aria-hidden="true" className="h-4 w-4 shrink-0" />CCO sign-off required before finalization</div>
              </div>
            </div>
            <figcaption className="relative mt-3 text-center text-xs text-muted-foreground">Illustrative product preview · Sample records</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
