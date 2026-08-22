import Link from "next/link";

const proofPoints = [
  { value: "4", label: "live products in the portfolio" },
  { value: "QA", label: "test discipline carried into every build" },
  { value: "AI", label: "where it earns its place in the product" },
];

export function ProofPanel() {
  return (
    <aside className="proof-panel" aria-label="Selected proof">
      <div className="proof-panel__header">
        <span className="proof-panel__label">Proof, not promises</span>
        <span className="proof-panel__index">01—03</span>
      </div>

      <div className="proof-panel__list">
        {proofPoints.map((point) => (
          <div className="proof-panel__row" key={point.value}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </div>

      <Link href="#projects" className="proof-panel__link focus-ring">
        Open the case studies <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
