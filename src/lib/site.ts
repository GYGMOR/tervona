/**
 * Zentrale Firmendaten – hier anpassen, wenn sich etwas ändert.
 * Telefonnummer: sobald vorhanden bei `phone` eintragen (z. B. "+41 41 000 00 00"),
 * dann erscheint sie automatisch in Footer und Kontaktseite.
 */
export const site = {
  name: "Trevona GmbH",
  brand: "Trevona",
  url: "https://trevona.ch",
  domain: "trevona.ch",
  email: "info@trevona.ch",
  phone: null as string | null,
  address: {
    street: "Sinserstrasse 67",
    zip: "6330",
    city: "Cham",
    canton: "ZG",
    cantonName: "Zug",
    country: "CH",
  },
  uid: "CHE-208.868.552",
  registerNumber: "CH-170.4.025.232-6",
  managingDirector: "Cédric Bürki",
  founded: 2026,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sinserstrasse%2067%2C%206330%20Cham",
  /**
   * Optional: Endpunkt für das Kontaktformular (z. B. Formspree).
   * Ohne Endpunkt öffnet das Formular eine vorausgefüllte E-Mail.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  /**
   * Online-Terminbuchung (z. B. "https://cal.com/trevona/erstgespraech").
   * Leer = Button «Termin per E-Mail vorschlagen».
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  /** Status im Footer & auf der Kontaktseite: «Verfügbar für neue Projekte» */
  availableForProjects: true,
  /** Optionaler Google-API-Schlüssel für den Website-Check (höheres Kontingent) */
  pageSpeedKey: process.env.NEXT_PUBLIC_PSI_KEY ?? "",
};
