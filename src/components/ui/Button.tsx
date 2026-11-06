import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "glass";

const styles: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-hover",
  dark: "bg-ink text-surface hover:bg-black",
  light: "bg-white text-[#1d1d1f] hover:bg-[#e8e8ed]",
  glass: "border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20",
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Apple-Pill-Button. */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[background-color,transform] duration-300 active:scale-[0.97]",
    size === "sm" && "h-8 px-4 text-[0.8rem]",
    size === "md" && "h-11 px-6 text-[1rem]",
    size === "lg" && "h-14 px-8 text-[1.06rem]",
    styles[variant],
    className,
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true" className={className}>
      <path d="M1.5 1.5 6.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Apple-Textlink «Mehr erfahren ›». */
export function ChevronLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 text-[1.0625rem] font-medium tracking-[-0.01em]",
    tone === "light" ? "text-link" : "text-link-dark",
    className,
  );
  const content = (
    <>
      <span className="group-hover:underline group-hover:underline-offset-4">{children}</span>
      <Chevron className="mt-px transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );
  return isExternal(href) ? (
    <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
