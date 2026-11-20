export type Locale = "de" | "en";
export const LOCALES: Locale[] = ["de", "en"];
export const DEFAULT_LOCALE: Locale = "de"; // mayoritas pengunjung: Jerman

/** Awalan URL: Jerman di "/", Inggris di "/en". */
export const prefix = (l: Locale) => (l === "en" ? "/en" : "");

/** Alamat halaman legal per bahasa. Kunci = jalur netral yang dipakai di konten. */
export const LEGAL_SLUGS: Record<string, Record<Locale, string>> = {
  "/impressum": { de: "/impressum", en: "/legal-notice" },
  "/datenschutz": { de: "/datenschutz", en: "/privacy-policy" },
  "/cookies": { de: "/cookies", en: "/cookie-policy" },
};

/** Link internal di konten ditulis netral ("/enquiry", "/impressum", "#anchor"); di sini diberi awalan dan alamat sesuai bahasa. */
export function localizeHref(l: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return l === "en" ? "/en" : "/";
  const [path, rest = ""] = href.split(/(?=[#?])/);
  const slug = LEGAL_SLUGS[path]?.[l] ?? path;
  return prefix(l) + slug + rest;
}

export const ui = {
  en: {
    enquireNow: "Enquire now",
    backHome: "← Back to home page",
    mainNav: "Main navigation",
    switchLang: "Switch language",
    photo: "Photo placeholder",
    form: {
      company: "Company *", contactPerson: "Contact person *", email: "Email *", phone: "Phone (optional)",
      occupations: "Training occupation(s) *", places: "Number of training places", start: "Preferred start date",
      message: "Message (optional)", consent: "I agree that Taranova uses my details to handle this enquiry. [Privacy policy](/datenschutz)",
      placesOptions: ["1", "2 to 5", "6 to 10", "More than 10"],
      send: "Send enquiry", sending: "Sending…", backHomeLink: "Back to home page",
      errCompany: "Please enter your company.", errContact: "Please enter a contact person.",
      errEmail: "Please enter a valid email.", errOccupations: "Please enter at least one occupation.",
      errConsent: "Consent is required.", errGeneric: "Something went wrong. Please try again.",
    },
    contact: {
      first: "First name", last: "Last name", company: "Company", email: "Email", phone: "Phone", message: "Message",
      consent: "I consent to the processing of my data to handle this enquiry (GDPR).",
      errName: "Please fill in name and a valid email.", thanksTitle: "Thank you for your enquiry.",
      thanksText: "We have received your details and will get back to you.",
    },
    formBy: "This form is provided by Microsoft Forms.",
    metaTitle: "Taranova Group – Apprentices from abroad",
    metaEnquiryTitle: "Enquiry – Taranova Group",
    metaDescription: "Fill your apprenticeship places with prepared trainees from abroad. German course and documents before departure, support up to the first day of training.",
  },
  de: {
    enquireNow: "Jetzt anfragen",
    backHome: "← Zurück zur Startseite",
    mainNav: "Hauptnavigation",
    switchLang: "Sprache wechseln",
    photo: "Platzhalter für Foto",
    form: {
      company: "Unternehmen *", contactPerson: "Ansprechperson *", email: "E-Mail *", phone: "Telefon (optional)",
      occupations: "Ausbildungsberuf(e) *", places: "Anzahl Ausbildungsplätze", start: "Gewünschter Starttermin",
      message: "Nachricht (optional)", consent: "Ich stimme zu, dass Taranova meine Angaben zur Bearbeitung der Anfrage verwendet. [Datenschutzerklärung](/datenschutz)",
      placesOptions: ["1", "2 bis 5", "6 bis 10", "Mehr als 10"],
      send: "Anfrage senden", sending: "Wird gesendet…", backHomeLink: "Zurück zur Startseite",
      errCompany: "Bitte geben Sie Ihr Unternehmen an.", errContact: "Bitte geben Sie eine Ansprechperson an.",
      errEmail: "Bitte geben Sie eine gültige E-Mail-Adresse an.", errOccupations: "Bitte geben Sie mindestens einen Beruf an.",
      errConsent: "Die Einwilligung ist erforderlich.", errGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    },
    contact: {
      first: "Vorname", last: "Nachname", company: "Unternehmen", email: "E-Mail", phone: "Telefon", message: "Nachricht",
      consent: "Ich willige in die Verarbeitung meiner Daten zur Bearbeitung der Anfrage ein (DSGVO).",
      errName: "Bitte Name und eine gültige E-Mail-Adresse angeben.", thanksTitle: "Vielen Dank für Ihre Anfrage.",
      thanksText: "Wir haben Ihre Angaben erhalten und melden uns bei Ihnen.",
    },
    formBy: "Dieses Formular wird von Microsoft Forms bereitgestellt.",
    metaTitle: "Taranova Group – Auszubildende aus dem Ausland",
    metaEnquiryTitle: "Anfrage – Taranova Group",
    metaDescription: "Besetzen Sie Ihre Ausbildungsplätze mit vorbereiteten Auszubildenden aus dem Ausland. Deutschkurs und Unterlagen vor der Abreise, Begleitung bis zum ersten Ausbildungstag.",
  },
} as const;
export type UI = (typeof ui)["en"] | (typeof ui)["de"];
