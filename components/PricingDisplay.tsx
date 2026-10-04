'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getDemoLink } from '@/lib/utils'

interface PricingDisplayProps {
  plan: 'essentials' | 'professional' | 'enterprise'
  currency: 'gbp' | 'usd'
  market?: 'us' | 'uk'
  isDetecting?: boolean
}

export function PricingDisplay({ plan, currency, market = 'us', isDetecting = false }: PricingDisplayProps) {
  const demoLink = getDemoLink(market)
  const contactLink = '/contact'

  const prices: Record<'essentials' | 'professional', Record<'gbp' | 'usd', string>> = {
    essentials: { gbp: '£249', usd: '$299' },
    professional: { gbp: '£649', usd: '$799' },
  }

  if (plan === 'enterprise') {
    return (
      <>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-4xl font-bold">Custom</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Contact us for pricing</p>
        <Link
          href={contactLink}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8 transition-colors"
        >
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </>
    )
  }

  const price = prices[plan][currency]

  if (isDetecting) {
    return (
      <>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-4xl font-bold" data-price={plan}>...</span>
          <span className="text-muted-foreground mb-1">/month</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Monthly billing</p>
        <div className="w-full bg-primary/50 text-primary-foreground font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8">
          Loading...
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-4xl font-bold" data-price={plan}>{price}</span>
        <span className="text-muted-foreground mb-1">/month</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Monthly billing</p>
      <Link
        href={demoLink}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8 transition-colors"
        data-link={plan}
      >
        Book a Demo
        <ArrowRight className="w-4 h-4" />
      </Link>
    </>
  )
}
