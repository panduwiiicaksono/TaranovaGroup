import type { Content } from "@/content/home";
import { Container, Eyebrow, H2 } from "../ui/primitives";
import { RoleCard } from "./RoleCard";

export function Roles({ data: roles }: { data: Content["roles"] }) {
  return (
    <section id="rollen" className="px-8 py-[88px] max-sm:px-5">
      <Container>
        <Eyebrow>{roles.eyebrow}</Eyebrow>
        <H2>{roles.title}</H2>
        <p className="m-0 mb-12 max-w-[680px] text-ink-2">{roles.text}</p>
        <div className="flex flex-wrap gap-6">
          {roles.cards.map((c) => (
            <RoleCard key={c.label} src={c.image?.src} label={c.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
