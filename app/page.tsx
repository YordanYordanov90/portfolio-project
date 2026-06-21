import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24">
      <Hero />
      <div className="grain-line" aria-hidden />
      <About />
      <div className="grain-line" aria-hidden />
      <Projects />
      <div className="grain-line" aria-hidden />
      <Process />
      <div className="grain-line" aria-hidden />
      <TechStack />
    </main>
  );
}