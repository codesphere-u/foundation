"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { footer, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { GeometricStar } from "@/components/illustrations/Icons";
import { CurveDivider } from "@/components/illustrations/Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [noted, setNoted] = useState(false);
  const liveSocials = footer.socials.filter((s) => !s.placeholder && s.href !== "#");

  return (
    <footer className="relative w-full max-w-full overflow-x-clip bg-purple-deep text-white">
      <div className="absolute inset-x-0 top-0 text-purple-deep">
        <CurveDivider flip className="text-purple-deep" />
      </div>
      <div className="geometric-wash opacity-[0.07]" />
      <GeometricStar className="pointer-events-none absolute top-16 right-10 h-14 w-14 opacity-20" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-10 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={`${site.name} logo`}
              width={56}
              height={56}
              className="shrink-0 rounded-full ring-2 ring-gold/40"
            />
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold leading-tight break-words sm:text-2xl">
                {site.name}
              </p>
              <p className="mt-0.5 text-xs tracking-[0.18em] text-gold-soft uppercase">
                {site.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            {footer.mission}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gold">Quick links</p>
          <ul className="mt-4 space-y-1">
            {footer.quickLinks.map((link) => (
              <li key={link.href}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center py-2.5 text-sm text-white/75 transition hover:text-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center py-2.5 text-sm text-white/75 transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gold">Newsletter</p>
          <p className="mt-2 text-sm text-white/65">
            Leave your email—we will invite you when the newsletter launches.
          </p>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setNoted(true);
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none transition placeholder:text-white/45 focus:border-gold focus:bg-white/15 focus:ring-2 focus:ring-gold/30"
            />
            <Button type="submit" variant="gold" className="w-full">
              Notify me
            </Button>
            {noted ? (
              <p className="text-xs text-gold-soft" role="status">
                Noted—newsletter signup is coming soon. Thank you for your interest.
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/10 px-5 py-6 text-sm text-white/55 md:flex-row md:items-center md:px-8">
        <div className="space-y-1">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">{footer.legalLine}</p>
        </div>
        {liveSocials.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {liveSocials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex min-h-11 items-center px-2 py-2.5 transition hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
