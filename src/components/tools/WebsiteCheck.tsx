"use client";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn, EASE } from "@/lib/utils";
import { PREFILL_KEY } from "./Estimator";

type Cat = "performance" | "seo" | "accessibility" | "best-practices";
const cats: Cat[] = ["performance", "seo", "accessibility", "best-practices"];
type Result = { url: string; scores: Record<Cat, number>; metrics: { lcp: string; fcp: string; cls: string; tbt: string } };

const color = (s: number) => (s >= 90 ? "#30d158" : s >= 50 ? "#ff9f0a" : "#ff453a");

function ScoreRing({ score, label, delay }: { score: number; label: string; delay: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    const ctl = animate(mv, score, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] });
    return () => ctl.stop();
  }, [mv, score, delay]);
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid h-32 w-32 place-items-center sm:h-36 sm:w-36">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" className="text-line" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={color(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - score / 100) }}
            transition={{ duration: 1.4, delay, ease: EASE }}
          />
        </svg>
        <motion.span className="text-[2.2rem] font-bold tracking-[-0.04em]" style={{ color: color(score) }}>
          {text}
        </motion.span>
      </div>
      <p className="mt-3 font-semibold">{label}</p>
    </div>
  );
}

function normalize(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withProto);
    if (!u.hostname.includes(".") || u.hostname.endsWith(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export default function WebsiteCheck({ lang, t }: { lang: Locale; t: Dictionary["check"] }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [tick, setTick] = useState(0);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(() => setTick((v) => v + 1), 3200);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => () => abort.current?.abort(), []);

  const run = async (e: FormEvent) => {
    e.preventDefault();
    const target = normalize(url);
    if (!target) {
      setError(t.errorInvalid);
      setStatus("error");
      return;
    }
    abort.current?.abort();
    const ctl = new AbortController();
    abort.current = ctl;
    setStatus("loading");
    setTick(0);
    setError("");
    try {
      const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
      api.searchParams.set("url", target);
      api.searchParams.set("strategy", strategy);
      api.searchParams.set("locale", lang);
      cats.forEach((c) => api.searchParams.append("category", c.toUpperCase().replace("-", "_")));
      if (site.pageSpeedKey) api.searchParams.set("key", site.pageSpeedKey);
      const res = await fetch(api.toString(), { signal: ctl.signal });
      if (!res.ok) {
        if (res.status === 429 && process.env.NODE_ENV !== "production") {
          console.warn("[Website-Check] Google-Kontingent erschöpft – bitte NEXT_PUBLIC_PSI_KEY setzen.");
        }
        throw new Error(String(res.status));
      }
      const data = await res.json();
      const lh = data.lighthouseResult;
      const scores = Object.fromEntries(cats.map((c) => [c, Math.round((lh.categories[c]?.score ?? 0) * 100)])) as Record<Cat, number>;
      const a = lh.audits;
      setResult({
        url: lh.finalDisplayedUrl ?? lh.finalUrl ?? target,
        scores,
        metrics: {
          lcp: a["largest-contentful-paint"]?.displayValue ?? "–",
          fcp: a["first-contentful-paint"]?.displayValue ?? "–",
          cls: a["cumulative-layout-shift"]?.displayValue ?? "–",
          tbt: a["total-blocking-time"]?.displayValue ?? "–",
        },
      });
      setStatus("done");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(t.errorFetch);
      setStatus("error");
    }
  };

  const avg = result ? Math.round(cats.reduce((s, c) => s + result.scores[c], 0) / cats.length) : 0;
  const verdict = avg >= 90 ? t.verdictGood : avg >= 60 ? t.verdictOk : t.verdictBad;

  const discuss = () => {
    if (!result) return;
    const msg = [
      `${t.prefillIntro} ${result.url} (${strategy === "mobile" ? t.mobile : t.desktop}):`,
      ...cats.map((c) => `• ${t.categories[c]}: ${result.scores[c]}/100`),
      "",
    ].join("\n");
    try {
      sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ interests: [], message: msg }));
    } catch {}
    router.push(localePath(lang, "contact"));
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Eingabe */}
      <form onSubmit={run} className="rounded-[32px] bg-card p-4 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.35)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label htmlFor="check-url" className="sr-only">
            URL
          </label>
          <div className="flex h-16 min-w-0 flex-1 items-center rounded-[20px] bg-mist px-5 ring-blue/40 focus-within:ring-4">
            <span className="shrink-0 text-ink-mute">https://</span>
            <input
              id="check-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              value={url}
              onChange={(e) => setUrl(e.target.value.replace(/^https?:\/\//i, ""))}
              placeholder={t.placeholder}
              className="h-full w-full min-w-0 flex-1 bg-transparent pl-1 text-[1.15rem] font-medium text-ink outline-none placeholder:text-ink-mute/70"
            />
          </div>
          <div className="grid gap-3 sm:flex sm:items-center">
            <div role="radiogroup" aria-label="Strategy" className="grid h-14 grid-cols-2 items-center rounded-[20px] bg-mist p-1.5 sm:flex sm:h-16">
              {(["mobile", "desktop"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={strategy === s}
                  onClick={() => setStrategy(s)}
                  className={cn("h-full rounded-[14px] px-4 text-sm font-semibold transition-all", strategy === s ? "bg-card text-ink shadow-sm" : "text-ink-soft")}
                >
                  {s === "mobile" ? t.mobile : t.desktop}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-14 w-full whitespace-nowrap rounded-[20px] bg-blue px-8 sm:h-16 sm:w-auto sm:flex-1 font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-blue-hover active:scale-[0.98] disabled:opacity-60 lg:flex-none"
            >
              {t.button}
            </button>
          </div>
        </div>
        <p className="mt-3 px-2 text-xs text-ink-mute">{t.privacy}</p>
      </form>

      {/* Zustände */}
      <div className="mt-8" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center rounded-[32px] bg-card px-6 py-16 text-center">
              <motion.div
                className="h-16 w-16 rounded-full"
                style={{ background: "conic-gradient(from 0deg, #2997ff, #6f6bff, #b45cff, #ff6a8d, transparent 85%)", mask: "radial-gradient(circle, transparent 54%, black 56%)", WebkitMask: "radial-gradient(circle, transparent 54%, black 56%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
              <AnimatePresence mode="wait">
                <motion.p key={tick % t.loading.length} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-6 text-lg font-semibold">
                  {t.loading[Math.min(tick, t.loading.length - 1)]}
                </motion.p>
              </AnimatePresence>
              <p className="mt-1 text-sm text-ink-soft">{t.duration}</p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.p key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="rounded-[20px] bg-[#ff453a]/10 p-5 text-center font-medium text-[#d70015]">
              {error}
            </motion.p>
          )}

          {status === "done" && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="rounded-[32px] bg-card p-6 sm:p-10 lg:p-14">
              <p className="truncate text-center text-sm font-semibold text-ink-mute">
                {result.url} · {strategy === "mobile" ? t.mobile : t.desktop}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                {cats.map((c, i) => (
                  <ScoreRing key={c} score={result.scores[c]} label={t.categories[c]} delay={0.1 + i * 0.12} />
                ))}
              </div>
              <p className="t-lead mx-auto mt-12 max-w-2xl text-center text-ink-soft">{verdict}</p>

              <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {(["lcp", "fcp", "cls", "tbt"] as const).map((m) => (
                  <div key={m} className="rounded-[20px] bg-mist p-5">
                    <p className="text-xs font-semibold text-ink-mute">{t.metricNames[m]}</p>
                    <p className="mt-1 text-[1.5rem] font-bold tracking-[-0.03em]">{result.metrics[m]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <button
                  type="button"
                  onClick={discuss}
                  className="h-14 rounded-full bg-blue px-8 font-medium text-white transition-[background-color,transform] duration-300 hover:bg-blue-hover active:scale-[0.97]"
                >
                  {t.cta}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setResult(null);
                    setUrl("");
                    document.getElementById("check-url")?.focus();
                  }}
                  className="font-medium text-link hover:underline"
                >
                  {t.again}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
