"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/** Zählt beim Erscheinen auf den Zielwert hoch. */
export default function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <motion.span aria-hidden="true">{text}</motion.span>
    </span>
  );
}
