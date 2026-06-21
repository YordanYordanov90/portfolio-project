"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ScrollProgress } from "./scroll-progress";

const navLinks = [
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#projects", label: "Work", sectionId: "projects" },
  { href: "#process", label: "Process", sectionId: "process" },
  { href: "#stack", label: "Stack", sectionId: "stack" },
  { href: "/blog", label: "Blog", sectionId: null },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks
      .map((link) => link.sectionId)
      .filter((id): id is string => id !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: "100%",
      }}
      className={`transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled
          ? "border-b border-border bg-card/80 backdrop-blur-md"
          : "border-b border-border/60 bg-card/70 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground link-subtle pressable focus-ring"
        >
          Y.Yordanov
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={link.sectionId !== null && activeSection === link.sectionId}
              className="nav-link pressable focus-ring text-sm text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pressable focus-ring md:hidden p-2 rounded-sm text-muted-foreground"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className="mobile-menu absolute left-0 right-0 top-full overflow-hidden border-b border-border bg-background shadow-lg shadow-black/40 md:hidden"
        data-open={isMenuOpen}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 max-w-6xl mx-auto w-full" aria-label="Main mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              data-active={link.sectionId !== null && activeSection === link.sectionId}
              className="nav-link pressable focus-ring py-2 text-sm text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <ScrollProgress />
    </header>
  );
}