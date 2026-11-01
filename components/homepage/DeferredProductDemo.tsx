"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ProductDemos = lazy(() => import("./ProductDemos"));
export function DeferredProductDemo({
  kind,
}: {
  kind: "source" | "inbox" | "pack";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const fallback = (
    <div className="cv-demo-placeholder" aria-label="Product example loading">
      Source. Context. Decision.
    </div>
  );
  return (
    <div ref={ref} className="cv-deferred-demo">
      {visible ? (
        <Suspense fallback={fallback}>
          <ProductDemos kind={kind} />
        </Suspense>
      ) : (
        fallback
      )}
      <noscript>
        See a source-linked record and its review history in a demo.
      </noscript>
    </div>
  );
}
