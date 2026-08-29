import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Yordan Yordanov",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[55svh] w-full max-w-4xl flex-col justify-center px-6 py-20 sm:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        404 / route not found
      </p>
      <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-tight md:text-7xl">
        That page shipped somewhere else.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        The link may be outdated, but the work is still here. Return home or
        browse the latest writing.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary focus-ring">
          Back to home
        </Link>
        <Link href="/blog" className="btn-secondary focus-ring">
          Read the blog
        </Link>
      </div>
    </main>
  );
}
