'use client'

import { Mic, Clock, FileCheck, Link2 } from 'lucide-react'

const benefits = [
  { icon: Mic, title: 'Retained records', description: 'Your archive keeps the source records. Keep that retention system in place.' },
  { icon: Clock, title: 'Recurring review', description: 'Lean teams still need to identify activity that deserves supervisory attention.' },
  { icon: FileCheck, title: 'Documented decisions', description: 'Record what was reviewed, what was decided, and how the issue was resolved.' },
  { icon: Link2, title: 'Preserved evidence', description: 'Connect the decision trail to source evidence instead of rebuilding it later.' },
]

export function PainPoints() {
  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-transparent relative noise-texture">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            Move beyond{' '}
            <span className="text-vault-green-600 dark:text-vault-green-400">Supervision by Reconstruction</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Retaining a record is only part of the story. When evidence lives across your archive, inbox, notes, and spreadsheets, people still have to reconstruct what happened and how it was handled.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border dark:border-white/10 hover:border-vault-green-500/40 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-vault-green-500/10 dark:bg-vault-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vault-green-500/20 dark:group-hover:bg-vault-green-500/30 transition-colors">
                <benefit.icon className="w-7 h-7 text-vault-green-600 dark:text-vault-green-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
