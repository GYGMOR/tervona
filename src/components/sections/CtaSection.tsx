import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ButtonLink, { ChevronLink } from "@/components/ui/Button";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Abschluss auf Schwarz mit rotierendem Farbschein. */
export default function CtaSection({ lang, t }: { lang: Locale; t: Dictionary["cta"] }) {
  return (
    <section className="relative overflow-hidden bg-night py-32 text-white sm:py-44">
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] rounded-full opacity-35 blur-[110px] sm:h-[44rem] sm:w-[44rem]"
        style={{ background: "conic-gradient(from 0deg, #2997ff, #6f6bff, #b45cff, #ff6a8d, #2997ff)" }}
      />
      <div className="container-x relative text-center">
        <Reveal y={12}>
          <p className="t-eyebrow text-gradient inline-block">{t.label}</p>
        </Reveal>
        <SplitHeading text={t.title} className="t-h1 mt-4" />
        <Reveal delay={0.2}>
          <p className="t-lead mx-auto mt-7 max-w-2xl text-night-soft">{t.text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <ButtonLink href={localePath(lang, "contact")} size="lg">
            {t.button}
          </ButtonLink>
          <span className="text-night-soft">
            {t.or}{" "}
            <ChevronLink href={`mailto:${site.email}`} tone="dark">
              {site.email}
            </ChevronLink>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
