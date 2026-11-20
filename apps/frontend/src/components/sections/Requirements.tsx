import type { Content } from "@/content/home";
import { Container, Eyebrow } from "../ui/primitives";

export function Requirements({ data: r }: { data: Content["requirements"] }) {
  return (
    <section id="zeitplan" className="px-8 pb-[88px] max-sm:px-5">
      <Container className="flex flex-wrap gap-14 border-t border-line pt-[72px]">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <h2 className="m-0 mb-6 font-serif text-[32px] font-normal leading-[1.2]">{r.title}</h2>
          {r.items.map((t, i) => (
            <div key={i} className={`border-t border-line py-4 ${i === r.items.length - 1 ? "border-b" : ""}`}>{t}</div>
          ))}
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow>{r.timing.eyebrow}</Eyebrow>
          <h2 className="m-0 mb-6 font-serif text-[32px] font-normal leading-[1.2]">{r.timing.title}</h2>
          <div className="flex flex-wrap gap-5">
            {r.timing.items.map((t) => (
              <div key={t.title} className="flex-[1_1_200px] border-t border-navy pt-4">
                <p className="m-0 mb-1 font-serif text-[30px] text-gold-dark">{t.value}</p>
                <p className="m-0 font-semibold">{t.title}</p>
                <p className="m-0 mt-1 text-sm text-ink-2">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="m-0 mt-6 text-sm text-ink-2">{r.timing.note}</p>
        </div>
      </Container>
    </section>
  );
}
