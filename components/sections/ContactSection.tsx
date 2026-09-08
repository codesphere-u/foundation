"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { contact, donateUrl, volunteerRoles } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";

function messageFromRole(role: string | null) {
  if (!role) return "";
  const match = volunteerRoles.find((r) => r.id === role);
  if (!match) return "";
  return `I would like to volunteer for: ${match.label}.\n\n${match.detail}\n\n`;
}

export function ContactSection() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const rolePrefill = useMemo(() => messageFromRole(roleParam), [roleParam]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(rolePrefill);
  const [messageTouched, setMessageTouched] = useState(false);
  const [opened, setOpened] = useState(false);

  const displayMessage = messageTouched ? message : rolePrefill || message;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "a friend"} — Hafisa Magezi`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${displayMessage}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <section className="relative overflow-hidden bg-paper">
      <GeometricAccent />
      <div className="section-pad relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {contact.title}
          </h2>
          <p className="luxury-prose mt-4 max-w-md">{contact.subtitle}</p>

          <ul className="mt-10 space-y-8">
            {contact.details.map((detail) => (
              <li key={detail.label}>
                <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                  {detail.label}
                </p>
                {"href" in detail && detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-2 inline-block font-display text-2xl font-semibold text-purple transition hover:text-purple-deep"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-2 font-display text-2xl font-semibold text-purple">
                    {detail.value}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              href={donateUrl}
              variant="gold"
            >
              Support the mission
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <form onSubmit={onSubmit} className="glass-gold rounded-[2rem] p-6 sm:p-8">
            <p className="font-display text-2xl font-semibold text-purple">Send a message</p>
            <p className="mt-2 text-sm text-muted">
              We will open your email app with your message ready to send.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
                  Name
                </span>
                <input
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-purple/15 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-purple/15 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={displayMessage}
                  onChange={(e) => {
                    setMessageTouched(true);
                    setMessage(e.target.value);
                  }}
                  className="w-full resize-y rounded-xl border border-purple/15 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
                  placeholder="How can we help?"
                />
              </label>
            </div>

            <Button type="submit" variant="purple" className="mt-6 w-full sm:w-auto">
              Open email to send
            </Button>

            {opened ? (
              <p className="mt-4 text-sm text-purple" role="status">
                {contact.formNote}
              </p>
            ) : null}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
