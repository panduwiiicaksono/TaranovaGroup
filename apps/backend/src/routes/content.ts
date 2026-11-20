import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db/index.ts";
import { requireAdmin } from "../auth.ts";
import { revalidateFrontend } from "../notify.ts";

export const SECTION_KEYS = [
  "site", "hero", "services", "team", "process", "roles",
  "requirements", "references", "contact", "enquiryPage",
] as const;
const keySchema = z.enum(SECTION_KEYS);
const localeSchema = z.enum(["en", "de"]);

export const publicContent = new Hono();

// Semua section satu bahasa: { hero: {...}, services: {...}, ... }
publicContent.get("/:locale", async (c) => {
  const locale = localeSchema.safeParse(c.req.param("locale"));
  if (!locale.success) return c.json({ error: "bad locale" }, 400);
  const rows = await db.select().from(schema.siteContent).where(eq(schema.siteContent.locale, locale.data));
  c.header("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return c.json(Object.fromEntries(rows.map((r) => [r.key, r.data])));
});

export const adminContent = new Hono();
adminContent.use("*", requireAdmin);

adminContent.put("/:locale/:key", async (c) => {
  const locale = localeSchema.safeParse(c.req.param("locale"));
  const key = keySchema.safeParse(c.req.param("key"));
  if (!locale.success || !key.success) return c.json({ error: "bad params" }, 400);
  const body = await c.req.json().catch(() => null);
  if (body === null || typeof body !== "object" || Array.isArray(body)) return c.json({ error: "body must be an object" }, 400);
  await db
    .insert(schema.siteContent)
    .values({ key: key.data, locale: locale.data, data: body })
    .onConflictDoUpdate({
      target: [schema.siteContent.key, schema.siteContent.locale],
      set: { data: body, updatedAt: new Date() },
    });
  await revalidateFrontend();
  return c.json({ ok: true });
});

adminContent.get("/:locale/:key", async (c) => {
  const locale = localeSchema.safeParse(c.req.param("locale"));
  const key = keySchema.safeParse(c.req.param("key"));
  if (!locale.success || !key.success) return c.json({ error: "bad params" }, 400);
  const [row] = await db.select().from(schema.siteContent)
    .where(and(eq(schema.siteContent.key, key.data), eq(schema.siteContent.locale, locale.data)));
  return row ? c.json(row.data) : c.json({ error: "not found" }, 404);
});
