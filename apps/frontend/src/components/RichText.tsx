import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/i18n";

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\[[^\]]+\]/g;

/** Teks dengan: [label](/jalur) = link internal, [placeholder] = sorotan kuning, baris baru dipertahankan. */
export function RichText({ text, locale }: { text: string; locale: Locale }) {
  const out: React.ReactNode[] = [];
  let last = 0, i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) {
      const external = /^(https?:|mailto:|tel:)/.test(m[2]);
      out.push(external
        ? <a key={i++} href={m[2]} className="text-gold-text underline">{m[1]}</a>
        : <Link key={i++} href={localizeHref(locale, m[2])} className="text-gold-text underline">{m[1]}</Link>);
    } else {
      out.push(<mark key={i++} className="rounded-sm bg-[#FFF1B8] px-0.5 text-navy">{m[0]}</mark>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
