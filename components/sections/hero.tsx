"use client";

import Link from "next/link";
import { ProofPanel } from "@/components/proof-panel";

export function Hero() {
  return (
    <section id="hero" className="hero-grid section-anchor">
      <div className="hero-copy hero-enter">
        <div className="hero-kicker">
          <span className="hero-kicker__dot" aria-hidden="true" />
          <span>Full-stack developer · AI products · web security</span>
        </div>

        <h1>
          I ship reliable
          <span>AI products.</span>
        </h1>

        <p className="hero-lede">
          Full-stack development with a QA mindset. I build secure, useful web
          apps with Next.js, TypeScript, and the AI SDK—then stay close to the
          details that make them hold up.
        </p>

        <div className="hero-actions">
          <Link href="#projects" className="btn-primary focus-ring">
            View case studies
          </Link>
          <Link href="/cv.pdf" className="btn-secondary focus-ring" target="_blank" rel="noreferrer">
            Download CV
          </Link>
        </div>

        <p className="hero-availability">
          <span aria-hidden="true">Available</span> for new opportunities
        </p>
      </div>

      <div className="hero-proof hero-enter hero-enter--delayed">
        <ProofPanel />
      </div>
    </section>
  );
}
