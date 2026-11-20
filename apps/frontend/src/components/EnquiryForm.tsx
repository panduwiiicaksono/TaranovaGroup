"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Content } from "@/content/home";
import { localizeHref, ui, type Locale } from "@/lib/i18n";
import { isEmail, submitEnquiry, type EnquiryInput } from "@/lib/enquiry";
import { Mark } from "./ui/primitives";
import { RichText } from "./RichText";

type Errors = Partial<Record<"company" | "contact" | "email" | "occupations" | "consent", string>>;

const field = "min-h-12 w-full box-border rounded-lg border border-[#6B7788] bg-white px-3.5 text-navy hover:border-navy";
const label = "text-sm font-semibold";

export function EnquiryForm({ page: enquiryPage, locale }: { page: Pick<Content["enquiryPage"], "thanksTitle" | "thanksText">; locale: Locale }) {
  const t = ui[locale].form;
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    // honeypot
    if (v("website")) return setState("sent");
    const data: EnquiryInput = {
      company: v("company"), contact: v("contact"), email: v("email"), phone: v("phone"),
      occupations: v("occupations"), places: v("places"), start: v("start"), message: v("message"),
      consent: f.get("consent") === "on",
    };
    const found: Errors = {};
    if (!data.company) found.company = t.errCompany;
    if (!data.contact) found.contact = t.errContact;
    if (!isEmail(data.email)) found.email = t.errEmail;
    if (!data.occupations) found.occupations = t.errOccupations;
    if (!data.consent) found.consent = t.errConsent;
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    try { setState((await submitEnquiry(data)).ok ? "sent" : "error"); } catch { setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col gap-4 py-6" role="status">
        <Mark size={40} />
        <h2 className="m-0 font-serif text-[32px] font-normal">{enquiryPage.thanksTitle}</h2>
        <p className="m-0 text-[17px] text-ink-2">{enquiryPage.thanksText}</p>
        <Link href={localizeHref(locale, "/")} className="font-semibold">{t.backHomeLink}</Link>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <span id={`${k}-err`} className="text-[13px] text-[#B42318]">{errors[k]}</span> : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="firma" className={label}>{t.company}</label>
          <input id="firma" name="company" type="text" autoComplete="organization" className={field} {...aria("company")} />{err("company")}
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="person" className={label}>{t.contactPerson}</label>
          <input id="person" name="contact" type="text" autoComplete="name" className={field} {...aria("contact")} />{err("contact")}
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="mail" className={label}>{t.email}</label>
          <input id="mail" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />{err("email")}
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="tel" className={label}>{t.phone}</label>
          <input id="tel" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="beruf" className={label}>{t.occupations}</label>
        <input id="beruf" name="occupations" type="text" className={field} {...aria("occupations")} />{err("occupations")}
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="anzahl" className={label}>{t.places}</label>
          <select id="anzahl" name="places" className={field}>
            {t.placesOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <label htmlFor="start" className={label}>{t.start}</label>
          <input id="start" name="start" type="text" className={field} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nachricht" className={label}>{t.message}</label>
        <textarea id="nachricht" name="message" rows={4} className={`${field} resize-y py-3`} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input id="einwilligung" name="consent" type="checkbox" className="mt-0.5 h-[22px] w-[22px] flex-none" {...aria("consent")} />
          <label htmlFor="einwilligung" className="text-sm text-ink-2"><RichText text={t.consent} locale={locale} /></label>
        </div>
        {err("consent")}
      </div>
      {state === "error" && <p role="alert" className="m-0 text-sm text-[#B42318]">{t.errGeneric}</p>}
      <button type="submit" disabled={state === "sending"} className="min-h-[52px] self-start rounded-lg bg-navy px-7 text-base font-semibold text-white disabled:opacity-60">
        {state === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
