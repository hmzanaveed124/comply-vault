import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  History,
  Link2,
} from "lucide-react";
import { Button } from "@/components/Button";
import { DemoForm } from "@/components/DemoForm";
import { HeroProductPanel } from "./HeroProductPanel";
import { DeferredProductDemo } from "./DeferredProductDemo";
import { StatusPill } from "./ProductWindow";
import { demo, faq, integrations, useCases } from "./homepage-demo-data";
import reveal from "@/components/marketing/HeadlineReveal.module.css";
import "./homepage.css";

function Heading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <>
      <p className="cv-eyebrow">{eyebrow}</p>
      <h2 className="cv-h2">{children}</h2>
    </>
  );
}
export function TodoProof({ slot }: { slot: string }) {
  // TODO_PROOF: Enable customer quotes and pilot names only after written approval.
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="cv-proof-placeholder">
      TODO_PROOF · {slot} · awaiting approved evidence
    </div>
  );
}
export function IntegrationsStrip() {
  return (
    <section
      className="cv-integrations cv-container"
      aria-label="Supported integrations"
    >
      <p className="cv-eyebrow">Works with the tools your firm already uses</p>
      <div className="cv-integration-row">
        {integrations.map((name) => (
          <span key={name} className="cv-integration">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
export function StatTile({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="cv-stat">
      <div className="cv-stat-value">{value}</div>
      <h3>{label}</h3>
      <p>{detail}</p>
    </div>
  );
}
export function ViewCard({
  role,
  title,
  steps,
  pills,
  id,
}: {
  role: string;
  title: string;
  steps: { label: string; text: string; status: string }[];
  pills: string[];
  id: string;
}) {
  return (
    <article className="cv-glass cv-view-card" id={id}>
      <p className="cv-eyebrow">{role}</p>
      <h3>{title}</h3>
      <div className="cv-view-steps">
        {steps.map((s, i) => (
          <div key={s.label}>
            <span className="cv-step-number">0{i + 1}</span>
            <div>
              <strong>{s.label}</strong>
              <p>{s.text}</p>
            </div>
            <StatusPill>{s.status}</StatusPill>
          </div>
        ))}
      </div>
      <div className="cv-feature-pills">
        {pills.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      <div className="cv-mini-ui">
        <div className="cv-mini-bar">
          <span>
            {role === "For advisers" ? "Client workspace" : "Review activity"}
          </span>
          <span>Sample record</span>
        </div>
        {role === "For advisers"
          ? demo.notes.map((n) => (
              <div className="cv-mini-row" key={n.label}>
                <Check size={13} />
                <span>{n.label}</span>
                <code>{n.time}</code>
              </div>
            ))
          : demo.inbox.slice(0, 3).map((n) => (
              <div className="cv-mini-row" key={n.client}>
                <span>{n.client}</span>
                <StatusPill>{n.status}</StatusPill>
              </div>
            ))}
      </div>
      <a
        className="cv-text-link"
        href={role === "For advisers" ? "#source-evidence" : "#review-inbox"}
      >
        See how it works <ArrowRight size={16} />
      </a>
    </article>
  );
}
export function FeatureRow({
  id,
  number,
  title,
  accent,
  text,
  kind,
  reverse,
}: {
  id: string;
  number: string;
  title: string;
  accent: string;
  text: string;
  kind: "source" | "inbox" | "pack";
  reverse?: boolean;
}) {
  return (
    <section
      id={id}
      className={`cv-feature-row cv-container cv-reveal ${reverse ? "cv-reverse" : ""}`}
    >
      <div className="cv-feature-copy">
        <Heading eyebrow={`${number} / The evidence in practice`}>
          {title}
          <br />
          <span>{accent}</span>
        </Heading>
        <p className="cv-body">{text}</p>
        <a className="cv-text-link" href="/sample-audit-pack">
          Explore a sample pack <ArrowUpRight size={16} />
        </a>
      </div>
      <DeferredProductDemo kind={kind} />
    </section>
  );
}
export function NumberedUseCase({
  index,
  text,
  pill,
  href,
}: {
  index: number;
  text: string;
  pill: string;
  href: string;
}) {
  return (
    <a className="cv-use-case" href={href}>
      <span className="cv-use-number">0{index + 1}</span>
      <span className="cv-use-text">{text}</span>
      <span className="cv-use-pill">{pill}</span>
      <ArrowUpRight size={22} />
    </a>
  );
}
export function SecurityCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <article className="cv-glow cv-security-card">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
export function Homepage() {
  return (
    <div className="cv-home">
      <section className="cv-hero">
        <div className="cv-hero-pattern" aria-hidden="true" />
        <div className="cv-container cv-hero-inner">
          <div className="cv-hero-copy">
            <p className="cv-eyebrow">For SEC and state-registered RIAs</p>
            <h1>
              <span className="sr-only">
                The context behind the advice. The record behind the decision.
              </span>
              <span aria-hidden="true">
                {[
                  "The context behind the advice.",
                  "The record behind the decision.",
                ].map((line, row) => (
                  <span
                    className={
                      row ? "cv-headline-line cv-green" : "cv-headline-line"
                    }
                    key={line}
                  >
                    {line.split(" ").map((word, i) => (
                      <span key={i}>
                        <span
                          className={reveal.word}
                          style={{
                            animationDelay: `${200 + (row * 5 + i) * 110}ms`,
                          }}
                        >
                          {word}
                        </span>{" "}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>
            <p className="cv-hero-sub">
              ComplyVault turns client meetings, emails and supported messages
              into source-linked records. Advisers get a cleaner working day.
              Your CCO gets evidence they can sign off and an examiner can
              inspect.
            </p>
            <div className="cv-hero-actions">
              <Button href="#cta">
                Book a demo <ArrowRight size={16} className="ml-2" />
              </Button>
              <a className="cv-sample-link" href="/sample-audit-pack">
                See a sample documentation pack <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="cv-trust-line">
              <ShieldCheck size={15} />
              Tamper-evident records · Source-linked evidence · CCO sign-off
              built in
            </p>
          </div>
          <HeroProductPanel />
        </div>
      </section>
      <IntegrationsStrip />
      <section className="cv-proof-band">
        <div className="cv-container">
          <p className="cv-eyebrow">A record with substance</p>
          <div className="cv-stat-grid">
            <StatTile
              value="Source-linked"
              label="Inspect the basis for the note"
              detail="Move from a drafted item to its transcript evidence."
            />
            <StatTile
              value="SHA-256"
              label="Tamper-evident evidence records"
              detail="Keep an integrity reference alongside the record."
            />
            <StatTile
              value="Append-only"
              label="A history of the review"
              detail="Preserve the decisions and changes behind sign-off."
            />
          </div>
          <TodoProof slot="Customer quote and approved multi-firm pilot callout" />
        </div>
      </section>
      <section id="how-it-works" className="cv-section cv-suite-section">
        <div className="cv-container">
          <Heading eyebrow="One platform, shared context">
            One record.
            <br />
            <span>Two people who need it.</span>
          </Heading>
          <p className="cv-body cv-section-intro">
            The adviser moves the client relationship forward. The CCO can see
            the work, inspect the evidence and record the review.
          </p>
          <div className="cv-view-grid">
            <ViewCard
              id="adviser-view"
              role="For advisers"
              title="A better working day."
              steps={[
                {
                  label: "Prepare",
                  text: "A focused brief before the conversation.",
                  status: "Coming soon",
                },
                {
                  label: "Meet",
                  text: "Capture the conversation with consent.",
                  status: "Coming soon",
                },
                {
                  label: "Follow through",
                  text: "Review the draft note and next steps.",
                  status: "Live",
                },
              ]}
              pills={["Redtail CRM", "Source-linked notes", "Follow-up items"]}
            />
            <ViewCard
              id="cco-view"
              role="For CCOs"
              title="A record you can stand behind."
              steps={[
                {
                  label: "Review & inspect",
                  text: "Prioritise records and open their evidence.",
                  status: "Live",
                },
                {
                  label: "Sign off",
                  text: "Record the review decision and its context.",
                  status: "Live",
                },
                {
                  label: "Export",
                  text: "Bring documentation and history together.",
                  status: "Live",
                },
              ]}
              pills={[
                "Audit trail",
                "Fail-closed evidence",
                "Documentation export",
              ]}
            />
          </div>
        </div>
      </section>
      <div className="cv-features">
        <FeatureRow
          id="source-evidence"
          number="01"
          title="Every claim traces back"
          accent="to what was said."
          text="Read the note alongside its source. Follow a citation to the transcript passage, inspect the context and correct the draft before it becomes part of the record."
          kind="source"
        />
        <FeatureRow
          id="review-inbox"
          number="02"
          title="A priority inbox."
          accent="A clear review decision."
          text="Bring the conversations that need attention into view. Inspect the evidence, record the supervisory outcome and keep unresolved questions visible."
          kind="inbox"
          reverse
        />
        <FeatureRow
          id="documentation-pack"
          number="03"
          title="A document request."
          accent="A connected response."
          text="Define the scope, inspect candidate evidence and review coverage before approving the selection. Missing sources remain visible, with the record of how they were handled."
          kind="pack"
        />
      </div>
      <section className="cv-section cv-use-section">
        <div className="cv-container">
          <Heading eyebrow="Start with your working day">
            What can ComplyVault
            <br />
            <span>do for me?</span>
          </Heading>
          <div className="cv-use-list">
            {useCases.map((u, i) => (
              <NumberedUseCase key={u.pill} index={i} {...u} />
            ))}
          </div>
        </div>
      </section>
      <section id="security" className="cv-section cv-security-section">
        <div className="cv-container cv-security-grid">
          <div>
            <Heading eyebrow="Built for regulated firms">
              Designed for
              <br />
              <span>close inspection.</span>
            </Heading>
            <p className="cv-body">
              The source, the changes and the review decision belong together.
              Give your oversight team a record it can examine.
            </p>
            <a
              className="cv-text-link"
              href="mailto:contact@complyvault.co?subject=Security%20documentation%20request"
            >
              Request security documentation <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="cv-security-cards">
            <SecurityCard
              title="Tamper-evident evidence"
              icon={<Fingerprint />}
            >
              SHA-256 hashed evidence records keep integrity references
              connected to the material.
            </SecurityCard>
            <SecurityCard
              title="Fails closed, never silent"
              icon={<ShieldCheck />}
            >
              Unindexed sources are refused and logged. Gaps stay visible in the
              review.
            </SecurityCard>
            <SecurityCard title="Accountable sign-off" icon={<LockKeyhole />}>
              CCO sign-off records the review decision before documentation is
              finalized.
            </SecurityCard>
            <SecurityCard title="History that stays" icon={<History />}>
              An append-only audit trail preserves the changes behind the
              record.
            </SecurityCard>
          </div>
        </div>
      </section>
      <section id="faq" className="cv-section">
        <div className="cv-container cv-faq-grid">
          <Heading eyebrow="A few useful answers">
            Before you
            <br />
            <span>book a demo.</span>
          </Heading>
          <div>
            {faq.map(([q, a]) => (
              <details className="cv-glass cv-faq" key={q}>
                <summary>
                  {q}
                  <ChevronDown size={20} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="cta" className="cv-section cv-demo-section">
        <div className="cv-container cv-demo-grid">
          <div>
            <Heading eyebrow="See the work. Inspect the evidence.">
              Your workflow.
              <br />
              <span>Let’s walk through it.</span>
            </Heading>
            <p className="cv-body">
              See how one client conversation becomes a record your team can
              review.
            </p>
            <ul className="cv-demo-checklist">
              {[
                "Review a source-linked draft",
                "Inspect the sign-off and documentation pack",
                "Discuss your firm’s workflow and integrations",
              ].map((t) => (
                <li key={t}>
                  <Check size={18} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="cv-availability">
              Recording review and documentation are available today.
              Preparation and live capture are in preview.
            </p>
          </div>
          <DemoForm description="See your client workflow and its evidence trail in a 30-minute walkthrough." />
        </div>
      </section>
      <section className="cv-section cv-final">
        <div className="cv-container">
          <div className="cv-logo-glow">
            <Image
              src="/logo.svg"
              alt=""
              width={64}
              height={64}
              className="dark:hidden"
            />
            <Image
              src="/logo-white.svg"
              alt=""
              width={64}
              height={64}
              className="hidden dark:block"
            />
          </div>
          <Heading eyebrow="Keep the context. Keep the record.">
            See your own workflow
            <br />
            <span>run through ComplyVault.</span>
          </Heading>
          <p className="cv-body">
            A 30-minute walkthrough on a real client conversation.
          </p>
          <Button href="#cta">
            Book a demo <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
