import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-center pt-16 md:pt-20 pb-14 md:pb-16 px-6 sm:px-12 max-w-6xl mx-auto w-full">
      <Hero />
      <Projects />
      <Services />
      <TechStack />
   
    </main>
  );
}
