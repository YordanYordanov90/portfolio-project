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
    description:
      "AI-powered Pine Script v5 generator for TradingView, with auth, rate limiting and strategy helper features.",
    tags: ["Next.js", "TypeScript", "Vercel AI SDK", "Neon", "Clerk"],
    image: "/projects/pineforge.png",
    imageAlt: "PineForge",
    link: "https://pine-forge.vercel.app/",
  },
  {
    title: "Ghosty AI",
    description:
      "AI writing and content tool built on the Next.js App Router with streaming responses via the Vercel AI SDK.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "AI SDK"],
    image: "/projects/ghosty-ai.png",
    imageAlt: "Ghosty AI",
    link: "https://ghosty-ai.vercel.app/",
  },
  {
    title: "Cod3mate",
    description:
      "A Telegram-first coding agent with a Next.js dashboard, exploring browser automation and agent workflows.",
    tags: ["TypeScript", "Agents", "Playwright", "Next.js"],
    image: "/projects/cod3mate-dashboard.png",
    imageAlt: "Cod3mate dashboard",
    link: "https://cod3mate-dashboard.vercel.app/",
  },
  {
    title: "LeverCast AI",
    description:
      "AI social media tool for drafting and scheduling content across platforms, built around AI generation pipelines.",
    tags: ["Next.js", "Drizzle", "Vercel AI SDK"],
    image: "/projects/levercast-ai.png",
    imageAlt: "LeverCast AI",
    link: "https://levercast-ai.vercel.app/",
  },
] as const;