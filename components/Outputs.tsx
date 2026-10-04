'use client'

import { FileText, Archive, MessageSquare, Table, Download, ArrowRight } from 'lucide-react'

const outputs = [
  {
    icon: FileText,
    title: 'Structured Compliance Note',
    formats: ['PDF'],
    description: 'Topics, recommendations, disclosures discussed, decisions, and follow-ups—all extracted and formatted.',
    features: ['Evidence links', 'Sign-off recorded', 'Version history'],
  },
  {
    icon: Table,
    title: 'Evidence Map',
    formats: ['CSV'],
    description: 'Each claim linked to timestamp, transcript snippet, confidence score, and edit status.',
    features: ['Timestamp links', 'Confidence scores', 'Edit tracking'],
  },
  {
    icon: MessageSquare,
    title: 'Full Transcript',
    formats: ['TXT'],
    description: 'Complete meeting transcript with timestamps and speaker labels for reference.',
    features: ['Speaker diarization', 'Timestamp markers', 'Searchable text'],
  },
  {
    icon: Archive,
    title: 'Sealed Evidence Pack',
    formats: ['ZIP'],
    description: 'Bundle source-linked documentation and the decision trail. Object Lock protects sealed packs; RecordSeal preserves custody and supersession.',
    features: ['One-click download', 'Retrievable evidence', 'Complete bundle'],
  },
]

export function Outputs() {
  return (
    <section id="outputs" className="py-28 lg:py-36 bg-background relative overflow-hidden noise-texture section-divider-top">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <FileText className="w-4 h-4" />
            <span>What You Get</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            Preserved Supervisory Evidence,{' '}
            <span className="text-gradient">Source to Decision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Preserve source evidence, review context, supervisory decisions, and resolution in a sealed evidence pack alongside your existing retention systems.
          </p>
        </div>

        {/* Outputs Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {outputs.map((output, index) => (
            <div
              key={index}
              className="group bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 lg:p-10 border border-border dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-vault-green-100 dark:bg-vault-green-800/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-vault-green-500 transition-colors">
                  <output.icon className="w-8 h-8 text-vault-green-500 dark:text-vault-green-400 group-hover:text-white transition-colors" />
                </div>

                <div className="flex-1">
                  {/* Title & Formats */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {output.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {output.formats.map((format) => (
                        <span
                          key={format}
                          className="text-xs font-medium px-2 py-0.5 bg-muted dark:bg-white/5 text-muted-foreground rounded border border-border dark:border-white/10"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {output.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {output.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-medium px-3 py-1.5 bg-vault-green-500/10 dark:bg-vault-green-500/15 text-vault-green-700 dark:text-vault-green-400 rounded-full border border-vault-green-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supported File Types Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Supported uploads:</strong> MP3, MP4, WAV, M4A via file upload; Zoom is supported. Other platforms are not native integrations.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-3 bg-vault-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-vault-green-600 dark:hover:bg-vault-green-400 transition-colors shadow-lg shadow-vault-green-500/25 hover:shadow-xl group"
          >
            See the Workflow
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
