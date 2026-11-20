import type { Content, IconKey } from "@/content/home";
import { Container, Eyebrow, H2 } from "../ui/primitives";

const ICONS: Record<IconKey, string> = {
  company: "M4 20V8l8-5 8 5v12M9 20v-6h6v6",
  chat: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
  people: "M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6M17 6h5M17 10h5",
  contract: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
  shield: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4",
  arrival: "M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6",
};

export function Process({ data: process }: { data: Content["process"] }) {
  return (
    <section id="ablauf" className="bg-navy px-8 py-[88px] text-cream max-sm:px-5">
      <Container>
        <Eyebrow dark>{process.eyebrow}</Eyebrow>
        <H2 dark>{process.title}</H2>
        <p className="m-0 mb-12 max-w-[620px] text-mist">{process.text}</p>
        <div className="flex flex-wrap gap-5">
          {process.steps.map((s, i) => (
            <div key={s.title} className="flex-[1_1_320px] rounded-xl border border-navy-line border-t-gold bg-navy-deep p-7 shadow-sm hover:border-[#5A6B84] hover:border-t-gold">
              <div className="mb-4 flex items-start justify-between">
                <p className="m-0 font-serif text-[28px] text-gold">{String(i + 1).padStart(2, "0")}</p>
                <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#C08E43" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon === "people" && <circle cx="9" cy="8" r="3.5" />}
                  <path d={ICONS[s.icon]} />
                </svg>
              </div>
              <h3 className="m-0 mb-2 text-[18px] font-semibold text-white">{s.title}</h3>
              <p className="m-0 text-[15px] text-mist">{s.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
