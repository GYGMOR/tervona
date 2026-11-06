"use client";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { estimate, formatCHF, interestIndex, type ServiceId } from "@/lib/pricing";
import { cn, EASE } from "@/lib/utils";

const ids: ServiceId[] = ["website", "shop", "ads", "seo", "social", "software", "branding"];
export const PREFILL_KEY = "trevona-prefill";

function AnimatedCHF({ value, lang }: { value: number; lang: Locale }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => formatCHF(Math.round(v), lang));
  useEffect(() => {
    const c = animate(mv, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

function Check({ on }: { on: boolean }) {
  return (
    <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all duration-300", on ? "bg-brand text-white" : "ring-1 ring-line")}>
      {on && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export default function Estimator({ lang, t, interestOptions }: { lang: Locale; t: Dictionary["estimator"]; interestOptions: string[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState<ServiceId[]>([]);
  const [size, setSize] = useState<0 | 1 | 2>(1);
  const [timing, setTiming] = useState<0 | 1 | 2>(1);
  const [hint, setHint] = useState(false);

  const go = (to: number) => {
    if (step === 0 && to > 0 && selected.length === 0) {
      setHint(true);
      return;
    }
    setHint(false);
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const result = estimate(selected, size, timing === 2);

  const send = () => {
    const lines = [
      t.prefillIntro,
      `• ${selected.map((id) => t.services[id].title).join(", ")}`,
      `• ${t.sizes[size].title} · ${t.timings[timing].title}`,
      `• CHF ${formatCHF(result.once[0], lang)} – ${formatCHF(result.once[1], lang)} ${t.once}` +
        (result.monthly[1] > 0 ? ` + CHF ${formatCHF(result.monthly[0], lang)} – ${formatCHF(result.monthly[1], lang)} ${t.monthly}` : ""),
      `• ${result.weeks[0]}–${result.weeks[1]} ${t.weeks}`,
      "",
    ].join("\n");
    try {
      sessionStorage.setItem(
        PREFILL_KEY,
        JSON.stringify({ interests: selected.map((id) => interestOptions[interestIndex[id]]), message: lines }),
      );
    } catch {}
    router.push(localePath(lang, "contact"));
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(6px)" }),
  };

  return (
    <div className="mx-auto max-w-5xl rounded-[32px] bg-card p-6 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.35)] sm:p-10 lg:p-14">
      {/* Fortschritt */}
      <div className="grid grid-cols-4 gap-2">
        {t.steps.map((s, i) => (
          <div key={s}>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div className="bg-brand h-full origin-left rounded-full" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
            </div>
            <p className={cn("mt-2 hidden text-xs font-semibold sm:block", i === step ? "text-ink" : "text-ink-mute")}>{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold text-ink-mute sm:hidden">
        {t.stepOf} {step + 1} / 4 · {t.steps[step]}
      </p>

      <div className="relative mt-10 min-h-[440px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: EASE }}>
            {step === 0 && (
              <fieldset>
                <legend className="text-[1.75rem] font-bold tracking-[-0.035em] sm:text-[2.1rem]">{t.q1}</legend>
                <p className="mt-1 text-ink-soft">{t.q1Hint}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {ids.map((id) => {
                    const on = selected.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setHint(false);
                          setSelected((cur) => (on ? cur.filter((x) => x !== id) : [...cur, id]));
                        }}
                        className={cn(
                          "flex items-start justify-between gap-4 rounded-[20px] p-5 text-left transition-all duration-300",
                          on ? "bg-ink text-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]" : "bg-mist hover:bg-line/70",
                        )}
                      >
                        <span>
                          <span className="block text-[1.1rem] font-semibold tracking-[-0.02em]">{t.services[id].title}</span>
                          <span className={cn("mt-1 block text-sm", on ? "text-surface/70" : "text-ink-soft")}>{t.services[id].text}</span>
                        </span>
                        <Check on={on} />
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {hint && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-4 text-sm font-medium text-[#e30000]">
                      {t.pick}
                    </motion.p>
                  )}
                </AnimatePresence>
              </fieldset>
            )}

            {(step === 1 || step === 2) && (
              <fieldset>
                <legend className="text-[1.75rem] font-bold tracking-[-0.035em] sm:text-[2.1rem]">{step === 1 ? t.q2 : t.q3}</legend>
                <div className="mt-8 grid gap-3 sm:grid-cols-3" role="radiogroup">
                  {(step === 1 ? t.sizes : t.timings).map((o, i) => {
                    const on = (step === 1 ? size : timing) === i;
                    return (
                      <button
                        key={o.title}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => (step === 1 ? setSize(i as 0 | 1 | 2) : setTiming(i as 0 | 1 | 2))}
                        className={cn(
                          "flex min-h-40 flex-col justify-between rounded-[22px] p-6 text-left transition-all duration-300",
                          on ? "bg-ink text-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]" : "bg-mist hover:bg-line/70",
                        )}
                      >
                        <span className="flex items-center justify-between">
                          <span className={cn("text-sm font-semibold", on ? "text-surface/60" : "text-ink-mute")}>0{i + 1}</span>
                          <Check on={on} />
                        </span>
                        <span>
                          <span className="block text-[1.35rem] font-bold tracking-[-0.03em]">{o.title}</span>
                          <span className={cn("mt-1 block text-sm leading-snug", on ? "text-surface/70" : "text-ink-soft")}>{o.text}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <div>
                <p className="t-eyebrow text-gradient inline-block">{t.resultLabel}</p>
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-[24px] bg-mist p-6 lg:col-span-2">
                    <p className="text-sm font-semibold text-ink-mute">{t.once}</p>
                    <p className="text-gradient mt-2 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.05em]">
                      CHF <AnimatedCHF value={result.once[0]} lang={lang} /> – <AnimatedCHF value={result.once[1]} lang={lang} />
                    </p>
                    {timing === 2 && <p className="mt-2 text-sm text-ink-soft">{t.express}</p>}
                  </div>
                  <div className="rounded-[24px] bg-mist p-6">
                    <p className="text-sm font-semibold text-ink-mute">{t.duration}</p>
                    <p className="mt-2 text-[clamp(2rem,4vw,2.8rem)] font-bold leading-none tracking-[-0.045em]">
                      {result.weeks[0]}–{result.weeks[1]} <span className="text-lg font-semibold text-ink-soft">{t.weeks}</span>
                    </p>
                  </div>
                  {result.monthly[1] > 0 && (
                    <div className="rounded-[24px] bg-mist p-6 lg:col-span-3">
                      <p className="text-sm font-semibold text-ink-mute">{t.monthly}</p>
                      <p className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-none tracking-[-0.04em]">
                        + CHF <AnimatedCHF value={result.monthly[0]} lang={lang} /> – <AnimatedCHF value={result.monthly[1]} lang={lang} />
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-ink-mute">{t.breakdown}</p>
                  <ul className="mt-3 divide-y divide-line border-y border-line">
                    {result.lines.map((l, i) => (
                      <motion.li
                        key={l.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                      >
                        <span className="font-semibold">{t.services[l.id].title}</span>
                        <span className="text-sm text-ink-soft">
                          {t.setup}: CHF {formatCHF(l.once[0], lang)}–{formatCHF(l.once[1], lang)}
                          {l.monthly[1] > 0 && (
                            <>
                              {" · "}
                              {t.care}: CHF {formatCHF(l.monthly[0], lang)}–{formatCHF(l.monthly[1], lang)}/{lang === "de" ? "Mt." : "mo"}
                            </>
                          )}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-ink-mute">{t.note}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="font-medium text-link hover:underline">
            ‹ {t.back}
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="h-12 rounded-full bg-blue px-8 font-medium text-white transition-[background-color,transform] duration-300 hover:bg-blue-hover active:scale-[0.97]"
          >
            {t.next}
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => go(0)} className="font-medium text-link hover:underline">
              {t.restart}
            </button>
            <button
              type="button"
              onClick={send}
              className="h-12 rounded-full bg-blue px-8 font-medium text-white transition-[background-color,transform] duration-300 hover:bg-blue-hover active:scale-[0.97]"
            >
              {t.send}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
