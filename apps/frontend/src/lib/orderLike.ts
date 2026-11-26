/**
 * Urutkan kunci objek mengikuti `template` (urutan penulisan di kode), secara rekursif.
 * Perlu karena Postgres jsonb tidak menyimpan urutan kunci (mengurutkan dari kunci terpendek),
 * sehingga editor admin menampilkan "text" sebelum "title".
 * Kunci yang tidak ada di template ditaruh di akhir; array memakai bentuk elemen template.
 */
export function orderLike<T>(value: T, template: unknown): T {
  if (Array.isArray(value)) {
    const t = Array.isArray(template) ? template : [];
    return value.map((v, i) => orderLike(v, t[i] ?? t[0])) as T;
  }
  if (value && typeof value === "object") {
    const src = value as Record<string, unknown>;
    const tpl = template && typeof template === "object" && !Array.isArray(template) ? (template as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(tpl)) if (k in src) out[k] = orderLike(src[k], tpl[k]);
    for (const k of Object.keys(src)) if (!(k in out)) out[k] = orderLike(src[k], undefined);
    return out as T;
  }
  return value;
}
