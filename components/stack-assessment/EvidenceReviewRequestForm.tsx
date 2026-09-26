'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { requestEvidenceReview } from '@/src/lib/stack-assessment/api'
import { trackEvent } from '@/src/lib/stack-assessment/session'

type Props = { assessmentId: string | null; accessToken: string | null }

export function EvidenceReviewRequestForm({ assessmentId, accessToken }: Props): React.ReactElement {
  const [email, setEmail] = useState('')
  const [firmName, setFirmName] = useState('')
  const [role, setRole] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setError(null)
    if (!assessmentId || !accessToken) {
      setError('We could not connect this request to your result. Please retry the assessment.')
      return
    }
    setSubmitting(true)
    const result = await requestEvidenceReview({
      assessmentId, accessToken, email: email.trim(),
      firmName: firmName.trim() || undefined, role: role.trim() || undefined,
    })
    setSubmitting(false)
    if (!result.success) {
      setError(result.error || 'Something went wrong. Please try again.')
      return
    }
    trackEvent('ria_stack_evidence_review_requested')
    setDone(true)
  }

  return (
    <section className="rounded-3xl border border-vault-green-500/30 bg-vault-green-500/5 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-vault-green-600 dark:text-vault-green-300">
        Optional next step
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
        Request a detailed evidence review
      </h3>
      {done ? (
        <p role="status" className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Request received. We will contact you to agree on scope and price before any review or access to records.
        </p>
      ) : (
        <>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Go beyond the self-reported snapshot. With your agreement, ComplyVault can examine a defined sample of communications and supervisory records, then show where the source, review, decision and follow-up can be traced. This is a paid service; we will discuss the scope and price first. It is not a regulatory audit.
          </p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2 block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Work email *</span>
              <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@firm.com" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Firm name (optional)</span>
              <input type="text" autoComplete="organization" value={firmName} onChange={(event) => setFirmName(event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Role (optional)</span>
              <input type="text" autoComplete="organization-title" value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-vault-green-500/40 focus:ring-2" />
            </label>
            {error ? <p role="alert" className="sm:col-span-2 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="rounded-xl bg-vault-green-500 px-5 py-3 font-semibold text-white transition hover:bg-vault-green-600 disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? 'Sending…' : 'Request an evidence review'}
              </button>
            </div>
            <p className="sm:col-span-2 text-sm leading-6 text-muted-foreground">
              We will use these details to respond to your request. Do not send client records through this form. See our <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>.
            </p>
          </form>
        </>
      )}
    </section>
  )
}
