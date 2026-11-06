import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/brand/Logo";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 – Seite nicht gefunden | Trevona GmbH",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de-CH" className={fontVars}>
      <body className="min-h-screen bg-surface text-ink">
        <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-20 text-center">
          <div aria-hidden="true" className="bg-brand pointer-events-none absolute left-1/2 top-1/3 h-80 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full opacity-15 blur-[110px]" />
          <div className="relative">
            <a href="/de/" aria-label="Trevona – Startseite" className="inline-block">
              <Logo />
            </a>
            <p className="text-gradient mt-12 text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-[-0.06em]">404</p>
            <h1 className="t-h3 mt-4">Seite nicht gefunden.</h1>
            <p className="mt-2 text-ink-soft">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
            <p className="mt-1 text-sm text-ink-mute" lang="en">
              The page you are looking for doesn’t exist or has been moved.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href="/de/" className="rounded-full bg-blue px-6 py-3 font-medium text-white hover:bg-blue-hover">
                Zur Startseite
              </a>
              <a href="/en/" lang="en" className="rounded-full bg-mist px-6 py-3 font-medium hover:bg-line">
                Back to home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
