"use client";

import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/motion";

const principles = [
  {
    label: "Security first",
    body: "For me, security isn't an afterthought — it's where I start. Authentication, API hardening, and vulnerability awareness come before features ship.",
  },
  {
    label: "AI with boundaries",
    body: "I turn raw AI capabilities into usable tools — with validated inputs, scoped context, and integrations that earn their place in the product.",
  },
  {
    label: "Full-stack coherence",
    body: "I enjoy connecting every piece of a project — from infrastructure to UI. Next.js and React on the surface, solid logic and data underneath.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-anchor py-16 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={scrollReveal}
        custom={0}
        className="mb-12"
      >
        <p className="section-eyebrow mb-4">how I build</p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Solid under the hood. Clean on the surface.
        </h2>
      </motion.div>

      <div className="grid gap-0 border-t border-border">
        {principles.map((item, i) => (
          <motion.div
            key={item.label}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            className="principle-row grid gap-4 border-b border-border py-8 md:grid-cols-[200px_1fr] md:gap-12 md:px-4 md:-mx-4 md:rounded-sm"
          >
            <span className="font-mono text-sm text-primary">{item.label}</span>
            <p className="text-lg leading-relaxed text-muted-foreground">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}