'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  Layers3,
  MessageSquareText,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

type Status = 'covered' | 'partial' | 'gap' | 'effort'
type Answers = {
  registration: string
  adviserCount: string
  complianceModel: string
  archive: string
  crm: string
  meetings: string
  policyCentral: string
  commReview: string
  reviewEvidence: string
  issueTracking: string
  examRetrieval: string
  biggestPain: string
  priority: string
}

const INITIAL: Answers = {
  registration: '',
  adviserCount: '',
  complianceModel: '',
  archive: '',
  crm: '',
  meetings: '',
  policyCentral: '',
  commReview: '',
  reviewEvidence: '',
  issueTracking: '',
  examRetrieval: '',
  biggestPain: '',
  priority: '',
}

const steps = [
  { title: 'Your firm', short: 'Firm' },
  { title: 'Current stack', short: 'Stack' },
  { title: 'Supervision', short: 'Workflow' },
  { title: 'Priorities', short: 'Goals' },
]

const statusStyles: Record<Status, string> = {
  covered:
    'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  partial:
    'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  gap: 'border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  effort:
    'border-vault-coral-500/25 bg-vault-coral-500/10 text-vault-coral-700 dark:text-vault-coral-300',
}

const statusLabels: Record<Status, string> = {
  covered: 'Covered',
  partial: 'Partial',
  gap: 'Gap',
  effort: 'High effort',
}

function track(name: string, params: Record<string, string | number> = {}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', name, params)
  }
}

function Choice({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}) {
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
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="block pr-8 text-sm font-semibold text-foreground sm:text-base">
        {label}
      </span>
      {description && (
        <span className="mt-1.5 block pr-5 text-sm leading-5 text-muted-foreground">
          {description}
        </span>
      )}
    </button>
  )
}

function Question({
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
  options: { value: string; label: string; description?: string }[]
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-foreground">{title}</legend>
      {hint && <p className="-mt-1 text-sm leading-6 text-muted-foreground">{hint}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <Choice
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

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}

function stackStatus(answers: Answers) {
  const archive: Status =
    answers.archive === 'yes' ? 'covered' : answers.archive === 'unsure' ? 'partial' : 'gap'
  const crm: Status =
    answers.crm === 'yes' ? 'covered' : answers.crm === 'some' ? 'partial' : 'gap'
  const meetings: Status =
    answers.meetings === 'yes'
      ? 'covered'
      : answers.meetings === 'sometimes'
        ? 'partial'
        : 'gap'
  const policies: Status =
    answers.policyCentral === 'yes'
      ? 'covered'
      : answers.policyCentral === 'partial'
        ? 'partial'
        : 'gap'
  const communications: Status =
    answers.commReview === 'automated'
      ? 'covered'
      : answers.commReview === 'sampling' || answers.commReview === 'manual'
        ? 'partial'
        : 'gap'
  const evidence: Status =
    answers.reviewEvidence === 'single' && answers.issueTracking === 'workflow'
      ? 'covered'
      : answers.reviewEvidence === 'undocumented' || answers.issueTracking === 'none'
        ? 'gap'
        : 'partial'
  const exam: Status =
    answers.examRetrieval === 'minutes'
      ? 'covered'
      : answers.examRetrieval === 'hours'
        ? 'partial'
        : 'effort'

  return { archive, crm, meetings, policies, communications, evidence, exam }
}

function assessmentScore(answers: Answers) {
  const points = [
    answers.archive === 'yes' ? 2 : answers.archive === 'unsure' ? 1 : 0,
    answers.crm === 'yes' ? 2 : answers.crm === 'some' ? 1 : 0,
    answers.meetings === 'yes' ? 2 : answers.meetings === 'sometimes' ? 1 : 0,
    answers.policyCentral === 'yes' ? 2 : answers.policyCentral === 'partial' ? 1 : 0,
    answers.commReview === 'automated'
      ? 2
      : answers.commReview === 'sampling' || answers.commReview === 'manual'
        ? 1
        : 0,
    answers.reviewEvidence === 'single'
      ? 2
      : answers.reviewEvidence === 'scattered'
        ? 1
        : 0,
    answers.issueTracking === 'workflow'
      ? 2
      : answers.issueTracking === 'spreadsheet' || answers.issueTracking === 'inbox'
        ? 1
        : 0,
    answers.examRetrieval === 'minutes' ? 2 : answers.examRetrieval === 'hours' ? 1 : 0,
  ]
  return Math.round((points.reduce((sum, value) => sum + value, 0) / 16) * 100)
}

function recommendations(answers: Answers) {
  const items: {
    title: string
    body: string
    product?: boolean
    priority: number
  }[] = []

  if (answers.archive !== 'yes') {
    items.push({
      title: 'Confirm your communications retention foundation',
      body:
        answers.archive === 'no'
          ? 'A compliant archive is foundational. Put retention and retrieval in place before adding another supervisory layer.'
          : 'Confirm what your current archive retains, for how long, and how quickly your team can retrieve it before adding more tools.',
      priority: 1,
    })
  }

  if (
    answers.reviewEvidence !== 'single' ||
    answers.issueTracking !== 'workflow' ||
    answers.examRetrieval !== 'minutes'
  ) {
    items.push({
      title: 'Create one supervisory evidence trail',
      body:
        'Bring the source item, reviewer judgement, follow-up and final resolution into one traceable workflow so the story does not need to be rebuilt later.',
      product: answers.archive !== 'no',
      priority: 2,
    })
  }

  if (answers.commReview === 'manual' || answers.commReview === 'none') {
    items.push({
      title: 'Reduce manual communications review',
      body:
        'Start with a narrow risk set and surface only items that genuinely need human judgement. More alerts are not the goal; better-qualified review is.',
      product: answers.archive !== 'no',
      priority: 3,
    })
  }

  if (answers.examRetrieval === 'days' || answers.examRetrieval === 'hours') {
    items.push({
      title: 'Map your exam-retrieval path',
      body:
        'Choose one representative client or issue and document every system your team must search to reconstruct the evidence. That map usually exposes the highest-friction handoffs.',
      priority: 4,
    })
  }

  if (answers.policyCentral !== 'yes') {
    items.push({
      title: 'Centralize the current policy set',
      body:
        'Make it obvious which policy version is current, who owns it and where supporting attestations or review evidence live.',
      priority: 5,
    })
  }

  if (items.length === 0) {
    items.push({
      title: 'Stress-test retrieval, not just storage',
      body:
        'Your foundation looks well covered. Test it with a realistic request: can someone unfamiliar with the matter reproduce the evidence and review history quickly?',
      product: true,
      priority: 6,
    })
  }

  return items.sort((a, b) => a.priority - b.priority).slice(0, 4)
}

function resultNarrative(score: number) {
  if (score >= 80) {
    return {
      title: 'Strong foundation. Focus on supervisory leverage.',
      body:
        'Your core stack appears well covered. The next question is whether your team can turn retained information into clear, reviewable evidence without adding unnecessary manual work.',
    }
  }
  if (score >= 55) {
    return {
      title: 'The foundation is there, but the workflow is fragmented.',
      body:
        'You have several important systems in place. The main opportunity is reducing the handoffs between finding an issue, reviewing it, recording judgement and producing evidence later.',
    }
  }
  return {
    title: 'Manual friction is doing too much of the work.',
    body:
      'Your answers point to important gaps or high-effort workflows. Prioritize the underlying retention and evidence foundations before layering on more software.',
  }
}

function humanLabel(value: string, map: Record<string, string>) {
  return map[value] || '—'
}

export default function Assessment() {
  const [answers, setAnswers] = useState<Answers>(INITIAL)
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  const stepComplete = useMemo(() => {
    if (step === 0)
      return Boolean(answers.registration && answers.adviserCount && answers.complianceModel)
    if (step === 1)
      return Boolean(answers.archive && answers.crm && answers.meetings && answers.policyCentral)
    if (step === 2)
      return Boolean(
        answers.commReview &&
          answers.reviewEvidence &&
          answers.issueTracking &&
          answers.examRetrieval
      )
    return Boolean(answers.biggestPain && answers.priority)
  }, [answers, step])

  const statuses = useMemo(() => stackStatus(answers), [answers])
  const score = useMemo(() => assessmentScore(answers), [answers])
  const recs = useMemo(() => recommendations(answers), [answers])
  const narrative = resultNarrative(score)

  const rows = [
    {
      icon: Archive,
      label: 'Communications archive',
      status: statuses.archive,
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
      status: statuses.crm,
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
      status: statuses.meetings,
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
      status: statuses.communications,
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
      status: statuses.evidence,
      detail:
        answers.reviewEvidence === 'single' && answers.issueTracking === 'workflow'
          ? 'Decision trail is centralized'
          : 'Review evidence spans multiple places',
    },
    {
      icon: FileText,
      label: 'Policy management',
      status: statuses.policies,
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
      status: statuses.exam,
      detail:
        answers.examRetrieval === 'minutes'
          ? 'Typical evidence retrieval is measured in minutes'
          : answers.examRetrieval === 'hours'
            ? 'Typical retrieval takes hours'
            : 'Typical retrieval can take a day or more',
    },
  ]

  const start = () => {
    track('ria_stack_assessment_started')
    document.getElementById('assessment-workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  const next = () => {
    if (!stepComplete) return
    if (step < steps.length - 1) {
      setStep((value) => value + 1)
      track('ria_stack_assessment_step', { step: step + 2 })
    } else {
      setShowResults(true)
      track('ria_stack_assessment_completed', { score })
      requestAnimationFrame(() =>
        document.getElementById('assessment-results')?.scrollIntoView({ behavior: 'smooth' })
      )
    }
  }

  const restart = () => {
    setAnswers(INITIAL)
    setStep(0)
    setShowResults(false)
    setCopied(false)
    track('ria_stack_assessment_restarted')
    requestAnimationFrame(() =>
      document.getElementById('assessment-workspace')?.scrollIntoView({ behavior: 'smooth' })
    )
  }

  const copySummary = async () => {
    const summary = [
      'ComplyVault RIA Compliance Stack Assessment',
      narrative.title,
      '',
      ...rows.map(
        (row) => `${row.label}: ${statusLabels[row.status]} — ${row.detail}`
      ),
      '',
      'Suggested next steps:',
      ...recs.map((item, index) => `${index + 1}. ${item.title}: ${item.body}`),
      '',
      'This is an operational self-assessment, not a legal or regulatory compliance opinion.',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      track('ria_stack_assessment_copied')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

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
              See where your RIA compliance stack is strong — and where the work is still manual.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Answer a few plain-English questions about your archive, communications review,
              evidence and exam retrieval. You&apos;ll get an immediate stack snapshot and
              practical next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-vault-green-500" />
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
              onClick={start}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-vault-green-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-vault-green-500/20 transition hover:bg-vault-green-600"
            >
              Start the free assessment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="assessment-workspace" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {!showResults ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px]">
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <div className="border-b border-border p-6 sm:p-8">
                <div className="mb-6 grid grid-cols-4 gap-2">
                  {steps.map((item, index) => (
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
                  Step {step + 1} of {steps.length}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
                  {steps[step].title}
                </h2>
              </div>

              <div className="space-y-9 p-6 sm:p-8">
                {step === 0 && (
                  <>
                    <Question
                      title="How is your firm registered?"
                      value={answers.registration}
                      onChange={(value) => update('registration', value)}
                      options={[
                        { value: 'sec', label: 'SEC registered' },
                        { value: 'state', label: 'State registered' },
                        { value: 'mixed', label: 'Mixed / multi-firm' },
                        { value: 'other', label: 'Other / not sure' },
                      ]}
                    />
                    <Question
                      title="How many advisers are in the firm?"
                      value={answers.adviserCount}
                      onChange={(value) => update('adviserCount', value)}
                      options={[
                        { value: '1-5', label: '1–5 advisers' },
                        { value: '6-15', label: '6–15 advisers' },
                        { value: '16-50', label: '16–50 advisers' },
                        { value: '50+', label: '50+ advisers' },
                      ]}
                    />
                    <Question
                      title="Who handles day-to-day compliance review?"
                      value={answers.complianceModel}
                      onChange={(value) => update('complianceModel', value)}
                      options={[
                        {
                          value: 'internal',
                          label: 'Internal CCO / compliance team',
                          description: 'Review is primarily handled inside the firm.',
                        },
                        {
                          value: 'outsourced',
                          label: 'Outsourced / fractional CCO',
                          description: 'A third party performs much of the compliance work.',
                        },
                        {
                          value: 'shared',
                          label: 'Shared responsibility',
                          description: 'Internal staff and outside specialists split the work.',
                        },
                        {
                          value: 'owner',
                          label: 'Principal / owner wears the CCO hat',
                          description: 'Compliance is one of several responsibilities.',
                        },
                      ]}
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <Question
                      title="Do you have a dedicated communications archive?"
                      hint="Think email, text, Teams/Slack or other regulated communications—not simply an inbox backup."
                      value={answers.archive}
                      onChange={(value) => update('archive', value)}
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'unsure', label: 'Not sure what it covers' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <Question
                      title="Is there one primary CRM or client record?"
                      value={answers.crm}
                      onChange={(value) => update('crm', value)}
                      options={[
                        { value: 'yes', label: 'Yes, one primary system' },
                        { value: 'some', label: 'Some information is split' },
                        { value: 'no', label: 'Mostly spreadsheets / separate systems' },
                      ]}
                    />
                    <Question
                      title="Are adviser/client meetings routinely captured?"
                      value={answers.meetings}
                      onChange={(value) => update('meetings', value)}
                      options={[
                        {
                          value: 'yes',
                          label: 'Yes',
                          description: 'Recordings, transcripts or structured notes are routinely retained.',
                        },
                        { value: 'sometimes', label: 'Sometimes / depends on adviser' },
                        { value: 'no', label: 'Mostly manual notes' },
                      ]}
                    />
                    <Question
                      title="Is the current policy set easy for the team to find?"
                      value={answers.policyCentral}
                      onChange={(value) => update('policyCentral', value)}
                      options={[
                        { value: 'yes', label: 'Yes, centralized and current' },
                        { value: 'partial', label: 'Mostly, but versions / ownership can be unclear' },
                        { value: 'no', label: 'No, policies are spread across locations' },
                      ]}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Question
                      title="How are communications reviewed today?"
                      value={answers.commReview}
                      onChange={(value) => update('commReview', value)}
                      options={[
                        {
                          value: 'automated',
                          label: 'Risk-based / automated review',
                          description: 'A system helps surface items for human review.',
                        },
                        {
                          value: 'sampling',
                          label: 'Periodic sampling',
                          description: 'The team reviews a sample rather than all communications.',
                        },
                        {
                          value: 'manual',
                          label: 'Mostly manual',
                          description: 'People search, filter or read through communications themselves.',
                        },
                        { value: 'none', label: 'No consistent review workflow' },
                      ]}
                    />
                    <Question
                      title="Where is the evidence of a compliance decision kept?"
                      hint="For example: the flagged item, reviewer judgement, follow-up and final resolution."
                      value={answers.reviewEvidence}
                      onChange={(value) => update('reviewEvidence', value)}
                      options={[
                        { value: 'single', label: 'One workflow / case record' },
                        { value: 'scattered', label: 'Across email, CRM, notes and other systems' },
                        { value: 'undocumented', label: 'Often reconstructed afterwards' },
                      ]}
                    />
                    <Question
                      title="How are open compliance matters tracked to resolution?"
                      value={answers.issueTracking}
                      onChange={(value) => update('issueTracking', value)}
                      options={[
                        { value: 'workflow', label: 'Dedicated workflow / case management' },
                        { value: 'spreadsheet', label: 'Spreadsheet / checklist' },
                        { value: 'inbox', label: 'Email / inbox / individual follow-up' },
                        { value: 'none', label: 'No consistent tracking method' },
                      ]}
                    />
                    <Question
                      title="If an examiner asked for evidence on one issue, how long would reconstruction usually take?"
                      value={answers.examRetrieval}
                      onChange={(value) => update('examRetrieval', value)}
                      options={[
                        { value: 'minutes', label: 'Minutes' },
                        { value: 'hours', label: 'A few hours' },
                        { value: 'days', label: 'A day or more' },
                      ]}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <Question
                      title="What creates the most friction today?"
                      value={answers.biggestPain}
                      onChange={(value) => update('biggestPain', value)}
                      options={[
                        { value: 'finding', label: 'Finding the relevant information' },
                        { value: 'reviewing', label: 'Reviewing too much noise' },
                        { value: 'evidence', label: 'Proving what was reviewed and decided' },
                        { value: 'exam', label: 'Preparing for exams / document requests' },
                      ]}
                    />
                    <Question
                      title="What would you most like to improve over the next 6–12 months?"
                      value={answers.priority}
                      onChange={(value) => update('priority', value)}
                      options={[
                        { value: 'time', label: 'Reduce compliance review time' },
                        { value: 'visibility', label: 'Get better supervisory visibility' },
                        { value: 'exam', label: 'Be easier to examine' },
                        { value: 'scale', label: 'Support growth without adding the same headcount' },
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
                )}
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
                  onClick={next}
                  disabled={!stepComplete}
                  className="inline-flex items-center gap-2 rounded-xl bg-vault-green-500 px-5 py-3 font-semibold text-white shadow-md shadow-vault-green-500/15 transition hover:bg-vault-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === steps.length - 1 ? 'See my stack snapshot' : 'Continue'}
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
                <p className="text-sm font-semibold text-foreground">Designed for non-technical teams</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No API, AI or architecture questions. If a tool needs technical language to
                  explain why it matters, the assessment keeps going until the operational outcome
                  is clear.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          <div id="assessment-results" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,.6fr)]">
              <div className="overflow-hidden rounded-3xl border border-vault-green-500/25 bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 p-7 text-white shadow-xl sm:p-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      Assessment complete
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                      {narrative.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
                      {narrative.body}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-muted-foreground">Operational coverage</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">{score}</span>
                  <span className="pb-1 text-lg font-semibold text-muted-foreground">/ 100</span>
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
                      Where the workflow is covered — and where it still depends on people.
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                            <row.icon className="h-4.5 w-4.5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{row.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
                          </div>
                        </div>
                        <StatusBadge status={row.status} />
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
                    {recs.map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-muted/20 p-5"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vault-green-500 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              {item.product && (
                                <span className="rounded-full bg-vault-green-500/10 px-2 py-0.5 text-xs font-semibold text-vault-green-600 dark:text-vault-green-300">
                                  ComplyVault can help
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

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
                      onClick={() => track('ria_stack_assessment_cta', { location: 'results' })}
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
                    <Users className="h-5 w-5 text-vault-green-500" />
                    <h3 className="font-display text-xl font-bold text-foreground">Your RIA profile</h3>
                  </div>
                  <dl className="space-y-4 text-sm">
                    {[
                      [
                        'Registration',
                        humanLabel(answers.registration, {
                          sec: 'SEC registered',
                          state: 'State registered',
                          mixed: 'Mixed / multi-firm',
                          other: 'Other / unsure',
                        }),
                      ],
                      ['Advisers', answers.adviserCount],
                      [
                        'Compliance model',
                        humanLabel(answers.complianceModel, {
                          internal: 'Internal team',
                          outsourced: 'Outsourced / fractional',
                          shared: 'Shared',
                          owner: 'Principal / owner',
                        }),
                      ],
                      [
                        'Main friction',
                        humanLabel(answers.biggestPain, {
                          finding: 'Finding information',
                          reviewing: 'Review noise',
                          evidence: 'Proving decisions',
                          exam: 'Exam preparation',
                        }),
                      ],
                      [
                        'Priority',
                        humanLabel(answers.priority, {
                          time: 'Reduce review time',
                          visibility: 'Supervisory visibility',
                          exam: 'Exam readiness',
                          scale: 'Scale efficiently',
                        }),
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-semibold text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-3xl border border-border bg-muted/30 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-coral-500/10">
                    <AlertTriangle className="h-5 w-5 text-vault-coral-500" />
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
                    If time and capacity are the issue, model the hours your team could potentially
                    reclaim.
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
                  onClick={copySummary}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied' : 'Copy summary'}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Retake assessment
                </button>
              </div>
            </div>
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
              Retention answers “can we retrieve it?” Supervision also needs to answer what required
              judgement and what happened next.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-green-500/10">
              <Search className="h-5 w-5 text-vault-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">More alerts are not the goal</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The useful unit is qualified supervisory attention: fewer items, better context and a
              clear reason for review.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-vault-green-500/10">
              <FileCheck2 className="h-5 w-5 text-vault-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">Evidence should survive the reviewer</h3>
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
