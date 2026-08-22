"use client";

import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function SectionWrapper({
  children,
  className,
  ...props
}: SectionWrapperProps) {
  return (
    <section className={cn("section-anchor py-10 md:py-16", className)} {...props}>
      {children}
    </section>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
