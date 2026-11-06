import type { Locale } from "@/lib/i18n";
import de, { type Dictionary } from "./de";
import en from "./en";

const dictionaries: Record<Locale, Dictionary> = { de, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

export type { Dictionary };
export * from "./types";
