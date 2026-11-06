"use client";

import { motion } from "framer-motion";
import Photo from "@/components/ui/Photo";
import type { Locale } from "@/lib/i18n";
import { EASE } from "@/lib/utils";

/*
 * Vier im Code gebaute Bildschirm-Oberflächen für den Laptop-Showcase.
 * Alle Masse in cqw (Container-Breite), damit sie mit dem Bildschirm skalieren.
 * Bewusst feste Farben: Sie sehen aus wie echte App-Screenshots, unabhängig vom Hell/Dunkel-Modus.
 */

const L = {
  de: {
    overview: "Übersicht",
    last30: "Letzte 30 Tage",
    clicks: "Klicks",
    leads: "Anfragen",
    cpl: "Kosten/Anfrage",
    campaigns: "Kampagnen",
    search: "Suche",
    brand: "Marke",
    local: "Lokal Zug",
    orders: "Aufträge",
    newOrder: "+ Neuer Auftrag",
    nav: ["Dashboard", "Aufträge", "Kunden", "Planung", "Rechnungen"],
    cols: ["Nr.", "Kunde", "Status", "Termin", "Betrag"],
    status: { open: "Offen", progress: "In Arbeit", done: "Erledigt" },
    heroTitle: "Willkommen\nam Zugersee.",
    heroText: "Zimmer mit Seeblick, regionale Küche und Ruhe nur 20 Minuten von Zürich.",
    book: "Jetzt buchen",
    more: "Mehr erfahren",
    siteNav: ["Zimmer", "Restaurant", "Events", "Kontakt"],
    features: ["Seeblick", "Spa & Wellness", "Regionale Küche"],
    palette: "Farbpalette",
    type: "Typografie",
  },
  en: {
    overview: "Overview",
    last30: "Last 30 days",
    clicks: "Clicks",
    leads: "Enquiries",
    cpl: "Cost/enquiry",
    campaigns: "Campaigns",
    search: "Search",
    brand: "Brand",
    local: "Local Zug",
    orders: "Orders",
    newOrder: "+ New order",
    nav: ["Dashboard", "Orders", "Customers", "Planning", "Invoices"],
    cols: ["No.", "Customer", "Status", "Due", "Amount"],
    status: { open: "Open", progress: "In progress", done: "Done" },
    heroTitle: "Welcome to\nLake Zug.",
    heroText: "Rooms with a lake view, regional cuisine and calm just 20 minutes from Zurich.",
    book: "Book now",
    more: "Learn more",
    siteNav: ["Rooms", "Restaurant", "Events", "Contact"],
    features: ["Lake view", "Spa & wellness", "Regional cuisine"],
    palette: "Colour palette",
    type: "Typography",
  },
};

function Chrome({ url, dark }: { url: string; dark?: boolean }) {
  return (
    <div className={`flex h-[4.2cqw] items-center gap-[0.7cqw] px-[1.4cqw] ${dark ? "bg-[#17181c]" : "bg-[#f2f2f4]"}`}>
      <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#ff5f57]" />
      <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#febc2e]" />
      <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#28c840]" />
      <span
        className={`mx-auto flex h-[2.5cqw] w-[34%] items-center justify-center rounded-[0.7cqw] text-[1.05cqw] ${dark ? "bg-[#24262b] text-[#9aa0a8]" : "bg-white text-[#6e6e73]"}`}
      >
        🔒 {url}
      </span>
      <span className="w-[3.5cqw]" />
    </div>
  );
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE },
});

/* 1 · Google-Ads-Dashboard -------------------------------------------- */
export function AdsScreen({ lang }: { lang: Locale }) {
  const l = L[lang];
  const kpis = [
    { k: l.clicks, v: "12’480", d: "+18%" },
    { k: l.leads, v: "318", d: "+24%" },
    { k: l.cpl, v: "CHF 14.20", d: "−11%" },
    { k: "CTR", v: "6.2%", d: "+0.8" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#0f1013] text-white">
      <Chrome url="report.trevona.ch" dark />
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-[15%] flex-col gap-[1.2cqw] border-r border-white/5 p-[1.6cqw]">
          <span className="h-[2.4cqw] w-[2.4cqw] rounded-[0.7cqw] bg-gradient-to-br from-[#2997ff] to-[#b45cff]" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-[1.1cqw] rounded-full ${i === 0 ? "w-[80%] bg-white/70" : "w-[65%] bg-white/15"}`} />
          ))}
        </aside>
        <main className="flex-1 p-[2cqw]">
          <div className="flex items-center justify-between">
            <span className="text-[1.9cqw] font-semibold tracking-[-0.02em]">Google Ads · {l.overview}</span>
            <span className="rounded-full bg-white/8 px-[1.1cqw] py-[0.4cqw] text-[1.05cqw] text-white/70">{l.last30}</span>
          </div>
          <div className="mt-[1.6cqw] grid grid-cols-4 gap-[1.1cqw]">
            {kpis.map((k, i) => (
              <motion.div key={k.k} {...rise(i)} className="rounded-[1cqw] bg-white/[0.06] p-[1.2cqw]">
                <p className="text-[1cqw] text-white/55">{k.k}</p>
                <p className="mt-[0.4cqw] text-[1.9cqw] font-semibold tracking-[-0.02em]">{k.v}</p>
                <p className="mt-[0.2cqw] text-[0.95cqw] text-[#30d158]">{k.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(4)} className="mt-[1.2cqw] rounded-[1cqw] bg-white/[0.06] p-[1.4cqw]">
            <svg viewBox="0 0 600 150" className="h-[15cqw] w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ads-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#6f6bff" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#6f6bff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ads-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2997ff" />
                  <stop offset="0.6" stopColor="#b45cff" />
                  <stop offset="1" stopColor="#ff6a8d" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 120 C60 112 90 96 140 100 S230 70 280 78 S370 48 420 52 S520 22 600 14 L600 150 L0 150 Z"
                fill="url(#ads-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.path
                d="M0 120 C60 112 90 96 140 100 S230 70 280 78 S370 48 420 52 S520 22 600 14"
                fill="none"
                stroke="url(#ads-line)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
              />
            </svg>
          </motion.div>
          <div className="mt-[1.2cqw] grid grid-cols-3 gap-[1.1cqw]">
            {[
              [l.search, 82],
              [l.brand, 64],
              [l.local, 47],
            ].map(([name, w], i) => (
              <motion.div key={String(name)} {...rise(5 + i)} className="rounded-[1cqw] bg-white/[0.06] p-[1.2cqw]">
                <p className="text-[1cqw] text-white/60">{name}</p>
                <div className="mt-[0.8cqw] h-[0.7cqw] rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#2997ff] to-[#b45cff]"
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: EASE }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* 2 · Website ---------------------------------------------------------- */
export function WebScreen({ lang }: { lang: Locale }) {
  const l = L[lang];
  return (
    <div className="flex h-full flex-col bg-white text-[#1d1d1f]">
      <Chrome url={lang === "de" ? "seehotel-muster.ch" : "lakehotel-sample.ch"} />
      <div className="flex items-center justify-between px-[3cqw] py-[1.4cqw]">
        <span className="text-[1.6cqw] font-bold tracking-[-0.04em]">Seehotel Muster</span>
        <span className="flex gap-[2cqw] text-[1.1cqw] text-[#6e6e73]">
          {l.siteNav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
        <span className="rounded-full bg-[#1d1d1f] px-[1.4cqw] py-[0.6cqw] text-[1.05cqw] text-white">{l.book}</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-[2cqw] px-[3cqw] pb-[2cqw]">
        <div className="flex flex-col justify-center">
          <motion.p {...rise(0)} className="whitespace-pre-line text-[4.4cqw] font-bold leading-[1.02] tracking-[-0.05em]">
            {l.heroTitle}
          </motion.p>
          <motion.p {...rise(1)} className="mt-[1.4cqw] max-w-[90%] text-[1.3cqw] leading-[1.45] text-[#6e6e73]">
            {l.heroText}
          </motion.p>
          <motion.div {...rise(2)} className="mt-[2cqw] flex gap-[1cqw]">
            <span className="rounded-full bg-[#0071e3] px-[1.8cqw] py-[0.8cqw] text-[1.15cqw] font-medium text-white">{l.book}</span>
            <span className="rounded-full bg-[#f5f5f7] px-[1.8cqw] py-[0.8cqw] text-[1.15cqw] font-medium">{l.more}</span>
          </motion.div>
          <motion.div {...rise(3)} className="mt-[2.4cqw] flex gap-[1.4cqw] text-[1cqw] text-[#6e6e73]">
            {l.features.map((f) => (
              <span key={f} className="flex items-center gap-[0.5cqw]">
                <span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-gradient-to-br from-[#2997ff] to-[#b45cff]" />
                {f}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative overflow-hidden rounded-[1.6cqw]"
        >
          <Photo photo="zugLake" alt="" sizes="40vw" />
        </motion.div>
      </div>
    </div>
  );
}

/* 3 · Firmensoftware ---------------------------------------------------- */
export function AppScreen({ lang }: { lang: Locale }) {
  const l = L[lang];
  const rows: [string, string, "open" | "progress" | "done", string, string][] = [
    ["2041", "Bäckerei Keller", "progress", "12.11.", "4’850"],
    ["2040", "Sanitär Huber AG", "open", "14.11.", "2’120"],
    ["2039", "Praxis am See", "done", "08.11.", "1’380"],
    ["2038", "Malerei Frei", "progress", "18.11.", "6’900"],
    ["2037", "Garage Zentral", "done", "05.11.", "3’460"],
  ];
  const chip = {
    open: "bg-[#fff4e5] text-[#b25e00]",
    progress: "bg-[#e8f1ff] text-[#0058c4]",
    done: "bg-[#e9f9ee] text-[#1a7f3c]",
  };
  return (
    <div className="flex h-full flex-col bg-[#f7f7f9] text-[#1d1d1f]">
      <Chrome url={lang === "de" ? "app.ihre-firma.ch" : "app.your-company.com"} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[18%] border-r border-black/5 bg-white/70 p-[1.6cqw] backdrop-blur">
          <div className="flex items-center gap-[0.8cqw]">
            <span className="h-[2.2cqw] w-[2.2cqw] rounded-[0.6cqw] bg-gradient-to-br from-[#2997ff] to-[#6f6bff]" />
            <span className="text-[1.2cqw] font-semibold">Muster AG</span>
          </div>
          <ul className="mt-[2cqw] space-y-[0.5cqw] text-[1.1cqw]">
            {l.nav.map((n, i) => (
              <li key={n} className={`rounded-[0.6cqw] px-[0.9cqw] py-[0.6cqw] ${i === 1 ? "bg-[#0071e3]/10 font-semibold text-[#0071e3]" : "text-[#6e6e73]"}`}>
                {n}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-[2cqw]">
          <div className="flex items-center justify-between">
            <span className="text-[2.2cqw] font-bold tracking-[-0.03em]">{l.orders}</span>
            <span className="rounded-[0.7cqw] bg-[#0071e3] px-[1.3cqw] py-[0.6cqw] text-[1.05cqw] font-medium text-white">{l.newOrder}</span>
          </div>
          <div className="mt-[1.4cqw] h-[2.8cqw] rounded-[0.8cqw] bg-white px-[1.2cqw] text-[1.05cqw] leading-[2.8cqw] text-[#86868b] ring-1 ring-black/5">
            🔍 {l.search} …
          </div>
          <div className="mt-[1.4cqw] overflow-hidden rounded-[1cqw] bg-white ring-1 ring-black/5">
            <div className="grid grid-cols-[1fr_3fr_2fr_1.5fr_1.5fr] bg-[#fafafa] px-[1.4cqw] py-[0.9cqw] text-[0.95cqw] font-semibold text-[#86868b]">
              {l.cols.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r[0]}
                {...rise(i)}
                className="grid grid-cols-[1fr_3fr_2fr_1.5fr_1.5fr] items-center border-t border-black/5 px-[1.4cqw] py-[1cqw] text-[1.1cqw]"
              >
                <span className="text-[#86868b]">{r[0]}</span>
                <span className="font-medium">{r[1]}</span>
                <span>
                  <span className={`rounded-full px-[0.9cqw] py-[0.25cqw] text-[0.95cqw] font-medium ${chip[r[2]]}`}>{l.status[r[2]]}</span>
                </span>
                <span className="text-[#6e6e73]">{r[3]}</span>
                <span className="font-medium">CHF {r[4]}</span>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* 4 · Markenboard -------------------------------------------------------- */
export function BrandScreen({ lang }: { lang: Locale }) {
  const l = L[lang];
  const colors = ["#0b2545", "#13315c", "#2997ff", "#f2c14e", "#f5f5f7"];
  return (
    <div className="flex h-full flex-col bg-[#f5f5f7] text-[#1d1d1f]">
      <Chrome url={lang === "de" ? "brand.ihre-firma.ch" : "brand.your-company.com"} />
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-[1.4cqw] p-[2cqw]">
        <motion.div {...rise(0)} className="col-span-2 flex items-center justify-center gap-[1.6cqw] rounded-[1.6cqw] bg-gradient-to-br from-[#0b2545] to-[#13315c] text-white">
          <span className="grid h-[7cqw] w-[7cqw] place-items-center rounded-[2cqw] bg-[#f2c14e] text-[4cqw] font-bold text-[#0b2545]">m</span>
          <span className="text-[5.5cqw] font-bold tracking-[-0.06em]">muster</span>
        </motion.div>
        <motion.div {...rise(1)} className="flex flex-col justify-between rounded-[1.6cqw] bg-white p-[1.8cqw]">
          <span className="text-[1.05cqw] font-semibold text-[#86868b]">{l.type}</span>
          <span className="text-[7cqw] font-bold leading-none tracking-[-0.05em]">Aa</span>
          <span className="text-[1.1cqw] text-[#6e6e73]">Inter · Bold / Regular</span>
        </motion.div>
        <motion.div {...rise(2)} className="flex flex-col rounded-[1.6cqw] bg-white p-[1.8cqw]">
          <span className="text-[1.05cqw] font-semibold text-[#86868b]">{l.palette}</span>
          <div className="mt-auto flex h-[60%] gap-[0.6cqw]">
            {colors.map((c, i) => (
              <motion.span
                key={c}
                className="flex-1 rounded-[0.9cqw] ring-1 ring-black/5"
                style={{ background: c }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: EASE }}
              />
            ))}
          </div>
        </motion.div>
        <motion.div {...rise(3)} className="relative col-span-2 overflow-hidden rounded-[1.6cqw] bg-[#e8e8ed]">
          <motion.div
            initial={{ rotate: -14, y: 30, opacity: 0 }}
            animate={{ rotate: -8, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="absolute left-[12%] top-[18%] flex h-[62%] w-[44%] flex-col justify-between rounded-[1cqw] bg-[#0b2545] p-[1.6cqw] text-white shadow-2xl"
          >
            <span className="text-[1.8cqw] font-bold tracking-[-0.05em]">muster</span>
            <span className="text-[0.95cqw] text-white/70">Anna Muster · CEO</span>
          </motion.div>
          <motion.div
            initial={{ rotate: 14, y: 30, opacity: 0 }}
            animate={{ rotate: 6, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="absolute right-[10%] top-[22%] flex h-[62%] w-[44%] items-end rounded-[1cqw] bg-white p-[1.6cqw] shadow-2xl"
          >
            <span className="grid h-[3cqw] w-[3cqw] place-items-center rounded-[0.9cqw] bg-[#f2c14e] text-[1.8cqw] font-bold text-[#0b2545]">m</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
