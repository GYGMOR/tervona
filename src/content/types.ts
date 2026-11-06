import type { PhotoKey } from "@/lib/images";

export type ServiceSlug = "marketing" | "web" | "software" | "branding";
export const serviceSlugs: ServiceSlug[] = ["marketing", "web", "software", "branding"];

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  /** Titel für die Detailseite, *Akzent* möglich */
  heroTitle: string;
  short: string;
  intro: string;
  tags: string[];
  image: PhotoKey;
  imageAlt: string;
  image2: PhotoKey;
  image2Alt: string;
  items: { title: string; text: string }[];
  benefits: string[];
  tools: string[];
  metaDescription: string;
};

export type FlowItem = { title: string; text: string; image: PhotoKey; alt: string };
export type TitledText = { title: string; text: string };
export type LegalSection = { title: string; paragraphs?: string[]; list?: string[] };
