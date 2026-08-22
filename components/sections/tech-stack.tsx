"use client";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Neon Postgres",
  "Drizzle ORM",
  "Clerk Auth",
  "Vercel AI SDK",
  "Zod",
  "shadcn/ui",
  "Upstash / QStash",
];

export function TechStack() {
  return (
    <section id="stack" className="section-anchor py-16 md:py-20">
      <div className="mb-8">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Current stack
        </h2>
      </div>

      <div className="font-mono flex flex-wrap gap-2 text-sm md:text-base">
        {stack.map((tool) => (
          <span
            key={tool}
            className="stack-chip pressable rounded-sm border border-border bg-card px-3 py-1.5 text-foreground"
          >
            {tool}
          </span>
        ))}
      </div>

      <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Next.js App Router and React for the interface. TypeScript and Zod at
        every boundary. Neon Postgres and Drizzle underneath. Vercel AI SDK
        where AI earns its place.
      </p>
    </section>
  );
}
