"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { PREFILL_KEY } from "@/components/tools/Estimator";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn, EASE } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "mailto" | "error";
type Fields = { name: string; company: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields | "privacy", string>>;

const empty: Fields = { name: "", company: "", email: "", phone: "", message: "" };

export default function ContactForm({ lang, t }: { lang: Locale; t: Dictionary["contact"]["form"] }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Ergebnisse aus Projekt-Rechner / Website-Check übernehmen
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PREFILL_KEY);
      if (!raw) return;
      sessionStorage.removeItem(PREFILL_KEY);
      const data = JSON.parse(raw) as { interests?: string[]; message?: string };
      if (data.message) setFields((f) => ({ ...f, message: data.message ?? "" }));
      if (data.interests?.length) setInterests(data.interests.filter((i) => t.interestOptions.includes(i)));
    } catch {}
  }, [t.interestOptions]);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): Errors => {
    const er: Errors = {};
    if (!fields.name.trim()) er.name = t.errors.required;
    if (!fields.email.trim()) er.email = t.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) er.email = t.errors.email;
    if (!fields.message.trim()) er.message = t.errors.required;
    if (!privacy) er.privacy = t.errors.privacy;
    return er;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) {
      document.getElementById(`${uid}-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    if (honeypot) {
      setStatus("success");
      return;
    }
    if (site.formEndpoint) {
      try {
        setStatus("sending");
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...fields, interests: interests.join(", "), budget, language: lang }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("success");
      } catch {
        setStatus("error");
      }
      return;
    }
    // Ohne Server-Endpunkt: vorausgefüllte E-Mail öffnen
    const head = [
      `${t.name}: ${fields.name}`,
      fields.company && `${t.company}: ${fields.company}`,
      `${t.email}: ${fields.email}`,
      fields.phone && `${t.phone}: ${fields.phone}`,
      interests.length > 0 && `${t.interests} ${interests.join(", ")}`,
      budget && `${t.budget}: ${budget}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(`${head}\n\n${fields.message}`)}`;
    setStatus("mailto");
  };

  const reset = () => {
    setFields(empty);
    setInterests([]);
    setBudget("");
    setPrivacy(false);
    setErrors({});
    setStatus("idle");
  };

  const done = status === "success" || status === "mailto";

  return (
    <div className="rounded-[28px] bg-card p-6 sm:p-10 lg:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[540px] flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <span className="bg-brand grid h-20 w-20 place-items-center rounded-full text-white">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                />
              </svg>
            </span>
            <h2 className="t-h3 mt-7">{status === "mailto" ? t.mailtoTitle : t.successTitle}</h2>
            <p className="mt-3 max-w-md text-[1.0625rem] text-ink-soft">{status === "mailto" ? t.mailtoText : t.successText}</p>
            <button type="button" onClick={reset} className="mt-8 font-medium text-link hover:underline">
              {t.again}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.035em]">{t.title}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`${uid}-name`} label={t.name} required error={errors.name}>
                <input id={`${uid}-name`} name="name" autoComplete="name" value={fields.name} onChange={set("name")} aria-invalid={!!errors.name} className={inputClass(!!errors.name)} />
              </Field>
              <Field id={`${uid}-company`} label={t.company} optional={t.optional}>
                <input id={`${uid}-company`} name="company" autoComplete="organization" value={fields.company} onChange={set("company")} className={inputClass(false)} />
              </Field>
              <Field id={`${uid}-email`} label={t.email} required error={errors.email}>
                <input id={`${uid}-email`} name="email" type="email" inputMode="email" autoComplete="email" value={fields.email} onChange={set("email")} aria-invalid={!!errors.email} className={inputClass(!!errors.email)} />
              </Field>
              <Field id={`${uid}-phone`} label={t.phone} optional={t.optional}>
                <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} className={inputClass(false)} />
              </Field>
            </div>

            <fieldset>
              <legend className="mb-3 text-[0.95rem] font-semibold">{t.interests}</legend>
              <div className="flex flex-wrap gap-2">
                {t.interestOptions.map((opt) => {
                  const active = interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setInterests((cur) => (active ? cur.filter((x) => x !== opt) : [...cur, opt]))}
                      className={cn(
                        "rounded-full px-4 py-2 text-[0.9rem] font-medium transition-all duration-200",
                        active ? "bg-ink text-surface" : "bg-mist text-ink hover:bg-line",
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[0.95rem] font-semibold">
                {t.budget} <span className="font-normal text-ink-mute">({t.optional})</span>
              </legend>
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {t.budgetOptions.map((opt) => {
                  const active = budget === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setBudget(active ? "" : opt)}
                      className={cn("rounded-full px-4 py-2 text-[0.9rem] font-medium transition-all duration-200", active ? "bg-blue text-white" : "bg-mist text-ink hover:bg-line")}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Field id={`${uid}-message`} label={t.message} required error={errors.message}>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={5}
                value={fields.message}
                onChange={set("message")}
                placeholder={t.messagePlaceholder}
                aria-invalid={!!errors.message}
                className={cn(inputClass(!!errors.message), "h-auto resize-y py-3.5")}
              />
            </Field>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <div>
              <label htmlFor={`${uid}-privacy`} className="flex cursor-pointer items-start gap-3 text-[0.9rem] leading-relaxed text-ink-soft">
                <input
                  id={`${uid}-privacy`}
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => {
                    setPrivacy(e.target.checked);
                    if (errors.privacy) setErrors((er) => ({ ...er, privacy: undefined }));
                  }}
                  aria-invalid={!!errors.privacy}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#0071e3]"
                />
                <span>
                  {t.privacyBefore}{" "}
                  <Link href={localePath(lang, "privacy")} className="text-link hover:underline" target="_blank">
                    {t.privacyLink}
                  </Link>{" "}
                  {t.privacyAfter}
                </span>
              </label>
              {errors.privacy && <p className="mt-2 text-sm text-[#e30000]">{errors.privacy}</p>}
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-2xl bg-[#fff2f2] p-4 text-sm text-[#b00020]">
                {t.errors.send}{" "}
                <a href={`mailto:${site.email}`} className="font-semibold underline">
                  {site.email}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="h-14 w-full rounded-full bg-blue px-8 text-[1.06rem] font-medium text-white transition-[background-color,transform] duration-300 hover:bg-blue-hover active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? t.sending : t.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block h-14 w-full rounded-[14px] border bg-surface px-4 text-[1.0625rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-mute focus:border-blue focus:shadow-[0_0_0_4px_rgba(0,113,227,0.15)]",
    invalid ? "border-[#e30000]" : "border-line hover:border-ink-mute",
  );
}

function Field({ id, label, required, optional, error, children }: { id: string; label: string; required?: boolean; optional?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.95rem] font-semibold">
        <span>
          {label}
          {required && <span className="text-blue"> *</span>}
        </span>
        {optional && <span className="text-xs font-normal text-ink-mute">{optional}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 text-sm text-[#e30000]">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
