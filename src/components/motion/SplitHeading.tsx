"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { cn, EASE, parseAccent } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  accentClassName?: string;
  delay?: number;
  /** "mount" animiert sofort, "view" beim Hineinscrollen */
  trigger?: "mount" | "view";
  stagger?: number;
  srPrefix?: string;
};

const container: Variants = {
  hidden: {},
  show: ({ delay, stagger }: { delay: number; stagger: number }) => ({
    transition: { delayChildren: delay, staggerChildren: stagger },
  }),
};

const line: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

/**
 * Überschrift, deren Zeilen (getrennt durch "\n") aus einer Maske nach oben gleiten.
 * Text in *Sternchen* erscheint im Trevona-Verlauf.
 */
export default function SplitHeading({
  text,
  as = "h2",
  className,
  accentClassName = "text-gradient",
  delay = 0,
  trigger = "view",
  stagger = 0.1,
  srPrefix,
}: Props) {
  const Comp = motion[as];
  const lines = text.split("\n");
  const animationProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.35 } };

  return (
    <Comp className={className} variants={container} custom={{ delay, stagger }} {...animationProps}>
      {srPrefix && <span className="sr-only">{srPrefix}</span>}
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span variants={line} className="block will-change-transform">
            {parseAccent(l).map((seg, j) => (
              <Fragment key={j}>{seg.accent ? <span className={cn(accentClassName)}>{seg.text}</span> : seg.text}</Fragment>
            ))}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
