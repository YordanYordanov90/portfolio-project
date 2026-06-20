import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24">
      <Hero />
      <div className="grain-line" aria-hidden />
      <Projects />
      <div className="grain-line" aria-hidden />
      <Services />
      <div className="grain-line" aria-hidden />
      <TechStack />
    </main>
  );
}