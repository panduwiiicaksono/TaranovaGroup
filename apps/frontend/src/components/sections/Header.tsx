import Link from "next/link";
import type { Content } from "@/content/home";
import { Container, Mark } from "../ui/primitives";

export function Brand({ href = "/#start", name }: { href?: string; name: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 text-cream no-underline hover:text-cream">
      <Mark />
      <span className="font-serif text-[15px] uppercase tracking-[0.16em]">{name}</span>
    </Link>
  );
}

export function Lang() {
  // DE menyusul; EN aktif.
  return (
    <span className="text-[13px] tracking-[0.08em] text-mist">
      <span title="Deutsch – coming soon">DE</span> · <span className="border-b border-gold text-white">EN</span>
    </span>
  );
}

export function Header({ site }: { site: Content["site"] }) {
  return (
    <header className="px-8 py-[22px] max-sm:px-5">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <Brand name={site.name} />
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sand-text no-underline hover:text-white">{n.label}</a>
          ))}
          <Lang />
          <a href="#kontakt" className="inline-flex min-h-11 items-center rounded-lg border border-gold px-5 font-medium text-gold no-underline hover:bg-gold/15 hover:text-gold">
            Enquire now
          </a>
        </nav>
      </Container>
    </header>
  );
}
