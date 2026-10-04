'use client'

import {
  Mic,
  Brain,
  Link2,
  Edit3,
  UserCheck,
  History,
  ArrowRight
} from 'lucide-react'

const features = [
  { icon: Brain, title: 'Route Supervisory Attention', description: 'Help identify activity that deserves review. AI routes attention and assists review; humans make supervisory decisions.', color: 'green' },
  { icon: Mic, title: 'Supported Source Intake', description: 'Zoom and MP3, MP4, WAV, or M4A file uploads support the recording workflow. Other meeting platforms are not native integrations.', color: 'coral' },
  { icon: Link2, title: 'Source-Linked Evidence', description: 'Connect review findings to source material, with timestamps and transcript snippets for recording evidence.', color: 'green' },
  { icon: Edit3, title: 'Documented Decisions', description: 'Preserve review context, supervisory decisions, and resolution alongside the source evidence.', color: 'coral' },
  { icon: UserCheck, title: 'Three-Layer Human Review', description: 'Adviser, Compliance Manager, and CCO review gates where the firm requires them. Humans remain accountable.', color: 'green' },
  { icon: History, title: 'Sealed Evidence Packs', description: 'Object Lock WORM retention and RecordSeal preserve sealed packs. Supersession records corrections without erasing the original.', color: 'coral' },
]

export function Features() {
  return (
    <section id="features" className="py-28 lg:py-36 dark:section-dark-deeper relative overflow-hidden noise-texture section-divider-top">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-30" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-vault-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-vault-coral-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Brain className="w-4 h-4" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            What Comply Vault{' '}
            <span className="text-gradient">Actually Does</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A supervisory evidence layer above your existing archive: source evidence → attention → review → decision → resolution → sealed pack.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 lg:p-10 border border-border dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 hover:border-primary/30 transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${
                feature.color === 'green'
                  ? 'bg-vault-green-100 dark:bg-vault-green-800/30 group-hover:bg-vault-green-500'
                  : 'bg-vault-coral-100 dark:bg-vault-coral-800/30 group-hover:bg-vault-coral-500'
              }`}>
                <feature.icon className={`w-8 h-8 transition-colors duration-300 ${
                  feature.color === 'green'
                    ? 'text-vault-green-500 dark:text-vault-green-400 group-hover:text-white'
                    : 'text-vault-coral-500 dark:text-vault-coral-400 group-hover:text-white'
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note about what this ISN'T */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>Note:</strong> ComplyVault helps organize and retrieve supervisory evidence.
            It does not make compliance determinations or guarantee SEC compliance.
            Always consult with your CCO.
          </p>
        </div>
      </div>
    </section>
  )
}
