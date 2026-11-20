import { defaults, type Content } from "./home";
import { legalDe } from "./legal";

// Teks Jerman resmi dari desain "Startseite (DE)" dan "Anfrage (DE)".
export const defaultsDe: Content = {
  ...defaults,
  site: {
    name: "Taranova Group",
    legalName: "Taranova Group GmbH",
    address: "Freiheitstr. 34, 52351 Düren, Deutschland",
    email: "[E-MAIL]",
    phone: "[TELEFON]",
    register: "HRB 10329 · Amtsgericht Düren",
    formUrl: "",
    nav: [
      { href: "#leistung", label: "Leistung" },
      { href: "#ablauf", label: "Ablauf" },
      { href: "#rollen", label: "Rollen & Kosten" },
      { href: "#referenzen", label: "Referenzen" },
      { href: "#kontakt", label: "Kontakt" },
    ],
    legalLinks: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/cookies", label: "Cookie-Richtlinie" },
    ],
  },
  hero: {
    eyebrow: "Ausbildung · international vorbereitet",
    title: "Ausbildungsplätze besetzen – mit vorbereiteten Azubis aus dem Ausland.",
    text: "Viele Betriebe finden keine passenden Auszubildenden. Wir bringen Sie mit Kandidatinnen und Kandidaten zusammen, die sich schon vor der Ausreise auf Deutsch und Unterlagen vorbereiten, und begleiten Sie bis zum ersten Ausbildungstag.",
    primaryCta: { label: "Ausbildungsplätze melden", href: "/enquiry" },
    secondaryCta: { label: "So funktioniert es", href: "#ablauf" },
    image: { hint: "Foto: Azubi und Ausbilder im Betrieb, 16:9" },
    pathTitle: "Der Weg zu Ihrem Azubi",
    path: [
      { title: "Vorbereitung im Herkunftsland", text: "Deutschkurs, Unterlagen, Ausreise – bei unabhängigen Partnern." },
      { title: "Vorstellung, Vertrag, Genehmigung", text: "Taranova begleitet Kammer, Bundesagentur und Visum." },
      { title: "Start in Ihrem Betrieb", text: "Ankunft und Onboarding mit Unterstützung von Taranova." },
    ],
    industriesLabel: "Für Betriebe aus",
    industries: ["Hotellerie & Gastronomie", "Lebensmittel", "Handel", "Weitere Branchen"],
    badges: ["Bewerber zahlen uns nichts", "Vertrag direkt mit Ihnen", "Keine Zeitarbeit"],
  },
  services: {
    eyebrow: "Leistung",
    title: "Das bekommen Sie",
    text: "Ein Ansprechpartner in Deutschland, vorbereitete Kandidaten und eine klare Struktur. Gut vorbereitet. Fair vermittelt. Persönlich begleitet.",
    items: [
      { title: "Vorbereitet statt unvorbereitet", text: "Deutschkurs (A1 bis B1), Unterlagen und Ausreisevorbereitung laufen im Herkunftsland, bei unabhängigen Partnern." },
      { title: "Ein Ansprechpartner", text: "Taranova koordiniert von der Auswahl bis zum Onboarding. Sie sprechen mit einem Team in Deutschland." },
      { title: "Faire, klare Struktur", text: "Den Ausbildungsvertrag schließen Sie direkt mit dem Azubi. Wir sind keine Zeitarbeitsfirma und stellen kein Personal an." },
      { title: "Begleitung durch die Formalitäten", text: "Eintragung bei der Kammer, Zustimmung der Bundesagentur für Arbeit, Visum. Auf Wunsch stellen wir als Ihr Bevollmächtigter den Antrag im beschleunigten Fachkräfteverfahren." },
      { title: "Persönliche Auswahl", text: "Wir stellen passende Kandidaten vor. Sie führen die Gespräche und entscheiden." },
    ],
  },
  team: {
    eyebrow: "Ihre Ansprechpartner",
    title: "Menschen, die Sie begleiten",
    text: "Platzhalter: Porträts und Kurzprofile des Taranova-Teams, sobald freigegeben.",
    members: [
      { name: "[Name]", role: "[Rolle · Sprachen]", image: { hint: "Foto: Porträt, 4:5" } },
      { name: "[Name]", role: "[Rolle · Sprachen]", image: { hint: "Foto: Porträt, 4:5" } },
      { name: "[Name]", role: "[Rolle · Sprachen]", image: { hint: "Foto: Porträt, 4:5" } },
    ],
  },
  process: {
    eyebrow: "Ablauf",
    title: "Sechs Schritte zum ersten Ausbildungstag",
    text: "Vom ersten Gespräch bis zum Start in Ihrem Betrieb.",
    steps: [
      { icon: "company", title: "Sie briefen uns", text: "Gewerk, Ausbildungsplätze, Starttermin und benötigtes Deutschniveau." },
      { icon: "chat", title: "Kandidaten bereiten sich vor", text: "Deutschkurs, Unterlagen und Ausreisevorbereitung bei unabhängigen Partnern." },
      { icon: "people", title: "Wir stellen Kandidaten vor", text: "Sie führen die Vorstellungsgespräche und wählen aus." },
      { icon: "contract", title: "Sie schließen den Ausbildungsvertrag", text: "Direkt mit dem Kandidaten. Der Azubi ist Ihr Auszubildender, nicht unserer." },
      { icon: "shield", title: "Genehmigung und Visum", text: "Kammer, Bundesagentur für Arbeit und Auslandsvertretung prüfen. Wir begleiten Sie." },
      { icon: "arrival", title: "Ankunft und Start", text: "Onboarding-Unterstützung durch Taranova." },
    ],
  },
  roles: {
    eyebrow: "Rollen & Kosten",
    title: "Klare Rollen, klares Geld",
    text: "Zwei getrennte Geldflüsse, die sich nie kreuzen. Zwischen Taranova und den Partnern fließt kein Geld, und die Partner vermitteln nicht.",
    cards: [
      {
        label: "Vermittlung",
        from: { name: "Sie", sub: "Ausbildungsbetrieb" },
        flow: "erfolgsbezogenes Honorar",
        to: { name: "Taranova", sub: "Auswahl, Vermittlung, Onboarding" },
        toStyle: "solid",
        note: "Taranova wird ausschließlich von Arbeitgebern bezahlt.",
      },
      {
        label: "Vorbereitung",
        from: { name: "Kandidat", sub: "bereitet sich vor" },
        flow: "nach Preisliste",
        to: { name: "Partner", sub: "Sprachkurs, Unterlagen, Ausreise" },
        toStyle: "gold",
        note: "Partner bereiten nur vor und werden vom Kandidaten nach veröffentlichter Preisliste bezahlt. Taranova erhält vom Kandidaten nichts.",
      },
    ],
  },
  requirements: {
    eyebrow: "Voraussetzungen",
    title: "Das bringen Sie mit",
    items: [
      "Ausbildungsberechtigung der zuständigen Kammer (IHK oder HWK) und einen freien Ausbildungsplatz.",
      "Eine Ausbildungsvergütung von in der Regel mindestens 1.045 Euro brutto im Monat (2026; die genaue Höhe hängt von Gewerk und Tarifvertrag ab).",
      "Unterstützung bei der Wohnungssuche und einen Starttermin, der zur Vorbereitungszeit passt.",
    ],
    timing: {
      eyebrow: "Zeitplan",
      title: "Im Überblick",
      items: [
        { value: "~24 Wochen", title: "Sprach- und Unterlagenvorbereitung", text: "ab A1, laut den von uns gesichteten Partnerprogrammen" },
        { value: "~4 Monate", title: "Beschleunigtes Verfahren", text: "insgesamt" },
      ],
      note: "Beides läuft teilweise parallel; den Zeitplan bestätigen wir im Einzelfall. Über das Visum entscheiden die Behörden; es kann nicht garantiert werden.",
    },
  },
  references: {
    eyebrow: "Referenzen",
    title: "Betriebe, die uns vertrauen",
    text: "Platzhalter: Logos und Stimmen erster Partnerbetriebe, sobald freigegeben.",
    logos: [{ hint: "Logo Betrieb" }, { hint: "Logo Betrieb" }, { hint: "Logo Betrieb" }, { hint: "Logo Verband / Siegel" }],
    gallery: [
      { image: { hint: "Foto: Azubis bei der Arbeit, 3:2" }, caption: "Alltag im Ausbildungsbetrieb" },
      { image: { hint: "Foto: Deutschkurs im Herkunftsland, 3:2" }, caption: "Vorbereitung beim Partner" },
      { image: { hint: "Foto: Ankunft und erster Tag, 3:2" }, caption: "Ankunft und Onboarding" },
    ],
    testimonial: {
      label: "Erfolgreiche Azubis",
      quote: "[Zitat eines Ausbildungsbetriebs oder Azubis, mit Name, Betrieb und Foto]",
      author: "Vorname, Beruf, Betrieb, Ort",
    },
    video: { title: "Informationsvideo für Betriebe", hint: "Platzhalter: kurzer Erklärfilm, 90 Sekunden", url: "" },
  },
  contact: {
    title: "Sprechen Sie mit uns über Ihre offenen Ausbildungsplätze.",
    text: "Schildern Sie uns kurz Ihr Gewerk und Ihren Starttermin. Wir melden uns persönlich.",
    image: { hint: "Foto: Büro Düren oder Team, 16:9" },
    locationLabel: "Standort",
  },
  legal: legalDe,
  enquiryPage: {
    eyebrow: "Anfrage",
    title: "Sprechen Sie mit uns über Ihre offenen Ausbildungsplätze.",
    text: "Schildern Sie uns kurz Ihr Gewerk, die Zahl der Plätze und Ihren Wunschstart. Wir melden uns bei Ihnen.",
    benefitsLabel: "Ihre Vorteile",
    benefits: ["Bewerber zahlen uns nichts", "Vertrag direkt mit Ihnen", "Keine Zeitarbeit"],
    thanksTitle: "Vielen Dank für Ihre Anfrage.",
    thanksText: "Wir haben Ihre Angaben erhalten und melden uns bei Ihnen.",
  },
};
