import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck,
  History,
  Link2,
  Mic,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/Button'
import { DemoForm } from '@/components/DemoForm'

const container = 'relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
const card =
  'bg-card rounded-2xl border border-border p-6 sm:p-8 dark:card-elevated'
const stages = [
  {
    id: 'prepare',
    label: 'Prepare',
    icon: CalendarDays,
    status: 'Product preview',
    title: 'Know what matters before you meet.',
    description:
      'Start with a client or prospect, even before a meeting is booked. The preparation preview brings changes, open commitments and unanswered questions into a focused brief.',
    items: [
      'A brief that leads with what changed',
      'A conversation plan linked to its context',
      'Visible information gaps and source references',
    ],
    outcome: 'Walk into the conversation with the right questions.',
  },
  {
    id: 'meet',
    label: 'Meet',
    icon: Mic,
    status: 'Live capture preview',
    title: 'Give the conversation your attention.',
    description:
      'The live meeting preview keeps notes, agenda and capture controls together, with recording and consent state visible. Today, you can upload a meeting recording for transcription and review.',
    items: [
      'Speaker-labelled transcripts from uploaded recordings',
      'Draft topics, decisions and follow-up items',
      'Live capture controls shown in the product preview',
    ],
    outcome: 'Keep the context behind what was said.',
  },
  {
    id: 'follow-through',
    label: 'Follow through',
    icon: FileCheck,
    status: 'Core workflow',
    title: 'Show what happened next—and why.',
    description:
      'Review the draft against its transcript evidence, correct it and record sign-off. Export the notes and supporting history together for your firm’s documentation workflow.',
    items: [
      'Source-linked notes you can verify and edit',
      'CCO or owner finalization with recorded sign-off',
      'Documentation packs with evidence and version history',
    ],
    outcome: 'Give oversight a record it can inspect.',
  },
]

export function LifecycleHero() {
  return (
    <section className="relative pt-36 pb-20 lg:pb-28 overflow-hidden noise-texture">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-vault-green-500/10 via-transparent to-transparent"
      />
      <div
        className={`${container} grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
      >
        <div>
          <p className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Users className="w-4 h-4" aria-hidden="true" />
            For RIA advisors and oversight teams
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight text-foreground mb-6">
            Better prepared conversations.
            <br />
            <span className="text-gradient">Evidence you can trust.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
            Bring clarity to the work around every client meeting. Review
            source-linked notes and preserve the decisions behind your
            follow-through.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button href="#cta" size="lg">
              Book a demo
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="outline" size="lg">
              Explore the workflow
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Recording review and documentation are available today. Preparation
            and live capture are product previews.
          </p>
        </div>
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-2xl shadow-foreground/10 dark:shadow-black/30">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5 mb-6">
            <p className="font-semibold">One client conversation</p>
            <span className="text-xs text-muted-foreground rounded-full border border-border px-3 py-1">
              Illustrative workflow
            </span>
          </div>
          <ol className="space-y-6">
            {stages.map((stage, i) => (
              <li key={stage.id} className="flex gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                  <stage.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex gap-3 items-center flex-wrap">
                    <a
                      href={`#${stage.id}`}
                      className="font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      {i + 1}. {stage.label}
                    </a>
                    <span className="text-xs text-muted-foreground">
                      {stage.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {
                      [
                        'A changed retirement plan. A promise still open.',
                        'The client’s priorities, in their own words.',
                        'The reviewed note, its sources and the recorded decision.',
                      ][i]
                    }
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 pt-5 border-t border-border flex items-start gap-3 text-sm text-muted-foreground">
            <Link2
              className="w-5 h-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p>Find what needs attention. Prove how it was handled.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LifecycleWorkflow() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-20 lg:py-28 bg-muted/30 section-divider-top"
    >
      <div className={container}>
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold text-primary mb-4">
            Prepare · Meet · Follow through
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            A clearer path through every conversation.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore the complete direction for ComplyVault, with the current
            workflow and upcoming experiences clearly marked.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <article
              key={stage.id}
              id={stage.id}
              className={`${card} scroll-mt-28 flex flex-col ${stage.id === 'follow-through' ? 'border-primary/40' : ''}`}
            >
              <div className="flex items-center justify-between gap-3 mb-6">
                <stage.icon
                  className="w-7 h-7 text-primary"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium rounded-full px-3 py-1.5 bg-accent text-accent-foreground">
                  {stage.status}
                </span>
              </div>
              <p className="font-semibold text-primary mb-3">{stage.label}</p>
              <h3 className="text-2xl font-display font-semibold mb-4">
                {stage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {stage.description}
              </p>
              <ul className="space-y-3 mb-8">
                {stage.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <Check
                      className="w-4 h-4 shrink-0 mt-1 text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="border-t border-border pt-5 mt-auto font-medium">
                {stage.outcome}
              </p>
            </article>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6 max-w-3xl leading-relaxed">
          Preview features are not generally available. Book a demo to explore
          them and discuss availability for your firm. Uploading a recording
          does not require a live meeting-platform integration.
        </p>
      </div>
    </section>
  )
}

export function EvidenceFeatures() {
  return (
    <section
      id="features"
      className="scroll-mt-24 py-20 lg:py-28 noise-texture"
    >
      <div className={container}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-sm font-semibold text-primary mb-4">
              The record behind the work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
              A useful note.
              <br />
              <span className="text-gradient">A reviewable decision.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Your team needs to understand what was discussed, what was decided
              and how the record was reviewed. ComplyVault keeps the supporting
              evidence close to the work.
            </p>
            <Button href="/sample-audit-pack" variant="outline">
              See a sample documentation pack
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
          <div className="space-y-6">
            {[
              {
                icon: Link2,
                title: 'Inspect the source',
                body: 'Follow evidence links to the transcript passage behind an extracted item. Check the context before accepting the draft.',
              },
              {
                icon: Users,
                title: 'Keep people in control',
                body: 'Advisors can contribute to draft records. CCO or owner finalization records who approved the documentation.',
              },
              {
                icon: History,
                title: 'Preserve the review trail',
                body: 'Keep edits, sign-off and version history with the record. Export structured notes, evidence maps and transcripts together.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-5 border-b border-border pb-6 last:border-0"
              >
                <span className="w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function LifecycleAudience() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className={container}>
        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-10">
          For advisors. For the people overseeing their work.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <article className={card}>
            <h3 className="text-2xl font-semibold mb-4">
              A clearer working day
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Review what the client said, correct the draft and capture the
              next steps. The preparation preview extends that context to the
              time before your next conversation.
            </p>
          </article>
          <article className={card}>
            <h3 className="text-2xl font-semibold mb-4">
              A record your CCO can inspect
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Trace a note to its source, review the edits and see the final
              sign-off. Support supervision with evidence that remains connected
              to the interaction.
            </p>
          </article>
        </div>
        <p className="mt-6 text-muted-foreground">
          For SEC-registered and state-registered RIAs with client conversations
          to document. We’ll discuss your firm’s review requirements in the
          demo.
        </p>
      </div>
    </section>
  )
}

export function LifecycleSecurity() {
  return (
    <section
      id="security"
      className="scroll-mt-24 py-20 bg-gray-900 dark:bg-[hsl(160_55%_4%)] text-white"
    >
      <div className={`${container} grid md:grid-cols-2 gap-10 items-center`}>
        <div>
          <ShieldCheck
            className="w-8 h-8 text-vault-green-400 mb-5"
            aria-hidden="true"
          />
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-5">
            Review security with your team.
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Sensitive client information deserves a clear conversation about
            access, storage, retention and the controls your firm needs.
          </p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8">
          <h3 className="text-xl font-semibold mb-3">
            Get the current documentation
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Ask for the security overview, subprocessor details and current
            assurance status before onboarding. We’ll confirm the configuration
            and requirements for your firm.
          </p>
          <a
            href="mailto:contact@complyvault.co?subject=Security%20documentation%20request"
            className="inline-flex items-center gap-2 text-vault-green-300 font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Request security documentation
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  [
    'What can I use today?',
    'The current workflow starts with an uploaded recording: transcription, extracted draft notes, source-linked review, finalization and export. Preparation and live meeting capture are previews; they are not generally available.',
  ],
  [
    'Do I need a meeting booked to prepare?',
    'The preparation preview starts with a client or prospect. You can explore a brief, agenda and information gaps before attaching a meeting. Ask to see this experience in a demo.',
  ],
  [
    'Does ComplyVault connect to my CRM, email or WhatsApp?',
    'Do not assume a live connection from the workflow illustrations. Confirm specific integrations and their availability with us. The current recording-upload workflow does not require a CRM or calendar connection.',
  ],
  [
    'What makes the follow-through different?',
    'The documentation stays connected to its evidence and review history. You can inspect the transcript context, correct the draft and preserve sign-off alongside the exported record.',
  ],
  [
    'Who reviews and finalizes the record?',
    'Team members can contribute to draft records. CCO or owner roles finalize them. Your firm remains responsible for its review decisions and documentation requirements.',
  ],
  [
    'Does a documentation pack guarantee compliance?',
    'No. ComplyVault supports your documentation and review process. AI-generated drafts need human review, and an export does not establish that advice or a firm is compliant.',
  ],
]

export function LifecycleFAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-10">
          Before you book a demo.
        </h2>
        <div className="space-y-4">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-2xl border border-border bg-card p-6"
            >
              <summary className="cursor-pointer font-semibold flex items-center justify-between gap-4 list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {question}
                <ChevronDown
                  className="w-5 h-5 shrink-0 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LifecycleCTA() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-20 lg:py-28 relative bg-gradient-to-br from-vault-green-900 to-vault-green-800"
    >
      <div className={`${container} grid lg:grid-cols-2 gap-12 items-center`}>
        <div className="text-white">
          <p className="text-vault-coral-300 font-medium mb-4">
            See the work. Inspect the evidence.
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            Bring one client workflow.
            <br />
            Let’s walk through it.
          </h2>
          <p className="text-lg text-white/85 leading-relaxed mb-8">
            See the current recording-to-documentation workflow and explore the
            Prepare and Meet previews. We’ll discuss what is available now and
            what your team needs next.
          </p>
          <ul className="space-y-4">
            {[
              'Review a source-linked draft',
              'Inspect the sign-off and documentation pack',
              'Discuss fit, integrations and preview availability',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  className="w-5 h-5 text-vault-coral-300 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DemoForm description="See the current workflow and explore the product previews." />
      </div>
    </section>
  )
}
