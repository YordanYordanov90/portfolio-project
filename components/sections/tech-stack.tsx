"use client";

import { SectionWrapper, AnimatedItem } from "@/components/section-wrapper";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  siDrizzle,
  siNextdotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";

type SimpleIconData = {
  title: string;
  path: string;
};

type StackItem =
  | { name: string; kind: "simple-icon"; icon: SimpleIconData }
  | { name: string; kind: "lucide"; icon: React.ElementType };

const IconWrapper = ({ item }: { item: StackItem }) => {
  if (item.kind === "simple-icon") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
        fill="currentColor"
      >
        <path d={item.icon.path} />
      </svg>
    );
  }

  const Icon = item.icon;
  return <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />;
};

export function TechStack() {
  const stack: StackItem[] = [
    { name: "Next.js", kind: "simple-icon", icon: siNextdotjs },
    { name: "React", kind: "simple-icon", icon: siReact },
    { name: "TypeScript", kind: "simple-icon", icon: siTypescript },
    { name: "TailwindCSS", kind: "simple-icon", icon: siTailwindcss },
    { name: "PostgreSQL", kind: "simple-icon", icon: siPostgresql },
    { name: "DrizzleORM", kind: "simple-icon", icon: siDrizzle },
    { name: "Zod", kind: "simple-icon", icon: siZod },
    { name: "AI", kind: "lucide", icon: Sparkles },
  ];

  return (
    <SectionWrapper id="stack" staggerChildren className="py-14 md:py-20 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatedItem>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">Technology Stack</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
    I spend my time building and breaking things with React, Next.js, and TypeScript. I&apos;m obsessed with the process of turning a blank screen into a secure, functional app. Whether I&apos;m styling with Tailwind or experimenting with AI integrations, I&apos;m always focused on building software that is both user-friendly and technically sound.
            </p>
          </div>
        </AnimatedItem>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stack.map((item, idx) => (
            <AnimatedItem key={idx}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex flex-col items-center justify-center p-6 gap-3 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <IconWrapper item={item} />
                <span className="text-sm font-medium text-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {item.name}
                </span>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
