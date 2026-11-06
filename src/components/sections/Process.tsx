"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Dictionary } from "@/content";

/** Ablauf in fünf Schritten; die Verbindungslinie zeichnet sich beim Scrollen. */
export default function Process({ t }: { t: Dictionary["process"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="bg-surface py-28 sm:py-36">
      <div className="container-x">
        <SectionIntro eyebrow={t.label} title={t.title} text={t.text} />
        <div ref={ref} className="relative mt-20">
          <div aria-hidden="true" className="absolute left-7 right-7 top-7 hidden h-px bg-line lg:block" />
          <motion.div aria-hidden="true" className="bg-brand absolute left-7 right-7 top-[27px] hidden h-[3px] origin-left rounded-full lg:block" style={{ scaleX: scale }} />
          <div aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-line lg:hidden" />
          <motion.div aria-hidden="true" className="bg-brand absolute bottom-7 left-[27px] top-7 w-[3px] origin-top rounded-full lg:hidden" style={{ scaleY: scale }} />

          <RevealGroup as="ol" className="relative grid gap-10 lg:grid-cols-5 lg:gap-6" stagger={0.1}>
            {t.steps.map((step, i) => (
              <RevealItem as="li" key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-5 lg:block">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-surface text-lg font-bold ring-1 ring-line">
                  <span className="text-gradient">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className="lg:mt-7 lg:pr-4">
                  <h3 className="text-[1.3rem] font-semibold tracking-[-0.025em]">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
