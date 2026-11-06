"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
  duration?: number;
  /** true = sofort beim Laden einblenden (für Inhalte im ersten Bildschirm) */
  mount?: boolean;
};

/** Blendet Inhalte weich von unten ein, sobald sie sichtbar werden. */
export default function Reveal({ children, className, delay = 0, y = 28, x = 0, amount = 0.25, duration = 0.9, mount = false }: RevealProps) {
  const trigger = mount ? { animate: { opacity: 1, y: 0, x: 0 } } : { whileInView: { opacity: 1, y: 0, x: 0 }, viewport: { once: true, amount } };
  return (
    <motion.div className={className} initial={{ opacity: 0, y, x }} {...trigger} transition={{ duration, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

const group: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Container, dessen <RevealItem>-Kinder nacheinander erscheinen. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={group} custom={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
