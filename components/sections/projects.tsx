"use client";

import { useRef, useState } from "react";
import { SectionWrapper, AnimatedItem } from "@/components/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

type Project = (typeof PROJECTS)[number];

function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-actions ${compact ? "project-actions--compact" : ""}`}>
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className={compact ? "project-action" : "btn-primary focus-ring"}
      >
        View live product <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ProjectMedia({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className="project-media-link focus-ring"
    >
      <div className={featured ? "project-featured__media" : "project-supporting__media"}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="project-image object-cover"
          sizes={featured ? "(max-width: 768px) 100vw, 680px" : "(max-width: 768px) 100vw, 360px"}
          quality={85}
        />
        <div className="project-media__veil" aria-hidden="true" />
      </div>
    </a>
  );
}

function EvidenceList({ project }: { project: Project }) {
  return (
    <ul className="project-evidence" aria-label={`${project.title} evidence`}>
      {project.evidence.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <AnimatedItem>
      <article className={`project-featured ${index % 2 === 1 ? "project-featured--reverse" : ""}`}>
        <ProjectMedia project={project} featured />

        <div className="project-featured__body">
          <div className="project-meta">
            <span>{project.status}</span>
            <span aria-hidden="true">/</span>
            <span>{project.focus}</span>
          </div>

          <h3 className="project-featured__title">{project.title}</h3>
          <p className="project-featured__summary">{project.summary}</p>
          <p className="project-featured__description">{project.description}</p>

          <EvidenceList project={project} />

          <div className="project-tags" aria-label={`${project.title} project tags`}>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <ProjectActions project={project} />
        </div>
      </article>
    </AnimatedItem>
  );
}

export function Projects() {
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const supportingProjects = PROJECTS.filter((project) => !project.featured);
  const leadProject = featuredProjects[0];
  const carouselProjects = [...featuredProjects.slice(1), ...supportingProjects];
  const projectCount = carouselProjects.length + 1;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  if (!leadProject) return null;

  const scrollToProject = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), carouselProjects.length - 1);
    const carousel = carouselRef.current;
    const slide = carousel?.children[nextIndex] as HTMLElement | undefined;

    if (!carousel || !slide) return;

    setActiveProject(nextIndex);
    carousel.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      left:
        carousel.scrollLeft +
        slide.getBoundingClientRect().left -
        carousel.getBoundingClientRect().left,
    });
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;

    const carouselBounds = carouselRef.current.getBoundingClientRect();
    const nextIndex = Array.from(carouselRef.current.children).reduce(
      (closestIndex, child, index, slides) => {
        const closestDistance = Math.abs(
          (slides[closestIndex] as HTMLElement).getBoundingClientRect().left - carouselBounds.left,
        );
        const distance = Math.abs(
          (child as HTMLElement).getBoundingClientRect().left - carouselBounds.left,
        );
        return distance < closestDistance ? index : closestIndex;
      },
      0,
    );

    setActiveProject((current) => (current === nextIndex ? current : nextIndex));
  };

  return (
    <SectionWrapper
      id="projects"
      className="section-anchor py-16 md:py-24 max-w-6xl mx-auto w-full"
    >
      <div className="projects-heading mb-12 md:mb-16">
        <AnimatedItem>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Selected work</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Products that show how I think, build, test, and ship.
          </p>
        </AnimatedItem>
      </div>

      <div className="projects-featured">
        <div className="projects-featured__lead">
          <FeaturedProject project={leadProject} index={0} />
        </div>

        {carouselProjects.length > 0 && (
          <section className="projects-featured__rail" aria-labelledby="more-shipped-heading">
            <div className="projects-featured__rail-header">
              <div>
                <p className="projects-featured__rail-kicker">More shipped work</p>
                <h3 id="more-shipped-heading">The rest of the portfolio, in one focused rail.</h3>
              </div>

              <div className="projects-carousel__controls" aria-label="Shipped project controls">
                <span aria-live="polite" className="projects-carousel__count">
                  {String(activeProject + 2).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="projects-carousel__control focus-ring"
                  aria-label="Previous shipped project"
                  aria-controls="projects-carousel"
                  disabled={activeProject === 0}
                  onClick={() => scrollToProject(activeProject - 1)}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="projects-carousel__control focus-ring"
                  aria-label="Next shipped project"
                  aria-controls="projects-carousel"
                  disabled={activeProject === carouselProjects.length - 1}
                  onClick={() => scrollToProject(activeProject + 1)}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              id="projects-carousel"
              className="projects-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="More shipped projects"
              aria-describedby="projects-carousel-hint"
              onScroll={handleCarouselScroll}
            >
              {carouselProjects.map((project, index) => (
                <div
                  className="projects-carousel__slide"
                  key={project.title}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 2} of ${projectCount}: ${project.title}`}
                >
                  <FeaturedProject project={project} index={index + 1} />
                </div>
              ))}
            </div>

            <p id="projects-carousel-hint" className="projects-carousel__hint">
              Swipe or use the arrows to explore the rest of the work.
            </p>
          </section>
        )}
      </div>
    </SectionWrapper>
  );
}
