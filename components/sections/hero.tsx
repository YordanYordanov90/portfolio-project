"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";

export function Hero() {
  return (
    <SectionWrapper
      className="flex min-h-screen flex-col justify-center pt-19 pb-8 md:pt-10 md:pb-4"
      id="hero"
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-muted-foreground bg-muted w-fit rounded-full"
        >
          <Terminal className="h-4 w-4" />
          <span>Builder. Learner. Security-Focused</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground">
         Building the future with code  {" "}
          <span className="text-muted-foreground">and a little bit of AI.</span>
        </h1>

        <p className="max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed mt-2">
            &quot;I love the entire process of building software—from styling a clean interface to the deep-dive logic of making sure a backend is completely secure.&quot;  
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
          >
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
