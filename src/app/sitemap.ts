import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "services", ...serviceSlugs.map((s) => `services/${s}`), "about", "estimator", "website-check", "contact", "imprint", "privacy"];
  return paths.flatMap((path) =>
    (["de", "en"] as const).map((lang) => ({
      url: `${site.url}${localePath(lang, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("services") ? 0.8 : 0.5,
      alternates: {
        languages: {
          "de-CH": `${site.url}${localePath("de", path)}`,
          en: `${site.url}${localePath("en", path)}`,
        },
      },
    })),
  );
}
