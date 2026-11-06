/**
 * Bildwelt der Website (Unsplash-Lizenz, frei nutzbar).
 * Eigene Fotos: Datei in /public/images ablegen und hier den Pfad
 * eintragen, z. B. hero: "/images/hero.jpg".
 */
export const photos = {
  hero: "photo-1556761175-4b46a572b786",
  deskCity: "photo-1497215842964-222b430dc094",
  office: "photo-1559136555-9303baea8ebd",
  officeBright: "photo-1556761175-4b46a572b786",
  analytics: "photo-1460925895917-afdab827c52f",
  analyticsDesk: "photo-1781246435700-afec19012b45",
  analyticsDark: "photo-1551288049-bebda4e38f71",
  social: "photo-1759215524530-a00b7768ce91",
  webDesk: "photo-1499951360447-b19be8fe80f5",
  webScreens: "photo-1559028012-481c04fa702d",
  code: "photo-1607799279861-4dd421887fb3",
  codeDesk: "photo-1618477388954-7852f32655ec",
  laptopGlow: "photo-1531297484001-80022131f5a1",
  brandSwatches: "photo-1716471330463-f475b00f0506",
  brandIdentity: "photo-1548094990-c16ca90f1f0d",
  workshop: "photo-1758691736872-61a1f75fe2d5",
  strategy: "photo-1758873272540-439a105db676",
  team: "photo-1522071820081-009f0129c71c",
  zugAerial: "photo-1624345467237-e62ef3657819",
  zugLake: "photo-1539161171546-5c1750d8fd13",
  zugOldTown: "photo-1599501047945-93134322628a",
} as const;

export type PhotoKey = keyof typeof photos;
