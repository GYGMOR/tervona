"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Dictionary } from "@/content";
import { cn, EASE } from "@/lib/utils";

export default function Faq({ t, className }: { t: Dictionary["faq"]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className={cn("bg-surface py-28 sm:py-36", className)}>
      <div className="container-x">
        <SectionIntro eyebrow={t.label} title={t.title} text={t.text} />
        <ul className="mx-auto mt-16 max-w-3xl border-t border-line">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.title} className="border-b border-line">
                <h3>
                  <button
                    id={`${uid}-b-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.2rem] font-semibold tracking-[-0.022em] sm:text-[1.35rem]"
                  >
                    {item.title}
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]",
                        isOpen ? "rotate-45 bg-ink text-surface" : "bg-mist text-ink group-hover:bg-line",
                      )}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${uid}-p-${i}`}
                      role="region"
                      aria-labelledby={`${uid}-b-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-14 text-[1.0625rem] leading-relaxed text-ink-soft">{item.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
