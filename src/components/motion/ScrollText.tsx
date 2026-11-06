"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn, parseAccent, plain } from "@/lib/utils";

/** Absatz, dessen Wörter beim Scrollen nacheinander «aufleuchten». */
export default function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words = parseAccent(text).flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, accent: segment.accent })),
  );

  return (
    <p ref={ref} className={cn("relative", className)}>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">
        {words.map((item, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={item.accent}>
            {item.w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={cn("inline-block", accent && "text-gradient")}>
        {children}
      </motion.span>{" "}
    </>
  );
}
