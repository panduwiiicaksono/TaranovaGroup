"use client";
import { useState, type FormEvent } from "react";
import type { Content } from "@/content/home";
import { isEmail, submitEnquiry } from "@/lib/enquiry";
import { ui, type Locale } from "@/lib/i18n";
import { Container, ImageSlot, Mark } from "../ui/primitives";
import { FormEmbed } from "../FormEmbed";
import { LegalLinks } from "../LegalLinks";
import { formsEmbedUrl } from "@/lib/forms";

const input = "mt-1.5 block h-11 w-full box-border rounded-lg border border-[#4A5B73] bg-navy px-3 text-white";

export function Contact({ contact, site, locale }: { contact: Content["contact"]; site: Content["site"]; locale: Locale }) {
  const t = ui[locale];
  const c = t.contact;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (v("website")) return setState("sent");
    if (!v("first") || !v("last") || !isEmail(v("email"))) return setErr(c.errName);
    if (f.get("consent") !== "on") return setErr(t.form.errConsent);
    setErr(""); setState("sending");
    try {
      const r = await submitEnquiry({
        company: v("company"), contact: `${v("first")} ${v("last")}`, email: v("email"),
        phone: v("phone"), message: v("message"), consent: true,
      });
      setState(r.ok ? "sent" : "error");
    } catch { setState("error"); }
  }

  const embed = formsEmbedUrl(site.formUrl);
  return (
    <section id="kontakt" className="bg-navy px-8 pb-8 pt-[88px] text-cream max-sm:px-5">
      <Container>
        <div className="flex flex-wrap gap-14">
          <div className="min-w-0 flex-[1_1_380px]">
            <Mark className="mb-8" />
            <h2 className="m-0 mb-4 font-serif text-[40px] font-normal leading-[1.15] text-white max-sm:text-[30px]">{contact.title}</h2>
            <p className="m-0 mb-8 max-w-[460px] text-mist">{contact.text}</p>
            <ImageSlot image={contact.image} ratio="16 / 9" tone="dark" className="mb-7 max-w-[460px]" />
            <p className="m-0 mb-1 text-[12px] uppercase tracking-[0.2em] text-gold">{contact.locationLabel}</p>
            <p className="m-0 text-sand-text">{site.legalName}<br />{site.address}</p>
          </div>
          {embed ? (
            <div className="min-w-0 flex-[1_1_480px] rounded-xl border border-navy-line border-t-gold bg-navy-deep p-4 text-mist shadow-sm">
              <FormEmbed src={embed} note={t.formBy} />
            </div>
          ) : (
          <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-[1_1_480px] flex-wrap gap-4 rounded-xl border border-navy-line border-t-gold bg-navy-deep p-8 shadow-sm">
            {state === "sent" ? (
              <div role="status" className="py-6">
                <p className="m-0 mb-2 font-serif text-[26px] text-white">{c.thanksTitle}</p>
                <p className="m-0 text-mist">{c.thanksText}</p>
              </div>
            ) : (
              <>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label className="flex-[1_1_200px] text-[13px] text-mist">{c.first}<input name="first" type="text" autoComplete="given-name" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">{c.last}<input name="last" type="text" autoComplete="family-name" className={input} /></label>
                <label className="flex-[1_1_100%] text-[13px] text-mist">{c.company}<input name="company" type="text" autoComplete="organization" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">{c.email}<input name="email" type="email" autoComplete="email" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">{c.phone}<input name="phone" type="tel" autoComplete="tel" className={input} /></label>
                <label className="flex-[1_1_100%] text-[13px] text-mist">{c.message}<textarea name="message" rows={3} className={`${input} h-auto py-2.5`} /></label>
                <label className="flex flex-[1_1_100%] gap-2.5 text-[13px] text-mist">
                  <input name="consent" type="checkbox" className="mt-[3px]" />{c.consent}
                </label>
                {(err || state === "error") && <p role="alert" className="m-0 flex-[1_1_100%] text-sm text-[#F4A29A]">{err || t.form.errGeneric}</p>}
                <button type="submit" disabled={state === "sending"} className="min-h-[52px] rounded-lg bg-gold px-7 font-semibold text-navy disabled:opacity-60">
                  {state === "sending" ? t.form.sending : t.form.send}
                </button>
              </>
            )}
          </form>
          )}
        </div>
        <Footer site={site} locale={locale} />
      </Container>
    </section>
  );
}

export function Footer({ site, locale }: { site: Content["site"]; locale: Locale }) {
  return (
    <footer className="mt-[72px] flex flex-wrap justify-between gap-4 border-t border-navy-line pt-5 text-[13px] text-mist">
      <div>
        <p className="m-0 mb-1 text-cream">{site.legalName}</p>
        <p className="m-0">{site.address} · {site.email} · {site.phone}</p>
      </div>
      <LegalLinks site={site} locale={locale} />
      <p className="m-0 basis-full">{site.register}</p>
    </footer>
  );
}
