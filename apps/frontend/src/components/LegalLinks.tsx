import Link from "next/link";
import type { Content } from "@/content/home";
import { localizeHref, type Locale } from "@/lib/i18n";

const SLUGS = ["/impressum", "/datenschutz", "/cookies"];

/** Tiga link legal di footer. Jika href di konten bukan jalur internal (mis. "#"), dipakai jalur bawaan. */
export function LegalLinks({ site, locale }: { site: Content["site"]; locale: Locale }) {
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
      {site.legalLinks.map((l, i) => {
        const path = l.href?.startsWith("/") ? l.href : SLUGS[i] ?? "/";
        return <Link key={l.label} href={localizeHref(locale, path)} className="text-mist-2 hover:text-white">{l.label}</Link>;
      })}
    </div>
  );
}
