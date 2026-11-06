export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Baut einen lokalisierten Pfad mit abschliessendem Slash, z. B. /de/services/ */
export function localePath(lang: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Tauscht die Sprache im aktuellen Pfad aus. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const replaced = pathname.replace(/^\/(de|en)(?=\/|$)/, `/${target}`);
  const withLocale = replaced === pathname && !/^\/(de|en)(\/|$)/.test(pathname) ? `/${target}${pathname}` : replaced;
  return withLocale.endsWith("/") ? withLocale : `${withLocale}/`;
}

export const htmlLang: Record<Locale, string> = { de: "de-CH", en: "en" };
export const ogLocale: Record<Locale, string> = { de: "de_CH", en: "en_GB" };
