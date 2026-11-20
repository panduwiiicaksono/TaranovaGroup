import { cacheLife, cacheTag } from "next/cache";
import { API } from "./config";
import { defaults, type Content } from "@/content/home";


/** Konten Home dari API (di-cache, di-invalidate lewat /api/revalidate). Jatuh ke default jika API tidak tersedia. */
export async function getContent(locale = "en"): Promise<Content> {
  "use cache";
  cacheTag("content");
  cacheLife("minutes");
  try {
    const r = await fetch(`${API}/api/content/${locale}`);
    if (!r.ok) return defaults;
    const data = (await r.json()) as Partial<Content>;
    return { ...defaults, ...data };
  } catch {
    return defaults;
  }
}
