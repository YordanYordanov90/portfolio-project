"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { scrollReveal } from "@/lib/motion";
import { PROFILE_IMAGE, RESUME_PATH } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="section-anchor py-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={scrollReveal}
          custom={0}
          className="mx-auto w-full max-w-[280px]"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
            <Image
              src={PROFILE_IMAGE}
              alt="Yordan Yordanov"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 280px"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            custom={1}
            className="flex flex-col gap-4"
          >
            <p className="section-eyebrow">about</p>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Hi, I&apos;m Yordan
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              I build full-stack web apps with Next.js and Vercel. I came into
              development after completing courses in manual and automation QA —
              which left me with a habit of caring about how things break and
              writing code defensively. These days most of my energy goes into
              AI and autonomous agents, figuring out how to make them actually
              useful.
            </p>
            <p className="text-sm text-muted-foreground">
              Based in Plovdiv, Bulgaria · 4 projects shipped
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={scrollReveal}
            custom={2}
            className="flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <Link
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-primary focus-ring inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Link>
            <Link href="#contact" className="btn-secondary focus-ring">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
