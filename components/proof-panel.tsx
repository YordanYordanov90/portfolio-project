import Link from "next/link";

const AUDIT_TOOL_URL = "https://website-audit-tool-livid.vercel.app/en";

const auditAreas = ["Performance", "SEO", "Accessibility", "Content", "Conversion"];

export function ProofPanel() {
  return (
    <aside className="proof-panel proof-panel--audit" aria-labelledby="audit-tool-heading">
      <div className="proof-panel__header">
        <span className="proof-panel__label">Value before the call</span>
        <span className="proof-panel__index">Free tool</span>
      </div>

      <div className="proof-panel__audit-body">
        <p className="proof-panel__audit-kicker">Website health check</p>
        <h2 id="audit-tool-heading" className="proof-panel__audit-title">
          See what your website needs next.
        </h2>
        <p className="proof-panel__audit-copy">
          Run a focused audit before we talk and leave with a report you can act on.
        </p>

        <ul className="proof-panel__areas" aria-label="Website audit areas">
          {auditAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>

      <Link
        href={AUDIT_TOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="proof-panel__link focus-ring"
      >
        Audit your website <span aria-hidden="true">↗</span>
      </Link>

      <p className="proof-panel__trust">No email · No account · No permanent report storage</p>
    </aside>
  );
}
