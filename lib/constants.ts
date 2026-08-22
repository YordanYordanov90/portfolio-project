export const SOCIAL_LINKS = {
  github: "https://github.com/YordanYordanov90",
  x: "https://x.com/yordanov_y_",
  linkedin: "https://www.linkedin.com/in/yordan-yordanov-ai/",
} as const;

export const CONTACT_EMAIL = "y.yordanov.work@gmail.com";

/** Drop your CV at public/cv.pdf and your photo at public/me.jpg */
export const RESUME_PATH = "/cv.pdf";
export const PROFILE_IMAGE = "/me.jpg";

export const PROJECTS = [
  {
    title: "PineForge",
    featured: true,
    status: "Live product",
    summary:
      "AI-powered Pine Script generation for TradingView, with strategy helpers and account controls.",
    description:
      "AI-powered Pine Script v5 generator for TradingView, with auth, rate limiting and strategy helper features.",
    evidence: [
      "Authentication + rate limiting",
      "Strategy helper features",
      "Spec-driven context files",
    ],
    tags: ["Next.js", "TypeScript", "Vercel AI SDK", "Neon", "Clerk"],
    focus: "Auth, rate limiting, and strategy helpers",
    image: "/projects/pineforge.png",
    imageAlt: "PineForge",
    link: "https://pine-forge.vercel.app/",
  },
  {
    title: "Finerel",
    featured: true,
    status: "Live product",
    summary:
      "Turns overnight financial news into a relationship map and confidence-scored daily briefing.",
    description:
      "A relationship intelligence engine that reads overnight financial news and turns it into a structured map of company connections — partnerships, supply chains, investments — with a daily confidence-scored briefing before market open.",
    evidence: [
      "Relationship mapping",
      "Confidence-scored briefing",
      "Overnight news input",
    ],
    tags: ["Next.js", "TypeScript", "Vercel AI SDK", "Neon", "Clerk"],
    focus: "Financial relationships mapped into a daily briefing",
    image: "/projects/finerel.png",
    imageAlt: "Finerel",
    link: "https://finerel.com/",
  },
  {
    title: "Ghosty AI",
    featured: false,
    status: "Live product",
    summary: "A streaming AI writing tool for drafting and refining content.",
    description:
      "AI writing and content tool built on the Next.js App Router with streaming responses via the Vercel AI SDK.",
    evidence: ["Streaming responses", "Next.js App Router", "Vercel AI SDK"],
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "AI SDK"],
    focus: "Streaming responses through the Vercel AI SDK",
    image: "/projects/ghosty-ai.png",
    imageAlt: "Ghosty AI",
    link: "https://ghosty-ai.vercel.app/",
  },
  {
    title: "LeverCast AI",
    featured: false,
    status: "Live product",
    summary: "An AI generation workflow for drafting and scheduling social content.",
    description:
      "AI social media tool for drafting and scheduling content across platforms, built around AI generation pipelines.",
    evidence: ["AI generation pipelines", "Multi-platform scheduling", "Drizzle data layer"],
    tags: ["Next.js", "Drizzle", "Vercel AI SDK"],
    focus: "AI generation pipelines for social scheduling",
    image: "/projects/levercast-ai.png",
    imageAlt: "LeverCast AI",
    link: "https://levercast-ai.vercel.app/",
  },
] as const;
