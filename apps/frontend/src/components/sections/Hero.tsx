import Link from "next/link";
import type { Content } from "@/content/home";
import { localizeHref, type Locale } from "@/lib/i18n";
import { Container, Eyebrow, ImageSlot } from "../ui/primitives";

export function Hero({ data: hero, locale }: { data: Content["hero"]; locale: Locale }) {
  return (
    <section id="start" className="px-8 pb-[72px] pt-16 max-sm:px-5">
      <Container>
        <div className="flex flex-wrap items-center gap-14">
          <div className="min-w-0 flex-[1_1_500px]">
            <Eyebrow dark>{hero.eyebrow}</Eyebrow>
            <h1 className="m-0 mb-6 font-serif text-[50px] font-normal leading-[1.12] text-white max-sm:text-[36px]">{hero.title}</h1>
            <p className="m-0 mb-9 max-w-[560px] text-[18px] text-mist-2">{hero.text}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={localizeHref(locale, hero.primaryCta.href)} className="inline-flex min-h-[52px] items-center rounded-lg bg-gold px-7 font-semibold text-navy no-underline hover:brightness-110 hover:text-navy">
                {hero.primaryCta.label}
              </Link>
              <a href={hero.secondaryCta.href} className="inline-flex min-h-[52px] items-center rounded-lg border border-[#8794A6] px-7 font-medium text-cream no-underline hover:bg-white/10 hover:text-cream">
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_340px]">
            <ImageSlot image={hero.image} ratio="16 / 9" tone="dark" className="mb-5" />
            <div className="rounded-xl border border-t border-navy-line border-t-gold bg-navy-deep p-8 shadow-sm">
              <p className="m-0 mb-2 text-[12px] uppercase tracking-[0.2em] text-gold">{hero.pathTitle}</p>
              {hero.path.map((p, i) => (
                <div key={p.title} className={`flex justify-between gap-4 border-t border-navy-line py-4 ${i === hero.path.length - 1 ? "pb-0" : ""}`}>
                  <div>
                    <p className="m-0 mb-0.5 font-medium text-white">{p.title}</p>
                    <p className="m-0 text-sm text-mist">{p.text}</p>
                  </div>
                  <span className="font-serif text-[18px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-navy-line pt-5">
          <p className="m-0 mb-3 text-[12px] uppercase tracking-[0.2em] text-gold">{hero.industriesLabel}</p>
          <div className="flex flex-wrap gap-2.5">
            {hero.industries.map((i) => (
              <span key={i} className="rounded-full border border-navy-line bg-white/[0.04] px-3.5 py-1.5 text-sm text-sand-text">{i}</span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-mist">
            {hero.badges.map((b) => <span key={b}>{b}</span>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
