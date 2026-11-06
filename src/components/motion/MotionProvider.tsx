"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respektiert «Bewegung reduzieren» des Betriebssystems für alle Animationen. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
