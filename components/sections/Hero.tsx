"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
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
import { ButterflyIcon } from "@/components/illustrations/Icons";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6500;
const SLIDE_MS_MOBILE = 8000;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const slides = hero.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const imgX = useTransform(springX, (v) => (reduce ? 0 : v * 18));
  const imgY = useTransform(springY, (v) => (reduce ? 0 : v * 12));
  const lightX = useTransform(springX, (v) => (reduce ? 0 : v * 28));
  const lightY = useTransform(springY, (v) => (reduce ? 0 : v * 18));
  const butterflyX = useTransform(springX, (v) => (reduce ? 0 : v * -24));
  const butterflyY = useTransform(springY, (v) => (reduce ? 0 : v * -16));
  const lightPos = useMotionTemplate`radial-gradient(ellipse 70% 50% at calc(50% + ${lightX}px) calc(12% + ${lightY}px), rgba(197,155,39,0.38), transparent 55%)`;

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const mobile =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const interval = mobile ? SLIDE_MS_MOBILE : SLIDE_MS;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduce, paused, slides.length]);

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
      className="relative flex min-h-[100svh] items-end overflow-hidden sm:items-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Foundation story backgrounds"
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <motion.div className="absolute inset-[-4%]" style={{ x: imgX, y: imgY }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.2, ease }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1 }}
                animate={reduce ? undefined : { scale: 1.06 }}
                transition={{ duration: reduce ? 0 : 7, ease: "linear" }}
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

      {/* Preload second slide */}
      {slides[1] ? (
        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          <Image src={slides[1].src} alt="" width={16} height={16} />
        </div>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/94 via-purple-deep/55 to-purple-deep/25" />

      <motion.div
        className="absolute inset-0 opacity-60"
        style={{ background: lightPos }}
        aria-hidden
      />

      <AmbientSky dense />

      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute top-[30%] left-[12%] hidden opacity-50 md:block"
          aria-hidden
          style={{ x: butterflyX, y: butterflyY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <ButterflyIcon className="animate-float h-9 w-9" />
        </motion.div>
      ) : null}

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-32 sm:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="logo-glow mb-5 rounded-full bg-white p-1 sm:mb-6 sm:p-1.5"
          initial={reduce ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
        >
          <Image
            src="/logo.jpg"
            alt={`${site.name} official logo`}
            width={120}
            height={120}
            className="h-20 w-20 rounded-full sm:h-24 sm:w-24 md:h-28 md:w-28"
            priority
          />
        </motion.div>

        <motion.p
          className="mb-3 text-[10px] font-semibold tracking-[0.28em] text-gold-soft uppercase sm:mb-4 sm:text-xs"
          initial={reduce ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.28 }}
        >
          {site.tagline}
        </motion.p>

        <SplitWords
          text={hero.headline}
          highlight="100,000"
          delay={0.42}
          stagger={0.075}
          className="font-display text-[1.85rem] leading-[1.12] font-semibold text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        />

        <motion.p
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg"
          initial={reduce ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease, delay: 1.05 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease, delay: 1.2 }}
        >
          <Magnetic strength={0.25}>
            <Button
              href={hero.primaryCta.href}
              variant="gold"
              className="glow-btn w-full sm:w-auto"
              heartbeat
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
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10"
          initial={reduce ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.35 }}
        >
          <p
            className="text-[11px] font-semibold tracking-[0.2em] text-gold-soft/90 uppercase"
            aria-live="polite"
          >
            {active.theme}
          </p>
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
                  className={`hero-dot h-2 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    on ? "w-7 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  onClick={() => {
                    setIndex(i);
                    setPaused(true);
                    window.setTimeout(() => setPaused(false), SLIDE_MS);
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
