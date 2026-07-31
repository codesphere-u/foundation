"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { hero, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { AmbientSky } from "@/components/motion/AmbientSky";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitWords } from "@/components/motion/SplitWords";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6500;
const SLIDE_MS_MOBILE = 8000;
const RESUME_MS = 4000;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const slides = hero.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimer = useRef<number | null>(null);
  const slideStarted = useRef(performance.now());

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const imgX = useTransform(springX, (v) => (reduce ? 0 : v * 18));
  const imgY = useTransform(springY, (v) => (reduce ? 0 : v * 12));
  const lightX = useTransform(springX, (v) => (reduce ? 0 : v * 28));
  const lightY = useTransform(springY, (v) => (reduce ? 0 : v * 18));
  const lightPos = useMotionTemplate`radial-gradient(ellipse 70% 50% at calc(50% + ${lightX}px) calc(12% + ${lightY}px), rgba(197,155,39,0.42), transparent 55%)`;

  const slideDuration =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
      ? SLIDE_MS_MOBILE
      : SLIDE_MS;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
      slideStarted.current = performance.now();
      setProgress(0);
    },
    [slides.length],
  );

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      slideStarted.current = performance.now();
      setProgress(0);
    }, RESUME_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;

    slideStarted.current = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - slideStarted.current;
      const pct = Math.min(elapsed / slideDuration, 1);
      setProgress(pct);
      if (pct >= 1) {
        goTo(index + 1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, paused, slides.length, slideDuration, index, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!sectionRef.current) return;
      const focused = document.activeElement;
      if (
        focused !== sectionRef.current &&
        !sectionRef.current.contains(focused)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
        pauseTemporarily();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
        pauseTemporarily();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, pauseTemporarily]);

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduce || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const active = slides[index] ?? slides[0];

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative flex min-h-[100svh] min-h-[100dvh] items-end overflow-hidden outline-none max-[700px]:min-h-0 max-[700px]:py-4 sm:items-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
          slideStarted.current = performance.now();
          setProgress(0);
        }
      }}
      onTouchStart={() => pauseTemporarily()}
      aria-roledescription="carousel"
      aria-label="Foundation story backgrounds"
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <motion.div className="absolute inset-[-5%]" style={{ x: imgX, y: imgY }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.15, ease }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1 }}
                animate={reduce ? undefined : { scale: 1.08 }}
                transition={{ duration: reduce ? 0 : slideDuration / 1000, ease: "linear" }}
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  priority={index === 0}
                  className="object-cover object-[50%_40%]"
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {slides[1] ? (
        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          <Image src={slides[1].src} alt="" width={16} height={16} />
        </div>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/88 via-purple-deep/45 to-purple-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/35 via-transparent to-purple-deep/25" />

      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ background: lightPos }}
        aria-hidden
      />

      <AmbientSky dense />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-28 pb-20 text-center max-[700px]:pt-24 max-[700px]:pb-10 sm:px-8 sm:pt-32 sm:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="logo-glow mb-5 rounded-full bg-white p-1 max-[700px]:mb-3 sm:mb-6 sm:p-1.5"
          initial={reduce ? false : { scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.95, ease, delay: 0.05 }}
        >
          <Image
            src="/logo.jpg"
            alt={`${site.name} official logo`}
            width={120}
            height={120}
            className="h-20 w-20 rounded-full max-[700px]:h-14 max-[700px]:w-14 sm:h-24 sm:w-24 md:h-28 md:w-28"
            priority
          />
        </motion.div>

        <motion.p
          className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-gold-soft uppercase sm:mb-4 sm:text-xs"
          initial={reduce ? false : { y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.28 }}
        >
          {site.tagline}
        </motion.p>

        <SplitWords
          text={hero.headline}
          delay={0.42}
          stagger={0.07}
          className="font-display text-[1.85rem] leading-[1.12] font-semibold text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        />

        <motion.p
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg"
          initial={reduce ? false : { y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease, delay: 1.05 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          initial={reduce ? false : { y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease, delay: 1.2 }}
        >
          <Magnetic strength={0.25}>
            <Button
              href={hero.primaryCta.href}
              variant="gold"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.primaryCta.label}
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button href={hero.secondaryCta.href} variant="glass" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </Magnetic>
        </motion.div>

        <motion.div
          className="mt-9 flex w-full max-w-lg flex-col items-center gap-4 max-[700px]:mt-6 max-[700px]:gap-3 sm:mt-11"
          initial={reduce ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.4 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden />

          <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-gold/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              onClick={() => {
                goTo(index - 1);
                pauseTemporarily();
              }}
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </button>

            <div className="min-w-0 flex-1 text-center sm:max-w-xs">
              <p
                className="truncate text-[11px] font-semibold tracking-[0.18em] text-gold-soft uppercase"
                aria-live="polite"
              >
                {active.theme}
              </p>
              <div className="mx-auto mt-2 h-0.5 max-w-[10rem] overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full rounded-full bg-gold"
                  style={{ width: reduce || paused ? "0%" : `${progress * 100}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>

            <button
              type="button"
              aria-label="Next slide"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-gold/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              onClick={() => {
                goTo(index + 1);
                pauseTemporarily();
              }}
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Story slides">
            {slides.map((slide, i) => {
              const on = i === index;
              return (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`${slide.theme} (${i + 1} of ${slides.length})`}
                  className={`hero-dot h-2.5 min-h-11 min-w-11 rounded-full px-1.5 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    on ? "" : ""
                  }`}
                  onClick={() => {
                    goTo(i);
                    pauseTemporarily();
                  }}
                >
                  <span
                    className={`mx-auto block h-2 rounded-full transition-all duration-500 ${
                      on ? "w-7 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#begin"
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/70 transition hover:text-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold max-[700px]:hidden"
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease }}
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Explore</span>
        <motion.span
          aria-hidden
          className="text-lg leading-none"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
