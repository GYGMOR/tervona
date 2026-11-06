"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplitHeading from "@/components/motion/SplitHeading";
import ButtonLink from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const shapes = ["aspect-[4/5] h-[46svh] sm:h-[54svh]", "aspect-[4/3] h-[34svh] sm:h-[40svh]", "aspect-[3/4] h-[42svh] sm:h-[48svh]"];

/** «Bilderfluss»: Vertikales Scrollen bewegt eine horizontale Bildstrecke. */
export default function ImageFlow({ lang, t, view }: { lang: Locale; t: Dictionary["home"]["flow"]; view: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [extra, setExtra] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.offsetWidth - window.innerWidth);
      distance.set(d);
      setExtra(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  return (
    <section ref={section} aria-label={t.label} className="relative bg-night text-white" style={{ height: extra === null ? "320vh" : `calc(100svh + ${extra}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex h-[78svh] w-max items-center gap-5 px-[clamp(1.25rem,4vw,2.75rem)] sm:gap-7">
          <div className="w-[84vw] shrink-0 sm:w-[48vw] lg:w-[34vw] lg:pr-10">
            <p className="t-eyebrow text-gradient inline-block">{t.label}</p>
            <SplitHeading text={t.title} className="t-h2 mt-3" />
            <p className="t-lead mt-6 max-w-md text-night-soft">{t.text}</p>
          </div>

          {t.items.map((item, i) => (
            <figure key={item.title} className={cn("group shrink-0", i % 2 === 0 ? "self-start mt-[3svh]" : "self-end mb-[3svh]")}>
              <div data-cursor={view} className={cn("relative overflow-hidden rounded-[24px] bg-night-3", shapes[i % shapes.length])}>
                <Photo
                  photo={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-4 max-w-[18rem]">
                <span className="block text-lg font-semibold tracking-[-0.02em]">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-night-soft">{item.text}</span>
              </figcaption>
            </figure>
          ))}

          <div className="bg-brand flex aspect-[4/5] h-[46svh] shrink-0 flex-col justify-end rounded-[24px] p-7 sm:h-[54svh] sm:p-9">
            <p className="t-h3 max-w-[12ch] text-white">{t.endTitle}</p>
            <ButtonLink href={localePath(lang, "contact")} variant="light" className="mt-6 self-start">
              {t.endButton}
            </ButtonLink>
          </div>
        </motion.div>

        <div className="container-x absolute inset-x-0 bottom-8">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
            <motion.div className="bg-brand h-full origin-left rounded-full" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}
