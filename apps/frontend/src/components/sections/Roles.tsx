import type { Content } from "@/content/home";
import { Container, Eyebrow, H2 } from "../ui/primitives";

export function Roles({ data: roles }: { data: Content["roles"] }) {
  return (
    <section id="rollen" className="px-8 py-[88px] max-sm:px-5">
      <Container>
        <Eyebrow>{roles.eyebrow}</Eyebrow>
        <H2>{roles.title}</H2>
        <p className="m-0 mb-12 max-w-[680px] text-ink-2">{roles.text}</p>
        <div className="flex flex-wrap gap-6">
          {roles.cards.map((c) => (
            <div key={c.label} className="flex-[1_1_480px] rounded-xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(23,39,60,.06)]">
              <p className="m-0 mb-6 text-[12px] uppercase tracking-[0.2em] text-gold-text">{c.label}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-[1_1_140px] rounded-lg border border-navy p-4 text-center font-semibold">
                  {c.from.name}<br /><span className="text-sm font-normal text-ink-2">{c.from.sub}</span>
                </div>
                <div className="flex flex-none flex-col items-center text-[13px] text-ink-2">
                  <span>{c.flow}</span>
                  <svg width="80" height="16" viewBox="0 0 80 16" aria-hidden="true"><path d="M2 8h70M66 3l6 5-6 5" stroke="#A47530" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className={`flex-[1_1_140px] rounded-lg p-4 text-center font-semibold ${c.toStyle === "solid" ? "bg-navy text-white" : "border border-gold-dark"}`}>
                  {c.to.name}<br /><span className={`text-sm font-normal ${c.toStyle === "solid" ? "text-mist-2" : "text-ink-2"}`}>{c.to.sub}</span>
                </div>
              </div>
              <p className="m-0 mt-6 text-[15px] text-ink-2">{c.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
