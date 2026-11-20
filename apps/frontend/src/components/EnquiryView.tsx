import Link from "next/link";
import { getContent } from "@/lib/content";
import { Brand, Lang } from "@/components/sections/Header";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Container } from "@/components/ui/primitives";
import { FormEmbed } from "@/components/FormEmbed";
import { LegalLinks } from "@/components/LegalLinks";
import { formsEmbedUrl } from "@/lib/forms";
import { localizeHref, ui, type Locale } from "@/lib/i18n";

export async function EnquiryView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { enquiryPage: e, site } = await getContent(locale);
  const embed = formsEmbedUrl(site.formUrl);
  return (
    <>
      <div className="bg-navy text-cream">
        <header className="px-8 py-[22px] max-sm:px-5">
          <Container className="flex flex-wrap items-center justify-between gap-4">
            <Brand href={localizeHref(locale, "/")} name={site.name} locale={locale} />
            <div className="flex items-center gap-6 text-sm">
              <Link href={localizeHref(locale, "/")} className="inline-flex min-h-11 items-center text-sand-text no-underline hover:text-white">{t.backHome}</Link>
              <Lang locale={locale} path="/enquiry" />
            </div>
          </Container>
        </header>
        <section className="px-8 pb-14 pt-12 max-sm:px-5">
          <Container>
            <p className="m-0 mb-5 text-[12px] uppercase tracking-[0.2em] text-gold">{e.eyebrow}</p>
            <h1 className="m-0 mb-4 max-w-[760px] font-serif text-[42px] font-normal leading-[1.15] text-white max-sm:text-[32px]">{e.title}</h1>
            <p className="m-0 max-w-[620px] text-[17px] text-mist-2">{e.text}</p>
          </Container>
        </section>
      </div>
      <main className="px-8 pb-[88px] pt-16 max-sm:px-5">
        <Container className="flex flex-wrap gap-14">
          <div className="min-w-0 flex-[1_1_300px]">
            <p className="m-0 mb-4 text-[12px] uppercase tracking-[0.2em] text-gold-text">{e.benefitsLabel}</p>
            {e.benefits.map((b, i) => (
              <div key={b} className={`border-t border-line py-4 font-medium ${i === e.benefits.length - 1 ? "border-b" : ""}`}>{b}</div>
            ))}
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            <div className="rounded-xl border border-line bg-white p-9 shadow-[0_1px_2px_rgba(23,39,60,.06)] max-sm:p-6">
              {embed ? <FormEmbed src={embed} note={t.formBy} /> : <EnquiryForm page={e} locale={locale} />}
            </div>
          </div>
        </Container>
      </main>
      <footer className="bg-navy px-8 py-8 text-[13px] text-mist max-sm:px-5">
        <Container className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="m-0 mb-1 text-cream">{site.legalName}</p>
            <p className="m-0">{site.address} · {site.email} · {site.phone}</p>
            <p className="m-0 mt-1">{site.register}</p>
          </div>
          <LegalLinks site={site} locale={locale} />
        </Container>
      </footer>
    </>
  );
}
