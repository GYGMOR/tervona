"use client";

import { motion } from "framer-motion";
import ButtonLink from "@/components/ui/Button";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { EASE } from "@/lib/utils";

function Ring({ value, delay }: { value: number; delay: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
      <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#30d158"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: EASE }}
        />
      </svg>
      <span className="text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">{value}</span>
    </div>
  );
}

/** Startseite: zwei Kacheln für Projekt-Rechner und Website-Check. */
export default function ToolsTeaser({ lang, t }: { lang: Locale; t: Dictionary["home"]["tools"] }) {
  return (
    <section className="bg-surface py-28 sm:py-36">
      <div className="container-x">
        <SectionIntro eyebrow={t.label} title={t.title} text={t.text} />
        <div className="mt-16 grid gap-4 sm:gap-5 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="bg-brand relative flex min-h-[460px] flex-col overflow-hidden rounded-[28px] p-8 text-white sm:p-11"
          >
            <p className="text-sm font-semibold text-white/75">CHF · {lang === "de" ? "Wochen" : "Weeks"}</p>
            <h3 className="t-h3 mt-3">{t.estimatorTitle}</h3>
            <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-white/85">{t.estimatorText}</p>
            <div className="mt-7">
              <ButtonLink href={localePath(lang, "estimator")} variant="light" size="sm" className="h-9 px-5 text-[0.9rem]">
                {t.estimatorButton}
              </ButtonLink>
            </div>
            <div aria-hidden="true" className="mt-auto flex flex-wrap gap-2 pt-10">
              {["Website", "Google Ads", "SEO", "Software", "Branding"].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
                  className={i === 0 || i === 1 ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1d1d1f]" : "rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="relative flex min-h-[460px] flex-col overflow-hidden rounded-[28px] bg-night p-8 text-white sm:p-11"
          >
            <p className="text-sm font-semibold text-night-soft">PageSpeed · SEO</p>
            <h3 className="t-h3 mt-3">{t.checkTitle}</h3>
            <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-night-soft">{t.checkText}</p>
            <div className="mt-7">
              <ButtonLink href={localePath(lang, "website-check")} size="sm" className="h-9 px-5 text-[0.9rem]">
                {t.checkButton}
              </ButtonLink>
            </div>
            <div aria-hidden="true" className="mt-auto flex gap-4 pt-10 sm:gap-6">
              <Ring value={98} delay={0.2} />
              <Ring value={100} delay={0.35} />
              <Ring value={95} delay={0.5} />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
