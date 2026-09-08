"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { donateUrl, navLinks, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrollPercentBadge } from "@/components/motion/ScrollProgress";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const menuContainer: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const menuItem: Variants = {
  closed: { y: 28, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [navPath, setNavPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      return;
    }

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuPanelRef.current) return;
      const focusable = menuPanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };
  const underlineHref = hovered ?? navLinks.find((l) => isActive(pathname, l.href))?.href;

  return (
    <>
      <header className="isolate fixed inset-x-0 top-0 z-[999] overflow-x-clip px-2 pt-[max(0.375rem,env(safe-area-inset-top))] sm:px-4">
        <motion.nav
          animate={{
            backgroundColor: scrolled
              ? "rgba(47, 27, 82, 0.55)"
              : "rgba(47, 27, 82, 0.18)",
            borderColor: scrolled
              ? "rgba(197, 155, 39, 0.28)"
              : "rgba(255, 255, 255, 0.1)",
            boxShadow: scrolled
              ? "0 18px 50px -28px rgba(47, 27, 82, 0.55), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 0 0 rgba(0,0,0,0), inset 0 1px 0 rgba(255,255,255,0.1)",
            borderRadius: scrolled ? 9999 : 16,
          }}
          transition={{ duration: reduce ? 0 : 0.45, ease }}
          className={`liquid-nav mx-auto border backdrop-blur-xl ${
            scrolled
              ? "max-w-6xl border backdrop-blur-2xl"
              : "max-w-7xl border-x-0 border-t-0 border-b"
          } ${reduce ? "" : "transition-[max-width] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{
            WebkitBackdropFilter: scrolled ? "blur(28px)" : "blur(20px)",
            backdropFilter: scrolled ? "blur(28px)" : "blur(20px)",
          }}
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5 md:px-6">
            <Magnetic strength={0.18} className="min-w-0 shrink">
              <Link
                href="/"
                className="flex min-h-11 min-w-0 items-center gap-2 rounded-full pr-1 sm:gap-2.5"
                onClick={closeMenu}
              >
                <motion.span
                  animate={{ scale: scrolled ? 0.94 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease }}
                  className="relative block shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 shadow-[0_0_24px_-6px_rgba(197,155,39,0.5)]"
                >
                  <Image
                    src="/logo.jpg"
                    alt={`${site.name} logo`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
                    priority
                  />
                </motion.span>
                <span className="truncate font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                  {site.shortName}
                </span>
              </Link>
            </Magnetic>

            <ul
              className="hidden items-center gap-0.5 lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHovered(link.href)}
                      className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                        active || hovered === link.href
                          ? "text-gold-soft"
                          : "text-white/80 hover:text-gold-soft"
                      }`}
                    >
                      {link.label}
                      {underlineHref === link.href && !reduce ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      ) : underlineHref === link.href ? (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              <ScrollPercentBadge className="hidden sm:inline-block" />

              <Link
                href={donateUrl}
                className="inline-flex min-h-11 items-center rounded-full bg-gold px-3.5 py-2 text-xs font-semibold text-purple-deep sm:hidden"
              >
                Support
              </Link>

              <Magnetic strength={0.22} className="hidden sm:block">
                <Button
                  href={donateUrl}
                  variant="gold"
                  className="px-5 py-2.5"
                >
                  Support the mission
                </Button>
              </Magnetic>

              <motion.button
                ref={menuButtonRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white lg:hidden"
                onClick={() => setOpen((v) => !v)}
                whileTap={reduce ? undefined : { scale: 0.92 }}
              >
                <span className="sr-only">{open ? "Close" : "Menu"}</span>
                <span className="relative block h-3.5 w-5">
                  <motion.span
                    className="absolute top-0 left-0 block h-[2px] w-5 rounded-full bg-current"
                    animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.3, ease }}
                  />
                  <motion.span
                    className="absolute top-[6px] left-0 block h-[2px] w-5 rounded-full bg-current"
                    animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="absolute top-[12px] left-0 block h-[2px] w-5 rounded-full bg-current"
                    animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.3, ease }}
                  />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[998] flex flex-col lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-purple-deep/90 backdrop-blur-2xl" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 80% 10%, rgba(197,155,39,0.28), transparent 55%)",
              }}
            />
            <div className="geometric-wash opacity-[0.07]" />

            <motion.div
              className="relative z-10 flex h-full flex-col px-6 pt-[max(7rem,calc(env(safe-area-inset-top)+5.5rem))] pb-[max(2rem,env(safe-area-inset-bottom))]"
              variants={menuContainer}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <motion.li key={link.href} variants={menuItem}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        className={`flex min-h-14 items-center justify-between px-2 py-4 font-display text-3xl font-semibold transition ${
                          active ? "text-gold-soft" : "text-white active:text-gold-soft"
                        }`}
                        onClick={closeMenu}
                      >
                        <span>{link.label}</span>
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        ) : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div className="mt-6" variants={menuItem}>
                <Button
                  href={donateUrl}
                  variant="gold"
                  className="w-full py-4 text-base"
                  onClick={closeMenu}
                >
                  Support the mission
                </Button>
                <p className="mt-4 text-center text-xs tracking-[0.2em] text-white/45 uppercase">
                  {site.tagline}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
