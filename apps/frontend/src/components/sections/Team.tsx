import type { Content } from "@/content/home";
import { Container, Eyebrow, H2, ImageSlot } from "../ui/primitives";

export function Team({ data: team }: { data: Content["team"] }) {
  return (
    <section id="team" className="px-8 pb-[88px] max-sm:px-5">
      <Container className="border-t border-line pt-[72px]">
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <H2>{team.title}</H2>
        <p className="m-0 mb-10 max-w-[620px] text-ink-2">{team.text}</p>
        <div className="flex flex-wrap gap-6">
          {team.members.map((m, i) => (
            <div key={i} className="min-w-0 flex-[1_1_240px]">
              <ImageSlot image={m.image} ratio="4 / 5" portrait />
              <p className="m-0 mb-0.5 mt-4 font-semibold">{m.name}</p>
              <p className="m-0 text-sm text-ink-2">{m.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
