import { Metadata } from 'next'
import { Target, Heart, Zap, Shield, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us | Comply Vault',
  description: 'Learn about the team and mission behind Comply Vault.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'We handle sensitive financial data. Security isn\'t a feature—it\'s our foundation.',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description: 'Compliance shouldn\'t slow you down. We\'re obsessed with making documentation fast.',
  },
  {
    icon: Heart,
    title: 'Human-in-the-Loop',
    description: 'AI assists, humans decide. We believe in augmenting expertise, not replacing it.',
  },
  {
    icon: Users,
    title: 'Built for RIAs',
    description: 'We\'re not building generic software. Every feature is designed for the RIA compliance workflow.',
  },
]

const stats = [
  { value: 'Human', label: 'Supervisory accountability' },
  { value: '256-bit', label: 'Encryption standard' },
  { value: 'Object Lock', label: 'WORM for sealed packs' },
  { value: 'RecordSeal', label: 'Preserved seal custody' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Supervisory evidence,{' '}
            <span className="text-vault-coral-300">simplified.</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            ComplyVault sits above existing archives to help RIAs identify what deserves attention and preserve how it was handled.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-vault-green-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Firms retain their records, but supervisory review and evidence assembly still depend on manual work across disconnected systems.
            </p>
          </div>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            <strong>The problem is simple:</strong> An archive preserves a record. People still need to explain what was reviewed, decided, and resolved.
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-6">
            <strong>Our solution:</strong> Keep your archive. Add source-linked review, documented supervisory decisions, and sealed evidence packs with a preserved decision trail.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're not building AI that replaces compliance officers. We're building tools that make them
            faster, more consistent, and more confident. Human-in-the-loop, always.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted/30 border-y border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-vault-green-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">What We Believe</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:border-vault-green-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-vault-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">The Team</h2>
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-vault-green-500 to-vault-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-white">H</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">Hamza Malik</h3>
          <p className="text-vault-green-500 font-medium mb-4">Founder</p>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Building COMPLY VAULT LTD to solve the compliance documentation problem for RIA firms.
            Previously worked on enterprise software and AI applications.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            COMPLY VAULT LTD is a registered company in the UK (Company No. 16889706).
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/hamzanaveedmalik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-vault-green-500 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-muted-foreground/30">•</span>
            <a
              href="https://x.com/complyvaultco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-vault-green-500 transition-colors"
            >
              X / Twitter
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to see it in action?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Book a demo and see how ComplyVault can transform your compliance workflow.
          </p>
          <Link
            href="/#cta"
            className="inline-flex items-center gap-2 bg-white text-vault-green-700 font-semibold px-8 py-4 rounded-xl hover:bg-vault-green-50 transition-colors shadow-xl text-lg group"
          >
            Book a Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  )
}
