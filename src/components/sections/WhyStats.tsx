"use client";

import Counter from "@/components/motion/Counter";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyIcons } from "@/components/ui/Icons";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Dictionary } from "@/content";

/** Kennzahlen im Verlauf + Feature-Kacheln mit Fluent-Licht. */
export default function WhyStats({ t }: { t: Dictionary["why"] }) {
  return (
    <section className="bg-mist py-28 sm:py-36">
      <div className="container-x">
        <SectionIntro eyebrow={t.label} title={t.title} text={t.text} />

        <RevealGroup className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 text-center lg:grid-cols-4" stagger={0.08}>
          {t.stats.map((s) => (
            <RevealItem key={s.label}>
              <Counter value={s.value} suffix={s.suffix} className="text-gradient block text-[clamp(3.75rem,8vw,7rem)] font-bold leading-none tracking-[-0.055em]" />
              <p className="mx-auto mt-3 max-w-[14rem] text-ink-soft">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-20 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" stagger={0.07}>
          {t.items.map((item) => {
            const Icon = whyIcons[item.icon];
            return (
              <RevealItem key={item.title}>
                <article
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="reveal-light on-light relative h-full rounded-[24px] bg-card p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-9"
                >
                  <Icon size={32} className="text-blue" />
                  <h3 className="mt-6 text-[1.3rem] font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
