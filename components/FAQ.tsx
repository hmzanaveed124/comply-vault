'use client'

import { useState } from 'react'
import { marketing } from '@/lib/marketing'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FAQ() {
  const faqs = marketing.faqs

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28 lg:py-36 bg-background relative overflow-hidden noise-texture">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Honest answers about what Comply Vault does and doesn't do.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                'bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl border transition-all duration-300',
                openIndex === index
                  ? 'border-primary/30 shadow-lg dark:shadow-black/20'
                  : 'border-border dark:border-white/10 hover:border-primary/20'
              )}
            >
              <button
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-card-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0',
                    openIndex === index && 'rotate-180 text-primary'
                  )}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                hidden={openIndex !== index}
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center p-8 bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl border border-border dark:border-white/10">
          <p className="text-card-foreground font-medium mb-4">
            Want to see it in action?
          </p>
          <p className="text-muted-foreground mb-6">
            Schedule a demo and we'll walk you through the complete workflow with a sample meeting.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-vault-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-vault-green-600 dark:hover:bg-vault-green-400 transition-colors"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  )
}
