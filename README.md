# Trevona GmbH – Website

Website der **Trevona GmbH** aus Cham (ZG): Marketing, Websites & Online-Shops, Software & Firmenprogramme sowie Branding.
Slogan: **«Vier Bereiche. Ein Partner.»**

Zweisprachig (Deutsch `/de/`, Englisch `/en/`), Hell- und Dunkelmodus, statischer Export.

## Technik

- [Next.js 16](https://nextjs.org) (App Router, statischer Export via `output: "export"`)
- Tailwind CSS v4
- framer-motion (Animationen), Lenis (weiches Scrollen)
- Schrift: Inter (lokal ausgeliefert über `next/font`)

## Lokal starten

```bash
npm install
npm run dev
```

Danach <http://localhost:3000> öffnen.

## Build

```bash
npm run build
```

Erzeugt den Ordner `out/` mit der kompletten statischen Website. Er kann auf jedem Webhosting hochgeladen werden (eine `.htaccess` für Apache-Hoster wie Hostpoint oder Infomaniak ist dabei).

## Hosting auf Vercel

1. Auf [vercel.com/new](https://vercel.com/new) dieses GitHub-Repository importieren.
2. Framework «Next.js» wird automatisch erkannt. Weitere Einstellungen sind nicht nötig.
3. Optional die Umgebungsvariablen unten setzen (Project → Settings → Environment Variables).
4. Auf «Deploy» klicken. Jeder Push auf `main` aktualisiert die Website automatisch.

## Umgebungsvariablen (optional)

Siehe `.env.example`.

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpunkt für das Kontaktformular (z. B. Formspree). Ohne Endpunkt öffnet das Formular eine vorausgefüllte E-Mail. |
| `NEXT_PUBLIC_PSI_KEY` | Google-API-Schlüssel für den Website-Check (PageSpeed Insights API, kostenlos). Ohne Schlüssel ist das gemeinsame Google-Kontingent meist aufgebraucht. |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com-Link für die Online-Terminbuchung. Ohne Link: «Termin per E-Mail vorschlagen». |

## Wo was angepasst wird

| Datei | Inhalt |
| --- | --- |
| `src/lib/site.ts` | Firmendaten: Adresse, E-Mail, Telefon, UID, Verfügbarkeits-Status |
| `src/content/de.ts`, `src/content/en.ts` | Alle Texte (Deutsch / Englisch) |
| `src/lib/images.ts` | Bilder (aktuell Unsplash; eigene Fotos unter `public/images/` ablegen) |
| `src/lib/pricing.ts` | Richtwerte für den Projekt-Rechner |
| `src/components/brand/Logo.tsx` | Logo, Wortmarke, Slogan-Lockup |
| `public/brand/` | Logo-Dateien (SVG) für Druck und Social Media |

## Vor dem offiziellen Livegang

- [ ] E-Mail-Adresse und Telefonnummer in `src/lib/site.ts` bestätigen
- [ ] Preise im Projekt-Rechner (`src/lib/pricing.ts`) durch eigene Ansätze ersetzen
- [ ] `NEXT_PUBLIC_PSI_KEY` für den Website-Check setzen
- [ ] Formular-Endpunkt und Cal.com-Link einrichten
- [ ] Impressum und Datenschutzerklärung juristisch prüfen lassen
- [ ] Eigene Fotos statt Stockbildern
