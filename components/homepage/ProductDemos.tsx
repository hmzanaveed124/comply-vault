"use client";
import { useState } from "react";
import { Check, Link2, ArrowRight } from "lucide-react";
import { demo } from "./homepage-demo-data";
import { ProductWindow, StatusPill } from "./ProductWindow";
export default function ProductDemos({
  kind,
}: {
  kind: "source" | "inbox" | "pack";
}) {
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  if (kind === "source")
    return (
      <ProductWindow title="Note & evidence">
        <div className="cv-demo-pad">
          <span className="cv-small-label">
            Select a note to inspect its source
          </span>
          {demo.notes.slice(0, 2).map((n, i) => (
            <button
              key={n.label}
              className={`cv-select-note ${selected === i ? "selected" : ""}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>{n.text}</span>
              <Link2 size={16} />
            </button>
          ))}
          <div className="cv-transcript" aria-live="polite">
            <span className="cv-small-label">
              Transcript · {demo.notes[selected].time}
            </span>
            <p>
              <mark>{demo.notes[selected].excerpt}</mark>
            </p>
          </div>
        </div>
      </ProductWindow>
    );
  if (kind === "inbox")
    return (
      <ProductWindow title="Supervisory review">
        <div className="cv-demo-pad">
          <div className="cv-record-heading">
            <strong>Priority inbox</strong>
            <span className="cv-small-label">4 sample records</span>
          </div>
          {demo.inbox.map((r, i) => (
            <button
              key={r.client}
              className={`cv-inbox-row ${selected === i ? "selected" : ""}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>
                <strong>{r.client}</strong>
                <small>{r.subject}</small>
              </span>
              <StatusPill>{r.status}</StatusPill>
            </button>
          ))}
          <p className="cv-selection-summary" aria-live="polite">
            {demo.inbox[selected].status === "Held"
              ? "Source unavailable. Evidence use is blocked and the event is logged."
              : `${demo.inbox[selected].client}: ${demo.inbox[selected].subject}. Open the evidence before recording a decision.`}
          </p>
        </div>
      </ProductWindow>
    );
  return (
    <ProductWindow title="Documentation pack">
      <div className="cv-demo-pad">
        <div className="cv-record-heading">
          <strong>Build a scoped record</strong>
          <StatusPill>{approved ? "Reviewed" : "Draft"}</StatusPill>
        </div>
        {demo.pack.map((item, i) => (
          <div className="cv-pack-row" key={item.label}>
            <span className="cv-step-number">{i + 1}</span>
            <div>
              <span className="cv-small-label">{item.label}</span>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
        <div className="cv-pack-bottom">
          <button
            className="cv-ui-button"
            onClick={() => setApproved(true)}
            disabled={approved}
          >
            {approved ? (
              <>
                <Check size={14} /> Selection approved
              </>
            ) : (
              <>
                Approve selection <ArrowRight size={14} />
              </>
            )}
          </button>
          <span className="cv-helper" role="status">
            {approved
              ? "Demo only. Held source excluded and disclosed."
              : "Held source is disclosed, not silently included."}
          </span>
        </div>
      </div>
    </ProductWindow>
  );
}
