'use client'

import { Upload, Settings, Rocket, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  { number: '01', icon: Upload, title: 'Identify', description: 'Keep your archive. Bring supported source material into the review workflow through Zoom or file upload.', details: ['Zoom + file upload', 'MP3, MP4, WAV, M4A', 'Source-linked attention'] },
  { number: '02', icon: Settings, title: 'Review', description: 'Verify flagged activity against source evidence. AI assists with routing attention; people assess the context.', details: ['Evidence timestamps', 'Human verification', 'Review context'] },
  { number: '03', icon: CheckCircle2, title: 'Decide', description: 'Document the supervisory decision and resolution through adviser, Compliance Manager, and CCO review where required by the firm.', details: ['Three-layer human review', 'Recorded decisions', 'Human accountability'] },
  { number: '04', icon: Rocket, title: 'Preserve', description: 'Seal the evidence pack with RecordSeal and Object Lock WORM retention. Corrections create a successor without erasing the original.', details: ['Sealed evidence pack', 'RecordSeal', 'Supersession without erasure'] },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 lg:py-36 bg-background relative overflow-hidden noise-texture">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-vault-coral-500/10 dark:bg-vault-coral-500/15 text-vault-coral-600 dark:text-vault-coral-400 px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-vault-coral-500/20">
            <Rocket className="w-4 h-4" />
            <span>Simple Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            From source evidence to{' '}
            <span className="text-vault-coral-500 dark:text-vault-coral-400">a Preserved Decision Trail</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Identify. Review. Decide. Preserve. Keep the source evidence connected to each supervisory decision and its resolution.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border dark:border-white/10 hover:border-primary/30 hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300 h-full">
                {/* Step Number Badge */}
                <div className="w-12 h-12 bg-gradient-to-br from-vault-green-500 to-vault-green-600 rounded-xl flex items-center justify-center text-white font-bold font-display text-lg shadow-lg shadow-vault-green-500/30 mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-muted dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-border dark:border-white/5">
                  <step.icon className="w-7 h-7 text-vault-green-500 dark:text-vault-green-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details List */}
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-vault-green-500 dark:text-vault-green-400 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow to next step (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-6 lg:hidden">
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-vault-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-vault-green-600 dark:hover:bg-vault-green-400 transition-colors shadow-lg shadow-vault-green-500/25 hover:shadow-xl hover:shadow-vault-green-500/30"
          >
            Get a Demo
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
