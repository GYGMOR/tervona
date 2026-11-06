import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import Estimator from "@/components/tools/Estimator";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/estimator">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.estimatorTitle,
    description: t.meta.estimatorDescription,
    alternates: { canonical: localePath(lang, "estimator"), languages: { "de-CH": localePath("de", "estimator"), en: localePath("en", "estimator") } },
  };
}

export default async function EstimatorPage({ params }: PageProps<"/[lang]/estimator">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <PageHero eyebrow={t.estimator.eyebrow} title={t.estimator.title} text={t.estimator.text} className="pb-10 sm:pb-14" />
      <section className="bg-mist px-3 py-12 sm:px-4 sm:py-20">
        <Estimator lang={lang} t={t.estimator} interestOptions={t.contact.form.interestOptions} />
      </section>
    </>
  );
}
