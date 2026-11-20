import Image from "next/image";
import type { Content } from "@/content/home";
import { AvatarSlot, Container, Eyebrow, H2, ImageSlot } from "../ui/primitives";

export function References({ data: r }: { data: Content["references"] }) {
  return (
    <section id="referenzen" className="px-8 pb-[88px] max-sm:px-5">
      <Container className="border-t border-line pt-[72px]">
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <H2>{r.title}</H2>
        <p className="m-0 mb-10 max-w-[620px] text-ink-2">{r.text}</p>

        <div className="mb-14 flex flex-wrap gap-4">
          {r.logos.map((l, i) => (
            <div key={i} className="relative flex h-[88px] flex-[1_1_160px] items-center justify-center rounded-lg border border-dashed border-dash text-[13px] text-[#6B7280]">
              {l.src ? <Image src={l.src} alt={l.alt ?? ""} fill className="object-contain p-4" /> : <>[{l.hint}]</>}
            </div>
          ))}
        </div>

        <div className="mb-14 flex flex-wrap gap-5">
          {r.gallery.map((g) => (
            <div key={g.caption} className="min-w-0 flex-[1_1_280px]">
              <ImageSlot image={g.image} ratio="3 / 2" />
              <p className="m-0 mt-2.5 text-sm text-ink-2">{g.caption}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-[1_1_480px] rounded-xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(23,39,60,.06)]">
            <p className="m-0 mb-4 text-[12px] uppercase tracking-[0.2em] text-gold-text">{r.testimonial.label}</p>
            <p className="m-0 mb-4 font-serif text-[22px] leading-[1.4]">{r.testimonial.quote}</p>
            <div className="flex items-center gap-3">
              <AvatarSlot />
              <p className="m-0 text-sm text-ink-2">{r.testimonial.author}</p>
            </div>
          </div>
          <div className="flex min-h-[220px] flex-[1_1_480px] flex-col items-center justify-center gap-4 rounded-xl border border-navy-line border-t-gold bg-navy-deep p-8">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-gold">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="#C08E43" /></svg>
            </span>
            <p className="m-0 font-medium text-white">{r.video.title}</p>
            <p className="m-0 text-[13px] text-mist">{r.video.hint}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
