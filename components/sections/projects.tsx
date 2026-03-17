"use client";

import { SectionWrapper, AnimatedItem } from "@/components/section-wrapper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import project1 from "@/public/project1.png";
import project2 from "@/public/project2.png";
import project3 from "@/public/project3.png";
import project4 from "@/public/project4.png";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  bgClass: string;
 
  image: StaticImageData;
  imageAlt: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "FlowAI",
    description: "Your Autonomous Executive Assistant",
    bgClass:
      "bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-pink-900/40",
   
    image: project1,
    imageAlt: "FlowAI",
    link: "https://flow-ai-eta.vercel.app/",
  },
  {
    title: "CoinHub",
    description: "Navigate the Crypto Markets with AI Precision",
    bgClass:
      "bg-gradient-to-br from-orange-900/40 via-stone-800/40 to-stone-900/60",
   
    image: project2,
    imageAlt: "Next.js Architecture",
    link: "https://coin-hub-ten.vercel.app/",
  },
  {
    title: "CloudcastAI",
    description: "Weather AI App",
    bgClass: "bg-gradient-to-br from-blue-900/40 via-cyan-900/20 to-sky-900/40",
    
    image: project3,
    imageAlt: "Weather App",
    link: "https://weather-app-lime-kappa-33.vercel.app/",
  },
  {
    title: "Devstash",
    description: "Organize Your Developer Knowledge",
    bgClass: "bg-stone-900/50",
    
    image: project4,
    imageAlt: "Secure App Portal",
    link: "https://devstash-ai.vercel.app/",
  }
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <AnimatedItem>
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        aria-label={`Open ${project.title}`}
        className="group block"
      >
        <div className="flex flex-col gap-6 cursor-pointer md:max-w-[480px]">
          {/* Full-bleed media card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative overflow-hidden rounded-[2.5rem] aspect-4/3 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
              project.bgClass
            )}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 480px"
              quality={85}
              priority={false}
            />

            {/* Subtle tint + bottom fade */}
            <div className="absolute inset-0 bg-black/10" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden
            />

            {/* Hover overlay with icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title & Subtitle */}
          <div className="flex flex-col items-center text-center px-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium leading-snug">
              {project.description}
            </p>
            <div className="mt-3 text-sm font-semibold text-primary/0 group-hover:text-primary transition-all duration-300 flex items-center gap-1">
              Visit site <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedItem>
  );
}

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      staggerChildren
      className="py-16 md:py-20 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-x-12 gap-y-6 mb-10 md:mb-12 text-left">
        <AnimatedItem>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Selected Projects
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Building and breaking things to learn the &apos;how&apos; behind secure AI-powered apps and modern web design
            </p>
          </div>
        </AnimatedItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 items-start">
        {/* Left Column - Pushed down to make the right column look "higher" */}
        <div className="flex flex-col gap-14 md:mt-16">
          {projects.filter((_, i) => i % 2 === 0).map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
        
        {/* Right Column - Sitting at the top */}
        <div className="flex flex-col gap-14">
          {projects.filter((_, i) => i % 2 !== 0).map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
