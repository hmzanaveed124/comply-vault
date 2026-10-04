'use client'

import { usePathname } from 'next/navigation'
import { ArrowRight, Shield, FileCheck, Clock, CheckCircle2, Scale, Users } from 'lucide-react'
import { Button } from './Button'

export function Hero() {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false

  const badgeText = isUK
    ? 'Supervisory evidence workflows — UK enquiries'
    : 'Supervisory evidence layer for RIAs'

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8 text-foreground animate-fade-in-up">
              Find what needs attention.{' '}
              <span className="text-gradient">Prove how it was handled.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              ComplyVault sits above your existing archive to help identify activity that deserves attention, connect source evidence to supervisory decisions, and preserve how issues were reviewed and resolved. AI assists; your compliance team remains accountable.
            </p>

            <p className="text-base font-medium text-foreground mb-8">Keep your archive. Add the layer that helps you supervise it.</p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up animation-delay-200">
              <Button href="#cta" size="lg" className="group">
                Book a demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/sample-audit-pack" variant="outline" size="lg" className="group">
                See a sample evidence pack
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Indicators - Actually Built Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in-up animation-delay-300 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Evidence timestamps</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Audit trail logging</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                <span>Three-layer human review</span>
              </div>
            </div>

            {/* Tech Credentials */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-muted-foreground animate-fade-in-up animation-delay-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-vault-green-500 dark:text-vault-green-400" />
                AES-256 encryption at rest
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-vault-green-500 dark:text-vault-green-400" />
                SOC 2: Not started
              </span>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-card dark:card-elevated rounded-3xl shadow-2xl shadow-foreground/10 dark:shadow-black/30 p-6 border border-border dark:glow-green">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Review Queue</h3>
                    <p className="text-sm text-muted-foreground">Illustrative workflow — fictional data</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-vault-green-500/10 dark:bg-vault-green-500/15 text-vault-green-600 dark:text-vault-green-400 rounded-full text-sm font-medium border border-vault-green-500/20">
                    <span className="w-2 h-2 bg-vault-green-500 rounded-full animate-pulse" />
                    Ready for Review
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted dark:bg-white/5 rounded-xl p-4 text-center border border-transparent dark:border-white/5">
                    <div className="text-2xl font-bold text-vault-green-500 dark:text-vault-green-400">12</div>
                    <div className="text-xs text-muted-foreground">Finalized</div>
                  </div>
                  <div className="bg-muted dark:bg-white/5 rounded-xl p-4 text-center border border-transparent dark:border-white/5">
                    <div className="text-2xl font-bold text-card-foreground">3</div>
                    <div className="text-xs text-muted-foreground">Drafts</div>
                  </div>
                  <div className="bg-muted dark:bg-white/5 rounded-xl p-4 text-center border border-transparent dark:border-white/5">
                    <div className="text-2xl font-bold text-card-foreground">Linked</div>
                    <div className="text-xs text-muted-foreground">Decision trail</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-vault-green-500/10 dark:bg-vault-green-500/15 rounded-xl border border-vault-green-500/20">
                    <FileCheck className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">Johnson Portfolio Review</p>
                      <p className="text-xs text-muted-foreground">Adviser → Compliance Manager → CCO review</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5">
                    <Clock className="w-5 h-5 text-vault-coral-500 dark:text-vault-coral-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">Smith Retirement Planning</p>
                      <p className="text-xs text-muted-foreground">Draft ready • 45 min meeting</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted dark:bg-white/5 px-2 py-1 rounded-full">
                      Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Cards - Hidden for now */}
              <div className="hidden absolute -top-[19%] -right-[19%] bg-card dark:bg-[hsl(160_35%_12%)] rounded-2xl shadow-xl shadow-foreground/10 dark:shadow-black/30 p-4 border border-border float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-vault-green-100 dark:bg-vault-green-800/30 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">Evidence Linked</p>
                    <p className="text-xs text-muted-foreground">23 timestamps</p>
                  </div>
                </div>
              </div>

              <div className="hidden absolute -bottom-[24%] -left-[10%] bg-card dark:bg-[hsl(160_35%_12%)] rounded-2xl shadow-xl shadow-foreground/10 dark:shadow-black/30 p-4 border border-border float-medium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-vault-coral-100 dark:bg-vault-coral-800/30 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-vault-coral-500 dark:text-vault-coral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">Export Pack</p>
                    <p className="text-xs text-muted-foreground">PDF + CSV + ZIP</p>
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
