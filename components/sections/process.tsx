"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollReveal } from "@/lib/motion";

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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={scrollReveal}
        custom={0}
        className="mb-8"
      >
        <p className="section-eyebrow mb-4">how I ship</p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Spec-driven, not vibe-driven.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Before I write code, I write the specs. Every project lives on a set
          of context files that the AI and I both work from — so features get
          planned before they get built, and nothing drifts. On PineForge, six
          files keep a 68-feature product coherent.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {contextFiles.map((file, i) => (
          <motion.a
            key={file.name}
            href={`${REPO}/${file.name}`}
            target="_blank"
            rel="noopener noreferrer"
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            className="group pressable focus-ring rounded-sm border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-card/80"
          >
            <span className="flex items-center justify-between gap-2 font-mono text-sm text-primary">
              <span className="underline-offset-4 group-hover:underline">{file.name}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {file.body}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
