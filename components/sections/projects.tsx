"use client";

import { SectionWrapper, AnimatedItem } from "@/components/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
          priority={featured}
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

          <div className="project-tags" aria-label={`${project.title} technology stack`}>
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

function SupportingProject({ project }: { project: Project }) {
  return (
    <AnimatedItem>
      <article className="project-supporting">
        <ProjectMedia project={project} />

        <div className="project-supporting__body">
          <div className="project-meta">
            <span>{project.status}</span>
            <span aria-hidden="true">/</span>
            <span>{project.focus}</span>
          </div>
          <div className="project-supporting__heading">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
          <EvidenceList project={project} />
          <ProjectActions project={project} compact />
        </div>
      </article>
    </AnimatedItem>
  );
}

export function Projects() {
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const supportingProjects = PROJECTS.filter((project) => !project.featured);

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
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.title} project={project} index={index} />
        ))}
      </div>

      <div className="projects-supporting">
        <div className="projects-supporting__heading">
          <h3>More shipped work</h3>
          <p>Smaller products, focused experiments, and the same care for the details.</p>
        </div>

        <div className="projects-supporting__grid">
          {supportingProjects.map((project) => (
            <SupportingProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
