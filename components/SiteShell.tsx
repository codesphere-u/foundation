import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LoadingReveal } from "@/components/motion/LoadingReveal";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { type ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell min-h-full">
      <LoadingReveal />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
