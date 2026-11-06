/**
 * Richtwerte für den Projekt-Rechner (CHF, exkl. MwSt.).
 * ⚠️ Bitte vor dem Livegang mit den eigenen Preisen abgleichen!
 * Je Leistung: [Kompakt, Standard, Umfangreich] als [von, bis].
 */
export type ServiceId = "website" | "shop" | "ads" | "seo" | "social" | "software" | "branding";
export type Range = [number, number];

type Tier = { once: Range; monthly: Range; weeks: Range };

export const pricing: Record<ServiceId, [Tier, Tier, Tier]> = {
  website: [
    { once: [3500, 6000], monthly: [0, 0], weeks: [3, 5] },
    { once: [6000, 12000], monthly: [0, 0], weeks: [5, 8] },
    { once: [12000, 25000], monthly: [0, 0], weeks: [8, 14] },
  ],
  shop: [
    { once: [6000, 10000], monthly: [0, 0], weeks: [5, 8] },
    { once: [10000, 20000], monthly: [0, 0], weeks: [8, 12] },
    { once: [20000, 45000], monthly: [0, 0], weeks: [12, 20] },
  ],
  ads: [
    { once: [800, 1500], monthly: [400, 800], weeks: [1, 2] },
    { once: [1500, 2500], monthly: [800, 1500], weeks: [2, 3] },
    { once: [2500, 4000], monthly: [1500, 3000], weeks: [3, 4] },
  ],
  seo: [
    { once: [1000, 2000], monthly: [500, 900], weeks: [2, 3] },
    { once: [2000, 4000], monthly: [900, 1800], weeks: [3, 5] },
    { once: [4000, 8000], monthly: [1800, 3500], weeks: [4, 8] },
  ],
  social: [
    { once: [500, 1000], monthly: [600, 1200], weeks: [1, 2] },
    { once: [1000, 2000], monthly: [1200, 2500], weeks: [2, 3] },
    { once: [2000, 4000], monthly: [2500, 5000], weeks: [3, 4] },
  ],
  software: [
    { once: [8000, 15000], monthly: [150, 300], weeks: [6, 10] },
    { once: [15000, 40000], monthly: [300, 800], weeks: [10, 20] },
    { once: [40000, 100000], monthly: [800, 2000], weeks: [20, 40] },
  ],
  branding: [
    { once: [2500, 5000], monthly: [0, 0], weeks: [3, 4] },
    { once: [5000, 10000], monthly: [0, 0], weeks: [4, 6] },
    { once: [10000, 20000], monthly: [0, 0], weeks: [6, 10] },
  ],
};

/** Express-Zuschlag für «So schnell wie möglich» */
export const EXPRESS_SURCHARGE = 0.15;
/** Zeitersparnis bei Express (Faktor auf die Wochen) */
export const EXPRESS_TIME_FACTOR = 0.75;

/** Reihenfolge = Index in t.contact.form.interestOptions (für das Vorausfüllen des Formulars) */
export const interestIndex: Record<ServiceId, number> = { ads: 0, seo: 1, social: 2, website: 3, shop: 4, software: 5, branding: 6 };

export function estimate(ids: ServiceId[], size: 0 | 1 | 2, express: boolean) {
  const lines = ids.map((id) => ({ id, ...pricing[id][size] }));
  const sum = (key: "once" | "monthly"): Range => [
    lines.reduce((a, l) => a + l[key][0], 0),
    lines.reduce((a, l) => a + l[key][1], 0),
  ];
  const factor = express ? 1 + EXPRESS_SURCHARGE : 1;
  const once = sum("once").map((v) => roundNice(v * factor)) as Range;
  const monthly = sum("monthly").map((v) => roundNice(v)) as Range;
  // Parallel umsetzbar: längste Leistung + 25 % der übrigen
  const sorted = [...lines].sort((a, b) => b.weeks[1] - a.weeks[1]);
  const rest = sorted.slice(1);
  const w = (i: 0 | 1) => (sorted[0] ? sorted[0].weeks[i] + rest.reduce((a, l) => a + l.weeks[i] * 0.25, 0) : 0);
  const tf = express ? EXPRESS_TIME_FACTOR : 1;
  const weeks: Range = [Math.max(1, Math.round(w(0) * tf)), Math.max(2, Math.round(w(1) * tf))];
  return { lines, once, monthly, weeks };
}

function roundNice(v: number) {
  if (v === 0) return 0;
  const step = v < 2000 ? 50 : v < 20000 ? 250 : 1000;
  return Math.round(v / step) * step;
}

export function formatCHF(v: number, lang: "de" | "en") {
  return new Intl.NumberFormat(lang === "de" ? "de-CH" : "en-CH", { maximumFractionDigits: 0 }).format(v);
}
