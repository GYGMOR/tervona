import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { cn } from "@/lib/utils";

/** Laufband aller Disziplinen; Tempo und Richtung folgen dem Scrollen. */
export default function ServiceMarquee({ items }: { items: string[] }) {
  return (
    <section className="overflow-hidden bg-surface py-14 sm:py-20">
      <p className="sr-only">{items.join(", ")}</p>
      <VelocityMarquee baseVelocity={-1.3}>
        {items.map((it, i) => (
          <span key={it} className="flex items-center">
            <span className={cn("px-6 text-[clamp(2.6rem,6.4vw,6rem)] font-bold leading-[1.1] tracking-[-0.045em] sm:px-10", i % 2 ? "text-gradient" : "text-ink")}>{it}</span>
            <span className="bg-brand h-3 w-3 rounded-full sm:h-4 sm:w-4" aria-hidden="true" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
