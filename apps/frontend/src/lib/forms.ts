const HOSTS = new Set(["forms.office.com", "forms.cloud.microsoft", "forms.microsoft.com"]);

/** Terima hanya URL https Microsoft Forms; kembalikan URL embed atau null. */
export function formsEmbedUrl(raw?: string): string | null {
  if (!raw) return null;
  const m = raw.match(/src=["']([^"']+)["']/); // izinkan paste seluruh kode <iframe>
  try {
    const u = new URL((m ? m[1] : raw).trim());
    if (u.protocol !== "https:" || !HOSTS.has(u.hostname)) return null;
    u.searchParams.set("embed", "true");
    return u.toString();
  } catch {
    return null;
  }
}
