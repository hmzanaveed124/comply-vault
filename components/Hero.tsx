'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Shield, FileCheck, CheckCircle2, Scale, MessagesSquare, Mail, Video } from 'lucide-react'
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
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden noise-texture">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-vault-green-500/10 via-transparent to-transparent dark:from-vault-green-500/8" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-vault-coral-500/5 via-transparent to-transparent dark:from-vault-coral-500/5" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-vault-green-100 dark:bg-vault-green-800/20 rounded-2xl rotate-12 float-slow opacity-60" />
      <div className="absolute top-72 right-20 w-16 h-16 bg-vault-coral-100 dark:bg-vault-coral-800/20 rounded-xl -rotate-12 float-medium opacity-60" />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-vault-green-200 dark:bg-vault-green-700/20 rounded-lg rotate-45 float-fast opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in border border-primary/20">
              <Scale className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.06] mb-8 text-foreground animate-fade-in-up">
              Find what needs attention.{' '}
              <span className="text-gradient">Prove how it was handled.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              {supportingCopy}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up animation-delay-200">
              <Button href="/sample-audit-pack" size="lg" className="group">
                See a sample evidence pack
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="#cta" variant="outline" size="lg" className="group">
                Book a pilot walkthrough
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

            {/* Tech Credentials */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-muted-foreground animate-fade-in-up animation-delay-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-vault-green-500 dark:text-vault-green-400" />
                Enterprise-grade encryption
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-vault-green-500 dark:text-vault-green-400" />
                SOC 2 controls
              </span>
            </div>
          </div>

          {/* Right Column - brand illustration + supervisory outcome */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative mx-auto min-h-[540px] max-w-[680px] lg:min-h-[620px]">
              <div className="absolute inset-0 rounded-[3rem] bg-vault-green-500/10 blur-3xl dark:bg-vault-green-500/15" />
              <Image
                src="/complyvault-hero-brush.webp"
                alt="Brush strokes representing meetings, email, and messages becoming an ordered evidence trail"
                width={720}
                height={640}
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_55px_rgba(4,25,15,0.22)]"
                priority
              />

              <div className="absolute left-2 top-16 z-20 flex flex-col gap-2 sm:left-8 sm:top-20">
                <div className="hero-source-chip"><Video className="h-4 w-4" /> Meetings</div>
                <div className="hero-source-chip"><Mail className="h-4 w-4" /> Email</div>
                <div className="hero-source-chip"><MessagesSquare className="h-4 w-4" /> Messages</div>
              </div>

              <div className="absolute bottom-0 left-1/2 z-20 w-[92%] -translate-x-1/2 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-2xl shadow-foreground/10 backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(160_35%_9%)/0.9] sm:bottom-4 sm:w-[84%] sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base font-semibold text-card-foreground">CCO Priority Inbox</p>
                    <p className="mt-1 text-xs text-muted-foreground">One decision surface across supervisory evidence</p>
                  </div>
                  <span className="rounded-full border border-vault-green-500/20 bg-vault-green-500/10 px-2.5 py-1 text-xs font-medium text-vault-green-600 dark:text-vault-green-400">Evidence linked</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl bg-vault-green-500/10 px-3 py-2.5">
                    <div className="text-lg font-bold text-vault-green-600 dark:text-vault-green-400">12</div>
                    <div className="text-[11px] text-muted-foreground sm:text-xs">Cleared</div>
                  </div>
                  <div className="rounded-xl bg-vault-coral-500/10 px-3 py-2.5">
                    <div className="text-lg font-bold text-vault-coral-600 dark:text-vault-coral-400">3</div>
                    <div className="text-[11px] text-muted-foreground sm:text-xs">Needs attention</div>
                  </div>
                  <div className="rounded-xl bg-muted px-3 py-2.5 dark:bg-white/5">
                    <div className="text-lg font-bold text-card-foreground">1</div>
                    <div className="text-[11px] text-muted-foreground sm:text-xs">Escalated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
