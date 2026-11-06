"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/brand/Logo";
import ButtonLink, { Chevron } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { ThemeCycle } from "@/components/ui/ThemeToggle";
import type { Dictionary, ServiceSlug } from "@/content";
import type { PhotoKey } from "@/lib/images";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn, EASE } from "@/lib/utils";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";

type NavService = { slug: ServiceSlug; title: string; short: string; number: string; image: PhotoKey; imageAlt: string };

export default function Header({
  lang,
  t,
  theme,
  slogan,
  services,
}: {
  lang: Locale;
  t: Dictionary["nav"];
  theme: Dictionary["theme"];
  slogan: string;
  services: NavService[];
}) {
  const pathname = usePathname() ?? `/${lang}/`;
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Menü schliessen, wenn auf Desktop-Breite gewechselt wird (z. B. Handy drehen / Fenster vergrössern)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const other: Locale = lang === "de" ? "en" : "de";
  const switchHref = switchLocalePath(pathname, other);
  const items = [
    { key: "services", href: localePath(lang, "services"), label: t.services },
    { key: "about", href: localePath(lang, "about"), label: t.about },
    { key: "estimator", href: localePath(lang, "estimator"), label: t.estimator },
    { key: "check", href: localePath(lang, "website-check"), label: t.check },
    { key: "contact", href: localePath(lang, "contact"), label: t.contact },
  ];
  const isActive = (href: string) => pathname.startsWith(href);

  const openMega = () => {
    if (timer.current) clearTimeout(timer.current);
    setMega(true);
  };
  const closeMega = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMega(false), 150);
  };
  const close = () => {
    setOpen(false);
    setMega(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={closeMega}>
      <AnimatePresence>
        {open && (
          <MobileMenu
            lang={lang}
            t={t}
            theme={theme}
            slogan={slogan}
            links={[{ key: "home", href: localePath(lang), label: t.home }, ...items]}
            services={services}
            isActive={isActive}
            onNavigate={close}
            switchHref={switchHref}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 border-b transition-[background-color,border-color] duration-500",
          open ? "border-white/[0.06] bg-night/90 delay-200" : "glass",
          !open && (scrolled || mega ? "border-ink/[0.08]" : "border-transparent"),
        )}
      >
        <div className="container-x flex h-14 items-center justify-between">
          <Link href={localePath(lang)} aria-label={t.homeLabel} onClick={close} className="rounded-lg">
            <Logo tone={open ? "light" : "dark"} />
          </Link>

          <nav aria-label="Hauptnavigation" className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {items.map((item) => {
                const isServices = item.key === "services";
                const active = isActive(item.href);
                return (
                  <li key={item.key} onMouseEnter={isServices ? openMega : () => setMega(false)} onFocus={isServices ? openMega : undefined}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={isServices ? mega : undefined}
                      className={cn("relative py-4 text-[0.875rem] transition-colors duration-300", active ? "font-medium text-ink" : "text-ink/75 hover:text-ink")}
                    >
                      {item.label}
                      {active && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className={cn(open && "hidden")}>
              <ThemeCycle labels={theme} />
            </span>
            <Link
              href={switchHref}
              hrefLang={other}
              lang={other}
              onClick={close}
              aria-label={t.switchTo}
              className={cn(
                "hidden h-8 items-center rounded-full px-3 text-[0.8rem] font-medium text-ink/70 transition-[color,background-color,opacity] hover:bg-ink/5 hover:text-ink sm:flex",
                open && "pointer-events-none opacity-0",
              )}
            >
              {other.toUpperCase()}
            </Link>
            <span className={cn("hidden transition-opacity duration-300 sm:block", open && "pointer-events-none opacity-0")}>
              <ButtonLink href={localePath(lang, "contact")} size="sm">
                {t.cta}
              </ButtonLink>
            </span>
            <MenuButton open={open} onClick={() => setOpen((v) => !v)} labelOpen={t.close} labelClosed={t.menu} className="xl:hidden" />
          </div>
        </div>
      </div>

      {/* Mega-Menü Leistungen */}
      <AnimatePresence>
        {mega && !open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass absolute inset-x-0 top-14 hidden border-b border-ink/[0.08] xl:block"
            onMouseEnter={openMega}
          >
            <div className="container-x grid grid-cols-4 gap-6 py-10">
              {services.map((s, i) => (
                <motion.div key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.04 * i, ease: EASE }}>
                  <Link href={localePath(lang, `services/${s.slug}`)} onClick={close} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
                      <Photo photo={s.image} alt="" sizes="22vw" className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                    </div>
                    <p className="mt-4 text-xs font-semibold text-ink-mute">{s.number}</p>
                    <p className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-[-0.025em] text-ink">
                      {s.title}
                      <Chevron className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </p>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{s.short}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
