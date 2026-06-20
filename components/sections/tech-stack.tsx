"use client";

import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/motion";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Neon Postgres",
  "Drizzle ORM",
  "Clerk Auth",
  "Vercel AI SDK",
  "Zod",
  "shadcn/ui",
  "Upstash / QStash",
];

export function TechStack() {
  return (
    <section id="stack" className="section-anchor py-16 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={scrollReveal}
        custom={0}
        className="mb-8"
      >
        <p className="section-eyebrow mb-4">tooling</p>
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Current stack
        </h2>
      </motion.div>

      <div className="font-mono flex flex-wrap gap-2 text-sm md:text-base">
        {stack.map((tool, i) => (
          <motion.span
            key={tool}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            className="stack-chip pressable rounded-sm border border-border bg-card px-3 py-1.5 text-foreground"
          >
            {tool}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={scrollReveal}
        custom={stack.length + 1}
        className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground"
      >
        Next.js App Router and React for the interface. TypeScript and Zod at
        every boundary. Neon Postgres and Drizzle underneath. Vercel AI SDK
        where AI earns its place.
      </motion.p>
    </section>
  );
}