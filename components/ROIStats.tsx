'use client'

import { usePathname } from 'next/navigation'
import { Clock, DollarSign, TrendingUp, Shield, Info } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    value: '40+',
    unit: 'hours',
    label: 'Saved monthly',
    description: 'On supervision notes, audit prep, and documentation',
  },
  {
    icon: DollarSign,
    value: '75%',
    unit: '',
    label: 'Cost reduction',
    description: 'Compared to manual compliance processes',
  },
  {
    icon: TrendingUp,
    value: '3x',
    unit: '',
    label: 'Faster exam prep',
    description: 'From 3 days to 4 hours average',
  },
]

export function ROIStats() {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false
  
  const description = isUK
    ? 'Results from UK financial services firms using Comply Vault for FCA supervision and monitoring documentation.'
    : 'Results from SEC-registered RIAs using Comply Vault for supervision documentation and exam preparation.'
  
  return (
    <section className="py-28 lg:py-36 bg-gradient-to-br from-vault-green-600 via-vault-green-500 to-vault-green-700 dark:from-vault-green-700 dark:via-vault-green-600 dark:to-vault-green-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid" style={{ backgroundSize: '60px 60px' }} />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-vault-coral-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Shield className="w-4 h-4" />
            <span>Measured Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            The ROI of Proactive Compliance
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-vault-green-600" />
              </div>

              {/* Value */}
              <div className="mb-5">
                <span className="text-5xl lg:text-6xl font-bold font-display text-white">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-2xl font-semibold text-white/80 ml-2">
                    {stat.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-white mb-3">{stat.label}</h3>
              
              {/* Description */}
              <p className="text-white/75 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Methodology Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-white/60 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Info className="w-4 h-4" />
            <span>Based on firms with 5-15 advisors, $250M-$2B AUM, 6-month tracking</span>
            <a href="#" className="text-white/80 hover:text-white underline ml-1">
              See methodology
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/80 mb-5 text-lg">
            Ready to see these results for your firm?
          </p>
          <a
            href="/tools/compliance-capacity-calculator"
            className="inline-flex items-center gap-2 bg-white text-vault-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-vault-green-50 transition-colors shadow-xl hover:shadow-2xl"
          >
            Calculate Your Savings
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
