import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db/index.ts";
import { requireAdmin } from "../auth.ts";
import { sendEnquiryMail } from "../notify.ts";

const input = z.object({
  company: z.string().trim().min(1).max(200),
  contact: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional(),
  occupations: z.string().trim().max(300).optional(),
  places: z.string().trim().max(60).optional(),
  start: z.string().trim().max(100).optional(),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal(true),
  website: z.string().optional(), // honeypot
});

export const publicEnquiry = new Hono();
publicEnquiry.post("/", async (c) => {
  const parsed = input.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "invalid", issues: parsed.error.flatten().fieldErrors }, 400);
  const d = parsed.data;
  if (d.website) return c.json({ ok: true }); // bot: pura-pura sukses
  await db.insert(schema.enquiries).values({
    company: d.company, contact: d.contact, email: d.email, phone: d.phone || null,
    occupations: d.occupations || null, places: d.places || null,
    startDate: d.start || null, message: d.message || null,
  });
  await sendEnquiryMail({ company: d.company, contact: d.contact, email: d.email, phone: d.phone, occupations: d.occupations, places: d.places, start: d.start, message: d.message });
  return c.json({ ok: true }, 201);
});

export const adminEnquiry = new Hono();
adminEnquiry.use("*", requireAdmin);
const idSchema = z.string().uuid();
adminEnquiry.get("/", async (c) =>
  c.json(await db.select().from(schema.enquiries).orderBy(desc(schema.enquiries.createdAt))));
adminEnquiry.patch("/:id", async (c) => {
  if (!idSchema.safeParse(c.req.param("id")).success) return c.json({ error: "invalid id" }, 400);
  const body = z.object({ handled: z.boolean() }).safeParse(await c.req.json().catch(() => null));
  if (!body.success) return c.json({ error: "invalid" }, 400);
  await db.update(schema.enquiries).set({ handled: body.data.handled }).where(eq(schema.enquiries.id, c.req.param("id")));
  return c.json({ ok: true });
});
adminEnquiry.delete("/:id", async (c) => {
  if (!idSchema.safeParse(c.req.param("id")).success) return c.json({ error: "invalid id" }, 400);
  await db.delete(schema.enquiries).where(eq(schema.enquiries.id, c.req.param("id")));
  return c.json({ ok: true });
});
