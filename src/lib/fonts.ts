import { Inter } from "next/font/google";

/**
 * Inter mit optischer Grösse (opsz): bei grossen Headlines automatisch der
 * Display-Schnitt – die nächste freie Verwandte von Apples SF Pro.
 */
export const sans = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVars = sans.variable;
