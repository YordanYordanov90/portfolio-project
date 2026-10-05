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
    <section id="stack" className="stack-section section-anchor py-16 md:py-20">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Current stack
        </h2>
      </div>

      <div className="stack-list" aria-label="Current technology stack">
        {stack.map((tool) => (
          <span
            key={tool}
            className="stack-chip"
          >
            {tool}
          </span>
        ))}
      </div>

      <p className="stack-note">
        Next.js App Router and React for the interface. TypeScript and Zod at
        every boundary. Neon Postgres and Drizzle underneath. Vercel AI SDK
        where AI earns its place.
      </p>
    </section>
  );
}
