import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import BookingCard from "@/components/sections/BookingCard";
import ContactForm from "@/components/sections/ContactForm";
import Availability from "@/components/ui/Availability";
import Faq from "@/components/sections/Faq";
import PageHero from "@/components/sections/PageHero";
import { Chevron } from "@/components/ui/Button";
import { IconMail, IconPhone, IconPin } from "@/components/ui/Icons";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    alternates: { canonical: localePath(lang, "contact"), languages: { "de-CH": localePath("de", "contact"), en: localePath("en", "contact") } },
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = t.contact;

  const cards = [
    { icon: IconMail, label: c.info.email, value: site.email, href: `mailto:${site.email}` },
    ...(site.phone ? [{ icon: IconPhone, label: c.info.phone, value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` }] : []),
    { icon: IconPin, label: c.info.address, value: `${site.address.street}, ${site.address.zip} ${site.address.city}`, href: site.mapsUrl, hint: c.info.map },
  ];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text}>
        {site.availableForProjects && <Availability label={t.common.available} />}
      </PageHero>

      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-5">
            <BookingCard t={c.booking} />
          </Reveal>
        </div>
        <div className="container-x grid gap-5 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <RevealGroup className="space-y-4" stagger={0.08}>
              {cards.map((card) => {
                const Icon = card.icon;
                const external = card.href.startsWith("http");
                return (
                  <RevealItem key={card.label}>
                    <a
                      href={card.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-5 rounded-[24px] bg-card p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:p-7"
                    >
                      <span className="bg-brand grid h-12 w-12 shrink-0 place-items-center rounded-[14px] text-white">
                        <Icon size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink-mute">{card.label}</span>
                        <span className="mt-0.5 block truncate text-[1.15rem] font-semibold tracking-[-0.02em]">{card.value}</span>
                        {"hint" in card && card.hint && <span className="mt-0.5 block text-sm text-link">{card.hint}</span>}
                      </span>
                      <Chevron className="shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal delay={0.15}>
              <div className="rounded-[24px] bg-night p-7 text-white sm:p-9">
                <h2 className="text-[1.35rem] font-bold tracking-[-0.03em]">{c.info.nextTitle}</h2>
                <ol className="mt-6 space-y-5">
                  {c.info.next.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="text-gradient w-6 shrink-0 font-bold">{String(i + 1).padStart(2, "0")}</span>
                      <p className="leading-relaxed text-night-soft">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal y={30}>
              <ContactForm lang={lang} t={c.form} />
            </Reveal>
          </div>
        </div>
      </section>

      <Faq t={t.faq} />
    </>
  );
}
