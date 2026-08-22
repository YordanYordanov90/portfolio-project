"use client";

import { ArrowUpRight } from "lucide-react";

const REPO = "https://github.com/YordanYordanov90/PineForge-ai-trading/blob/main/context";

const contextFiles = [
  {
    name: "project-overview.md",
    body: "What the product is, who it's for, and the boundaries it won't cross.",
  },
  {
    name: "architecture.md",
    body: "System design and the invariants every change has to respect.",
  },
  {
    name: "code-standards.md",
    body: "Conventions and file structure that keep the codebase consistent.",
  },
  {
    name: "ai-workflow-rules.md",
    body: "Rules the AI follows in the repo — read the specs first, no drift.",
  },
  {
    name: "progress-tracker.md",
    body: "The single source of truth for what's shipped and what's next.",
  },
  {
    name: "ui-context.md",
    body: "Design tokens and component patterns for a consistent UI.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-anchor py-16 md:py-20">
      <div className="process-intro mb-8">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Spec-driven, not vibe-driven.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Before I write code, I write the specs. Every project lives on a set
          of context files that the AI and I both work from — so features get
          planned before they get built, and nothing drifts. On PineForge, six
          files keep a 68-feature product coherent.
        </p>
      </div>

      <div className="process-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr]">
        {contextFiles.map((file, i) => (
          <a
            key={file.name}
            href={`${REPO}/${file.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`process-item group pressable focus-ring rounded-sm border border-border bg-card p-5 ${i % 2 === 0 ? "process-item--tall" : ""}`}
          >
            <span className="flex items-center justify-between gap-2 font-mono text-sm text-primary">
              <span className="underline-offset-4 group-hover:underline">{file.name}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {file.body}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
