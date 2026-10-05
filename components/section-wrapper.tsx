"use client";

import { useEffect, useRef, useState } from "react";
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
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    if (!("IntersectionObserver" in window)) {
      item.classList.add("reveal-fallback");
      return () => item.classList.remove("reveal-fallback");
    }

    item.classList.add("is-enhanced");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );

    observer.observe(item);
    return () => {
      observer.disconnect();
      item.classList.remove("is-enhanced");
    };
  }, []);

  return (
    <div
      ref={itemRef}
      style={style}
      className={cn("reveal-item", isVisible && "is-visible", className)}
    >
      {children}
    </div>
  );
}
