"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Moderner Menü-Button: Pill mit Text, der wechselt, und zwei ungleich
 * langen Linien, die sich zu einem «×» verbinden.
 */
export default function MenuButton({
  open,
  onClick,
  labelOpen,
  labelClosed,
  className,
}: {
  open: boolean;
  onClick: () => void;
  labelOpen: string;
  labelClosed: string;
  className?: string;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? labelOpen : labelClosed}
      transition={{ layout: { duration: 0.45, ease } }}
      className={cn(
        "relative flex h-10 items-center gap-3 overflow-hidden rounded-full pl-4 pr-3.5 text-[0.85rem] font-semibold tracking-[-0.01em] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] transition-colors duration-500 active:scale-[0.96]",
        open ? "bg-white text-[#1d1d1f]" : "bg-ink text-surface",
        className,
      )}
    >
      <span className="relative block h-[1.25em] overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={open ? "open" : "closed"}
            className="block whitespace-nowrap"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {open ? labelOpen : labelClosed}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative block h-3 w-[18px]" aria-hidden="true">
        <motion.span
          className="absolute right-0 block h-[2px] rounded-full bg-current"
          initial={false}
          animate={open ? { top: "50%", width: "100%", rotate: 45, y: "-50%" } : { top: "0%", width: "100%", rotate: 0, y: "0%" }}
          transition={{ duration: 0.5, ease }}
        />
        <motion.span
          className="absolute right-0 block h-[2px] rounded-full bg-current"
          initial={false}
          animate={open ? { top: "50%", width: "100%", rotate: -45, y: "-50%" } : { top: "100%", width: "55%", rotate: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease }}
        />
      </span>
    </motion.button>
  );
}
