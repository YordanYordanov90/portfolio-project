"use client";

import { useId, useRef, useState } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { siGithub } from "simple-icons";
import { z } from "zod";

const RATE_LIMIT_KEY = "contact_form_last_submit";
const RATE_LIMIT_MINUTES = 5;

type SimpleIconData = {
  title: string;
  path: string;
};

function SimpleIcon({
  icon,
  className,
  title,
}: {
  icon: SimpleIconData;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      className={className}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} />
    </svg>
  );
}

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
    <SectionWrapper
      id="contact"
      className="py-12 border-t border-border mt-20 max-w-5xl mx-auto w-full"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left side - Intro text */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Let&apos;s Connect</h2>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            I&apos;m always excited to connect with fellow builders to chat about AI integration, web
            security, or the latest developments in the Next.js world.
          </p>

          {/* Quick contact icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
           
            <Link
              href="https://github.com/YordanYordanov90"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <SimpleIcon icon={siGithub} className="h-5 w-5" title="GitHub" />
            </Link>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-5 sm:p-6">
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
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:pointer-events-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 relative overflow-hidden"
              >
                <span className={`inline-flex items-center gap-2 transition-all duration-300 ${status === "sending" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
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
                  <span className="text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {statusMessage ?? "Thanks — your message has been sent."}
                  </span>
                ) : status === "error" ? (
                  <span className="text-red-600 dark:text-red-400 font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {statusMessage ?? "Something went wrong. Please try again or email me directly."}
                  </span>
                ) : status === "rate_limited" ? (
                  <span className="text-orange-500 font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {statusMessage}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Prefer email?{" "}
                    <Link
                      href="mailto:hello@example.com?subject=Portfolio%20Message"
                      className="underline underline-offset-4 hover:text-foreground"
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
      <div className="mt-16 text-center text-sm text-muted-foreground border-t border-border pt-8">
        © {currentYear} Yordan Yordanov. All rights reserved.
      </div>
    </SectionWrapper>
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
    "peer w-full rounded-xl border bg-background/40 px-4 pt-5 pb-2.5 text-sm text-foreground placeholder:text-transparent shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30";
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