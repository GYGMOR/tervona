import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ZoomImage from "@/components/motion/ZoomImage";
import CtaSection from "@/components/sections/CtaSection";
import PageHero from "@/components/sections/PageHero";
import ButtonLink, { Chevron, ChevronLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import Photo from "@/components/ui/Photo";
import SectionIntro from "@/components/ui/SectionIntro";
import { getDictionary, serviceSlugs } from "@/content";
import { hasLocale, localePath, locales } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const s = getDictionary(lang).services.list.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.metaDescription,
    alternates: {
      canonical: localePath(lang, `services/${slug}`),
      languages: { "de-CH": localePath("de", `services/${slug}`), en: localePath("en", `services/${slug}`) },
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const s = t.services.list.find((x) => x.slug === slug);
  if (!s) notFound();
  const d = t.services.detail;
  const others = t.services.list.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow={`${s.number} · ${s.title}`} title={s.heroTitle} text={s.intro}>
        <ButtonLink href={localePath(lang, "contact")} size="lg">
          {t.nav.cta}
        </ButtonLink>
        <ChevronLink href={localePath(lang, "services")}>{d.back}</ChevronLink>
      </PageHero>

      <ViewTransition name={`svc-${s.slug}`} share="morph" default="none">
        <div>
          <ZoomImage photo={s.image} alt={s.imageAlt} priority className="h-[60svh] sm:h-[78svh]" />
        </div>
      </ViewTransition>

      {/* Leistungen im Detail */}
      <section className="bg-mist py-28 sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={d.included} title={d.includedTitle} />
          <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" stagger={0.07}>
            {s.items.map((it, i) => (
              <RevealItem key={it.title}>
                <article className="h-full rounded-[24px] bg-card p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-9">
                  <span className="text-gradient text-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.025em]">{it.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{it.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Nutzen */}
      <section className="bg-night py-28 text-white sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={d.benefits} title={d.benefitsTitle} tone="dark" />
          <RevealGroup as="ul" className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2" stagger={0.08}>
            {s.benefits.map((b) => (
              <RevealItem as="li" key={b} className="flex items-center gap-4 rounded-[20px] bg-night-3 p-6">
                <span className="bg-brand grid h-9 w-9 shrink-0 place-items-center rounded-full">
                  <IconCheck size={18} strokeWidth={2.4} />
                </span>
                <span className="text-[1.15rem] font-semibold tracking-[-0.02em]">{b}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-sm font-semibold text-night-soft">{d.tools}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {s.tools.map((tool) => (
                <li key={tool} className="glass-dark rounded-full border border-white/10 px-4 py-2 text-[0.9rem] text-white/90">
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Weitere Leistungen */}
      <section className="bg-surface py-28 sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={d.others} title={t.home.services.title} />
          <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <Link href={localePath(lang, `services/${o.slug}`)} className="group block overflow-hidden rounded-[24px] bg-mist">
                  <ViewTransition name={`svc-${o.slug}`} share="morph" default="none">
                    <div className="relative aspect-[16/11] overflow-hidden" data-cursor={t.common.view}>
                      <Photo photo={o.image} alt={o.imageAlt} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                    </div>
                  </ViewTransition>
                  <div className="p-7">
                    <p className="text-sm font-semibold text-ink-mute">{o.number}</p>
                    <h3 className="mt-1 text-[1.4rem] font-bold tracking-[-0.03em]">{o.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{o.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-link">
                      {t.common.learnMore} <Chevron className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection lang={lang} t={t.cta} />
    </>
  );
}
