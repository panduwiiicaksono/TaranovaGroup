import { Hono } from "hono";
import { requireAdmin, SESSION_MAX_HOURS } from "../auth.ts";

export const me = new Hono<{ Variables: { sessionExpiresAt: number } }>();
me.use("*", requireAdmin);

// Dipakai dashboard untuk menampilkan dan menjadwalkan logout otomatis di akhir masa sesi.
me.get("/", (c) => c.json({ expiresAt: new Date(c.get("sessionExpiresAt")).toISOString(), maxHours: SESSION_MAX_HOURS }));
