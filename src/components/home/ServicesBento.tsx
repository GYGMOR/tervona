"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ViewTransition } from "react";
import ButtonLink, { ChevronLink } from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import type { Service } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { cn, EASE } from "@/lib/utils";

const layout = [
  { span: "lg:col-span-7", dark: true },
  { span: "lg:col-span-5", dark: false },
  { span: "lg:col-span-5", dark: false },
  { span: "lg:col-span-7", dark: true },
];

/** Bento-Raster im Apple-Stil; Licht folgt dem Cursor (Fluent Reveal). */
export default function ServicesBento({ lang, services, learnMore, ask, view }: { lang: Locale; services: Service[]; learnMore: string; ask: string; view: string }) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
      {services.map((s, i) => {
        const l = layout[i % layout.length];
        return (
          <motion.article
            key={s.slug}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 2) * 0.1, ease: EASE }}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
            className={cn(
              "reveal-light group relative flex min-h-[540px] flex-col overflow-hidden rounded-[28px] sm:min-h-[600px]",
              l.span,
              l.dark ? "bg-night text-white" : "on-light bg-card text-ink",
            )}
          >
            <div className="relative z-10 p-8 sm:p-11">
              <p className={cn("text-sm font-semibold", l.dark ? "text-night-soft" : "text-ink-mute")}>
                {s.number} · <span className="text-gradient">{s.tags.slice(0, 3).join(" · ")}</span>
              </p>
              <h3 className="t-h3 mt-3 max-w-md">{s.title}</h3>
              <p className={cn("mt-3 max-w-md text-[1.0625rem] leading-relaxed", l.dark ? "text-night-soft" : "text-ink-soft")}>{s.short}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href={localePath(lang, `services/${s.slug}`)} size="sm" className="h-9 px-5 text-[0.9rem]">
                  {learnMore}
                </ButtonLink>
                <ChevronLink href={localePath(lang, "contact")} tone={l.dark ? "dark" : "light"} className="text-[0.95rem]">
                  {ask}
                </ChevronLink>
              </div>
            </div>
            <Link href={localePath(lang, `services/${s.slug}`)} data-cursor={view} tabIndex={-1} aria-hidden="true" className="mx-8 mt-auto block sm:mx-11">
              <ViewTransition name={`svc-${s.slug}`} share="morph" default="none">
                <div className="relative h-56 overflow-hidden rounded-t-[20px] sm:h-72">
                  <Photo
                    photo={s.image}
                    alt={s.imageAlt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                </div>
              </ViewTransition>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
