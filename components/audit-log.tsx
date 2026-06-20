"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { enterUp, enterUpVisible, EASE_OUT } from "@/lib/motion";

const LOG_LINES = [
  { time: "00:00:01", level: "INFO", msg: "auth.session hardened — httpOnly, sameSite=strict" },
  { time: "00:00:02", level: "PASS", msg: "api.routes validated with Zod schemas" },
  { time: "00:00:03", level: "INFO", msg: "ai.prompts sandboxed — no PII in context" },
  { time: "00:00:04", level: "PASS", msg: "postgres.queries parameterized via Drizzle" },
  { time: "00:00:05", level: "PASS", msg: "ui.rendered — Next.js 16, React 19" },
];

const levelColor: Record<string, string> = {
  INFO: "text-accent",
  PASS: "text-primary",
};

export function AuditLog() {
  const [visibleCount, setVisibleCount] = useState(0);
  const complete = visibleCount >= LOG_LINES.length;

  useEffect(() => {
    if (complete) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisibleCount(LOG_LINES.length);
      return;
    }

    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 480);
    return () => clearTimeout(timer);
  }, [visibleCount, complete]);

  return (
    <div
      className="font-mono glass-panel rounded-sm border border-border p-4 text-xs leading-relaxed"
      aria-label="Security audit log animation"
      aria-live="polite"
    >
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-2 text-muted-foreground">
        <span
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            complete ? "bg-accent" : "bg-primary"
          }`}
          aria-hidden
        />
        <span>posture.log</span>
        <span className="ml-auto">{complete ? "verified" : "running"}</span>
      </div>

      <div className="min-h-[132px] space-y-1.5">
        {LOG_LINES.slice(0, visibleCount).map((line) => (
          <motion.div
            key={line.time}
            initial={enterUp(4)}
            animate={enterUpVisible}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex flex-wrap gap-x-2 gap-y-0.5"
          >
            <span className="text-muted-foreground">{line.time}</span>
            <span className={levelColor[line.level]}>[{line.level}]</span>
            <span className="text-foreground">{line.msg}</span>
          </motion.div>
        ))}

        {!complete && (
          <span className="cursor-blink text-primary" aria-hidden>
            ▌
          </span>
        )}

        <AnimatePresence>
          {complete && (
            <motion.p
              initial={enterUp(4)}
              animate={enterUpVisible}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="pt-2 text-primary"
            >
              → 5/5 checks passed. Ready to ship.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}