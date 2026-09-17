'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Shield, FileCheck, CheckCircle2, Scale } from 'lucide-react'
import { Button } from './Button'

export function Hero() {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false
  
  const badgeText = isUK
    ? 'The evidence layer for FCA supervision'
    : 'The evidence layer for RIA supervision'

  const supportingCopy = isUK
    ? 'ComplyVault sits above your existing archive to turn client meetings, email and messages into a prioritised compliance review queue and source-linked evidence packs — while keeping final judgement with your compliance team.'
    : 'ComplyVault sits above your existing archive to turn client meetings, email, and messages into a prioritized CCO review queue and source-linked evidence packs — while keeping final judgment with your compliance team.'
  
  return (
    <section className="cv-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-4 items-center">
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              {supportingCopy}
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
                <span>Human approval</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Exam-ready evidence</span>
              </div>
            </div>

          </div>

          <figure className="cv-hero-figure relative m-0 min-w-0 self-center">
            <Image
              src="/complyvault-hero-brush.webp"
              alt="Communication trails pass through a gold supervisory review point and continue as linked evidence"
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="cv-hero-art"
              priority
            />
            <figcaption className="relative z-10 mx-auto -mt-3 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-sm text-muted-foreground lg:-mt-8">
              <span>Communications</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#b8954f]" />
              <span>Human review</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#b8954f]" />
              <span>Linked evidence</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
