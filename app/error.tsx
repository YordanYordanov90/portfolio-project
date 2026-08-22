"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[55svh] w-full max-w-4xl flex-col justify-center px-6 py-20 sm:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-tight md:text-7xl">
        The page needs another pass.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Try loading this view again. If it keeps happening, return home and
        use the contact form to flag it.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-primary focus-ring">
          Try again
        </button>
        <Link href="/" className="btn-secondary focus-ring">
          Back to home
        </Link>
      </div>
    </main>
  );
}
