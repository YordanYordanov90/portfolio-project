"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demo");

  if (isDemo) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="relative z-[1] pt-[var(--header-height)]">{children}</div>
      <Footer />
    </div>
  );
}