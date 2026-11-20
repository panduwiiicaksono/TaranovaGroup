import { Hono } from "hono";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "../auth.ts";

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});
const OK = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif"]);

export const upload = new Hono();
upload.use("*", requireAdmin);
upload.post("/", async (c) => {
  const form = await c.req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return c.json({ error: "file required" }, 400);
  if (!OK.has(file.type) || file.size > 5 * 1024 * 1024) return c.json({ error: "image only, max 5MB" }, 400);
  const ext = file.type === "image/svg+xml" ? "svg" : file.type.split("/")[1];
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await admin.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) return c.json({ error: error.message }, 500);
  const { data } = admin.storage.from("media").getPublicUrl(path);
  return c.json({ url: data.publicUrl }, 201);
});
