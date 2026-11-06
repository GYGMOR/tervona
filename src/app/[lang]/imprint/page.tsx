import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/sections/LegalPage";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/imprint">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.imprintTitle,
    alternates: { canonical: localePath(lang, "imprint"), languages: { "de-CH": localePath("de", "imprint"), en: localePath("en", "imprint") } },
  };
}

export default async function ImprintPage({ params }: PageProps<"/[lang]/imprint">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = getDictionary(lang).legal.imprint;
  return <LegalPage eyebrow={l.eyebrow} title={l.title} sections={l.sections} />;
}
