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

/**
 * Tambahkan kolom yang ada di template tetapi belum ada di data tersimpan (mis. kolom baru setelah pembaruan situs),
 * agar muncul di editor. Untuk isi array, hanya kolom yang ada di SEMUA elemen template yang ditambahkan
 * (kolom opsional milik satu elemen, seperti tabel di satu bagian legal, tidak ikut ditambahkan ke elemen lain).
 */
export function fillMissing<T>(value: T, template: unknown): T {
  if (Array.isArray(value)) {
    const t = Array.isArray(template) ? template : [];
    const objs = t.filter((x) => x && typeof x === "object" && !Array.isArray(x)) as Record<string, unknown>[];
    const common = objs.length ? Object.keys(objs[0]).filter((k) => objs.every((o) => k in o)) : [];
    return value.map((v, i) => {
      const own = t[i] ?? t[0];
      if (v && typeof v === "object" && !Array.isArray(v) && objs.length) {
        const src = v as Record<string, unknown>;
        const out: Record<string, unknown> = { ...src };
        for (const k of common) out[k] = k in src ? fillMissing(src[k], (own as Record<string, unknown>)?.[k]) : structuredClone(objs[0][k]);
        for (const k of Object.keys(src)) if (!common.includes(k)) out[k] = fillMissing(src[k], (own as Record<string, unknown> | undefined)?.[k]);
        return out;
      }
      return fillMissing(v, own);
    }) as T;
  }
  if (value && typeof value === "object") {
    const src = value as Record<string, unknown>;
    const tpl = template && typeof template === "object" && !Array.isArray(template) ? (template as Record<string, unknown>) : {};
    const out: Record<string, unknown> = { ...src };
    for (const k of Object.keys(tpl)) out[k] = k in src ? fillMissing(src[k], tpl[k]) : structuredClone(tpl[k]);
    return out as T;
  }
  return value;
}
