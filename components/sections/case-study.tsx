"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedItem } from "@/components/section-wrapper";

export function CaseStudy() {
  return (
    <section id="case-study" className="case-study-section section-anchor">
      <AnimatedItem>
        <div className="case-study__header">
          <div>
            <p className="services-eyebrow">Featured case study</p>
            <h2>Defining the product before the agent writes the code.</h2>
          </div>
          <Link href="/blog/ai-spec-blueprint-system-definition-layer" className="case-study__link focus-ring">
            Read the full story <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedItem>

      <div className="case-study__grid">
        <AnimatedItem className="case-study__visual">
          <div className="case-study__image-wrap">
            <Image
              src="/projects/ai-spec-blueprint.png"
              alt="AI Spec Blueprint showing a structured project definition"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <span className="case-study__caption">AI Spec Blueprint · product definition workspace</span>
        </AnimatedItem>

        <AnimatedItem className="case-study__details" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          <div className="case-study__detail">
            <span>Challenge</span>
            <p>AI coding agents move quickly, but ambiguous product decisions create drift, rework, and fragile features.</p>
          </div>
          <div className="case-study__detail">
            <span>My role</span>
            <p>Product engineer: I shaped the workflow, validation rules, CLI path, and interface that keeps decisions visible.</p>
          </div>
          <div className="case-study__detail">
            <span>Outcome</span>
            <p>Human-approved decisions become schema-validated context and deterministic Markdown that an agent can implement against.</p>
          </div>
        </AnimatedItem>
      </div>
    </section>
  );
}
