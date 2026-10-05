"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#projects", label: "Work", sectionId: "projects" },
  { href: "#process", label: "Process", sectionId: "process" },
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#services", label: "Services", sectionId: "services" },
  { href: "#stack", label: "Stack", sectionId: "stack" },
  { href: "/blog", label: "Blog", sectionId: null },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
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

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="site-header__inner flex items-center justify-between">
        <Link
          href="/"
          className="wordmark link-subtle pressable focus-ring"
        >
          <span className="wordmark__mark" aria-hidden="true">Y</span>
          <span>Yordanov</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.sectionId && pathname !== "/" ? `/${link.href}` : link.href}
              data-active={link.sectionId !== null && activeSection === link.sectionId}
              aria-current={link.sectionId !== null && activeSection === link.sectionId ? "location" : undefined}
              className="desktop-nav__link focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="header-status" aria-label="Available for new opportunities">
            <span className="header-status__dot" aria-hidden="true" />
            <span>Available</span>
          </span>
          <a
            href="/cv.pdf"
            download
            className="header-cv focus-ring"
          >
            CV <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="header-menu-toggle focus-ring"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className="mobile-menu"
        data-open={isMenuOpen}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? true : undefined}
      >
        <nav className="flex flex-col gap-1" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.sectionId && pathname !== "/" ? `/${link.href}` : link.href}
              onClick={() => setIsMenuOpen(false)}
              data-active={link.sectionId !== null && activeSection === link.sectionId}
              className="nav-link pressable focus-ring py-2 text-sm text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a href="/cv.pdf" download className="nav-link pressable focus-ring py-2 text-sm text-primary">
            Download CV
          </a>
        </nav>
      </div>

    </header>
  );
}
