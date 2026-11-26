import { Hono } from "hono";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "../auth.ts";

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

// Batas isi permintaan Vercel Functions ±4,5 MB, jadi batas file di bawahnya.
export const MAX_BYTES = 4 * 1024 * 1024;

/** Jenis gambar ditentukan dari ISI file (magic bytes), bukan dari header yang bisa dipalsukan. SVG sengaja tidak diizinkan. */
export function sniffImage(b: Uint8Array): { type: string; ext: string } | null {
  const ascii = (from: number, to: number) => String.fromCharCode(...b.slice(from, to));
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: "image/jpeg", ext: "jpg" };
  if (b.length >= 8 && b[0] === 0x89 && ascii(1, 4) === "PNG" && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return { type: "image/png", ext: "png" };
  if (b.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { type: "image/webp", ext: "webp" };
  if (b.length >= 12 && ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return { type: "image/avif", ext: "avif" };
  return null;
}

export const upload = new Hono();
upload.use("*", requireAdmin);
upload.post("/", async (c) => {
  const declared = Number(c.req.header("content-length") ?? 0);
  if (declared > MAX_BYTES + 64 * 1024) return c.json({ error: "file too large (max 4 MB)" }, 413);
  const form = await c.req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return c.json({ error: "file required" }, 400);
  if (file.size > MAX_BYTES) return c.json({ error: "file too large (max 4 MB)" }, 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return c.json({ error: "unsupported image (use JPG, PNG, WebP or AVIF)" }, 400);
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${kind.ext}`;
  const { error } = await admin.storage.from("media").upload(path, bytes, { contentType: kind.type });
  if (error) return c.json({ error: error.message }, 500);
  const { data } = admin.storage.from("media").getPublicUrl(path);
  return c.json({ url: data.publicUrl }, 201);
});
