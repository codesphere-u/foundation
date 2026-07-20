type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light,
}: Props) {
  return (
    <div
      className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-gold-soft" : "text-gold"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl leading-tight font-semibold md:text-5xl ${light ? "text-white" : "text-purple"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/80" : "text-muted"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
