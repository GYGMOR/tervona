import type { Metadata } from "next";
import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Trevona GmbH – Marketing, Websites & Software",
  description:
    "Trevona aus Cham (ZG): Google Ads, SEO, Social Media, massgeschneiderte Websites und individuelle Firmensoftware aus einer Hand.",
  alternates: {
    canonical: "/de/",
    languages: { "de-CH": "/de/", en: "/en/", "x-default": "/" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de-CH" className={fontVars}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
