import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you requested could not be found on ${site.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-purple-deep px-5 py-24 text-center text-white"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(197,155,39,0.35), transparent 65%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-gold-soft uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          This path has not been planted yet
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/75">
          The page you are looking for may have moved, or the link may be incomplete. Return home
          to continue exploring {site.shortName}.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-purple-deep transition hover:bg-gold-soft"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:border-gold/60 hover:text-gold-soft"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
