"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw, ScanSearch } from "lucide-react";

const results = [
  { label: "Performance", value: "92", width: "92%" },
  { label: "Accessibility", value: "98", width: "98%" },
  { label: "Conversion", value: "84", width: "84%" },
];

export function AuditDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [isRunning]);

  const runDemo = () => {
    setHasRun(false);
    setIsRunning(true);
  };

  return (
    <section className="audit-demo" aria-labelledby="audit-demo-title">
      <div className="audit-demo__intro">
        <div>
          <p className="audit-demo__eyebrow">A small look inside the work</p>
          <h2 id="audit-demo-title">Useful output, before the first call.</h2>
        </div>
        <p>
          The audit tool turns a public URL into a clear list of next actions.
          Try the interaction to see the kind of feedback I design for.
        </p>
      </div>

      <div className="audit-demo__window">
        <div className="audit-demo__toolbar">
          <span className="audit-demo__dots" aria-hidden="true"><i /><i /><i /></span>
          <span>website-audit-tool / report</span>
          <span className="audit-demo__status">{hasRun ? "Complete" : "Ready"}</span>
        </div>

        <div className="audit-demo__body">
          <div className="audit-demo__url">
            <span>URL</span>
            <strong>your-business.com</strong>
            <button type="button" className="audit-demo__run focus-ring" onClick={runDemo} disabled={isRunning}>
              {isRunning ? <ScanSearch className="h-4 w-4 animate-pulse" aria-hidden="true" /> : hasRun ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <ScanSearch className="h-4 w-4" aria-hidden="true" />}
              {isRunning ? "Scanning" : hasRun ? "Replay scan" : "Run demo"}
            </button>
          </div>

          <div className={`audit-demo__results ${isRunning ? "is-scanning" : ""}`} aria-live="polite">
            {isRunning ? (
              <div className="audit-demo__scanning">
                <span className="audit-demo__scan-line" />
                <span>Checking performance, structure, and clarity…</span>
              </div>
            ) : hasRun ? (
              results.map((result) => (
                <div className="audit-demo__result" key={result.label}>
                  <div><span>{result.label}</span><strong>{result.value}</strong></div>
                  <span className="audit-demo__bar"><span style={{ width: result.width }} /></span>
                  <Check className="h-4 w-4" aria-label="Checked" />
                </div>
              ))
            ) : (
              <p className="audit-demo__placeholder">Press “Run demo” to reveal a sample report.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
