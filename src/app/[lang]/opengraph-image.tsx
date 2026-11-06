import { getDictionary } from "@/content";
import { hasLocale, locales } from "@/lib/i18n";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Trevona GmbH – Marketing, Websites & Software aus Cham";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "de");
  return renderOg({
    slogan: t.brand.slogan,
    eyebrow: `${t.home.hero.meta[0]} · ${t.home.hero.meta[1]}`,
    title: t.home.hero.title.replace(/\*/g, "").replace("\n", " "),
    subtitle: t.home.hero.meta[2],
  });
}
