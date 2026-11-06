import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import WebsiteCheck from "@/components/tools/WebsiteCheck";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/website-check">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.checkTitle,
    description: t.meta.checkDescription,
    alternates: { canonical: localePath(lang, "website-check"), languages: { "de-CH": localePath("de", "website-check"), en: localePath("en", "website-check") } },
  };
}

export default async function WebsiteCheckPage({ params }: PageProps<"/[lang]/website-check">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <PageHero eyebrow={t.check.eyebrow} title={t.check.title} text={t.check.text} className="pb-10 sm:pb-14" />
      <section className="bg-mist px-3 py-12 sm:px-4 sm:py-20">
        <WebsiteCheck lang={lang} t={t.check} />
      </section>
    </>
  );
}
