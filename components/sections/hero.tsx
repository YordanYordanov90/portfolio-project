"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuditLog } from "@/components/audit-log";
import { fadeUp, enterUp, enterUpVisible, EASE_OUT } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor grid min-h-[calc(100vh-var(--header-height))] gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-24"
    >
      <motion.div initial="hidden" animate="visible" className="flex flex-col gap-8">
        <motion.div custom={0} variants={fadeUp} className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <span aria-hidden>👋</span>
            Open to new opportunities — happy to build together
          </span>
       
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
        >
          Self-taught.
          <br />
          <span className="text-muted-foreground">Already shipping</span>
          <br />
          real things.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="max-w-md text-lg leading-relaxed text-muted-foreground"
        >
          A full-stack developer building AI-powered apps with
          Next.js. I came from QA, so I care a lot about how things break — and
          how to keep them from breaking.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
          <Link href="#projects" className="focus-ring btn-primary">
            See selected work
          </Link>
          <Link href="#contact" className="focus-ring btn-secondary">
            Get in touch
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={enterUp(8)}
        animate={enterUpVisible}
        transition={{ delay: 0.18, duration: 0.26, ease: EASE_OUT }}
      >
        <AuditLog />
      </motion.div>
    </section>
  );
}