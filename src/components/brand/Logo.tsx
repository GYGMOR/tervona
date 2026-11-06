import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Trevona-Zeichen: vier Kacheln (Marketing, Web, Software, Branding)
 * bilden zusammen das «T» – vier Bereiche, ein Partner.
 */
export const TILES = [
  { x: 1.8, y: 8.2, from: "#4fb0ff", to: "#2386ff" },
  { x: 14.6, y: 8.2, from: "#8a87ff", to: "#5f5bff" },
  { x: 27.4, y: 8.2, from: "#c77dff", to: "#a64dff" },
  { x: 14.6, y: 21, from: "#ff8aa6", to: "#ff5c84" },
] as const;
export const TILE = 10.8;

export function LogoMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("shrink-0 overflow-visible", animated && "logo-mark", className)}>
      <defs>
        {TILES.map((t, i) => (
          <linearGradient key={i} id={`${id}-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.from} />
            <stop offset="1" stopColor={t.to} />
          </linearGradient>
        ))}
      </defs>
      {TILES.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={TILE} height={TILE} rx="3.3" fill={`url(#${id}-${i})`} />
      ))}
    </svg>
  );
}

/** Eigene geometrische Wortmarke «trevona» (Linien mit runden Enden). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="-2 2 110 25" preserveAspectRatio="xMinYMid meet" aria-hidden="true" className={cn("aspect-[110/25] shrink-0 self-start", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.8 5V19.5A4.5 4.5 0 0 0 8.3 24H9.5M0.8 10.5H8.8" />
        <path d="M13.5 10V24M13.5 15.5A5.5 5.5 0 0 1 19 10H20.5" />
        <path d="M24.2 17H37.8A6.8 6.8 0 1 0 35.8 21.8" />
        <path d="M42 10L48 24L54 10" />
        <circle cx="64" cy="17" r="6.8" />
        <path d="M75 24V10M75 16.5A6 6 0 0 1 87 16.5V24" />
        <circle cx="97.5" cy="17" r="6.8" />
        <path d="M104.3 10V24" />
      </g>
    </svg>
  );
}

/** Zeichen + Wortmarke (Header). */
export default function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-2", tone === "dark" ? "text-ink" : "text-white", className)}>
      <LogoMark animated className="h-8 w-8" />
      <Wordmark className="h-[19px] w-auto self-center transition-colors duration-300" />
      <span className="sr-only">Trevona</span>
    </span>
  );
}

/** Zeichen + Wortmarke + Slogan (Footer, Intro, Marken-Abschnitt). */
export function LogoLockup({ slogan, className, size = "md", tone = "dark" }: { slogan: string; className?: string; size?: "md" | "lg"; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center", size === "lg" ? "gap-4" : "gap-3", tone === "dark" ? "text-ink" : "text-white", className)}>
      <LogoMark animated className={size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12"} />
      <span className="flex flex-col items-start">
        <Wordmark className={cn("w-auto", size === "lg" ? "h-10 sm:h-12" : "h-6")} />
        <span className={cn("font-medium tracking-[-0.01em]", size === "lg" ? "mt-2 text-base sm:text-lg" : "mt-1 text-[0.8rem]", tone === "dark" ? "text-ink-soft" : "text-night-soft")}>
          {slogan}
        </span>
      </span>
      <span className="sr-only">Trevona – {slogan}</span>
    </span>
  );
}
