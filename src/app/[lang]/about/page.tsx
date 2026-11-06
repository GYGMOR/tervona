import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ScrollText from "@/components/motion/ScrollText";
import SplitHeading from "@/components/motion/SplitHeading";
import ZoomImage from "@/components/motion/ZoomImage";
import BrandStory from "@/components/sections/BrandStory";
import CtaSection from "@/components/sections/CtaSection";
import PageHero from "@/components/sections/PageHero";
import WhyStats from "@/components/sections/WhyStats";
import ButtonLink from "@/components/ui/Button";
import SectionIntro from "@/components/ui/SectionIntro";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    alternates: { canonical: localePath(lang, "about"), languages: { "de-CH": localePath("de", "about"), en: localePath("en", "about") } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} text={a.hero.text} />

      <ZoomImage photo="office" alt={a.hero.imageAlt} priority className="h-[60svh] sm:h-[80svh]" />

      {/* Fakten */}
      <section className="bg-surface pb-8 pt-20 sm:pt-28">
        <div className="container-x">
          <RevealGroup as="dl" className="grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.07}>
            {a.facts.items.map((f) => (
              <RevealItem key={f.key} className="rounded-[24px] bg-mist p-7">
                <dt className="text-sm font-semibold text-ink-mute">{f.key}</dt>
                <dd className="mt-2 text-[1.5rem] font-bold leading-tight tracking-[-0.035em]">{f.value}</dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Geschichte */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro eyebrow={a.story.label} title={a.story.title} align="left" />
            <ParallaxImage photo="workshop" alt={t.home.flow.items[0].alt} className="mt-12 aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <RevealGroup className="space-y-6 lg:pt-14" stagger={0.12}>
            {a.story.paragraphs.map((para) => (
              <RevealItem key={para.slice(0, 24)}>
                <p className="t-lead text-ink-soft">{para}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <BrandStory t={t.brand} />

      {/* Zitat */}
      <section className="bg-night py-32 text-white sm:py-44">
        <div className="container-x mx-auto max-w-5xl text-center">
          <ScrollText text={`«${a.story.quote}»`} className="t-statement" />
          <Reveal className="mt-8">
            <p className="text-gradient inline-block font-semibold">{site.name}</p>
          </Reveal>
        </div>
      </section>

      {/* Grundsätze */}
      <section className="bg-surface py-28 sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={a.values.label} title={a.values.title} />
          <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4" stagger={0.08}>
            {a.values.items.map((v, i) => (
              <RevealItem key={v.title} className="rounded-[24px] bg-mist p-8">
                <span className="text-gradient text-[3rem] font-bold leading-none tracking-[-0.05em]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[1.5rem] font-bold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhyStats t={t.why} />

      {/* Standort */}
      <section className="bg-surface px-3 py-3 sm:px-4 sm:py-4">
        <ParallaxImage photo="zugAerial" alt={a.location.imageAlt} className="min-h-[640px] rounded-[32px] sm:min-h-[720px]" sizes="100vw" strength={6}>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <div className="relative z-10 flex min-h-[inherit] items-end">
            <div className="container-x pb-12 text-white sm:pb-16">
              <Reveal y={12}>
                <p className="t-eyebrow text-gradient inline-block">{a.location.label}</p>
              </Reveal>
              <SplitHeading text={a.location.title} className="t-h1 mt-3 max-w-4xl" />
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <Reveal delay={0.15}>
                  <p className="t-lead max-w-xl text-white/80">{a.location.text}</p>
                </Reveal>
                <Reveal delay={0.25} className="flex flex-wrap items-center gap-6">
                  <address className="not-italic leading-relaxed text-white/80">
                    <strong className="font-semibold text-white">{site.name}</strong>
                    <br />
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </address>
                  <ButtonLink href={site.mapsUrl} variant="glass">
                    {a.location.button}
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </div>
        </ParallaxImage>
      </section>

      <CtaSection lang={lang} t={t.cta} />
    </>
  );
}
