"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ZoomImage from "@/components/motion/ZoomImage";
import ButtonLink, { ChevronLink } from "@/components/ui/Button";
import { IconMail } from "@/components/ui/Icons";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { EASE } from "@/lib/utils";

export default function Hero({ lang, t }: { lang: Locale; t: Dictionary["home"]["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fast = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const slow = useTransform(scrollYProgress, [0, 1], [40, -50]);

  return (
    <section className="relative overflow-hidden bg-surface pt-28 sm:pt-36 lg:pt-40">
      {/* Ein einziger, sehr weicher Farbschein hinter der Headline */}
      <div aria-hidden="true" className="bg-brand pointer-events-none absolute left-1/2 top-48 h-[28rem] w-[min(64rem,90vw)] -translate-x-1/2 rounded-full opacity-[var(--glow-opacity)] blur-[110px]" />

      <div className="container-x relative text-center">
        <Reveal mount y={10} duration={0.8}>
          <p className="t-eyebrow text-gradient inline-block">
            {t.meta[0]} · {t.meta[1]}
          </p>
        </Reveal>
        <SplitHeading as="h1" trigger="mount" delay={0.1} text={t.title} srPrefix={t.srTitle} className="t-hero mt-4 text-ink" />
        <Reveal mount delay={0.45}>
          <p className="t-lead mx-auto mt-7 max-w-2xl text-ink-soft">{t.text}</p>
        </Reveal>
        <Reveal mount delay={0.6} className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <ButtonLink href={localePath(lang, "contact")} size="lg">
            {t.primary}
          </ButtonLink>
          <ChevronLink href={localePath(lang, "services")}>{t.secondary}</ChevronLink>
        </Reveal>
      </div>

      <div ref={ref} className="mt-16 sm:mt-20">
        <ZoomImage photo="hero" alt={t.imageAlt} priority className="h-[64svh] sm:h-[80svh] lg:h-[94svh]">
          <div className="container-x pointer-events-none absolute inset-0">
            {/* Fluent-Karte: Google Ads */}
            <motion.div style={{ y: fast }} className="absolute left-[7%] top-[12%] hidden sm:block" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
                className="glass w-64 rounded-[22px] border border-[var(--glass-border)] p-5 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{t.cards.adsTitle}</span>
                  <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-[#1f9d55]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
                    {t.cards.adsStatus}
                  </span>
                </div>
                <div className="mt-4 flex h-20 items-end gap-1.5">
                  {[30, 44, 38, 56, 52, 70, 94].map((h, i) => (
                    <motion.span
                      key={i}
                      className={i === 6 ? "bg-brand w-full rounded-md" : "w-full rounded-md bg-ink/10"}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.6 + i * 0.06, ease: EASE }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink-soft">{t.cards.adsMetric}</p>
              </motion.div>
            </motion.div>

            {/* Fluent-Karte: neue Anfrage */}
            <motion.div style={{ y: slow }} className="absolute bottom-[10%] right-[7%]" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="glass flex items-center gap-3 rounded-[20px] border border-[var(--glass-border)] py-3.5 pl-3.5 pr-6 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
              >
                <span className="bg-brand grid h-11 w-11 place-items-center rounded-[14px] text-white">
                  <IconMail size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.cards.leadTitle}</span>
                  <span className="block text-xs text-ink-soft">{t.cards.leadText}</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </ZoomImage>
      </div>
    </section>
  );
}
