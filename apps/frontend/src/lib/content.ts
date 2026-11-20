import { cacheLife, cacheTag } from "next/cache";
import { API } from "./config";
import { defaultsFor } from "@/content/defaults";
import type { Content } from "@/content/home";
import type { Locale } from "./i18n";

/** Konten Home per bahasa dari API (di-cache, di-invalidate lewat /api/revalidate). Jatuh ke default jika API tidak tersedia. */
export async function getContent(locale: Locale = "de"): Promise<Content> {
  "use cache";
  cacheTag("content");
  cacheLife("minutes");
  const defaults = defaultsFor(locale);
  try {
    const r = await fetch(`${API}/api/content/${locale}`);
    if (!r.ok) return defaults;
    const data = (await r.json()) as Partial<Content>;
    return { ...defaults, ...data };
  } catch {
    return defaults;
  }
}
