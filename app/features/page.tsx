import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Fingerprint, History, ShieldCheck, Link2 } from "lucide-react";
import { Navigation, Footer } from "@/components";
import { DemoForm } from "@/components/DemoForm";
import { HeroProductPanel } from "@/components/homepage/HeroProductPanel";
import { ProductWindow, StatusPill } from "@/components/homepage/ProductWindow";
import { DeferredProductDemo } from "@/components/homepage/DeferredProductDemo";
import { IntegrationsStrip } from "@/components/homepage/Homepage";
import { SITE_URL } from "@/lib/site";
import "@/components/homepage/homepage.css";
import "@/components/features/features.css";

export const metadata: Metadata = {
  title: "ComplyVault Features | Client Context, Review & Evidence",
  description: "Explore ComplyVault's adviser and CCO workflows: source-linked notes, transcript evidence, recorded sign-off and documentation packs.",
  alternates: { canonical: `${SITE_URL}/features` },
};

const safeguards = [
  { icon: Link2, title: "Trace the source", text: "Open the transcript evidence behind a note before deciding what belongs in the record." },
  { icon: Fingerprint, title: "Verify the record", text: "SHA-256 hashes make changes to evidence detectable." },
  { icon: History, title: "Keep the history", text: "An append-only audit trail preserves the sequence of recorded actions." },
  { icon: ShieldCheck, title: "Make gaps visible", text: "Unindexed sources are refused and logged instead of silently treated as evidence." },
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="cv-home cv-features">
        <header className="cv-f-hero cv-container">
          <p className="cv-eyebrow">For advisers and the CCOs who supervise them</p>
          <h1>The work around the advice.<br /><span>The evidence behind it.</span></h1>
          <p className="cv-f-intro">Client context, source-linked notes and recorded review decisions. Explore how ComplyVault brings the adviser’s work and the CCO’s oversight into one record.</p>
          <div className="cv-f-actions">
            <a className="cv-f-button" href="#demo">Book a demo <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="cv-f-secondary" href="#follow-through">Explore the evidence workflow <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="cv-f-product"><HeroProductPanel /></div>
        </header>

        <nav className="cv-f-stage-nav cv-container" aria-label="Explore features">
          {[['01', 'Prepare', 'prepare'], ['02', 'Meet', 'meet'], ['03', 'Follow through', 'follow-through'], ['04', 'CCO oversight', 'oversight']].map(([number, label, id]) => (
            <a key={id} href={`#${id}`}><span>{number}</span>{label}<ArrowRight size={16} aria-hidden="true" /></a>
          ))}
        </nav>

        <section id="prepare" className="cv-container cv-f-row">
          <div>
            <p className="cv-eyebrow">01 / Prepare</p>
            <h2 className="cv-h2">Know what matters.<br /><span>Before you meet.</span></h2>
            <p className="cv-body">A focused place for the context behind the next conversation. The preparation experience brings changes, open commitments and questions together, even before a meeting is booked.</p>
            <ul className="cv-f-points"><li>Start with what changed since the last conversation.</li><li>Keep open promises in view.</li><li>Separate confirmed context from questions to ask.</li></ul>
          </div>
          <ProductWindow title="Preparation experience">
            <div className="cv-f-brief">
              <div className="cv-f-brief-heading"><div><small>Client preparation</small><h3>Robert Calloway</h3></div><StatusPill>Unscheduled</StatusPill></div>
              <p className="cv-f-caption">Illustrative client and preparation content</p>
              <div className="cv-f-brief-item"><span>What changed</span><h4>An earlier retirement is now on the table.</h4><p>Confirm the target date and what it means for the current plan.</p><small>Context: previous review notes</small></div>
              <div className="cv-f-brief-item"><span>Open commitment</span><h4>Provide the fee comparison.</h4><p>Bring the comparison to the next conversation.</p></div>
              <div className="cv-f-brief-foot"><Check size={16} aria-hidden="true" />Context stays with the preparation.</div>
            </div>
          </ProductWindow>
        </section>

        <section id="meet" className="cv-f-lift">
          <div className="cv-container cv-f-row cv-f-reverse">
            <div>
              <p className="cv-eyebrow">02 / Meet</p>
              <h2 className="cv-h2">Keep the conversation.<br /><span>Keep its context.</span></h2>
              <p className="cv-body">Bring meeting recordings into a reviewable workflow. Read the draft note alongside the transcript so the client’s words remain connected to the record.</p>
              <ul className="cv-f-points"><li>Review priorities, decisions and follow-up items.</li><li>Move from a note to the supporting passage.</li><li>Apply human judgment before accepting the draft.</li></ul>
            </div>
            <DeferredProductDemo kind="source" />
          </div>
        </section>

        <section id="follow-through" className="cv-container cv-f-row">
          <div>
            <p className="cv-eyebrow">03 / Follow through</p>
            <h2 className="cv-h2">From reviewed notes.<br /><span>To a connected record.</span></h2>
            <p className="cv-body">Bring evidence, scope and review history into a documentation pack. Inspect candidate records and coverage before approving what goes into the export.</p>
            <ul className="cv-f-points"><li>Connect the request to its candidate evidence.</li><li>Keep held items and coverage gaps visible.</li><li>Export documentation with the review context.</li></ul>
          </div>
          <DeferredProductDemo kind="pack" />
        </section>

        <section id="oversight" className="cv-f-lift">
          <div className="cv-container cv-f-row cv-f-reverse">
            <div>
              <p className="cv-eyebrow">For the CCO</p>
              <h2 className="cv-h2">See what needs attention.<br /><span>Record your judgment.</span></h2>
              <p className="cv-body">Move from the review queue to the underlying evidence. Inspect the context, record the supervisory decision and preserve who reviewed the record.</p>
              <ul className="cv-f-points"><li>Distinguish cleared, sampled, escalated and held records.</li><li>Inspect transcript evidence before sign-off.</li><li>Retain the decision in the audit trail.</li></ul>
              <Link className="cv-text-link" href="/features/configurable-compliance-framework">Explore your review framework <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <DeferredProductDemo kind="inbox" />
          </div>
        </section>

        <section className="cv-container cv-section">
          <p className="cv-eyebrow">The foundation of the record</p>
          <h2 className="cv-h2">Evidence you can inspect.<br /><span>History you can follow.</span></h2>
          <div className="cv-f-safeguards">{safeguards.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>
        <IntegrationsStrip />
        <section id="demo" className="cv-f-lift">
          <div className="cv-container cv-f-demo">
            <div><p className="cv-eyebrow">See it in your workflow</p><h2 className="cv-h2">Your next conversation.<br /><span>A clearer record.</span></h2><p className="cv-body">Walk through a client record from source to sign-off. See how the adviser and CCO views work together.</p><ul className="cv-f-points"><li>Explore a source-linked note.</li><li>Inspect the evidence and review history.</li><li>Walk through a documentation pack.</li></ul><p className="cv-f-availability">Recording review and documentation are available today. Preparation and live capture are in preview.</p></div>
            <DemoForm description="Explore the adviser and CCO workflow with your team." />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
