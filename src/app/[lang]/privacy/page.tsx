import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/sections/LegalPage";
import { getDictionary } from "@/content";
import { hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.privacyTitle,
    alternates: { canonical: localePath(lang, "privacy"), languages: { "de-CH": localePath("de", "privacy"), en: localePath("en", "privacy") } },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = getDictionary(lang).legal.privacy;
  return <LegalPage eyebrow={l.eyebrow} title={l.title} updated={l.updated} sections={l.sections} />;
}
