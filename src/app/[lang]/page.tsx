import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/home/Hero";
import ImageFlow from "@/components/home/ImageFlow";
import ServiceMarquee from "@/components/home/ServiceMarquee";
import ServicesBento from "@/components/home/ServicesBento";
import DeviceShowcase from "@/components/home/showcase/DeviceShowcase";
import ToolsTeaser from "@/components/home/ToolsTeaser";
import Reveal from "@/components/motion/Reveal";
import ScrollText from "@/components/motion/ScrollText";
import CtaSection from "@/components/sections/CtaSection";
import Faq from "@/components/sections/Faq";
import Process from "@/components/sections/Process";
import WhyStats from "@/components/sections/WhyStats";
import { ChevronLink } from "@/components/ui/Button";
import SectionIntro from "@/components/ui/SectionIntro";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: { absolute: t.meta.siteTitle }, description: t.meta.siteDescription };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const h = t.home;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((q) => ({ "@type": "Question", name: q.title, acceptedAnswer: { "@type": "Answer", text: q.text } })),
  };

  return (
    <>
      <Hero lang={lang} t={h.hero} />

      <ServiceMarquee items={h.marquee} />

      {/* Statement auf Schwarz */}
      <section className="bg-night py-32 text-white sm:py-48">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <Reveal y={12}>
              <p className="t-eyebrow text-gradient inline-block">{h.intro.label}</p>
            </Reveal>
            <ScrollText text={h.intro.text} className="t-statement mt-5" />
            <Reveal className="mt-10">
              <ChevronLink href={localePath(lang, "about")} tone="dark">
                {h.intro.link}
              </ChevronLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leistungen als Bento */}
      <section className="bg-mist py-28 sm:py-36">
        <div className="container-x">
          <SectionIntro eyebrow={h.services.label} title={h.services.title} text={h.services.text} />
          <div className="mt-16 sm:mt-20">
            <ServicesBento lang={lang} services={t.services.list} learnMore={t.common.learnMore} ask={t.nav.cta} view={t.common.view} />
          </div>
        </div>
      </section>

      <DeviceShowcase lang={lang} t={h.showcase} />

      <ImageFlow lang={lang} t={h.flow} view={t.common.view} />

      <Process t={t.process} />

      <WhyStats t={t.why} />

      <ToolsTeaser lang={lang} t={h.tools} />

      <Faq t={t.faq} />

      <CtaSection lang={lang} t={t.cta} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
