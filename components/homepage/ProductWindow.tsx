import type { ReactNode } from "react";
export function StatusPill({ children }: { children: ReactNode }) {
  const tone =
    children === "Escalated" ||
    children === "Needs confirmation" ||
    children === "Held"
      ? "warning"
      : children === "Live" ||
          children === "Cleared" ||
          children === "Signed off"
        ? "live"
        : "neutral";
  return (
    <span className={`cv-status cv-status-${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}
export function ProductWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`cv-window ${className}`}>
      <div className="cv-window-bar">
        <span className="cv-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{title}</span>
        <span className="cv-demo-label">Illustrative demo</span>
      </div>
      {children}
    </div>
  );
}
