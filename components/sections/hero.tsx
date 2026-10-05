"use client";

import Link from "next/link";
import { ProofPanel } from "@/components/proof-panel";
import { AuditDemo } from "@/components/audit-demo";

export function Hero() {
  return (
    <>
      <section id="hero" className="hero-grid section-anchor">
        <div className="hero-copy hero-enter">
          <h1>
            <span className="hero-title__lead">I ship reliable</span>
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
            <Link href="#contact" className="btn-secondary focus-ring">
              Discuss a project
            </Link>
          </div>

          <p className="hero-availability">
            <span>Available</span> for new opportunities
          </p>
        </div>
      </section>

      <div className="hero-proof hero-enter hero-enter--delayed">
        <ProofPanel />
      </div>
      <div className="hero-demo hero-enter hero-enter--later">
        <AuditDemo />
      </div>
    </>
  );
}
