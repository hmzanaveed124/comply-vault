'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { captureLead } from '@/src/lib/stack-assessment/api'
import { trackEvent } from '@/src/lib/stack-assessment/session'

type Props = {
  assessmentId: string | null
  accessToken: string | null
  onCaptured: () => void
}

export function DetailedReviewForm({
  assessmentId,
  accessToken,
  onCaptured,
}: Props): React.ReactElement {
  const [email, setEmail] = useState('')
  const [firmName, setFirmName] = useState('')
  const [role, setRole] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setError(null)

    if (!assessmentId || !accessToken) {
      setError(
        'We could not attach this request to your assessment session. Please retake the assessment or try again shortly.',
      )
      return
    }

    setSubmitting(true)
    const result = await captureLead({
      assessmentId,
      accessToken,
      email: email.trim(),
      firmName: firmName.trim() || undefined,
      role: role.trim() || undefined,
    })
    setSubmitting(false)

    if (!result.success) {
      setError(result.error || 'Something went wrong. Please try again.')
      return
    }

    trackEvent('ria_stack_assessment_lead_captured')
    setDone(true)
    onCaptured()
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-vault-green-500/30 bg-vault-green-500/5 p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Detailed review requested
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Thanks - your personalized Stack Review is on its way to your inbox. You can also
          book a short walkthrough if you want to discuss the gaps live.
        </p>
      </div>
    )
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-vault-green-600 dark:text-vault-green-300">
        Optional
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
        Email me my free Stack Review
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        Get a fuller breakdown based on your answers, including potential gaps and
        duplication. This free report does not examine your records.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2 block">
          <span className="mb-1.5 block text-sm font-semibold text-foreground">
            Work email <span className="text-vault-coral-500">*</span>
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2"
            placeholder="you@firm.com"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-foreground">
            Firm name <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <input
            type="text"
            autoComplete="organization"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2"
            placeholder="ABC Wealth"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-foreground">
            Role <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <input
            type="text"
            autoComplete="organization-title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2"
            placeholder="CCO"
          />
        </label>

        {error ? (
          <p className="sm:col-span-2 text-sm text-rose-600 dark:text-rose-300">{error}</p>
        ) : null}

        <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-vault-green-500 px-5 py-3 font-semibold text-white transition hover:bg-vault-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Sending…' : 'Send my free Stack Review'}
          </button>
          <Link
            href="/#cta"
            className="text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Book a 20-minute Stack Review
          </Link>
        </div>
      </form>
    </section>
  )
}
