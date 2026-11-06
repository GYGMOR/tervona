import { site } from "@/lib/site";
import type { FlowItem, LegalSection, Service, TitledText } from "./types";

const services: Service[] = [
  {
    slug: "marketing",
    number: "01",
    title: "Online-Marketing",
    heroTitle: "Mehr Sichtbarkeit.\n*Mehr Anfragen.*",
    short: "Google Ads, SEO und Social Media, die messbar mehr Anfragen und Umsatz bringen.",
    intro:
      "Wir bringen Ihr Angebot dorthin, wo Ihre Kundinnen und Kunden suchen: zuoberst bei Google, in die sozialen Medien und in ihren Posteingang. Jede Massnahme wird sauber gemessen, laufend optimiert und transparent rapportiert.",
    tags: ["Google Ads", "SEO", "Social Media", "Newsletter", "Analytics"],
    image: "analytics",
    imageAlt: "Laptop mit geöffnetem Analytics-Dashboard und Diagrammen",
    image2: "social",
    image2Alt: "Hand hält ein Smartphone mit Social-Media-Inhalten",
    items: [
      {
        title: "Google Ads",
        text: "Such-, Display- und YouTube-Kampagnen sowie Performance Max, präzise auf Ihre Zielgruppe und Ihr Budget ausgerichtet.",
      },
      {
        title: "Suchmaschinen­optimierung (SEO)",
        text: "Technik, Inhalte und lokale Sichtbarkeit, damit man Sie bei Google und in Google Maps findet.",
      },
      {
        title: "Social Media Marketing",
        text: "Strategie, Content und bezahlte Kampagnen auf Instagram, Facebook, LinkedIn und TikTok.",
      },
      {
        title: "Content & Newsletter",
        text: "Texte, Bilder und E-Mail-Kampagnen, die Ihre Marke stärken und Kunden langfristig binden.",
      },
      {
        title: "Tracking & Analytics",
        text: "Saubere Messung mit Google Analytics 4, Tag Manager und Conversion-Tracking, datenschutzkonform umgesetzt.",
      },
      {
        title: "Reporting & Beratung",
        text: "Verständliche Reports und regelmässige Besprechungen, damit Sie jederzeit wissen, was Ihr Budget bewirkt.",
      },
    ],
    benefits: [
      "Qualifizierte Anfragen statt blosser Klicks",
      "Volle Kostenkontrolle und transparente Reports",
      "Laufende Optimierung auf Basis echter Daten",
      "Mehr Sichtbarkeit in Ihrer Region",
    ],
    tools: ["Google Ads", "Google Analytics 4", "Tag Manager", "Search Console", "Meta Business Suite", "LinkedIn Ads", "Brevo", "Mailchimp"],
    metaDescription:
      "Google Ads, SEO, Social Media und Newsletter-Marketing von Trevona aus Cham: messbar mehr Sichtbarkeit, Anfragen und Umsatz für Ihr Unternehmen.",
  },
  {
    slug: "web",
    number: "02",
    title: "Websites & Online-Shops",
    heroTitle: "Websites und Shops\n*nach Mass.*",
    short: "Massgeschneiderte Websites und Shops, die schnell laden, überzeugen und verkaufen.",
    intro:
      "Bei uns gibt es keine Baukasten-Lösung von der Stange. Wir gestalten und entwickeln Websites, die zu Ihrer Marke passen, auf jedem Gerät einwandfrei funktionieren und aus Besuchern Kunden machen.",
    tags: ["Webdesign", "Online-Shops", "Landingpages", "CMS", "Hosting"],
    image: "webDesk",
    imageAlt: "Heller Arbeitsplatz mit Laptop und Monitor, auf dem eine Website geöffnet ist",
    image2: "webScreens",
    image2Alt: "Bildschirm mit Webdesign-Entwürfen in einem Designprogramm",
    items: [
      {
        title: "Custom Webdesign",
        text: "Individuelles Design auf Basis Ihrer Marke, von der ersten Skizze bis zum klickbaren Prototyp.",
      },
      {
        title: "Webentwicklung",
        text: "Moderne Technologien wie Next.js und React für Geschwindigkeit, Sicherheit und Flexibilität.",
      },
      {
        title: "Online-Shops",
        text: "E-Commerce mit Shopify, WooCommerce oder massgeschneidert, inklusive Schweizer Zahlungsmitteln wie TWINT.",
      },
      {
        title: "Landingpages",
        text: "Fokussierte Seiten für Kampagnen und Produkte, optimiert auf Anfragen und Verkäufe.",
      },
      {
        title: "CMS & Inhaltspflege",
        text: "Sie bearbeiten Texte und Bilder selbst, mit einem System, das einfach zu bedienen ist.",
      },
      {
        title: "Hosting & Wartung",
        text: "Hosting, Updates, Backups und Monitoring, damit Ihre Website zuverlässig läuft.",
      },
    ],
    benefits: [
      "Perfekt auf Smartphone, Tablet und Desktop",
      "Kurze Ladezeiten und eine solide SEO-Basis",
      "Barrierearm und datenschutzkonform (DSG/DSGVO)",
      "Inhalte einfach selbst pflegen",
    ],
    tools: ["Next.js", "React", "WordPress", "Shopify", "WooCommerce", "Figma", "Tailwind CSS", "Headless CMS"],
    metaDescription:
      "Massgeschneiderte Websites, Online-Shops und Landingpages von Trevona aus Cham: modern, schnell, responsive und suchmaschinenoptimiert.",
  },
  {
    slug: "software",
    number: "03",
    title: "Software & Firmenprogramme",
    heroTitle: "Software für\n*Ihre Abläufe.*",
    short: "Individuelle Firmenprogramme, Web-Apps und Automatisierungen für einen einfacheren Arbeitsalltag.",
    intro:
      "Excel-Listen, doppelte Dateneingaben, Programme, die nicht miteinander sprechen? Wir entwickeln Software, die genau auf Ihre Abläufe zugeschnitten ist, vom internen Tool bis zum Kundenportal.",
    tags: ["Firmensoftware", "Web-Apps", "Automatisierung", "Schnittstellen", "Dashboards"],
    image: "code",
    imageAlt: "Laptop mit Programmcode in einem dunklen Editor",
    image2: "codeDesk",
    image2Alt: "Entwickler arbeitet am Laptop an Programmcode",
    items: [
      {
        title: "Individuelle Firmensoftware",
        text: "Massgeschneiderte Programme für Auftragsverwaltung, Planung, Lager, Offerten oder Zeiterfassung.",
      },
      {
        title: "Web-Apps & Kundenportale",
        text: "Browserbasierte Anwendungen, die überall funktionieren, ganz ohne Installation.",
      },
      {
        title: "Automatisierung",
        text: "Wiederkehrende Aufgaben automatisieren und dadurch Zeit sparen und Fehler vermeiden.",
      },
      {
        title: "Schnittstellen (APIs)",
        text: "Wir verbinden Ihre bestehenden Systeme wie CRM, ERP, Buchhaltung oder Online-Shop.",
      },
      {
        title: "Dashboards & Auswertungen",
        text: "Alle wichtigen Kennzahlen Ihres Unternehmens auf einen Blick, stets aktuell.",
      },
      {
        title: "Betrieb & Weiterentwicklung",
        text: "Hosting, Support und neue Funktionen, wenn Ihr Unternehmen wächst.",
      },
    ],
    benefits: [
      "Software, die sich Ihren Abläufen anpasst, nicht umgekehrt",
      "Weniger manuelle Arbeit und weniger Fehler",
      "Skalierbar, sicher und wartbar aufgebaut",
      "Persönlicher Support statt anonymer Hotline",
    ],
    tools: ["TypeScript", "React", "Node.js", "Python", "PostgreSQL", "REST & GraphQL", "Docker", "Cloud-Hosting"],
    metaDescription:
      "Individuelle Firmensoftware, Web-Apps, Automatisierungen und Schnittstellen von Trevona aus Cham, massgeschneidert für Ihre Abläufe.",
  },
  {
    slug: "branding",
    number: "04",
    title: "Branding & Design",
    heroTitle: "Ein Auftritt\n*mit Wiedererkennung.*",
    short: "Ein starker Auftritt, der im Kopf bleibt, vom Logo bis zum kompletten Erscheinungsbild.",
    intro:
      "Ihre Marke ist mehr als ein Logo. Wir entwickeln ein Erscheinungsbild, das Ihre Werte transportiert und auf allen Kanälen, online wie offline, einheitlich und wiedererkennbar wirkt.",
    tags: ["Logo", "Corporate Design", "UI/UX", "Styleguide"],
    image: "brandSwatches",
    imageAlt: "Farbmuster, Skizzen und Stifte auf einem Designertisch",
    image2: "brandIdentity",
    image2Alt: "Brand-Identity-Unterlagen neben Tastatur und Laptop",
    items: [
      {
        title: "Markenstrategie",
        text: "Positionierung, Zielgruppen und Tonalität als Fundament für jeden Auftritt.",
      },
      {
        title: "Logo & Corporate Design",
        text: "Logo, Farben, Schriften und Gestaltungsregeln in einem klaren Styleguide.",
      },
      {
        title: "UI/UX Design",
        text: "Benutzeroberflächen für Websites und Apps, die intuitiv funktionieren.",
      },
      {
        title: "Geschäftsdrucksachen",
        text: "Visitenkarten, Briefpapier, Präsentationen und Vorlagen aus einem Guss.",
      },
      {
        title: "Social-Media-Design",
        text: "Vorlagen und Visuals, die im Feed auffallen und wiedererkannt werden.",
      },
      {
        title: "Bildsprache & Content",
        text: "Bild- und Textwelten, die Ihre Marke erlebbar machen.",
      },
    ],
    benefits: [
      "Ein einheitlicher, professioneller Auftritt",
      "Höhere Wiedererkennung bei Ihrer Zielgruppe",
      "Klare Regeln für alle Kanäle",
      "Design, das Vertrauen schafft",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign", "After Effects", "Styleguides"],
    metaDescription:
      "Markenstrategie, Logo, Corporate Design und UI/UX von Trevona aus Cham: ein Auftritt, der im Kopf bleibt.",
  },
];

const flow: FlowItem[] = [
  { title: "Workshop", text: "Ziele klären, Ideen sammeln, Prioritäten setzen.", image: "workshop", alt: "Team bei einem Workshop mit Haftnotizen an einer Glaswand" },
  { title: "Design", text: "Farben, Formen und Typografie mit Charakter.", image: "brandSwatches", alt: "Farbmuster und Skizzen auf einem Tisch" },
  { title: "Entwicklung", text: "Sauberer Code für schnelle, sichere Lösungen.", image: "code", alt: "Laptop mit Programmcode" },
  { title: "Kampagnen", text: "Anzeigen, die zur richtigen Zeit erscheinen.", image: "analytics", alt: "Analytics-Dashboard auf einem Laptop" },
  { title: "Social Media", text: "Inhalte, die Menschen wirklich erreichen.", image: "social", alt: "Smartphone mit Social-Media-Feed" },
  { title: "Launch", text: "Live auf allen Geräten, vom Smartphone bis zum Desktop.", image: "webDesk", alt: "Arbeitsplatz mit Laptop und Monitor" },
  { title: "Cham, Zug", text: "Unsere Basis im Herzen der Schweiz.", image: "zugAerial", alt: "Luftaufnahme von Zug mit See und Bergen" },
];

const why: (TitledText & { icon: "layers" | "user" | "chart" | "shield" | "receipt" | "globe" })[] = [
  { icon: "layers", title: "Alles aus einer Hand", text: "Marketing, Website und Software von einem Partner, aufeinander abgestimmt statt zusammengestückelt." },
  { icon: "user", title: "Persönlich & direkt", text: "Sie haben eine feste Ansprechperson, die Ihr Projekt und Ihr Unternehmen kennt." },
  { icon: "chart", title: "Messbare Resultate", text: "Wir arbeiten mit klaren Zielen und zeigen transparent, was Ihre Investition bewirkt." },
  { icon: "shield", title: "Schweizer Qualität", text: "Sorgfalt, Verlässlichkeit und Datenschutz nach Schweizer Standard." },
  { icon: "receipt", title: "Transparente Offerten", text: "Klare Leistungen und nachvollziehbare Kosten, ohne versteckte Positionen." },
  { icon: "globe", title: "Deutsch & Englisch", text: "Wir arbeiten zweisprachig, für Kunden in der Schweiz und im Ausland." },
];

const imprint: LegalSection[] = [
  {
    title: "Kontaktadresse",
    paragraphs: [
      `${site.name}<br/>${site.address.street}<br/>${site.address.zip} ${site.address.city}<br/>Schweiz`,
      `E-Mail: <a href="mailto:${site.email}">${site.email}</a>`,
    ],
  },
  {
    title: "Vertretungsberechtigte Person",
    paragraphs: [`${site.managingDirector}, Gesellschafter und Geschäftsführer`],
  },
  {
    title: "Handelsregistereintrag",
    paragraphs: [
      `Eingetragener Firmenname: ${site.name}<br/>Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)<br/>Sitz: ${site.address.city} ${site.address.canton}<br/>Handelsregisteramt: Kanton Zug<br/>Handelsregisternummer: ${site.registerNumber}<br/>Unternehmens-Identifikationsnummer (UID): ${site.uid}`,
    ],
  },
  {
    title: "Haftungsausschluss",
    paragraphs: [
      "Wir prüfen die Inhalte dieser Website sorgfältig. Für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen übernehmen wir dennoch keine Gewähr.",
      "Haftungsansprüche gegen uns wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf, der Nutzung oder Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.",
      "Alle Angebote sind unverbindlich. Wir behalten uns ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.",
    ],
  },
  {
    title: "Haftung für Links",
    paragraphs: [
      "Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Jegliche Verantwortung für solche Websites wird abgelehnt. Der Zugriff und die Nutzung solcher Websites erfolgen auf eigene Gefahr.",
    ],
  },
  {
    title: "Urheberrechte",
    paragraphs: [
      `Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich der ${site.name} oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.`,
    ],
  },
  {
    title: "Bildnachweis",
    paragraphs: ['Fotos: <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> (Unsplash-Lizenz).'],
  },
];

const privacy: LegalSection[] = [
  {
    title: "1. Verantwortliche Stelle",
    paragraphs: [
      `Verantwortlich für die Datenbearbeitung auf dieser Website ist:<br/>${site.name}, ${site.address.street}, ${site.address.zip} ${site.address.city}, Schweiz<br/>E-Mail: <a href="mailto:${site.email}">${site.email}</a>`,
      "Diese Datenschutzerklärung richtet sich nach dem Schweizer Bundesgesetz über den Datenschutz (DSG) und, soweit anwendbar, nach der EU-Datenschutz-Grundverordnung (DSGVO).",
    ],
  },
  {
    title: "2. Grundsätze",
    paragraphs: [
      "Wir bearbeiten Personendaten nur im Rahmen des geltenden Rechts, so wenig wie möglich und nur so lange, wie es für den jeweiligen Zweck nötig ist. Wir verkaufen keine Personendaten.",
    ],
  },
  {
    title: "3. Besuch der Website (Server-Logfiles)",
    paragraphs: [
      "Beim Aufruf unserer Website speichert unser Hosting-Anbieter automatisch technische Informationen, die Ihr Browser übermittelt. Dazu gehören:",
    ],
    list: [
      "IP-Adresse des anfragenden Geräts",
      "Datum und Uhrzeit des Zugriffs",
      "aufgerufene Seite bzw. Datei",
      "Browsertyp, Betriebssystem und Referrer-URL",
    ],
  },
  {
    title: "",
    paragraphs: [
      "Diese Daten werden ausschliesslich benötigt, um die Website sicher und stabil zu betreiben. Sie werden nicht mit anderen Datenquellen zusammengeführt und nach einer kurzen Frist gelöscht.",
    ],
  },
  {
    title: "4. Kontaktaufnahme",
    paragraphs: [
      "Wenn Sie uns per E-Mail oder über das Kontaktformular kontaktieren, bearbeiten wir Ihre Angaben (z. B. Name, Firma, E-Mail-Adresse, Telefonnummer und Nachricht), um Ihre Anfrage zu beantworten und allenfalls eine Offerte zu erstellen. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
    ],
  },
  {
    title: "5. Cookies und Tracking",
    paragraphs: [
      "Diese Website verwendet keine Tracking- oder Marketing-Cookies und keine Analyse-Tools. Sollte sich dies ändern, passen wir diese Datenschutzerklärung an und holen, wo nötig, Ihre Einwilligung ein.",
      "Ihre Wahl der Darstellung (Hell/Dunkel) sowie Angaben aus dem Projekt-Rechner werden ausschliesslich lokal in Ihrem Browser gespeichert (Local bzw. Session Storage) und nicht an uns übertragen, solange Sie keine Anfrage senden.",
    ],
  },
  {
    title: "6. Externe Inhalte und Dienste",
    paragraphs: [
      "Einige Bilder werden über das Content-Delivery-Network von Unsplash (Unsplash Inc., USA) geladen. Dabei wird Ihre IP-Adresse an Unsplash übermittelt, damit die Bilder an Ihren Browser ausgeliefert werden können. Weitere Informationen finden Sie in der Datenschutzerklärung von Unsplash.",
      "Schriften werden lokal von unserem Server ausgeliefert. Es findet keine Verbindung zu Google Fonts statt.",
      "Wenn Sie auf den Link zu Google Maps klicken, verlassen Sie unsere Website. Es gelten dann die Datenschutzbestimmungen von Google.",
      "Website-Check: Wenn Sie diese Funktion nutzen, wird die von Ihnen eingegebene Web-Adresse an die Schnittstelle «PageSpeed Insights» von Google (Google LLC, USA) übermittelt, welche die Seite analysiert. Dabei wird auch Ihre IP-Adresse an Google übertragen. Es gelten die Datenschutzbestimmungen von Google.",
      "Terminbuchung: Der Buchungskalender von Cal.com (Cal.com, Inc., USA) wird erst geladen, wenn Sie aktiv auf «Kalender laden» klicken. Ihre Angaben bei einer Buchung werden dann von Cal.com bearbeitet.",
    ],
  },
  {
    title: "7. Datensicherheit",
    paragraphs: [
      "Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen. Die Übertragung der Website erfolgt verschlüsselt (HTTPS).",
    ],
  },
  {
    title: "8. Ihre Rechte",
    paragraphs: ["Sie haben im Rahmen des anwendbaren Datenschutzrechts insbesondere das Recht auf:"],
    list: [
      "Auskunft über die zu Ihrer Person bearbeiteten Daten",
      "Berichtigung unrichtiger Daten",
      "Löschung oder Einschränkung der Bearbeitung",
      "Herausgabe bzw. Übertragung Ihrer Daten",
      "Widerruf einer erteilten Einwilligung",
    ],
  },
  {
    title: "",
    paragraphs: [
      `Wenden Sie sich dazu an <a href="mailto:${site.email}">${site.email}</a>. Zudem haben Sie das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.`,
    ],
  },
  {
    title: "9. Änderungen",
    paragraphs: [
      "Wir können diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.",
    ],
  },
];

const de = {
  meta: {
    siteTitle: "Trevona GmbH – Marketing, Websites & Software aus Cham",
    siteDescription:
      "Trevona aus Cham (ZG) ist Ihr Partner für Google Ads, SEO, Social Media, massgeschneiderte Websites und individuelle Firmensoftware. Alles aus einer Hand.",
    servicesTitle: "Leistungen",
    servicesDescription:
      "Online-Marketing, Websites & Online-Shops, Software & Firmenprogramme sowie Branding & Design: alle Leistungen von Trevona im Überblick.",
    aboutTitle: "Über uns",
    aboutDescription:
      "Trevona ist eine Digitalagentur aus Cham im Kanton Zug. Erfahren Sie, wofür wir stehen und wie wir arbeiten.",
    contactTitle: "Kontakt",
    contactDescription:
      "Erzählen Sie uns von Ihrem Projekt. Trevona GmbH, Sinserstrasse 67, 6330 Cham. Wir melden uns persönlich bei Ihnen.",
    imprintTitle: "Impressum",
    privacyTitle: "Datenschutz",
    estimatorTitle: "Projekt-Rechner",
    estimatorDescription: "Berechnen Sie in 30 Sekunden einen unverbindlichen Preisrahmen und Zeitplan für Website, Online-Shop, Marketing, Software oder Branding.",
    checkTitle: "Website-Check",
    checkDescription: "Kostenloser Website-Check: Ladezeit, Mobile-Tauglichkeit, SEO und Barrierefreiheit Ihrer Website in Sekunden prüfen.",
  },
  nav: {
    home: "Start",
    services: "Leistungen",
    about: "Über uns",
    contact: "Kontakt",
    cta: "Projekt anfragen",
    menu: "Menü",
    close: "Schliessen",
    language: "Sprache",
    switchTo: "English",
    skip: "Zum Inhalt springen",
    homeLabel: "Trevona – zur Startseite",
    servicesOverview: "Alle Leistungen ansehen",
    reachUs: "Schreiben Sie uns",
    estimator: "Projekt-Rechner",
    check: "Website-Check",
  },
  theme: { label: "Darstellung", light: "Hell", dark: "Dunkel", system: "Auto" },
  brand: {
    slogan: "Vier Bereiche. Ein Partner.",
    label: "Unser Zeichen",
    title: "Vier Bereiche.\n*Ein Partner.*",
    text: "Unser Zeichen besteht aus vier Kacheln: Marketing, Web, Software und Branding. Zusammen ergeben sie das «T» von Trevona. Vier Disziplinen, die ineinandergreifen, und ein Partner, der alles zusammenhält.",
    tiles: ["Marketing", "Web", "Software", "Branding"],
  },
  common: {
    learnMore: "Mehr erfahren",
    allServices: "Alle Leistungen",
    contactUs: "Kontakt aufnehmen",
    backHome: "Zur Startseite",
    scroll: "Scrollen",
    of: "von",
    view: "Ansehen",
    available: "Verfügbar für neue Projekte",
  },
  home: {
    hero: {
      meta: ["Digitalagentur", "Cham, Kanton Zug", "Marketing / Web / Software / Branding"],
      title: "Sichtbar werden.\n*Einfacher arbeiten.*",
      srTitle: "Trevona – Online-Marketing, Websites und Software aus Cham: ",
      text: "Trevona ist eine Digitalagentur aus Cham. Wir betreuen Google Ads und SEO, entwickeln Websites und Online-Shops und programmieren Software für Ihre internen Abläufe. Alles aus einer Hand, mit einer festen Ansprechperson.",
      primary: "Projekt anfragen",
      secondary: "Leistungen ansehen",
      imageAlt: "Helles, modernes Büro, in dem Menschen an Computern arbeiten",
      founded: "Gegründet 2026",
      localTime: "Ortszeit Cham",
      scroll: "Scrollen",
      cards: {
        adsTitle: "Google Ads",
        adsStatus: "Kampagne aktiv",
        adsMetric: "Anfragen diesen Monat",
        leadTitle: "Neue Anfrage",
        leadText: "über trevona.ch · gerade eben",
      },
    },
    marquee: ["Google Ads", "SEO", "Social Media", "Webdesign", "Online-Shops", "Web-Apps", "Firmensoftware", "Automatisierung", "Branding", "Hosting"],
    intro: {
      label: "Über Trevona",
      aside: "Cham, Schweiz",
      text: "Wir verbinden Marketing, Design und Technologie zu Lösungen, die Ihr Unternehmen sichtbar machen, neue Kunden bringen und Abläufe spürbar vereinfachen. Ohne Umwege und ohne Fachchinesisch.",
      link: "Mehr über uns",
      captionA: "Strategie vor Umsetzung",
      captionB: "Konzept, Design und Code aus einer Hand",
    },
    services: {
      label: "Leistungen",
      aside: "4 Bereiche",
      title: "Vier Bereiche.\n*Ein Ansprechpartner.*",
      text: "Ob Sie mehr Anfragen, eine neue Website oder ein Programm für Ihre internen Abläufe brauchen: Wir decken die ganze digitale Kette ab.",
    },
    flow: {
      label: "Einblicke",
      aside: "Vertikal scrollen",
      title: "Wie ein Projekt\n*entsteht.*",
      text: "Gute digitale Arbeit entsteht aus Austausch, Handwerk und Sorgfalt im Detail. Sieben Stationen, vom ersten Workshop bis zum Launch.",
      endTitle: "Ihr Projekt ist das nächste.",
      endButton: "Projekt anfragen",
      items: flow,
    },
    showcase: {
      label: "In Aktion",
      title: "Eine Agentur.\n*Vier Welten.*",
      steps: [
        { title: "Kampagnen, die man messen kann.", text: "Live-Dashboards zeigen jederzeit, was Ihr Werbebudget bringt: Klicks, Anfragen und Kosten pro Anfrage." },
        { title: "Websites, die verkaufen.", text: "Schnell, perfekt auf dem Smartphone und gestaltet für Ihre Marke, damit aus Besuchern Kunden werden." },
        { title: "Software, die Arbeit abnimmt.", text: "Aufträge, Planung und Kunden in einem System statt in zehn Excel-Listen, für das ganze Team." },
        { title: "Marken, die man wiedererkennt.", text: "Logo, Farben und Schriften als durchgängiges System, online wie offline." },
      ],
    },
    tools: {
      label: "Gratis-Tools",
      title: "Probieren Sie es\n*gleich selbst aus.*",
      text: "Zwei Werkzeuge, die Ihnen in wenigen Sekunden Klarheit verschaffen. Kostenlos und unverbindlich.",
      estimatorTitle: "Projekt-Rechner",
      estimatorText: "In 30 Sekunden zum Preisrahmen und Zeitplan für Ihr Vorhaben.",
      estimatorButton: "Jetzt berechnen",
      checkTitle: "Website-Check",
      checkText: "Wie schnell und gut auffindbar ist Ihre Website? Finden Sie es sofort heraus.",
      checkButton: "Website prüfen",
    },
  },
  process: {
    label: "Ablauf",
    aside: "5 Schritte",
    title: "Klarer Ablauf.\n*Keine Überraschungen.*",
    text: "Ein klarer Ablauf schafft Vertrauen. Sie wissen jederzeit, wo Ihr Projekt steht und was als Nächstes passiert.",
    steps: [
      { title: "Kennenlernen", text: "In einem unverbindlichen Erstgespräch lernen wir Sie, Ihre Ziele und Ihre Herausforderungen kennen." },
      { title: "Analyse & Strategie", text: "Wir analysieren Markt, Mitbewerber und Ausgangslage und erarbeiten einen klaren Plan samt Offerte." },
      { title: "Design & Umsetzung", text: "Wir gestalten, entwickeln und testen, in engem Austausch und mit regelmässigen Zwischenständen." },
      { title: "Launch", text: "Wir bringen Ihr Projekt sicher live und sorgen für einen reibungslosen Start." },
      { title: "Betreuung & Wachstum", text: "Nach dem Launch messen, verbessern und entwickeln wir weiter, damit Ihr Projekt langfristig wirkt." },
    ] as TitledText[],
  },
  why: {
    label: "Arbeitsweise",
    aside: "Was Sie erwarten können",
    title: "Worauf Sie sich\n*verlassen können.*",
    text: "Wir verstehen uns als Teil Ihres Teams und nicht als anonyme Agentur.",
    items: why,
    stats: [
      { value: 4, suffix: "", label: "Kompetenzbereiche unter einem Dach" },
      { value: 1, suffix: "", label: "feste Ansprechperson für Ihr Projekt" },
      { value: 2, suffix: "", label: "Sprachen: Deutsch und Englisch" },
      { value: 100, suffix: "%", label: "Swiss made in Cham" },
    ],
  },
  cta: {
    label: "Kontakt",
    title: "Projekt im Kopf?\n*Lassen Sie uns reden.*",
    text: "Erzählen Sie uns von Ihrem Vorhaben. Wir melden uns persönlich bei Ihnen und zeigen, wie wir Sie weiterbringen.",
    button: "Projekt anfragen",
    or: "Oder schreiben Sie an",
  },
  faq: {
    label: "Fragen",
    aside: "FAQ",
    title: "Fragen &\n*Antworten.*",
    text: "Ihre Frage ist nicht dabei? Schreiben Sie uns, wir antworten gerne.",
    items: [
      {
        title: "Was kostet eine Website bei Trevona?",
        text: "Das hängt vom Umfang ab: Eine fokussierte Landingpage ist schneller umgesetzt als ein Online-Shop mit Schnittstellen. Nach einem unverbindlichen Erstgespräch erhalten Sie eine transparente Offerte mit klarem Kostenrahmen.",
      },
      {
        title: "Wie lange dauert ein Projekt?",
        text: "Eine Landingpage kann innerhalb weniger Wochen online sein. Umfangreiche Websites oder Software-Projekte planen wir in Etappen. Den genauen Zeitplan legen wir gemeinsam mit Ihnen fest.",
      },
      {
        title: "Arbeiten Sie auch mit kleinen Unternehmen und Start-ups?",
        text: "Ja. Wir begleiten KMU, Start-ups, Selbstständige und Privatpersonen mit Lösungen, die zu Grösse und Budget passen.",
      },
      {
        title: "Können Sie unsere bestehende Website übernehmen?",
        text: "Gerne. Wir analysieren Ihre aktuelle Website und zeigen Ihnen, ob eine Optimierung oder ein Relaunch sinnvoller ist.",
      },
      {
        title: "Betreuen Sie auch Kunden ausserhalb der Schweiz?",
        text: "Ja. Unser Sitz ist in Cham, wir arbeiten aber für Kunden im In- und Ausland, auf Deutsch und Englisch.",
      },
      {
        title: "Wer kümmert sich nach dem Launch um alles?",
        text: "Auf Wunsch übernehmen wir Hosting, Wartung, Updates und Weiterentwicklung, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
      },
    ] as TitledText[],
  },
  services: {
    page: {
      eyebrow: "Leistungen",
      title: "Marketing, Web,\nSoftware *und Branding.*",
      text: "Vom ersten Klick bis zum internen Ablauf: Wir planen, gestalten und entwickeln digitale Lösungen, die zusammenpassen und Ihr Unternehmen messbar weiterbringen.",
      combineTitle: "Stärker\n*im Zusammenspiel.*",
      combineText:
        "Jede Disziplin wirkt für sich. Richtig stark wird es, wenn alles ineinandergreift: Die Kampagne führt auf eine schnelle Website, die Website übergibt Anfragen automatisch an Ihre Software und Ihre Marke bleibt dabei überall gleich.",
      combineSteps: ["Marke", "Kampagne", "Website", "Software"],
    },
    detail: {
      eyebrow: "Leistung",
      included: "Leistungen im Detail",
      includedTitle: "Was wir für Sie\n*umsetzen.*",
      benefits: "Ihr Nutzen",
      benefitsTitle: "Was Sie\n*davon haben.*",
      tools: "Technologien & Plattformen",
      others: "Weitere Leistungen",
      back: "Alle Leistungen",
    },
    list: services,
  },
  about: {
    hero: {
      eyebrow: "Über uns",
      title: "Aus Cham.\n*Für Unternehmen überall.*",
      text: "Trevona ist eine junge Digitalagentur mit Sitz in Cham im Kanton Zug. Wir unterstützen Unternehmen und Privatpersonen dabei, online sichtbar zu werden, Kunden zu gewinnen und digitale Abläufe zu vereinfachen.",
      imageAlt: "Team arbeitet gemeinsam an Laptops in einem Büro",
    },
    story: {
      label: "Unsere Geschichte",
      title: "Warum es\n*Trevona gibt.*",
      paragraphs: [
        "Viele Unternehmen arbeiten mit einer Agentur fürs Marketing, einer zweiten für die Website und einem Freelancer für die Software. Das Resultat sind viele Schnittstellen, wenig Zusammenhang und ein hoher Koordinationsaufwand.",
        "Trevona wurde 2026 gegründet, um das zu ändern. Wir vereinen Marketing, Web und Software unter einem Dach, damit Ihre digitalen Massnahmen ineinandergreifen und gemeinsam wirken.",
      ],
      quote: "Wir messen unseren Erfolg an Ihrem Erfolg, nicht an der Anzahl Folien.",
    },
    values: {
      label: "Werte",
      title: "Vier\n*Grundsätze.*",
      items: [
        { title: "Klarheit", text: "Wir sprechen verständlich, planen transparent und halten, was wir versprechen." },
        { title: "Qualität", text: "Wir liefern sorgfältige Arbeit, auf die Sie sich verlassen können, bis ins Detail." },
        { title: "Partnerschaft", text: "Wir denken mit, als wären Ihre Ziele unsere eigenen." },
        { title: "Neugier", text: "Wir bleiben am Puls neuer Technologien und setzen sie gezielt dort ein, wo sie Ihnen nützen." },
      ] as TitledText[],
    },
    facts: {
      label: "Auf einen Blick",
      items: [
        { key: "Gegründet", value: "2026" },
        { key: "Sitz", value: "Cham, Kanton Zug" },
        { key: "Rechtsform", value: "GmbH" },
        { key: "Sprachen", value: "Deutsch & Englisch" },
      ],
    },
    location: {
      label: "Standort",
      title: "Zuhause in Cham.\n*Unterwegs für Sie.*",
      text: "Unser Sitz liegt in Cham am Zugersee, mitten im Wirtschaftsraum Zug und nahe bei Zürich und Luzern. Wir treffen Sie gerne persönlich oder per Video-Call.",
      button: "Route planen",
      imageAlt: "Blick über den Zugersee mit Landschaft",
    },
  },
  contact: {
    booking: {
      title: "Lieber direkt einen Termin?",
      text: "Buchen Sie ein unverbindliches Erstgespräch von 30 Minuten, per Video-Call oder bei uns in Cham.",
      load: "Kalender laden",
      consent: "Beim Laden wird der Buchungskalender von Cal.com eingebunden.",
      mail: "Termin per E-Mail vorschlagen",
      mailSubject: "Terminanfrage Erstgespräch",
    },
    hero: {
      eyebrow: "Kontakt",
      title: "Erzählen Sie uns\n*von Ihrem Projekt.*",
      text: "Erzählen Sie uns von Ihrem Projekt, egal ob erste Idee oder konkretes Vorhaben. Wir melden uns persönlich bei Ihnen.",
    },
    info: {
      email: "E-Mail",
      phone: "Telefon",
      address: "Adresse",
      map: "In Google Maps öffnen",
      nextTitle: "So geht es weiter",
      next: [
        "Wir lesen Ihre Nachricht und melden uns persönlich bei Ihnen.",
        "In einem unverbindlichen Gespräch klären wir Ziele und Anforderungen.",
        "Sie erhalten eine transparente Offerte mit klarem Vorgehen.",
      ],
    },
    form: {
      title: "Projektanfrage",
      name: "Name",
      company: "Firma",
      email: "E-Mail",
      phone: "Telefon",
      optional: "optional",
      interests: "Wofür interessieren Sie sich?",
      interestOptions: ["Google Ads", "SEO", "Social Media", "Website", "Online-Shop", "Software / App", "Branding", "Etwas anderes"],
      budget: "Budgetrahmen",
      budgetOptions: ["Noch offen", "bis CHF 5’000", "CHF 5’000 – 15’000", "CHF 15’000 – 50’000", "über CHF 50’000"],
      message: "Ihre Nachricht",
      messagePlaceholder: "Worum geht es? Was möchten Sie erreichen?",
      privacyBefore: "Ich habe die",
      privacyLink: "Datenschutzerklärung",
      privacyAfter: "gelesen und bin mit der Bearbeitung meiner Angaben einverstanden.",
      submit: "Anfrage senden",
      sending: "Wird gesendet …",
      successTitle: "Vielen Dank!",
      successText: "Ihre Anfrage ist bei uns angekommen. Wir melden uns so rasch wie möglich bei Ihnen.",
      mailtoTitle: "Fast geschafft!",
      mailtoText: "Ihr E-Mail-Programm wurde mit Ihrer Anfrage geöffnet. Bitte senden Sie die vorbereitete Nachricht noch ab.",
      again: "Neue Anfrage",
      mailSubject: "Projektanfrage über trevona.ch",
      errors: {
        required: "Bitte füllen Sie dieses Feld aus.",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        privacy: "Bitte bestätigen Sie die Datenschutzerklärung.",
        send: "Leider ist etwas schiefgelaufen. Bitte schreiben Sie uns direkt an",
      },
    },
  },
  legal: {
    imprint: { eyebrow: "Rechtliches", title: "Impressum", sections: imprint },
    privacy: { eyebrow: "Rechtliches", title: "Datenschutz­erklärung", updated: "Stand: November 2026", sections: privacy },
  },
  estimator: {
    eyebrow: "Projekt-Rechner",
    title: "Was kostet\n*Ihr Projekt?*",
    text: "Beantworten Sie drei kurze Fragen und erhalten Sie sofort einen unverbindlichen Preisrahmen und Zeitplan.",
    steps: ["Leistungen", "Umfang", "Zeitrahmen", "Ergebnis"],
    stepOf: "Schritt",
    q1: "Was brauchen Sie?",
    q1Hint: "Mehrfachauswahl möglich",
    q2: "Wie umfangreich ist Ihr Vorhaben?",
    q3: "Bis wann soll es fertig sein?",
    services: {
      website: { title: "Website", text: "Neue Website oder Relaunch" },
      shop: { title: "Online-Shop", text: "Produkte online verkaufen" },
      ads: { title: "Google Ads", text: "Bezahlte Anzeigen bei Google" },
      seo: { title: "SEO", text: "Besser gefunden werden" },
      social: { title: "Social Media", text: "Content & Kampagnen" },
      software: { title: "Software / App", text: "Firmenprogramm oder Web-App" },
      branding: { title: "Branding", text: "Logo & Erscheinungsbild" },
    },
    sizes: [
      { title: "Kompakt", text: "Klarer, fokussierter Umfang. Ideal für den Start." },
      { title: "Standard", text: "Der Klassiker für KMU mit mehreren Bereichen." },
      { title: "Umfangreich", text: "Viele Inhalte, Funktionen oder Schnittstellen." },
    ],
    timings: [
      { title: "Flexibel", text: "Qualität vor Tempo" },
      { title: "In 1–3 Monaten", text: "Normaler Zeitplan" },
      { title: "So schnell wie möglich", text: "Express-Umsetzung" },
    ],
    back: "Zurück",
    next: "Weiter",
    resultLabel: "Ihr unverbindlicher Richtwert",
    once: "einmalig",
    monthly: "pro Monat",
    duration: "Umsetzungszeit",
    weeks: "Wochen",
    breakdown: "Aufstellung",
    setup: "Aufbau",
    care: "Betreuung",
    note: "Richtwerte in CHF, exkl. MwSt. Werbebudgets für Google Ads und Social Media sind nicht enthalten. Die genaue Offerte erstellen wir nach einem kurzen Gespräch.",
    send: "Als Anfrage senden",
    restart: "Neu berechnen",
    pick: "Bitte wählen Sie mindestens eine Leistung.",
    express: "inkl. Express-Zuschlag",
    prefillIntro: "Ergebnis aus dem Projekt-Rechner:",
  },
  check: {
    eyebrow: "Website-Check",
    title: "Wie gut ist\n*Ihre Website?*",
    text: "Geben Sie Ihre Web-Adresse ein. Wir messen Ladezeit, Mobile-Tauglichkeit, SEO und Barrierefreiheit mit den Werkzeugen von Google.",
    placeholder: "ihre-firma.ch",
    button: "Jetzt prüfen",
    mobile: "Smartphone",
    desktop: "Desktop",
    loading: ["Seite wird aufgerufen …", "Ladezeit wird gemessen …", "SEO wird geprüft …", "Barrierefreiheit wird analysiert …", "Ergebnis wird erstellt …"],
    duration: "Das dauert meist 15 bis 30 Sekunden.",
    categories: { performance: "Ladezeit", seo: "SEO", accessibility: "Barrierefreiheit", "best-practices": "Technik" },
    metrics: "Messwerte",
    metricNames: { lcp: "Grösster Inhalt sichtbar", fcp: "Erster Inhalt sichtbar", cls: "Layout-Stabilität", tbt: "Blockierzeit" },
    good: "Sehr gut",
    ok: "Ausbaufähig",
    bad: "Kritisch",
    verdictGood: "Starke Basis. Mit gezieltem Feinschliff holen wir noch mehr heraus.",
    verdictOk: "Hier steckt Potenzial: Mit einigen Optimierungen wird Ihre Website spürbar schneller und besser gefunden.",
    verdictBad: "Ihre Website verschenkt Kunden. Wir zeigen Ihnen gerne, wie sich das schnell ändern lässt.",
    cta: "Ergebnis mit uns besprechen",
    again: "Andere Website prüfen",
    errorInvalid: "Bitte geben Sie eine gültige Web-Adresse ein.",
    errorFetch: "Die Prüfung ist gerade nicht möglich (z. B. zu viele Anfragen oder Website nicht erreichbar). Bitte versuchen Sie es in einer Minute erneut.",
    privacy: "Die eingegebene Adresse wird zur Analyse an Google PageSpeed Insights übermittelt.",
    prefillIntro: "Ergebnis aus dem Website-Check für",
  },
  footer: {
    ctaLabel: "Neues Projekt",
    ctaTitle: "Projekt im Kopf?",
    ctaText: "Schreiben Sie uns ein paar Zeilen. Wir melden uns persönlich bei Ihnen.",
    ctaButton: "Zum Kontaktformular",
    tagline: "Marketing, Websites und Software aus Cham, für Unternehmen in der Schweiz und darüber hinaus.",
    services: "Leistungen",
    company: "Unternehmen",
    contact: "Kontakt",
    legal: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
    top: "Nach oben",
    localTime: "Ortszeit Cham",
  },
  notFound: {
    title: "Seite\n*nicht gefunden.*",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    button: "Zur Startseite",
  },
};

export type Dictionary = typeof de;
export default de;
