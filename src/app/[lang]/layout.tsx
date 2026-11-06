import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MotionProvider from "@/components/motion/MotionProvider";
import { TILE, TILES, Wordmark } from "@/components/brand/Logo";
import GlassCursor from "@/components/motion/GlassCursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { themeScript } from "@/components/ui/ThemeToggle";
import { getDictionary } from "@/content";
import { fontVars } from "@/lib/fonts";
import { hasLocale, htmlLang, localePath, locales, ogLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: `%s | ${site.name}` },
    description: t.meta.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: localePath(lang),
      languages: { "de-CH": localePath("de"), en: localePath("en"), "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      url: localePath(lang),
    },
    twitter: { card: "summary_large_image", title: t.meta.siteTitle, description: t.meta.siteDescription },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/icon.svg`,
    description: t.meta.siteDescription,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.canton,
      addressCountry: site.address.country,
    },
    areaServed: ["CH", "Worldwide"],
    knowsLanguage: ["de", "en"],
    identifier: site.uid,
    makesOffer: t.services.list.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.short } })),
  };

  const navServices = t.services.list.map(({ slug, title, short, number, image, imageAlt }) => ({ slug, title, short, number, image, imageAlt }));

  return (
    <html lang={htmlLang[lang]} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <div className="intro" aria-hidden="true">
          <div className="flex flex-col items-center text-ink">
            <svg viewBox="0 0 40 40" className="h-20 w-20 overflow-visible sm:h-24 sm:w-24">
              <defs>
                {TILES.map((tile, i) => (
                  <linearGradient key={i} id={`intro-${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={tile.from} />
                    <stop offset="1" stopColor={tile.to} />
                  </linearGradient>
                ))}
              </defs>
              {TILES.map((tile, i) => (
                <rect key={i} className="intro-tile" x={tile.x} y={tile.y} width={TILE} height={TILE} rx="3.3" fill={`url(#intro-${i})`} />
              ))}
            </svg>
            <div className="intro-word mt-7">
              <Wordmark className="h-10 w-auto sm:h-12" />
            </div>
            <p className="intro-slogan mt-3 text-lg font-medium tracking-[-0.01em] text-ink-soft">{t.brand.slogan}</p>
          </div>
        </div>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-5 py-3 text-surface focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          {t.nav.skip}
        </a>
        <MotionProvider>
          <SmoothScroll />
          <GlassCursor />
          <Header lang={lang} t={t.nav} theme={t.theme} slogan={t.brand.slogan} services={navServices} />
          <main id="main">{children}</main>
          <Footer lang={lang} t={t} />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
