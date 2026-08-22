import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { SOCIAL_LINKS } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#11100f",
};

const BASE_URL = "https://yordanov.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Yordan Yordanov",
  url: BASE_URL,
  jobTitle: "Full-Stack Developer",
  sameAs: Object.values(SOCIAL_LINKS),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Yordan Yordanov — Full-Stack Developer",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#person` },
  inLanguage: "en",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
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
    images: [
      {
        url: "/og.jpg",
        width: 768,
        height: 1152,
        alt: "Yordan Yordanov — Full-Stack Developer",
      },
    ],
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
        className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
