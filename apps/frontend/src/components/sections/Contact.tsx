"use client";
import { useState, type FormEvent } from "react";
import type { Content } from "@/content/home";
import { isEmail, submitEnquiry } from "@/lib/enquiry";
import { Container, ImageSlot, Mark } from "../ui/primitives";
import { FormEmbed } from "../FormEmbed";
import { formsEmbedUrl } from "@/lib/forms";

const input = "mt-1.5 block h-11 w-full box-border rounded-lg border border-[#4A5B73] bg-navy px-3 text-white";

export function Contact({ contact, site }: { contact: Content["contact"]; site: Content["site"] }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (v("website")) return setState("sent");
    if (!v("first") || !v("last") || !isEmail(v("email"))) return setErr("Please fill in name and a valid email.");
    if (f.get("consent") !== "on") return setErr("Consent is required.");
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
              <FormEmbed src={embed} />
            </div>
          ) : (
          <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-[1_1_480px] flex-wrap gap-4 rounded-xl border border-navy-line border-t-gold bg-navy-deep p-8 shadow-sm">
            {state === "sent" ? (
              <div role="status" className="py-6">
                <p className="m-0 mb-2 font-serif text-[26px] text-white">Thank you for your enquiry.</p>
                <p className="m-0 text-mist">We have received your details and will get back to you.</p>
              </div>
            ) : (
              <>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label className="flex-[1_1_200px] text-[13px] text-mist">First name<input name="first" type="text" autoComplete="given-name" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">Last name<input name="last" type="text" autoComplete="family-name" className={input} /></label>
                <label className="flex-[1_1_100%] text-[13px] text-mist">Company<input name="company" type="text" autoComplete="organization" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">Email<input name="email" type="email" autoComplete="email" className={input} /></label>
                <label className="flex-[1_1_200px] text-[13px] text-mist">Phone<input name="phone" type="tel" autoComplete="tel" className={input} /></label>
                <label className="flex-[1_1_100%] text-[13px] text-mist">Message<textarea name="message" rows={3} className={`${input} h-auto py-2.5`} /></label>
                <label className="flex flex-[1_1_100%] gap-2.5 text-[13px] text-mist">
                  <input name="consent" type="checkbox" className="mt-[3px]" />I consent to the processing of my data to handle this enquiry (GDPR).
                </label>
                {(err || state === "error") && <p role="alert" className="m-0 flex-[1_1_100%] text-sm text-[#F4A29A]">{err || "Something went wrong. Please try again."}</p>}
                <button type="submit" disabled={state === "sending"} className="min-h-[52px] rounded-lg bg-gold px-7 font-semibold text-navy disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </>
            )}
          </form>
          )}
        </div>
        <Footer site={site} />
      </Container>
    </section>
  );
}

export function Footer({ site }: { site: Content["site"] }) {
  return (
    <footer className="mt-[72px] flex flex-wrap justify-between gap-4 border-t border-navy-line pt-5 text-[13px] text-mist">
      <div>
        <p className="m-0 mb-1 text-cream">{site.legalName}</p>
        <p className="m-0">{site.address} · {site.email} · {site.phone}</p>
      </div>
      <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
        {site.legalLinks.map((l) => <a key={l.label} href={l.href} className="text-mist-2 hover:text-white">{l.label}</a>)}
      </div>
      <p className="m-0 basis-full">{site.register}</p>
    </footer>
  );
}
