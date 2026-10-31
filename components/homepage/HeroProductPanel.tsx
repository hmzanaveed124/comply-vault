"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { demo } from "./homepage-demo-data";
import { ProductWindow, StatusPill } from "./ProductWindow";

export function HeroProductPanel() {
  const [view, setView] = useState(0);
  const [source, setSource] = useState(0);
  const [signed, setSigned] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <ProductWindow title="Client workspace" className="cv-hero-product">
      <div className="cv-product-toolbar">
        <span className="cv-record-icon">
          <FileText size={20} />
        </span>
        <div>
          <strong>{demo.client}</strong>
          <p>
            {demo.meeting} · {demo.date}
          </p>
        </div>
        <div className="cv-tabs" role="tablist" aria-label="Record view">
          {["Adviser", "CCO"].map((label, i) => (
            <button
              key={label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`hero-tab-${i}`}
              aria-controls={`hero-panel-${i}`}
              aria-selected={view === i}
              tabIndex={view === i ? 0 : -1}
              onClick={() => setView(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home" ? 0 : e.key === "End" ? 1 : 1 - i;
                  setView(next);
                  tabs.current[next]?.focus();
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="cv-hero-panel-body"
        role="tabpanel"
        id={`hero-panel-${view}`}
        aria-labelledby={`hero-tab-${view}`}
        tabIndex={0}
      >
        {view === 0 ? (
          <div className="cv-panel-transition" key="adviser">
            <div className="cv-record-heading">
              <span>Meeting note</span>
              <StatusPill>Draft</StatusPill>
            </div>
            <div className="cv-note-grid">
              {demo.notes.map((note, i) => (
                <div className="cv-note" key={note.label}>
                  <div className="cv-note-label">
                    {note.label}
                    <StatusPill>{note.status}</StatusPill>
                  </div>
                  <p>{note.text}</p>
                  <button
                    className="cv-source-chip"
                    aria-pressed={source === i}
                    onClick={() => setSource(i)}
                  >
                    <Link2 size={12} />
                    {note.time} transcript
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cv-evidence-inline" aria-live="polite">
              <span className="cv-small-label">
                Transcript evidence · {demo.notes[source].time}
              </span>
              <p>“{demo.notes[source].excerpt}”</p>
            </div>
            <div className="cv-record-footer">
              <Check size={14} /> Sources stay with the note. Your team reviews
              the draft.
            </div>
          </div>
        ) : (
          <div className="cv-panel-transition cv-supervisor" key="cco">
            <div className="cv-flag">
              <ShieldCheck size={18} />
              <strong>{demo.flag}</strong>
              <StatusPill>Escalated</StatusPill>
            </div>
            <div className="cv-supervisor-columns">
              <div>
                <span className="cv-small-label">
                  Transcript evidence · 00:19:06
                </span>
                <blockquote>“{demo.riskExcerpt}”</blockquote>
                <span className="cv-small-label">SHA-256 · sample record</span>
                <code title={demo.hash}>
                  {demo.hash.slice(0, 24)}…{demo.hash.slice(-8)}
                </code>
              </div>
              <div>
                <span className="cv-small-label">Append-only audit trail</span>
                <ol className="cv-audit-list">
                  {demo.trail.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {signed && <li>CCO review recorded · Demo session</li>}
                </ol>
                <button
                  className="cv-ui-button"
                  onClick={() => setSigned(true)}
                  disabled={signed}
                >
                  {signed ? "Review recorded" : "Sign off record"}
                </button>
                <p className="cv-helper" role="status">
                  {signed
                    ? "Demo sign-off recorded. The escalation remains open."
                    : "Records the review. Does not resolve the escalation."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProductWindow>
  );
}
