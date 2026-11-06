"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import SplitHeading from "@/components/motion/SplitHeading";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { cn, EASE } from "@/lib/utils";
import { AdsScreen, AppScreen, BrandScreen, WebScreen } from "./Screens";

const screens = [AdsScreen, WebScreen, AppScreen, BrandScreen];

/**
 * Apple-artiges Scrollytelling: Der Laptop bleibt stehen, der Bildschirm wechselt
 * beim Scrollen durch die vier Leistungsbereiche.
 */
export default function DeviceShowcase({ lang, t }: { lang: Locale; t: Dictionary["home"]["showcase"] }) {
  const ref = useRef<HTMLElement>(null);
  const n = t.steps.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive((cur) => (cur === i ? cur : i));
  });

  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const rotateX = useTransform(enter, [0, 1], [22, 0]);
  const scale = useTransform(enter, [0, 1], [0.86, 1]);
  const opacity = useTransform(enter, [0, 0.5], [0, 1]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target = top + travel * ((i + 0.5) / n);
    if (window.__lenis) window.__lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const Screen = screens[active % screens.length];

  return (
    <section ref={ref} aria-label={t.label} className="relative bg-surface" style={{ height: `${n * 85 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-14">
        <div className="container-x grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Text */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="t-eyebrow text-gradient inline-block">{t.label}</p>
            <SplitHeading text={t.title} className="t-h2 mt-3 text-ink" />
            <div className="relative mt-6 min-h-[7.5rem] sm:mt-8 sm:min-h-[8.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <h3 className="text-[1.45rem] font-bold tracking-[-0.03em] text-ink sm:text-[1.75rem]">{t.steps[active].title}</h3>
                  <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">{t.steps[active].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className="mt-6 grid grid-cols-4 gap-2 sm:mt-8">
              {t.steps.map((s, i) => (
                <li key={s.title}>
                  <button type="button" onClick={() => goTo(i)} className="group block w-full text-left" aria-current={i === active ? "step" : undefined}>
                    <span className="block h-1 overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="bg-brand block h-full origin-left rounded-full"
                        initial={false}
                        animate={{ scaleX: i <= active ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </span>
                    <span className={cn("mt-2 block text-xs font-semibold transition-colors", i === active ? "text-ink" : "text-ink-mute group-hover:text-ink-soft")}>
                      0{i + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Laptop */}
          <div className="order-1 lg:order-2 lg:col-span-7" style={{ perspective: "1800px" }}>
            <motion.div style={{ rotateX, scale, opacity }} className="mx-auto w-full max-w-[780px] origin-bottom">
              <div className="rounded-[16px] bg-[#0d0d0f] p-[1.5%] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.55)] ring-1 ring-black/20 sm:rounded-[22px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-black [container-type:inline-size] sm:rounded-[12px]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <Screen lang={lang} />
                    </motion.div>
                  </AnimatePresence>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                </div>
              </div>
              <div className="relative -mx-[6%] h-[10px] rounded-b-[18px] bg-gradient-to-b from-[#d9d9de] to-[#9c9ca1] sm:h-[16px]">
                <span className="absolute left-1/2 top-0 h-[35%] w-[15%] -translate-x-1/2 rounded-b-md bg-[#86868b]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
