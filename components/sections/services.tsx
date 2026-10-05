"use client";

import { ArrowUpRight, Bot, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimatedItem } from "@/components/section-wrapper";

const services = [
  {
    icon: Bot,
    title: "AI integrations",
    description: "Turn a useful AI idea into a reliable feature people can actually use.",
    deliverable: "AI workflows, streaming interfaces, and guardrails",
  },
  {
    icon: Layers3,
    title: "Full-stack web apps",
    description: "Ship the product around the model: auth, data, billing, and a polished interface.",
    deliverable: "Next.js products from first screen to production",
  },
  {
    icon: Sparkles,
    title: "Website improvements",
    description: "Find the friction that costs attention, then make the experience clearer and faster.",
    deliverable: "Audits, focused redesigns, and conversion improvements",
  },
];

export function Services() {
  return (
    <section id="services" className="services-section section-anchor">
      <AnimatedItem>
        <div className="services-heading">
          <div>
            <p className="services-eyebrow">How I can help</p>
            <h2>From a sharp first screen to a product that holds up.</h2>
          </div>
          <p>
            Bring me a product idea, a stubborn workflow, or a website that is
            not doing enough work. We will make the next useful version clear.
          </p>
        </div>
      </AnimatedItem>

      <div className="services-grid">
        {services.map(({ icon: Icon, title, description, deliverable }, index) => (
          <AnimatedItem key={title} className="services-item" style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}>
            <Icon className="services-item__icon" aria-hidden="true" />
            <span className="services-item__index">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="services-item__deliverable">{deliverable}</span>
          </AnimatedItem>
        ))}
      </div>

      <Link href="#contact" className="services-link focus-ring">
        Tell me what you are building <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
