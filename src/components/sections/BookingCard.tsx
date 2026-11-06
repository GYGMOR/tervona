"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ButtonLink from "@/components/ui/Button";
import type { Dictionary } from "@/content";
import { site } from "@/lib/site";
import { EASE } from "@/lib/utils";

/**
 * Terminbuchung: Ist ein Cal.com-Link hinterlegt, wird der Kalender erst nach
 * Klick geladen (Datenschutz). Sonst: Termin per E-Mail vorschlagen.
 */
export default function BookingCard({ t }: { t: Dictionary["contact"]["booking"] }) {
  const [loaded, setLoaded] = useState(false);
  const url = site.bookingUrl;

  return (
    <div className="overflow-hidden rounded-[28px] bg-card p-6 sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="bg-brand grid h-12 w-12 shrink-0 place-items-center rounded-[14px] text-white" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3.5" y="5" width="17" height="15" rx="3" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
          </span>
          <div>
            <h2 className="text-[1.35rem] font-bold tracking-[-0.03em]">{t.title}</h2>
            <p className="mt-1 max-w-lg text-ink-soft">{t.text}</p>
          </div>
        </div>
        {url ? (
          !loaded && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="h-11 rounded-full bg-blue px-6 font-medium text-white transition-colors hover:bg-blue-hover"
              >
                {t.load}
              </button>
              <p className="mt-2 max-w-[16rem] text-xs text-ink-mute">{t.consent}</p>
            </div>
          )
        ) : (
          <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent(t.mailSubject)}`} className="shrink-0">
            {t.mail}
          </ButtonLink>
        )}
      </div>
      <AnimatePresence>
        {url && loaded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.6, ease: EASE }} className="mt-8 overflow-hidden rounded-[20px] bg-mist">
            <iframe src={`${url}${url.includes("?") ? "&" : "?"}embed=true`} title={t.title} className="h-[680px] w-full border-0" loading="lazy" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
