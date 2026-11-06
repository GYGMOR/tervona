"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Photo from "@/components/ui/Photo";
import type { PhotoKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Apple-Effekt: Das Bild startet eingerückt mit runden Ecken und zieht sich beim
 * Scrollen auf volle Breite auf. Kinder (z. B. schwebende Karten) liegen darüber.
 */
export default function ZoomImage({
  photo,
  alt,
  className,
  priority,
  children,
  overlay = true,
}: {
  photo: PhotoKey;
  alt: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.12"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(enter, [0.2, 1], [6, 0]);
  const radius = useTransform(enter, [0.2, 1], [32, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px)`;
  const y = useTransform(pass, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(enter, [0, 1], [1.22, 1.12]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div className="absolute inset-0 overflow-hidden bg-mist" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Photo photo={photo} alt={alt} priority={priority} sizes="100vw" />
        </motion.div>
        {overlay && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />}
      </motion.div>
      {children}
    </div>
  );
}
