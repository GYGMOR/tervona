"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Photo from "@/components/ui/Photo";
import type { PhotoKey } from "@/lib/images";
import { cn, EASE } from "@/lib/utils";

type Props = {
  photo: PhotoKey;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  strength?: number;
  reveal?: boolean;
  children?: ReactNode;
};

const appear: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE } },
};

/** Abgerundetes Bild mit Parallax; blendet beim Erscheinen weich herein. */
export default function ParallaxImage({
  photo,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  strength = 8,
  reveal = true,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const scale = 1 + (strength * 2.3) / 100;

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden rounded-[28px] bg-mist", className)}
      initial={reveal ? "hidden" : false}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="absolute inset-0" variants={appear}>
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Photo photo={photo} alt={alt} sizes={sizes} priority={priority} />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}
