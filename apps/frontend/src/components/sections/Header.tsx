import Link from "next/link";
import type { Content } from "@/content/home";
import { localizeHref, ui, type Locale } from "@/lib/i18n";
import { Container, Mark } from "../ui/primitives";

export function Brand({ href, name, locale }: { href?: string; name: string; locale: Locale }) {
  return (
    <Link href={href ?? localizeHref(locale, "/") + "#start"} className="flex items-center gap-3 text-cream no-underline hover:text-cream">
      <Mark />
      <span className="font-serif text-[15px] uppercase tracking-[0.16em]">{name}</span>
    </Link>
  );
}

/** Pilih bahasa. `path` = jalur netral halaman ini ("/" atau "/enquiry"). */
export function Lang({ locale, path = "/" }: { locale: Locale; path?: string }) {
  const item = (l: Locale, label: string) =>
    l === locale ? (
      <span aria-current="true" className="border-b border-gold text-white">{label}</span>
    ) : (
      <Link href={localizeHref(l, path)} hrefLang={l} lang={l} className="text-mist no-underline hover:text-white">{label}</Link>
    );
  return (
    <span className="text-[13px] tracking-[0.08em] text-mist" aria-label={ui[locale].switchLang}>
      {item("de", "DE")} · {item("en", "EN")}
    </span>
  );
}

export function Header({ site, locale }: { site: Content["site"]; locale: Locale }) {
  const t = ui[locale];
  return (
    <header className="px-8 py-[22px] max-sm:px-5">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <Brand name={site.name} locale={locale} />
        <nav aria-label={t.mainNav} className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sand-text no-underline hover:text-white">{n.label}</a>
          ))}
          <Lang locale={locale} />
          <a href="#kontakt" className="inline-flex min-h-11 items-center rounded-lg border border-gold px-5 font-medium text-gold no-underline hover:bg-gold/15 hover:text-gold">
            {t.enquireNow}
          </a>
        </nav>
      </Container>
    </header>
  );
}
