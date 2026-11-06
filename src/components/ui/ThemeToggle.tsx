"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "light" | "system" | "dark";
const KEY = "trevona-theme";

/** Wird vor dem ersten Rendern ausgeführt, damit kein Aufblitzen entsteht. */
export const themeScript = `(function(){var d=document.documentElement;try{var m=localStorage.getItem('${KEY}');if(m==='light'||m==='dark'){d.setAttribute('data-theme',m);}}catch(e){}try{if(sessionStorage.getItem('trevona-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-intro','seen');}else{sessionStorage.setItem('trevona-intro','1');}}catch(e){d.setAttribute('data-intro','seen');}})();`;

function apply(mode: Mode) {
  const el = document.documentElement;
  if (mode === "system") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {}
}

function readMode(): Mode {
  try {
    const m = localStorage.getItem(KEY);
    return m === "light" || m === "dark" ? m : "system";
  } catch {
    return "system";
  }
}

const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);
const Auto = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
  </svg>
);

/** Kompakter Umschalter (Header): wechselt Hell → Dunkel → Automatisch. */
export function ThemeCycle({ labels, className }: { labels: { light: string; dark: string; system: string; label: string }; className?: string }) {
  const [mode, setMode] = useState<Mode>("system");
  useEffect(() => setMode(readMode()), []);
  const next: Record<Mode, Mode> = { system: "light", light: "dark", dark: "system" };
  const current = { light: labels.light, dark: labels.dark, system: labels.system }[mode];
  return (
    <button
      type="button"
      onClick={() => {
        const m = next[mode];
        setMode(m);
        apply(m);
      }}
      aria-label={`${labels.label}: ${current}`}
      title={`${labels.label}: ${current}`}
      className={cn("grid place-items-center rounded-full transition-colors", className ?? "h-8 w-8 text-ink/70 hover:bg-ink/5 hover:text-ink")}
    >
      {mode === "light" ? <Sun /> : mode === "dark" ? <Moon /> : <Auto />}
    </button>
  );
}

/** Segment-Umschalter (Footer). */
export default function ThemeToggle({ labels }: { labels: { light: string; dark: string; system: string; label: string } }) {
  const [mode, setMode] = useState<Mode>("system");
  useEffect(() => setMode(readMode()), []);
  const options: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: "light", label: labels.light, icon: <Sun /> },
    { id: "system", label: labels.system, icon: <Auto /> },
    { id: "dark", label: labels.dark, icon: <Moon /> },
  ];
  return (
    <div role="radiogroup" aria-label={labels.label} className="inline-flex rounded-full bg-ink/5 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={mode === o.id}
          onClick={() => {
            setMode(o.id);
            apply(o.id);
          }}
          className={cn(
            "flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all duration-300",
            mode === o.id ? "bg-card text-ink shadow-sm" : "text-ink-soft hover:text-ink",
          )}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
