"use client";

import { motion } from "framer-motion";
import { TILE, TILES } from "@/components/brand/Logo";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Dictionary } from "@/content";

const scatter = [
  { x: -120, y: -80, rotate: -35 },
  { x: 20, y: -150, rotate: 25 },
  { x: 140, y: -70, rotate: -20 },
  { x: -30, y: 150, rotate: 40 },
];

/** «Unser Zeichen»: Die vier Kacheln setzen sich beim Scrollen zum T zusammen. */
export default function BrandStory({ t }: { t: Dictionary["brand"] }) {
  return (
    <section className="overflow-hidden bg-mist py-28 sm:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div className="relative mx-auto aspect-square w-full max-w-[460px]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <div aria-hidden="true" className="bg-brand absolute inset-[18%] rounded-full opacity-25 blur-[80px]" />
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={{
                hidden: { ...scatter[i], opacity: 0, scale: 0.6 },
                show: { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.1 + i * 0.12 } },
              }}
              className="absolute flex items-end rounded-[22%] p-[4%] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]"
              style={{
                left: `${(tile.x / 40) * 100}%`,
                top: `${(tile.y / 40) * 100}%`,
                width: `${(TILE / 40) * 100}%`,
                height: `${(TILE / 40) * 100}%`,
                background: `linear-gradient(135deg, ${tile.from}, ${tile.to})`,
              }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <span className="text-[clamp(0.65rem,1.6vw,0.95rem)] font-semibold tracking-[-0.01em] text-white/95">{t.tiles[i]}</span>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <SectionIntro eyebrow={t.label} title={t.title} text={t.text} align="left" />
          <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-3" stagger={0.08}>
            {t.tiles.map((name, i) => (
              <RevealItem as="li" key={name} className="flex items-center gap-3 rounded-[18px] bg-card p-4">
                <span className="h-6 w-6 shrink-0 rounded-[7px]" style={{ background: `linear-gradient(135deg, ${TILES[i].from}, ${TILES[i].to})` }} />
                <span className="font-semibold tracking-[-0.015em]">{name}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
