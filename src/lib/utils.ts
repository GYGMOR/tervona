export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type Segment = { text: string; accent: boolean };

/** Zerlegt "Text mit *Akzent*" in normale und hervorgehobene Teile. */
export function parseAccent(input: string): Segment[] {
  return input
    .split("*")
    .map((text, i) => ({ text, accent: i % 2 === 1 }))
    .filter((s) => s.text.length > 0);
}

/** Entfernt die Akzent-Markierungen für Metadaten & Screenreader. */
export const plain = (input: string) => input.replace(/\*/g, "");

export const EASE = [0.16, 1, 0.3, 1] as const;
