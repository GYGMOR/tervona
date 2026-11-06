"use client";

type LoaderProps = { src: string; width: number; quality?: number };

/**
 * Bilder mit einer Unsplash-ID ("photo-…") werden direkt über das
 * Unsplash-CDN in der passenden Breite ausgeliefert. Lokale Bilder
 * (z. B. "/images/team.jpg") werden unverändert verwendet.
 */
export default function imageLoader({ src, width, quality }: LoaderProps) {
  if (src.startsWith("photo-")) {
    return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;
  }
  return `${src}?w=${width}`;
}
