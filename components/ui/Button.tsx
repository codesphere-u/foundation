import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "gold" | "glass" | "purple" | "ghost";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-purple-deep hover:bg-gold-soft shadow-[0_10px_30px_-12px_rgba(197,155,39,0.7)]",
  glass:
    "glass text-white border-white/40 hover:bg-white/25 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]",
  purple:
    "bg-purple text-white hover:bg-purple-deep shadow-[0_10px_30px_-12px_rgba(74,46,128,0.55)]",
  ghost: "bg-transparent text-purple border border-purple/25 hover:bg-lavender",
};

type Common = {
  variant?: Variant;
  children: ReactNode;
  heartbeat?: boolean;
  className?: string;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink;

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  variant = "gold",
  href,
  children,
  className = "",
  heartbeat,
  ...props
}: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${variants[variant]} ${heartbeat ? "animate-heartbeat" : ""} ${className}`;

  if (href) {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
