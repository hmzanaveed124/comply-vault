'use client'

import { CheckCircle2, XCircle, Building2, Users, TrendingUp, Scale } from 'lucide-react'

const bestFor = [
  { icon: Scale, title: 'SEC- and state-registered RIAs', description: 'Qualify on supervisory workload and evidence fragmentation, rather than AUM or registration type.' },
  { icon: Users, title: 'Lean compliance teams', description: 'A CCO, principal wearing the CCO hat, or COO with a named compliance owner and recurring manual review.' },
  { icon: Building2, title: 'Firms with an existing archive', description: 'Retained digital communications, manual evidence assembly, and no desire for an archive migration.' },
  { icon: TrendingUp, title: 'Outsourced CCOs and platform partners', description: 'Compliance consultants, RIA platforms, and TAMPs exploring a consistent evidence workflow across client firms.' },
]

const notIdealFor = [
  'No meaningful supervisory review volume or retained digital communications',
  'Buyer wants only an archive or archive replacement',
  'No named compliance owner',
  'Broker-dealer surveillance is the primary need',
  'Buyer requires autonomous compliance decisions',
]

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-28 lg:py-36 dark:section-dark-deeper relative overflow-hidden noise-texture section-divider-top">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Users className="w-4 h-4" />
            <span>Built for Specific Firms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            Is Comply Vault Right for{' '}
            <span className="text-gradient">Your Firm?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We've built Comply Vault for firms that need defensible documentation and compliance trails.
            Here's how to know if we're a fit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Best For */}
          <div className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 lg:p-10 border border-vault-green-500/30 shadow-lg dark:shadow-black/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-vault-green-500/15 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-vault-green-500 dark:text-vault-green-400" />
              </div>
              <h3 className="text-2xl font-bold font-display text-card-foreground">
                Best For
              </h3>
            </div>

            <div className="space-y-6">
              {bestFor.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-vault-green-100 dark:bg-vault-green-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-vault-green-500 dark:text-vault-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Not Ideal For */}
          <div className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 lg:p-10 border border-border dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-muted dark:bg-white/5 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold font-display text-card-foreground">
                Not Ideal For
              </h3>
            </div>

            <div className="space-y-5">
              {notIdealFor.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border dark:border-white/10">
              <p className="text-sm text-muted-foreground">
                <strong className="text-card-foreground">Not sure?</strong> Book a quick call and we'll help you
                determine if Comply Vault is the right fit for your firm's specific situation.
              </p>
            </div>
          </div>
        </div>

        {/* Learn More CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border dark:border-white/10">
            <p className="text-muted-foreground mb-4">
              Want to learn more about our RIA compliance software features?
            </p>
            <a
              href="/ria-compliance-software"
              className="inline-flex items-center gap-2 text-vault-green-500 dark:text-vault-green-400 font-semibold hover:underline transition-all"
            >
              Explore RIA Compliance Software
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
