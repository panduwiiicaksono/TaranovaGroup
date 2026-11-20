import type { Content } from "@/content/home";
import { Container, Eyebrow, H2 } from "../ui/primitives";

export function Services({ data: services }: { data: Content["services"] }) {
  return (
    <section id="leistung" className="px-8 py-[88px] max-sm:px-5">
      <Container className="flex flex-wrap gap-14">
        <div className="min-w-0 flex-[1_1_320px]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <H2 className="mb-5">{services.title}</H2>
          <p className="m-0 text-ink-2">{services.text}</p>
        </div>
        <div className="min-w-0 flex-[2_1_480px] border-l border-line pl-10 max-sm:border-l-0 max-sm:pl-0">
          {services.items.map((s, i) => {
            const last = i === services.items.length - 1;
            return (
              <div key={s.title} className={`flex justify-between gap-4 ${i === 0 ? "pb-5" : last ? "pt-5" : "py-5"} ${last ? "" : "border-b border-line"}`}>
                <div>
                  <p className="m-0 mb-1 font-semibold">{s.title}</p>
                  <p className="m-0 text-ink-2">{s.text}</p>
                </div>
                <span className="font-serif text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
