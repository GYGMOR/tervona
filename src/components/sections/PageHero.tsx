import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";

/** Zentrierter Seitenkopf im Apple-Stil. */
export default function PageHero({
  eyebrow,
  title,
  text,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-surface pb-16 pt-32 sm:pb-24 sm:pt-40", className)}>
      <div aria-hidden="true" className="bg-brand pointer-events-none absolute left-1/2 top-40 h-80 w-[min(56rem,90vw)] -translate-x-1/2 rounded-full opacity-[var(--glow-opacity)] blur-[110px]" />
      <div className="container-x relative text-center">
        <Reveal mount y={10} duration={0.8}>
          <p className="t-eyebrow text-gradient inline-block">{eyebrow}</p>
        </Reveal>
        <SplitHeading as="h1" trigger="mount" delay={0.1} text={title} className="t-h1 mx-auto mt-4 max-w-5xl text-ink" />
        {text && (
          <Reveal mount delay={0.4}>
            <p className="t-lead mx-auto mt-7 max-w-2xl text-ink-soft">{text}</p>
          </Reveal>
        )}
        {children && (
          <Reveal mount delay={0.55} className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
