import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0d0f12",
};

const BASE_URL = "https://yordanov.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yordan Yordanov — Full-Stack Developer",
  description:
    "Full-stack developer building secure, AI-powered web apps with Next.js, React, and TypeScript.",
  openGraph: {
    title: "Yordan Yordanov — Full-Stack Developer",
    description:
      "Full-stack developer building secure, AI-powered web apps with Next.js, React, and TypeScript.",
    url: BASE_URL,
    siteName: "Yordan Yordanov",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Yordan Yordanov — Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yordan Yordanov — Full-Stack Developer",
    description:
      "Full-stack developer building secure, AI-powered web apps with Next.js, React, and TypeScript.",
    creator: "@yordanov_y_",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
