"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Endlos laufendes Band, dessen Tempo und Richtung auf die Scroll-Geschwindigkeit reagieren.
 */
export default function VelocityMarquee({ children, baseVelocity = -2.2, className }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={className} aria-hidden="true">
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div className="flex flex-nowrap whitespace-nowrap will-change-transform" style={{ x }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex shrink-0 items-center">
              {children}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
