'use client'

import { Shield, Lock, Eye, Server, CheckCircle2, Clock } from 'lucide-react'

const currentFeatures = [
  { name: 'AES-256 Encryption', description: 'Data encrypted at rest and in transit' },
  { name: 'Role-Based Access', description: 'Role-gated human review' },
  { name: 'Audit Trail', description: 'Review and decision logging' },
  { name: 'Object Lock WORM', description: 'Implemented for sealed evidence packs' },
  { name: 'RecordSeal', description: 'Seal custody and supersession without erasure' },
  { name: 'Workspace Isolation', description: 'Strict tenant separation' },
]

const roadmapFeatures = [
  { name: 'SOC 2 Type II', status: 'Not started' },

]

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encryption Everywhere',
    description: 'TLS 1.2+ in transit, AES-256 at rest for all recordings and documents.',
  },
  {
    icon: Eye,
    title: 'Role-Based Access Control',
    description: 'Adviser, Compliance Manager, and CCO review gates where required by the firm.',
  },
  {
    icon: Server,
    title: 'Workspace Isolation',
    description: 'Workspace isolation and access controls separate each firm\'s data.',
  },
]

export function Security() {
  return (
    <section id="security" className="py-28 lg:py-36 bg-gray-900 dark:bg-[hsl(160_55%_4%)] relative overflow-hidden section-divider-top">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid" style={{ backgroundSize: '40px 40px' }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-vault-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vault-coral-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-vault-green-500/20 text-vault-green-400 px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-vault-green-500/30">
              <Shield className="w-4 h-4" />
              <span>Security-First Architecture</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-8">
              Built for{' '}
              <span className="text-vault-green-400">Sensitive Data</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              Client meeting recordings contain sensitive information. We've built
              Comply Vault with security as a foundation, not an afterthought.
            </p>

            {/* Security Features */}
            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-vault-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-vault-green-500/30">
                    <feature.icon className="w-7 h-7 text-vault-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Security Status */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-gray-800/60 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 dark:border-white/10">
              <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                <Shield className="w-6 h-6 text-vault-green-400" />
                Security Status
              </h3>

              {/* Current Features */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  Currently Implemented
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {currentFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/40 dark:bg-white/5 rounded-xl p-4 border border-gray-600/40 dark:border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-vault-green-400" />
                        <span className="font-semibold text-white text-sm">{feature.name}</span>
                      </div>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  Certification Status
                </h4>
                <div className="space-y-3">
                  {roadmapFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/20 dark:bg-white/3 rounded-lg p-3 border border-gray-600/20 dark:border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300 text-sm">{feature.name}</span>
                      </div>
                      <span className="text-xs text-vault-coral-400 bg-vault-coral-500/10 px-2 py-1 rounded">
                        {feature.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparency Note */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 dark:border-white/10">
                <p className="text-sm text-gray-400 leading-relaxed">
                  SOC 2 has not been started. Object Lock WORM retention is implemented for sealed evidence packs.
                  Contact us for our current security documentation and subprocessor list.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-vault-green-400 font-medium mt-4 hover:text-vault-green-300 transition-colors text-sm"
                >
                  Request Security Documentation
                  <Shield className="w-4 h-4" />
                </a>
                <p className="text-sm text-gray-400 leading-relaxed mt-4">
                  Designed for US RIA supervisory workflows. Firms remain responsible for their compliance obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
