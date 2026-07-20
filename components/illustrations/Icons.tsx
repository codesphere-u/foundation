type SvgProps = {
  className?: string;
  title?: string;
};

export function SeedlingIcon({ className = "h-16 w-16", title }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        d="M32 58 V34"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-purple"
      />
      <path
        d="M32 40 C22 36 16 26 18 16 C26 18 32 26 32 34"
        fill="currentColor"
        className="text-gold opacity-90"
      />
      <path
        d="M32 36 C40 30 48 24 50 14 C42 16 34 24 32 34"
        fill="currentColor"
        className="text-purple opacity-80"
      />
      <ellipse cx="32" cy="58" rx="10" ry="3" className="fill-gold/30" />
    </svg>
  );
}

export function ButterflyIcon({ className = "h-10 w-10", title }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <ellipse cx="16" cy="20" rx="10" ry="14" transform="rotate(-20 16 20)" className="fill-gold/70" />
      <ellipse cx="32" cy="20" rx="10" ry="14" transform="rotate(20 32 20)" className="fill-purple/70" />
      <ellipse cx="18" cy="30" rx="6" ry="8" transform="rotate(-15 18 30)" className="fill-lavender" />
      <ellipse cx="30" cy="30" rx="6" ry="8" transform="rotate(15 30 30)" className="fill-gold/40" />
      <rect x="22.5" y="14" width="3" height="22" rx="1.5" className="fill-purple-deep" />
    </svg>
  );
}

export function LeafIcon({ className = "h-8 w-8", title }: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        d="M6 26 C6 12 16 4 28 4 C28 18 20 28 6 26 Z"
        className="fill-gold/80"
      />
      <path d="M10 24 C16 18 22 12 26 6" fill="none" stroke="#4a2e80" strokeWidth="1.2" />
    </svg>
  );
}

export function BirdIcon({ className = "h-6 w-10", title }: SvgProps) {
  return (
    <svg viewBox="0 0 40 20" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        d="M2 12 Q12 2 20 10 Q28 2 38 12 Q28 8 20 14 Q12 8 2 12 Z"
        className="fill-white/70"
      />
    </svg>
  );
}

export function GeometricStar({ className = "h-12 w-12", title }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
        <path d="M32 4 L56 32 L32 60 L8 32 Z" />
        <path d="M32 14 L46 32 L32 50 L18 32 Z" />
        <circle cx="32" cy="32" r="4" className="fill-gold/40 stroke-none" />
      </g>
    </svg>
  );
}

export function CurveDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      className={`curve-divider ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill="currentColor"
      />
    </svg>
  );
}
