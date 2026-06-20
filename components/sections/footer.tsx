"use client";

import { useId, useRef, useState } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Loader2, CheckCircle2, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { SOCIAL_LINKS } from "@/lib/constants";

const RATE_LIMIT_KEY = "contact_form_last_submit";
const RATE_LIMIT_MINUTES = 5;

function getRateLimitStatus(): { allowed: boolean; remainingMinutes: number } {
  if (typeof window === "undefined") return { allowed: true, remainingMinutes: 0 };
  
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return { allowed: true, remainingMinutes: 0 };

  const lastSubmitTime = parseInt(lastSubmit, 10);
  const now = Date.now();
  const minutesSinceLastSubmit = (now - lastSubmitTime) / (1000 * 60);

  if (minutesSinceLastSubmit < RATE_LIMIT_MINUTES) {
    return {
      allowed: false,
      remainingMinutes: Math.ceil(RATE_LIMIT_MINUTES - minutesSinceLastSubmit),
    };
  }

  return { allowed: true, remainingMinutes: 0 };
}

function setRateLimit() {
  if (typeof window !== "undefined") {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "rate_limited">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "email" | "message", string>>
  >({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage(null);
    setFieldErrors({});

    // Check rate limiting
    const rateLimit = getRateLimitStatus();
    if (!rateLimit.allowed) {
      setStatus("rate_limited");
      setStatusMessage(`Please wait ${rateLimit.remainingMinutes} minute${rateLimit.remainingMinutes > 1 ? "s" : ""} before sending another message.`);
      return;
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      setStatus("error");
      setStatusMessage("Contact form is not configured. Please email me directly.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const parsed = ContactSchema.safeParse({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      message: getString(formData, "message"),
      _gotcha: getString(formData, "_gotcha"),
    });

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        message: flattened.message?.[0],
      });
      return;
    }

    if (parsed.data._gotcha && parsed.data._gotcha.trim().length > 0) {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
      return;
    }

    formData.set("access_key", key);
    formData.set("subject", "Portfolio message");
    formData.set("from_name", parsed.data.name);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const json = (await response.json().catch(() => null)) as
        | null
        | { success?: boolean; message?: string };

      if (!response.ok || json?.success === false) {
        setStatus("error");
        setStatusMessage(json?.message || "Something went wrong. Please try again or email me directly.");
        return;
      }

      // Set rate limit on successful submission
      setRateLimit();
      setStatus("success");
      setStatusMessage("Thanks — your message has been sent.");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <>
      <div className="grain-line mx-auto max-w-6xl px-6" aria-hidden />
      <SectionWrapper id="contact" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <p className="section-eyebrow">contact</p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Let&apos;s talk</h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Open to conversations about AI integration, web security, or Next.js
            architecture.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-card/40 text-muted-foreground backdrop-blur-md"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-sm border border-border p-5 sm:p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot spam protection (leave empty, bots usually fill it) */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

            <FloatingField
              name="name"
              label="Name"
              autoComplete="name"
              required
              error={fieldErrors.name}
            />

            <FloatingField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              error={fieldErrors.email}
            />

            <FloatingField
              name="message"
              label="Message"
              multiline
              required

              error={fieldErrors.message}
              hint="Typically reply within 24–48 hours."
            />

            <div className="flex flex-col gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "sending" || status === "success" || status === "rate_limited"}
                className="btn-primary focus-ring relative w-full overflow-hidden disabled:pointer-events-none disabled:opacity-60"
              >
                <span
                  data-transitioning={status === "sending"}
                  className={`btn-content inline-flex items-center gap-2 ${
                    status === "sending" ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                  }`}
                >
                  {status === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Message Sent
                    </>
                  ) : (
                    "Send message"
                  )}
                </span>
                {status === "sending" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </span>
                )}
              </button>

              <p
                className="text-sm"
                aria-live="polite"
                aria-atomic="true"
              >
                {status === "success" ? (
                  <span className="font-medium text-primary">
                    {statusMessage ?? "Thanks — your message has been sent."}
                  </span>
                ) : status === "error" ? (
                  <span className="font-medium text-red-400">
                    {statusMessage ?? "Something went wrong. Please try again or email me directly."}
                  </span>
                ) : status === "rate_limited" ? (
                  <span className="font-medium text-primary/80">{statusMessage}</span>
                ) : (
                  <span className="text-muted-foreground">
                    Prefer email?{" "}
                    <Link
                      href="mailto:y.yordanov.work@gmail.com?subject=Portfolio%20Message"
                      className="link-subtle underline underline-offset-4"
                    >
                      Send a direct message
                    </Link>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t border-border pt-8 text-center font-mono text-xs text-muted-foreground">
        © {currentYear} Yordan Yordanov. All rights reserved.
      </div>
    </SectionWrapper>
    </>
  );
}

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email.")
    .max(254, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(2000, "Message is too long."),
  _gotcha: z.string().optional(),
});

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { href: SOCIAL_LINKS.github, label: "GitHub", icon: Github },
  { href: SOCIAL_LINKS.x, label: "X", icon: XIcon },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", icon: Linkedin },
] as const;

function getString(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

function FloatingField({
  name,
  label,
  type = "text",
  required,
  multiline,
  autoComplete,
  error,
  hint,
}: {
  name: "name" | "email" | "message";
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  error?: string;
  hint?: string;
}) {
  const reactId = useId();
  const id = `${name}-${reactId}`;
  const describedById = `${id}-desc`;
  const hintOrError = error ?? hint;

  const base =
    "contact-field peer w-full rounded-sm border px-4 pt-5 pb-2.5 text-sm text-foreground placeholder:text-transparent outline-none transition-[border-color,box-shadow,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-primary/30";
  const border = error
    ? "border-red-500/60 focus-visible:ring-red-500/20"
    : "border-border focus-visible:border-primary/50";

  return (
    <div className="space-y-1.5">
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={4}
            placeholder=" "
            aria-invalid={error ? true : undefined}
            aria-describedby={hintOrError ? describedById : undefined}
            className={`${base} ${border} resize-none h-[140px]`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            placeholder=" "
            aria-invalid={error ? true : undefined}
            aria-describedby={hintOrError ? describedById : undefined}
            className={`${base} ${border}`}
          />
        )}

        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted-foreground transition-all duration-150 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-foreground peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-0"
        >
          {label}
          {required ? <span className="text-muted-foreground"> *</span> : null}
        </label>
      </div>

      {hintOrError ? (
        <p
          id={describedById}
          className={`text-xs ${error ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}
        >
          {hintOrError}
        </p>
      ) : null}
    </div>
  );
}