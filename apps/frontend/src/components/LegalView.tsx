import Link from "next/link";
import { getContent } from "@/lib/content";
import { Brand, Lang } from "@/components/sections/Header";
import { LegalLinks } from "@/components/LegalLinks";
import { Container } from "@/components/ui/primitives";
import { RichText } from "@/components/RichText";
import type { LegalSection } from "@/content/legal";
import { localizeHref, ui, type Locale } from "@/lib/i18n";

export type LegalKey = "impressum" | "datenschutz" | "cookies";

export async function LegalView({ locale, page }: { locale: Locale; page: LegalKey }) {
  const t = ui[locale];
  const c = await getContent(locale);
  const doc = c.legal[page];
  const site = c.site;

  // Kelompokkan baris label/nilai yang berurutan jadi satu blok.
  const groups: ({ type: "rows"; items: LegalSection[] } | { type: "section"; item: LegalSection })[] = [];
  for (const s of doc.sections) {
    const prev = groups[groups.length - 1];
    if (s.kind === "row") {
      if (prev?.type === "rows") prev.items.push(s); else groups.push({ type: "rows", items: [s] });
    } else groups.push({ type: "section", item: s });
  }

  const Body = ({ text }: { text: string }) => (
    <>
      {text.split(/\n{2,}/).map((block, i) => {
        const lines = block.split("\n");
        return lines.every((l) => l.startsWith("• ")) ? (
          <ul key={i} className="m-0 mb-3 list-disc pl-5 text-ink-2">
            {lines.map((l, j) => <li key={j} className="mb-1"><RichText text={l.slice(2)} locale={locale} /></li>)}
          </ul>
        ) : (
          <p key={i} className="m-0 mb-3 whitespace-pre-line text-ink-2"><RichText text={block} locale={locale} /></p>
        );
      })}
    </>
  );

  return (
    <>
      <div className="bg-navy text-cream">
        <header className="px-8 py-[22px] max-sm:px-5">
          <Container className="flex flex-wrap items-center justify-between gap-4">
            <Brand href={localizeHref(locale, "/")} name={site.name} locale={locale} />
            <div className="flex items-center gap-6 text-sm">
              <Link href={localizeHref(locale, "/")} className="inline-flex min-h-11 items-center text-sand-text no-underline hover:text-white">{t.backHome}</Link>
              <Lang locale={locale} path={`/${page}`} />
            </div>
          </Container>
        </header>
        <section className="px-8 pb-12 pt-10 max-sm:px-5">
          <Container>
            {doc.eyebrow && <p className="m-0 mb-4 text-[12px] uppercase tracking-[0.2em] text-gold">{doc.eyebrow}</p>}
            <h1 className="m-0 mb-3 font-serif text-[42px] font-normal leading-[1.15] text-white max-sm:text-[32px]">{doc.title}</h1>
            {doc.intro && <p className="m-0 max-w-[680px] text-[17px] text-mist-2">{doc.intro}</p>}
          </Container>
        </section>
      </div>
      <main className="px-8 pb-[88px] pt-14 max-sm:px-5">
        <Container className="max-w-[760px]">
          {doc.notice && (
            <div role="note" className="mb-10 rounded-lg border border-gold bg-[#FFF8E1] p-4 text-sm text-navy">{doc.notice}</div>
          )}
          <article aria-label={doc.title}>
            {groups.map((g, gi) =>
              g.type === "rows" ? (
                <div key={gi} className="mb-9 border-t border-line">
                  {g.items.map((r, ri) => (
                    <div key={ri} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[230px_1fr] sm:gap-6">
                      <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-gold-text">{r.heading}</p>
                      <p className="m-0 whitespace-pre-line text-ink-2"><RichText text={r.body} locale={locale} /></p>
                    </div>
                  ))}
                </div>
              ) : (
                <section key={gi} className="mb-9">
                  {g.item.heading && <h2 className="m-0 mb-3 font-serif text-[24px] font-normal leading-[1.25]">{g.item.heading}</h2>}
                  <Body text={g.item.body} />
                  {g.item.table && (
                    <div className="mb-3 overflow-x-auto rounded-lg border border-line bg-white">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="bg-sand">{g.item.table.head.map((h) => <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {g.item.table.rows.map((r, ri) => (
                            <tr key={ri} className="border-t border-line align-top">
                              {r.cells.map((cell, ci) => <td key={ci} className="px-3 py-2.5 text-ink-2"><RichText text={cell} locale={locale} /></td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ),
            )}
            {doc.updated && <p className="m-0 mt-4 text-sm text-ink-2">{doc.updated}</p>}
          </article>
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
