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
  // Batas waktu + satu kali ulang: backend yang lambat tidak boleh menggagalkan build/render
  // (Next.js membatalkan fungsi cache yang berjalan > ~50 detik). Gagal = pakai teks bawaan.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await fetch(`${API}/api/content/${locale}`, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) continue;
      const data = (await r.json()) as Partial<Content>;
      return { ...defaults, ...data };
    } catch {
      // coba lagi sekali
    }
  }
  return defaults;
}
