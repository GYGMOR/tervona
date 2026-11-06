"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import ButtonLink, { Chevron } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { ThemeCycle } from "@/components/ui/ThemeToggle";
import type { Dictionary, ServiceSlug } from "@/content";
import type { PhotoKey } from "@/lib/images";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;
const out = [0.16, 1, 0.3, 1] as const;

type NavService = { slug: ServiceSlug; title: string; number: string; image: PhotoKey };

/**
 * Vollbild-Menü: öffnet sich als Kreis aus dem Menü-Button, dunkel mit Farbschein,
 * grosse Links, Leistungs-Karten zum Wischen und Kontakt/Sprache/Darstellung unten.
 */
export default function MobileMenu({
  lang,
  t,
  theme,
  slogan,
  links,
  services,
  isActive,
  onNavigate,
  switchHref,
}: {
  lang: Locale;
  t: Dictionary["nav"];
  theme: Dictionary["theme"];
  slogan: string;
  links: { key: string; href: string; label: string }[];
  services: NavService[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
  switchHref: string;
}) {
  const origin = "calc(100% - 4rem) 1.75rem";
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.menu}
      data-lenis-prevent
      className="fixed inset-0 overflow-y-auto overscroll-contain bg-night text-white xl:hidden"
      initial={{ clipPath: `circle(0% at ${origin})` }}
      animate={{ clipPath: `circle(150% at ${origin})` }}
      exit={{ clipPath: `circle(0% at ${origin})` }}
      transition={{ duration: 0.75, ease }}
    >
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute left-1/2 top-[85%] h-[34rem] w-[34rem] rounded-full opacity-40 blur-[110px]"
        style={{ background: "conic-gradient(from 0deg, #2997ff, #6f6bff, #b45cff, #ff6a8d, #2997ff)" }}
      />

      <div className="container-x relative flex min-h-full flex-col pb-8 pt-24">
        <nav aria-label="Mobile Navigation">
          <ul className="border-t border-white/10">
            {links.map((l, i) => {
              const active = l.key !== "home" && isActive(l.href);
              return (
                <li key={l.key} className="overflow-hidden border-b border-white/10">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-40%", opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.7, delay: 0.22 + i * 0.05, ease: out }}
                  >
                    <Link href={l.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className="group flex items-center justify-between gap-4 py-3.5">
                      <span className="flex items-baseline gap-4">
                        <span className="text-gradient w-6 text-xs font-bold">0{i + 1}</span>
                        <span className={cn("text-[2.05rem] font-bold leading-none tracking-[-0.045em] sm:text-5xl", active && "text-gradient")}>{l.label}</span>
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.08] transition-all duration-300 group-hover:bg-white group-hover:text-[#1d1d1f] group-active:scale-90">
                        <Chevron />
                      </span>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.7, delay: 0.5, ease: out }}
          className="mt-8"
        >
          <p className="text-sm font-semibold text-night-soft">{t.services}</p>
          <div className="no-scrollbar -mx-[clamp(1.25rem,4vw,2.75rem)] mt-3 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4vw,2.75rem)] gap-3 overflow-x-auto px-[clamp(1.25rem,4vw,2.75rem)] pb-1">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={localePath(lang, `services/${s.slug}`)}
                onClick={onNavigate}
                className="group relative h-36 w-[62vw] max-w-[270px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-night-3"
              >
                <Photo photo={s.image} alt="" sizes="270px" className="transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute inset-x-4 bottom-3">
                  <span className="text-gradient block text-[0.7rem] font-bold">{s.number}</span>
                  <span className="block text-[1.05rem] font-semibold leading-tight tracking-[-0.02em]">{s.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.7, delay: 0.6, ease: out }}
          className="mt-auto space-y-3 pt-10"
        >
          <ButtonLink href={localePath(lang, "contact")} size="lg" className="w-full">
            {t.cta}
          </ButtonLink>
          <div className="flex items-center justify-between gap-3 rounded-[20px] bg-white/[0.07] p-2 pl-4">
            <a href={`mailto:${site.email}`} className="truncate text-sm font-medium text-white/80">
              {site.email}
            </a>
            <div className="flex shrink-0 items-center gap-1">
              <div className="flex rounded-full bg-white/[0.08] p-0.5 text-xs font-semibold">
                {(["de", "en"] as const).map((l) =>
                  l === lang ? (
                    <span key={l} className="rounded-full bg-white px-2.5 py-1.5 text-[#1d1d1f]">
                      {l.toUpperCase()}
                    </span>
                  ) : (
                    <Link key={l} href={switchHref} hrefLang={l} lang={l} onClick={onNavigate} className="rounded-full px-2.5 py-1.5 text-white/70">
                      {l.toUpperCase()}
                    </Link>
                  ),
                )}
              </div>
              <ThemeCycle labels={theme} className="h-9 w-9 text-white/80 hover:bg-white/10 hover:text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 pt-3 text-xs text-night-soft">
            <LogoMark className="h-4 w-4" />
            {slogan}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
