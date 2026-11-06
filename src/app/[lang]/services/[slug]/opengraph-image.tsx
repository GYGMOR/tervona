import { getDictionary, serviceSlugs } from "@/content";
import { hasLocale, locales } from "@/lib/i18n";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Trevona GmbH – Leistung";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "de");
  const s = t.services.list.find((x) => x.slug === slug) ?? t.services.list[0];
  return renderOg({
    slogan: t.brand.slogan,
    eyebrow: `${s.number} · ${s.title}`,
    title: s.heroTitle.replace(/\*/g, "").replace("\n", " "),
    subtitle: s.short,
  });
}
