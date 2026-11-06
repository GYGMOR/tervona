import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";
import ButtonLink from "@/components/ui/Button";
import Availability from "@/components/ui/Availability";
import LocalTime from "@/components/ui/LocalTime";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const f = t.footer;
  const year = new Date().getFullYear();

  const columns = [
    { title: f.services, links: t.services.list.map((s) => ({ href: localePath(lang, `services/${s.slug}`), label: s.title })) },
    {
      title: f.company,
      links: [
        { href: localePath(lang, "about"), label: t.nav.about },
        { href: localePath(lang, "services"), label: t.nav.services },
        { href: localePath(lang, "estimator"), label: t.nav.estimator },
        { href: localePath(lang, "website-check"), label: t.nav.check },
        { href: localePath(lang, "contact"), label: t.nav.contact },
      ],
    },
    {
      title: f.legal,
      links: [
        { href: localePath(lang, "imprint"), label: f.imprint },
        { href: localePath(lang, "privacy"), label: f.privacy },
      ],
    },
  ];

  return (
    <footer className="bg-mist text-[0.8125rem] text-ink-soft">
      <div className="container-x pb-8 pt-16 sm:pt-20">
        <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Link href={localePath(lang)} aria-label={t.nav.homeLabel} className="inline-block rounded-lg">
              <LogoLockup slogan={t.brand.slogan} />
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed">{f.tagline}</p>
            {site.availableForProjects && <Availability label={t.common.available} className="mt-5" />}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[0.95rem] font-semibold text-ink">{f.ctaTitle}</span>
            <ButtonLink href={localePath(lang, "contact")}>{t.nav.cta}</ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-semibold text-ink">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="font-semibold text-ink">{f.contact}</p>
            <address className="mt-3 space-y-2.5 not-italic">
              <a href={`mailto:${site.email}`} className="block text-link hover:underline">
                {site.email}
              </a>
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block hover:text-ink">
                  {site.phone}
                </a>
              )}
              <p className="leading-relaxed">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}, {lang === "de" ? "Schweiz" : "Switzerland"}
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {f.rights} <span className="hidden sm:inline">UID {site.uid}</span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <ThemeToggle labels={t.theme} />
            <span>
              {f.localTime} <LocalTime className="font-medium text-ink" />
            </span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className="flex gap-3">
              <Link href={localePath("de")} hrefLang="de" lang="de" className={lang === "de" ? "font-medium text-ink" : "hover:text-ink"}>
                Deutsch
              </Link>
              <Link href={localePath("en")} hrefLang="en" lang="en" className={lang === "en" ? "font-medium text-ink" : "hover:text-ink"}>
                English
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
