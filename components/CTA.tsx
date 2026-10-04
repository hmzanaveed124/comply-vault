'use client'

import { CheckCircle2, Shield, Clock, FileCheck, Users } from 'lucide-react'
import { DemoForm } from './DemoForm'

export function CTA() {

  const benefits = [
    { icon: Clock, text: 'Preserved supervisory decisions' },
    { icon: FileCheck, text: 'Evidence-linked audit packs' },
    { icon: Users, text: 'Three-layer human review' },
    { icon: Shield, text: 'Source-linked supervisory evidence' },
  ]

  return (
    <section id="cta" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background - gradient from dark to green */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160_55%_5%)] via-vault-green-900 to-vault-green-800 dark:from-[hsl(160_55%_4%)] dark:via-vault-green-900/90 dark:to-vault-green-800/80" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid" style={{ backgroundSize: '60px 60px' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-56 h-56 border-2 border-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-vault-coral-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/40 rounded-full animate-pulse animation-delay-300" />

      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-vault-green-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-vault-coral-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
              Ready to Transform Your{' '}
              <span className="text-vault-coral-300">Compliance Workflow?</span>
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/85 mb-10 leading-relaxed">
              See how ComplyVault sits above your archive and connects source evidence to review, supervisory decisions, and sealed evidence packs.
              Get a personalized demo for your firm.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-vault-coral-300" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 text-white/60 text-sm justify-center lg:justify-start">
              <Shield className="w-5 h-5" />
              <span>AES-256 at rest • Object Lock WORM for sealed packs • SOC 2: Not started</span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  )
}
