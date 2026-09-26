'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
  Copy,
  Database,
  FileCheck2,
  Gauge,
  Layers3,
  MessageSquareText,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import { DetailedReviewForm } from '@/components/stack-assessment/DetailedReviewForm'
import { EvidenceReviewRequestForm } from '@/components/stack-assessment/EvidenceReviewRequestForm'
import {
  createAssessment,
  resumeAssessment,
  updateAssessment,
} from '@/src/lib/stack-assessment/api'
import {
  MODEL_LABELS,
  PAIN_LABELS,
  PRIORITY_LABELS,
  REGISTRATION_LABELS,
  calculateAreaStatuses,
  calculateGaps,
  calculateScore,
  headlineForScore,
  isStepComplete,
  labelMap,
} from '@/src/lib/stack-assessment/scoring'
import {
  captureAttribution,
  clearSession,
  readSession,
  trackEvent,
  writeSession,
} from '@/src/lib/stack-assessment/session'
import {
  EMPTY_ANSWERS,
  STATUS_LABELS,
  STATUS_STYLES,
  STEPS,
  type AssessmentAnswers,
  type AreaStatus,
} from '@/src/lib/stack-assessment/types'

type Option = {
  value: string
  label: string
  description?: string
}

function OptionButton({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'group relative w-full rounded-2xl border p-4 text-left transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-vault-green-500/60',
        selected
          ? 'border-vault-green-500 bg-vault-green-500/10 shadow-sm shadow-vault-green-500/10'
          : 'border-border bg-card hover:border-vault-green-500/40 hover:bg-muted/30',
      ].join(' ')}
    >
      <span
        className={[
          'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
          selected
            ? 'border-vault-green-500 bg-vault-green-500 text-white'
            : 'border-border bg-background',
        ].join(' ')}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
      <span className="block pr-8 text-sm font-semibold text-foreground sm:text-base">
        {label}
      </span>
      {description ? (
        <span className="mt-1.5 block pr-5 text-sm leading-5 text-muted-foreground">
          {description}
        </span>
      ) : null}
    </button>
  )
}

function QuestionField({
  title,
  hint,
  value,
  onChange,
  options,
}: {
  title: string
  hint?: string
  value: string
  onChange: (value: string) => void
  options: Option[]
}): React.ReactElement {
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-foreground">{title}</legend>
      {hint ? (
        <p className="-mt-1 text-sm leading-6 text-muted-foreground">{hint}</p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            description={option.description}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

function StatusPill({ status }: { status: AreaStatus }): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

export function StackAssessmentApp(): React.ReactElement {
  const [answers, setAnswers] = useState<AssessmentAnswers>(EMPTY_ANSWERS)
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const persistQueue = useRef(Promise.resolve())
  const startedRef = useRef(false)

  const setAnswer = useCallback(<K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }, [])

  const ensureSession = useCallback(
    async (nextAnswers: AssessmentAnswers, nextStep: number) => {
      if (assessmentId && accessToken) {
        return { assessmentId, accessToken }
      }
      const created = await createAssessment({
        answers: nextAnswers,
        currentStep: nextStep,
        attribution: captureAttribution(),
      })
      if (!created) return null
      setAssessmentId(created.assessmentId)
      setAccessToken(created.accessToken)
      writeSession({
        assessmentId: created.assessmentId,
        accessToken: created.accessToken,
        currentStep: nextStep,
        answers: nextAnswers,
        completed: false,
      })
      return created
    },
    [accessToken, assessmentId],
  )

  const persistProgress = useCallback(
    (next: {
      answers: AssessmentAnswers
      currentStep: number
      completed?: boolean
      leadCaptured?: boolean
    }) => {
      persistQueue.current = persistQueue.current.then(async () => {
        const session = await ensureSession(next.answers, next.currentStep)
        if (!session) return
        await updateAssessment({
          assessmentId: session.assessmentId,
          accessToken: session.accessToken,
          answers: next.answers,
          currentStep: next.currentStep,
          status: next.completed ? 'COMPLETED' : 'IN_PROGRESS',
        })
        writeSession({
          assessmentId: session.assessmentId,
          accessToken: session.accessToken,
          currentStep: next.currentStep,
          answers: next.answers,
          completed: Boolean(next.completed),
          leadCaptured: Boolean(next.leadCaptured),
        })
      })
    },
    [ensureSession],
  )

  useEffect(() => {
    let cancelled = false
    async function hydrate(): Promise<void> {
      const saved = readSession()
      if (!saved) {
        if (!cancelled) setHydrated(true)
        return
      }
      setAssessmentId(saved.assessmentId)
      setAccessToken(saved.accessToken)
      setAnswers(saved.answers)
      setStep(saved.currentStep)
      setCompleted(saved.completed)
      setLeadCaptured(Boolean(saved.leadCaptured))
      startedRef.current = true

      const remote = await resumeAssessment({
        assessmentId: saved.assessmentId,
        accessToken: saved.accessToken,
      })
      if (!cancelled && remote) {
        setAnswers(remote.answers)
        setStep(remote.currentStep)
        setCompleted(remote.completed)
        setLeadCaptured(remote.status === 'LEAD_CAPTURED' || Boolean(saved.leadCaptured))
        writeSession({
          ...saved,
          answers: remote.answers,
          currentStep: remote.currentStep,
          completed: remote.completed,
          leadCaptured: remote.status === 'LEAD_CAPTURED' || Boolean(saved.leadCaptured),
        })
      }
      if (!cancelled) setHydrated(true)
    }
    void hydrate()
    return () => {
      cancelled = true
    }
  }, [])

  const stepReady = useMemo(() => isStepComplete(answers, step), [answers, step])
  const statuses = useMemo(() => calculateAreaStatuses(answers), [answers])
  const score = useMemo(() => calculateScore(answers), [answers])
  const gaps = useMemo(() => calculateGaps(answers), [answers])
  const headline = useMemo(() => headlineForScore(score), [score])

  const stackRows = useMemo(
    () => [
      {
        icon: Archive,
        label: 'Communications archive',
        status: statuses.archive ?? 'gap',
        detail:
          answers.archive === 'yes'
            ? 'Retention system in place'
            : answers.archive === 'unsure'
              ? 'Coverage needs confirming'
              : 'No archive reported',
      },
      {
        icon: Database,
        label: 'CRM / client record',
        status: statuses.crm ?? 'gap',
        detail:
          answers.crm === 'yes'
            ? 'Primary CRM in use'
            : answers.crm === 'some'
              ? 'Client information is split'
              : 'No consistent CRM reported',
      },
      {
        icon: MessageSquareText,
        label: 'Meeting capture',
        status: statuses.meetings ?? 'gap',
        detail:
          answers.meetings === 'yes'
            ? 'Meetings are routinely captured'
            : answers.meetings === 'sometimes'
              ? 'Capture is inconsistent'
              : 'Meeting evidence is largely manual',
      },
      {
        icon: Search,
        label: 'Communications review',
        status: statuses.communications ?? 'gap',
        detail:
          answers.commReview === 'automated'
            ? 'Risk-based or automated review'
            : answers.commReview === 'sampling'
              ? 'Sampling-based review'
              : answers.commReview === 'manual'
                ? 'Mostly manual review'
                : 'No consistent review workflow',
      },
      {
        icon: FileCheck2,
        label: 'Supervisory evidence',
        status: statuses.evidence ?? 'gap',
        detail:
          answers.reviewEvidence === 'single' && answers.issueTracking === 'workflow'
            ? 'Decision trail is centralized'
            : 'Review evidence spans multiple places',
      },
      {
        icon: ShieldCheck,
        label: 'Policy management',
        status: statuses.policies ?? 'gap',
        detail:
          answers.policyCentral === 'yes'
            ? 'Current policy set is centralized'
            : answers.policyCentral === 'partial'
              ? 'Some version/control friction'
              : 'Policies are spread across locations',
      },
      {
        icon: ClipboardCheck,
        label: 'Exam retrieval',
        status: statuses.exam ?? 'effort',
        detail:
          answers.examRetrieval === 'minutes'
            ? 'Typical evidence retrieval is measured in minutes'
            : answers.examRetrieval === 'hours'
              ? 'Typical retrieval takes hours'
              : 'Typical retrieval can take a day or more',
      },
    ],
    [answers, statuses],
  )

  async function copySummary(): Promise<void> {
    const text = [
      'ComplyVault RIA Compliance Stack Assessment',
      headline.title,
      '',
      ...stackRows.map(
        (row) => `${row.label}: ${STATUS_LABELS[row.status]} - ${row.detail}`,
      ),
      '',
      'Suggested next steps:',
      ...gaps.map((gap, index) => `${index + 1}. ${gap.title}: ${gap.body}`),
      '',
      'This is an operational self-assessment, not a legal or regulatory compliance opinion.',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      trackEvent('ria_stack_assessment_copied')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  function startAssessment(): void {
    trackEvent('ria_stack_assessment_started')
    startedRef.current = true
    void ensureSession(answers, step)
    document.getElementById('assessment-workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  function onContinue(): void {
    if (!stepReady) return
    startedRef.current = true
    if (step < STEPS.length - 1) {
      const nextStep = step + 1
      setStep(nextStep)
      trackEvent('ria_stack_assessment_step', { step: nextStep + 1 })
      persistProgress({ answers, currentStep: nextStep })
      return
    }
    setCompleted(true)
    trackEvent('ria_stack_assessment_completed', { score })
    persistProgress({ answers, currentStep: step, completed: true })
    requestAnimationFrame(() => {
      document.getElementById('assessment-results')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function onRetake(): void {
    clearSession()
    setAnswers(EMPTY_ANSWERS)
    setStep(0)
    setCompleted(false)
    setCopied(false)
    setLeadCaptured(false)
    setAssessmentId(null)
    setAccessToken(null)
    startedRef.current = false
    trackEvent('ria_stack_assessment_restarted')
    requestAnimationFrame(() => {
      document.getElementById('assessment-workspace')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  // Persist answer changes once a session exists (debounced via queue)
  useEffect(() => {
    if (!hydrated || !startedRef.current || !assessmentId) return
    persistProgress({
      answers,
      currentStep: step,
      completed,
      leadCaptured,
    })
  }, [answers, step, completed, leadCaptured, hydrated, assessmentId, persistProgress])

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-vault-green-500/10 blur-3xl" />
        <div className="absolute -right-24 top-28 h-72 w-72 rounded-full bg-vault-coral-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-vault-green-500/25 bg-vault-green-500/10 px-3 py-1.5 text-sm font-semibold text-vault-green-600 dark:text-vault-green-300">
              <Sparkles className="h-4 w-4" />
              Free · about 4 minutes · no technical knowledge needed
            </div>
            <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              See where your RIA compliance stack is strong — and where the work is still
              manual.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Answer a few plain-English questions about your archive, communications review,
              evidence and exam retrieval. You&apos;ll get an immediate stack snapshot and
              practical next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <CircleCheck className="h-4 w-4 text-vault-green-500" />
                No email gate
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-vault-green-500" />
                Operational, not legal advice
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <Layers3 className="h-4 w-4 text-vault-green-500" />
                Built for RIA compliance teams
              </span>
            </div>
            <button
              type="button"
              onClick={startAssessment}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-vault-green-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-vault-green-500/20 transition hover:bg-vault-green-600"
            >
              Start the free assessment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="assessment-workspace"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        {completed ? (
          <div id="assessment-results" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,.6fr)]">
              <div className="overflow-hidden rounded-3xl border border-vault-green-500/25 bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 p-7 text-white shadow-xl sm:p-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <CircleCheck className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      Assessment complete
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                      {headline.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
                      {headline.body}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-muted-foreground">
                  Operational coverage
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">
                    {score}
                  </span>
                  <span className="pb-1 text-lg font-semibold text-muted-foreground">
                    / 100
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-vault-green-500 transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  This is a workflow coverage indicator based only on your answers. It is not a
                  regulatory compliance score.
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)]">
              <div className="space-y-8">
                <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                  <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-vault-green-600 dark:text-vault-green-300">
                      Your current stack
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                      Where the workflow is covered, and where it still depends on people.
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {stackRows.map((row) => (
                      <div
                        key={row.label}
                        className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                            <row.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{row.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
                          </div>
                        </div>
                        <StatusPill status={row.status} />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                  <div className="mb-6 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-vault-green-500/10">
                      <Sparkles className="h-5 w-5 text-vault-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-vault-green-600 dark:text-vault-green-300">
                        Recommended next steps
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                        Fix the operating friction in this order.
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {gaps.map((gap, index) => (
                      <div
                        key={gap.title}
                        className="rounded-2xl border border-border bg-muted/20 p-5"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vault-green-500 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-semibold text-foreground">{gap.title}</h4>
                              {gap.product ? (
                                <span className="rounded-full bg-vault-green-500/10 px-2 py-0.5 text-xs font-semibold text-vault-green-600 dark:text-vault-green-300">
                                  ComplyVault can help
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {gap.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <EvidenceReviewRequestForm assessmentId={assessmentId} accessToken={accessToken} />

                <DetailedReviewForm
                  assessmentId={assessmentId}
                  accessToken={accessToken}
                  onCaptured={() => {
                    setLeadCaptured(true)
                    if (assessmentId && accessToken) {
                      writeSession({
                        assessmentId,
                        accessToken,
                        currentStep: step,
                        answers,
                        completed: true,
                        leadCaptured: true,
                      })
                    }
                  }}
                />

                <section className="rounded-3xl border border-vault-green-500/30 bg-vault-green-500/5 p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-vault-green-600 dark:text-vault-green-300">
                        Where ComplyVault fits
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                        {answers.archive === 'no'
                          ? 'Build the retention foundation first.'
                          : 'Use your existing systems. Add a supervisory evidence layer above them.'}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {answers.archive === 'no'
                          ? 'ComplyVault is not a substitute for a compliant communications archive. Once retention is covered, it can help surface matters that need judgement and preserve the evidence of how they were handled.'
                          : 'ComplyVault is designed to sit above archives, communications, meetings and other records: surface what needs attention, connect it to source evidence and preserve the review trail.'}
                      </p>
                    </div>
                    <Link
                      href="/#cta"
                      onClick={() =>
                        trackEvent('ria_stack_assessment_cta', { location: 'results' })
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-vault-green-500 px-5 py-3 font-semibold text-white transition hover:bg-vault-green-600"
                    >
                      Book a stack review
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </section>
              </div>

              <aside className="space-y-5">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-vault-green-500" />
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Your RIA profile
                    </h3>
                  </div>
                  <dl className="space-y-4 text-sm">
                    {(
                      [
                        ['Registration', labelMap(answers.registration, REGISTRATION_LABELS)],
                        ['Advisers', answers.adviserCount || '-'],
                        ['Compliance model', labelMap(answers.complianceModel, MODEL_LABELS)],
                        ['Main friction', labelMap(answers.biggestPain, PAIN_LABELS)],
                        ['Priority', labelMap(answers.priority, PRIORITY_LABELS)],
                      ] as Array<[string, string]>
                    ).map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-semibold text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="rounded-3xl border border-border bg-muted/30 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-coral-500/10">
                    <TriangleAlert className="h-5 w-5 text-vault-coral-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">Keep the result in context</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    A strong stack does not guarantee compliance, and a simple stack is not
                    automatically deficient. This result highlights operational friction to
                    investigate with your compliance and legal advisers.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">Useful next tool</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    If time and capacity are the issue, model the hours your team could
                    potentially reclaim.
                  </p>
                  <Link
                    href="/tools/compliance-capacity-calculator"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vault-green-600 transition hover:text-vault-green-500 dark:text-vault-green-300"
                  >
                    Open the Capacity Lab
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                Want to keep this snapshot or try a different scenario?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void copySummary()}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied' : 'Copy summary'}
                </button>
                <button
                  type="button"
                  onClick={onRetake}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Retake assessment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px]">
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <div className="border-b border-border p-6 sm:p-8">
                <div className="mb-6 grid grid-cols-4 gap-2">
                  {STEPS.map((item, index) => (
                    <div key={item.title}>
                      <div
                        className={[
                          'mb-2 h-1.5 rounded-full transition-colors',
                          index <= step ? 'bg-vault-green-500' : 'bg-muted',
                        ].join(' ')}
                      />
                      <div
                        className={[
                          'text-xs font-semibold sm:text-sm',
                          index === step ? 'text-foreground' : 'text-muted-foreground',
                        ].join(' ')}
                      >
                        <span className="sm:hidden">{item.short}</span>
                        <span className="hidden sm:inline">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vault-green-600 dark:text-vault-green-300">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
                  {STEPS[step]?.title}
                </h2>
              </div>

              <div className="space-y-9 p-6 sm:p-8">
                {step === 0 ? (
                  <>
                    <QuestionField
                      title="How is your firm registered?"
                      value={answers.registration}
                      onChange={(value) => {
                        startedRef.current = true
                        setAnswer('registration', value as AssessmentAnswers['registration'])
                        void ensureSession(
                          { ...answers, registration: value as AssessmentAnswers['registration'] },
                          step,
                        )
                      }}
                      options={[
                        { value: 'sec', label: 'SEC registered' },
                        { value: 'state', label: 'State registered' },
                        { value: 'mixed', label: 'Mixed / multi-firm' },
                        { value: 'other', label: 'Other / not sure' },
                      ]}
                    />
                    <QuestionField
                      title="How many advisers are in the firm?"
                      value={answers.adviserCount}
                      onChange={(value) => {
                        startedRef.current = true
                        setAnswer('adviserCount', value as AssessmentAnswers['adviserCount'])
                      }}
                      options={[
                        { value: '1-5', label: '1–5 advisers' },
                        { value: '6-15', label: '6–15 advisers' },
                        { value: '16-50', label: '16–50 advisers' },
                        { value: '50+', label: '50+ advisers' },
                      ]}
                    />
                    <QuestionField
                      title="Who handles day-to-day compliance review?"
                      value={answers.complianceModel}
                      onChange={(value) => {
                        startedRef.current = true
                        setAnswer(
                          'complianceModel',
                          value as AssessmentAnswers['complianceModel'],
                        )
                      }}
                      options={[
                        {
                          value: 'internal',
                          label: 'Internal CCO / compliance team',
                          description: 'Review is primarily handled inside the firm.',
                        },
                        {
                          value: 'outsourced',
                          label: 'Outsourced / fractional CCO',
                          description:
                            'A third party performs much of the compliance work.',
                        },
                        {
                          value: 'shared',
                          label: 'Shared responsibility',
                          description:
                            'Internal staff and outside specialists split the work.',
                        },
                        {
                          value: 'owner',
                          label: 'Principal / owner wears the CCO hat',
                          description: 'Compliance is one of several responsibilities.',
                        },
                      ]}
                    />
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <QuestionField
                      title="Do you have a dedicated communications archive?"
                      hint="Think email, text, Teams/Slack or other regulated communications—not simply an inbox backup."
                      value={answers.archive}
                      onChange={(value) =>
                        setAnswer('archive', value as AssessmentAnswers['archive'])
                      }
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'unsure', label: 'Not sure what it covers' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <QuestionField
                      title="Is there one primary CRM or client record?"
                      value={answers.crm}
                      onChange={(value) => setAnswer('crm', value as AssessmentAnswers['crm'])}
                      options={[
                        { value: 'yes', label: 'Yes, one primary system' },
                        { value: 'some', label: 'Some information is split' },
                        { value: 'no', label: 'Mostly spreadsheets / separate systems' },
                      ]}
                    />
                    <QuestionField
                      title="Are adviser/client meetings routinely captured?"
                      value={answers.meetings}
                      onChange={(value) =>
                        setAnswer('meetings', value as AssessmentAnswers['meetings'])
                      }
                      options={[
                        {
                          value: 'yes',
                          label: 'Yes',
                          description:
                            'Recordings, transcripts or structured notes are routinely retained.',
                        },
                        { value: 'sometimes', label: 'Sometimes / depends on adviser' },
                        { value: 'no', label: 'Mostly manual notes' },
                      ]}
                    />
                    <QuestionField
                      title="Is the current policy set easy for the team to find?"
                      value={answers.policyCentral}
                      onChange={(value) =>
                        setAnswer('policyCentral', value as AssessmentAnswers['policyCentral'])
                      }
                      options={[
                        { value: 'yes', label: 'Yes, centralized and current' },
                        {
                          value: 'partial',
                          label: 'Mostly, but versions / ownership can be unclear',
                        },
                        { value: 'no', label: 'No, policies are spread across locations' },
                      ]}
                    />
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <QuestionField
                      title="How are communications reviewed today?"
                      value={answers.commReview}
                      onChange={(value) =>
                        setAnswer('commReview', value as AssessmentAnswers['commReview'])
                      }
                      options={[
                        {
                          value: 'automated',
                          label: 'Risk-based / automated review',
                          description: 'A system helps surface items for human review.',
                        },
                        {
                          value: 'sampling',
                          label: 'Periodic sampling',
                          description:
                            'The team reviews a sample rather than all communications.',
                        },
                        {
                          value: 'manual',
                          label: 'Mostly manual',
                          description:
                            'People search, filter or read through communications themselves.',
                        },
                        { value: 'none', label: 'No consistent review workflow' },
                      ]}
                    />
                    <QuestionField
                      title="Where is the evidence of a compliance decision kept?"
                      hint="For example: the flagged item, reviewer judgement, follow-up and final resolution."
                      value={answers.reviewEvidence}
                      onChange={(value) =>
                        setAnswer(
                          'reviewEvidence',
                          value as AssessmentAnswers['reviewEvidence'],
                        )
                      }
                      options={[
                        { value: 'single', label: 'One workflow / case record' },
                        {
                          value: 'scattered',
                          label: 'Across email, CRM, notes and other systems',
                        },
                        { value: 'undocumented', label: 'Often reconstructed afterwards' },
                      ]}
                    />
                    <QuestionField
                      title="How are open compliance matters tracked to resolution?"
                      value={answers.issueTracking}
                      onChange={(value) =>
                        setAnswer('issueTracking', value as AssessmentAnswers['issueTracking'])
                      }
                      options={[
                        {
                          value: 'workflow',
                          label: 'Dedicated workflow / case management',
                        },
                        { value: 'spreadsheet', label: 'Spreadsheet / checklist' },
                        {
                          value: 'inbox',
                          label: 'Email / inbox / individual follow-up',
                        },
                        { value: 'none', label: 'No consistent tracking method' },
                      ]}
                    />
                    <QuestionField
                      title="If an examiner asked for evidence on one issue, how long would reconstruction usually take?"
                      value={answers.examRetrieval}
                      onChange={(value) =>
                        setAnswer('examRetrieval', value as AssessmentAnswers['examRetrieval'])
                      }
                      options={[
                        { value: 'minutes', label: 'Minutes' },
                        { value: 'hours', label: 'A few hours' },
                        { value: 'days', label: 'A day or more' },
                      ]}
                    />
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <QuestionField
                      title="What creates the most friction today?"
                      value={answers.biggestPain}
                      onChange={(value) =>
                        setAnswer('biggestPain', value as AssessmentAnswers['biggestPain'])
                      }
                      options={[
                        { value: 'finding', label: 'Finding the relevant information' },
                        { value: 'reviewing', label: 'Reviewing too much noise' },
                        {
                          value: 'evidence',
                          label: 'Proving what was reviewed and decided',
                        },
                        {
                          value: 'exam',
                          label: 'Preparing for exams / document requests',
                        },
                      ]}
                    />
                    <QuestionField
                      title="What would you most like to improve over the next 6–12 months?"
                      value={answers.priority}
                      onChange={(value) =>
                        setAnswer('priority', value as AssessmentAnswers['priority'])
                      }
                      options={[
                        { value: 'time', label: 'Reduce compliance review time' },
                        { value: 'visibility', label: 'Get better supervisory visibility' },
                        { value: 'exam', label: 'Be easier to examine' },
                        {
                          value: 'scale',
                          label: 'Support growth without adding the same headcount',
                        },
                      ]}
                    />
                    <div className="rounded-2xl border border-border bg-muted/30 p-5">
                      <div className="flex gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-vault-green-500" />
                        <p className="text-sm leading-6 text-muted-foreground">
                          Your result is an operational self-assessment, not a determination of
                          regulatory compliance. No email address is required to see it.
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border p-6 sm:p-8">
                <button
                  type="button"
                  onClick={() => setStep((value) => Math.max(0, value - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  disabled={!stepReady}
                  className="inline-flex items-center gap-2 rounded-xl bg-vault-green-500 px-5 py-3 font-semibold text-white shadow-md shadow-vault-green-500/15 transition hover:bg-vault-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === STEPS.length - 1 ? 'See my stack snapshot' : 'Continue'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-vault-green-500/10">
                  <Gauge className="h-5 w-5 text-vault-green-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  What this assesses
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Not whether you bought the “right” brands. It looks at whether the stack helps
                  your team retain information, focus review, preserve judgement and retrieve
                  evidence.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-muted/30 p-6">
                <p className="text-sm font-semibold text-foreground">
                  Designed for non-technical teams
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No API, AI or architecture questions. If a tool needs technical language to
                  explain why it matters, the assessment keeps going until the operational
                  outcome is clear.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-green-500/10">
              <Archive className="h-5 w-5 text-vault-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">Archive ≠ supervision</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Retention answers “can we retrieve it?” Supervision also needs to answer what
              required judgement and what happened next.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-green-500/10">
              <Search className="h-5 w-5 text-vault-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">More alerts are not the goal</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The useful unit is qualified supervisory attention: fewer items, better context
              and a clear reason for review.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-green-500/10">
              <FileCheck2 className="h-5 w-5 text-vault-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">
              Evidence should survive the reviewer
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Someone who was not involved should be able to understand the source, decision,
              follow-up and resolution without rebuilding the story from scratch.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
