import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import CtaSection from "@/components/sections/CtaSection";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import ButtonLink, { ChevronLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import SectionIntro from "@/components/ui/SectionIntro";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    alternates: { canonical: localePath(lang, "services"), languages: { "de-CH": localePath("de", "services"), en: localePath("en", "services") } },
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.services.page;

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} text={p.text}>
        {t.services.list.map((s) => (
          <a key={s.slug} href={`#${s.slug}`} className="rounded-full bg-mist px-4 py-2 text-[0.9rem] font-medium text-ink transition-colors hover:bg-line">
            {s.title}
          </a>
        ))}
      </PageHero>

      {/* Produkt-Kacheln */}
      <div className="space-y-3 px-3 pb-3 sm:space-y-4 sm:px-4 sm:pb-4">
        {t.services.list.map((s, i) => {
          const dark = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className={cn("scroll-mt-16 overflow-hidden rounded-[32px] py-20 sm:py-28", dark ? "bg-night text-white" : "bg-mist text-ink")}
            >
              <div className="container-x text-center">
                <Reveal y={12}>
                  <p className="t-eyebrow text-gradient inline-block">
                    {s.number} · {s.tags.slice(0, 3).join(" · ")}
                  </p>
                </Reveal>
                <SplitHeading text={s.title} className="t-h1 mt-3" />
                <Reveal delay={0.15}>
                  <p className={cn("t-lead mx-auto mt-6 max-w-2xl", dark ? "text-night-soft" : "text-ink-soft")}>{s.intro}</p>
                </Reveal>
                <Reveal delay={0.25} className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  <ButtonLink href={localePath(lang, `services/${s.slug}`)}>{t.common.learnMore}</ButtonLink>
                  <ChevronLink href={localePath(lang, "contact")} tone={dark ? "dark" : "light"}>
                    {t.nav.cta}
                  </ChevronLink>
                </Reveal>
              </div>

              <div className="container-x mt-14 sm:mt-20">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Link href={localePath(lang, `services/${s.slug}`)} data-cursor={t.common.view} tabIndex={-1} aria-hidden="true" className="block sm:col-span-2">
                    <ViewTransition name={`svc-${s.slug}`} share="morph" default="none">
                      <ParallaxImage photo={s.image} alt={s.imageAlt} className="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[460px]" sizes="(min-width: 640px) 66vw, 100vw" />
                    </ViewTransition>
                  </Link>
                  <ParallaxImage photo={s.image2} alt={s.image2Alt} className="aspect-[4/3] sm:aspect-auto sm:min-h-[460px]" sizes="(min-width: 640px) 33vw, 100vw" strength={12} />
                </div>
                <RevealGroup className="mt-14 grid gap-x-10 gap-y-8 text-left sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                  {s.items.map((it) => (
                    <RevealItem key={it.title} className="flex gap-4">
                      <span className="bg-brand mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white">
                        <IconCheck size={15} strokeWidth={2.4} />
                      </span>
                      <div>
                        <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">{it.title}</h3>
                        <p className={cn("mt-1.5 leading-relaxed", dark ? "text-night-soft" : "text-ink-soft")}>{it.text}</p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}
      </div>

      {/* Zusammenspiel */}
      <section className="bg-surface py-28 sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={lang === "de" ? "Zusammenspiel" : "Working together"} title={p.combineTitle} text={p.combineText} />
          <RevealGroup as="ol" className="mx-auto mt-16 flex max-w-5xl flex-col items-stretch gap-3 sm:flex-row sm:items-center" stagger={0.12}>
            {p.combineSteps.map((step, i) => (
              <RevealItem as="li" key={step} className="flex flex-1 items-center gap-3">
                <span className="flex-1 rounded-[20px] bg-mist px-6 py-6 text-center">
                  <span className="text-gradient block text-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.035em]">{step}</span>
                </span>
                {i < p.combineSteps.length - 1 && (
                  <span className="hidden text-2xl text-ink-mute sm:block" aria-hidden="true">
                    →
                  </span>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="bg-mist">
        <Process t={t.process} />
      </div>

      <CtaSection lang={lang} t={t.cta} />
    </>
  );
}
