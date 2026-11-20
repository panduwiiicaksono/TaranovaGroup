// Konten Home (EN). Nanti digantikan data dari DB/CMS dengan bentuk (type) yang sama.
export type IconKey = "company" | "chat" | "people" | "contract" | "shield" | "arrival";
export type Img = { src?: string; alt?: string; hint: string };

export const site = {
  name: "Taranova Group",
  legalName: "Taranova Group GmbH",
  address: "Freiheitstr. 34, 52351 Düren, Germany",
  email: "[EMAIL]",
  phone: "[PHONE]",
  register: "HRB 10329 · Düren Local Court",
  // URL embed Microsoft Forms (Share → Embed). Kosong = pakai form bawaan.
  formUrl: "",
  nav: [
    { href: "#leistung", label: "Service" },
    { href: "#ablauf", label: "Process" },
    { href: "#rollen", label: "Roles & costs" },
    { href: "#referenzen", label: "References" },
    { href: "#kontakt", label: "Contact" },
  ],
  legalLinks: [
    { href: "#", label: "Legal notice" },
    { href: "#", label: "Privacy policy" },
    { href: "#", label: "Cookie policy" },
  ],
};

export const hero = {
  eyebrow: "Apprenticeship · prepared internationally",
  title: "Fill your apprenticeship places with prepared trainees from abroad.",
  text: "Many companies cannot find suitable apprentices. We connect you with candidates who prepare for German language and documents before they leave home, and we support you up to the first day of training.",
  primaryCta: { label: "Register your places", href: "/enquiry" },
  secondaryCta: { label: "How it works", href: "#ablauf" },
  image: { hint: "Photo: apprentice and trainer at work, 16:9" } as Img,
  pathTitle: "The path to your apprentice",
  path: [
    { title: "Preparation in the home country", text: "German course, documents, departure, with independent partners." },
    { title: "Introduction, contract, approval", text: "Taranova guides you through chamber, employment agency and visa." },
    { title: "Start in your company", text: "Arrival and onboarding with support from Taranova." },
  ],
  industriesLabel: "For companies in",
  industries: ["Hospitality", "Food", "Retail", "Other fields"],
  badges: ["Candidates pay us nothing", "Contract directly with you", "No temp agency work"],
};

export const services = {
  eyebrow: "Service",
  title: "What you get",
  text: "One contact in Germany, prepared candidates and a clear structure. Well prepared. Fairly placed. Personally supported.",
  items: [
    { title: "Prepared, not unprepared", text: "German course (A1 to B1), documents and pre-departure briefing take place in the home country, with independent partners." },
    { title: "One contact", text: "Taranova coordinates from selection to onboarding. You talk to one team in Germany." },
    { title: "A fair, clear structure", text: "You sign the training contract directly with the apprentice. We are not a temp agency and do not employ staff." },
    { title: "Support through the formalities", text: "Chamber registration, approval by the Federal Employment Agency, visa. On request we file the fast-track procedure as your authorised agent." },
    { title: "Personal selection", text: "We present suitable candidates. You interview them and decide." },
  ],
};

export const team = {
  eyebrow: "Your contacts",
  title: "The people who guide you",
  text: "Placeholder: portraits and short profiles of the Taranova team, once approved.",
  members: [
    { name: "[Name]", role: "[Role · Languages]", image: { hint: "Photo: portrait, 4:5" } as Img },
    { name: "[Name]", role: "[Role · Languages]", image: { hint: "Photo: portrait, 4:5" } as Img },
    { name: "[Name]", role: "[Role · Languages]", image: { hint: "Photo: portrait, 4:5" } as Img },
  ],
};

export const process = {
  eyebrow: "Process",
  title: "Six steps to the first day of training",
  text: "From the first conversation to the start in your company.",
  steps: [
    { icon: "company", title: "You brief us", text: "Trade, training places, start date and German level needed." },
    { icon: "chat", title: "Candidates prepare", text: "German course, documents and pre-departure briefing with independent partners." },
    { icon: "people", title: "We present candidates", text: "You hold the interviews and choose." },
    { icon: "contract", title: "You sign the training contract", text: "Directly with the candidate. The apprentice is your trainee, not ours." },
    { icon: "shield", title: "Approval and visa", text: "The chamber, the Federal Employment Agency and the embassy check. We guide you." },
    { icon: "arrival", title: "Arrival and start", text: "Onboarding support from Taranova." },
  ] as { icon: IconKey; title: string; text: string }[],
};

export const roles = {
  eyebrow: "Roles & costs",
  title: "Clear roles, clear money",
  text: "Taranova and the partners each do their own part and are paid separately for it. The partners focus on preparation; placement is Taranova's work alone.",
  cards: [
    {
      label: "Placement",
      from: { name: "You", sub: "Training company" },
      flow: "success-based fee",
      to: { name: "Taranova", sub: "Selection, placement, onboarding" },
      toStyle: "solid" as const,
      note: "Taranova is paid by employers only.",
    },
    {
      label: "Preparation",
      from: { name: "Candidate", sub: "prepares" },
      flow: "from price list",
      to: { name: "Partner", sub: "Language course, documents, departure" },
      toStyle: "gold" as const,
      note: "Partners only prepare and are paid by the candidate from a published price list. Taranova receives nothing from the candidate.",
    },
  ],
};

export const requirements = {
  eyebrow: "Requirements",
  title: "What you bring",
  items: [
    "Approval to train from the responsible chamber (IHK or HWK) and an open training place.",
    "A training allowance of at least EUR 1,045 gross a month in general (2026; the exact figure depends on trade and collective agreement).",
    "Help with housing and a start date that fits the preparation time.",
  ],
  timing: {
    eyebrow: "Timing",
    title: "At a glance",
    items: [
      { value: "~24 weeks", title: "Language and document preparation", text: "from A1, according to the partner programmes we reviewed" },
      { value: "~4 months", title: "Fast-track procedure", text: "in total" },
    ],
    note: "Both run partly in parallel; we confirm the schedule per case. A visa is decided by the authorities and cannot be guaranteed.",
  },
};

export const references = {
  eyebrow: "References",
  title: "Companies that trust us",
  text: "Placeholder: logos and quotes from first partner companies, once approved.",
  logos: [{ hint: "Company logo" }, { hint: "Company logo" }, { hint: "Company logo" }, { hint: "Association logo / seal" }] as Img[],
  gallery: [
    { image: { hint: "Photo: apprentices at work, 3:2" } as Img, caption: "Everyday life in the training company" },
    { image: { hint: "Photo: German course in the home country, 3:2" } as Img, caption: "Preparation with the partner" },
    { image: { hint: "Photo: arrival and first day, 3:2" } as Img, caption: "Arrival and onboarding" },
  ],
  testimonial: {
    label: "Successful apprentices",
    quote: "[Quote from a training company or apprentice, with name, company and photo]",
    author: "First name, trade, company, place",
  },
  video: { title: "Information video for companies", hint: "Placeholder: short explainer film, 90 seconds", url: "" },
};

export const contact = {
  title: "Talk to us about your open apprenticeship places.",
  text: "Tell us briefly about your trade and start date. We will get back to you personally.",
  image: { hint: "Photo: Düren office or team, 16:9" } as Img,
  locationLabel: "Location",
};

export const enquiryPage = {
  eyebrow: "Enquiry",
  title: "Talk to us about your open apprenticeship places.",
  text: "Tell us briefly about your trade, the number of places and your preferred start. We will get back to you.",
  benefitsLabel: "Your benefits",
  benefits: ["Candidates pay us nothing", "Contract directly with you", "No temp agency work"],
  thanksTitle: "Thank you for your enquiry.",
  thanksText: "We have received your details and will get back to you.",
};

export const defaults = { site, hero, services, team, process, roles, requirements, references, contact, enquiryPage };
export type Content = typeof defaults;
