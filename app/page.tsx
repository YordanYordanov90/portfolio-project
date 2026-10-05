import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Services } from "@/components/sections/services";
import { CaseStudy } from "@/components/sections/case-study";

export default function Home() {
  return (
    <main className="portfolio-main">
      <Hero />
      <div className="workflow-rule" aria-hidden />
      <Projects />
      <div className="workflow-rule" aria-hidden />
      <Services />
      <div className="workflow-rule" aria-hidden />
      <CaseStudy />
      <div className="workflow-rule" aria-hidden />
      <About />
      <div className="workflow-rule" aria-hidden />
      <Process />
      <div className="workflow-rule" aria-hidden />
      <TechStack />
    </main>
  );
}
