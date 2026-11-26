import { createClient } from "@supabase/supabase-js";
import { sql } from "drizzle-orm";
import type { MiddlewareHandler } from "hono";
import { db } from "./db/index.ts";

const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const service = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Klaim dari token yang SUDAH diverifikasi Supabase. */
function claimsOf(token: string): { session_id?: string } {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
  } catch {
    return {};
  }
}

/** Masa sesi maksimum (jam) sejak login password. Setelah itu wajib login ulang, walau masih aktif. */
export const SESSION_MAX_HOURS = Number(process.env.ADMIN_SESSION_MAX_HOURS ?? 8);

export type SessionState = { status: "ok"; expiresAt: number } | { status: "missing" } | { status: "expired" };

/** Murni (mudah diuji): apakah sesi yang dimulai pada `startedAt` masih berlaku pada `now`? */
export function evaluateSession(startedAt: Date | null, now: number, maxHours: number): SessionState {
  if (!startedAt) return { status: "missing" };
  const expiresAt = startedAt.getTime() + maxHours * 3600_000;
  return now >= expiresAt ? { status: "expired" } : { status: "ok", expiresAt };
}

/** Waktu login password untuk sesi ini (tidak berubah saat token diperbarui). */
async function sessionStartedAt(sessionId: string): Promise<Date | null> {
  const rows = (await db.execute(sql`select created_at from auth.sessions where id = ${sessionId}::uuid`)) as unknown as { created_at: Date | string }[];
  return rows[0] ? new Date(rows[0].created_at) : null;
}

/**
 * Hanya user Supabase dengan app_metadata.role = "admin" (tidak bisa diubah user sendiri),
 * dan belum melewati masa sesi maksimum.
 */
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const token = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return c.json({ error: "unauthorized" }, 401);
  const { data, error } = await supa.auth.getUser(token);
  if (error || !data.user) return c.json({ error: "unauthorized" }, 401);
  if (data.user.app_metadata?.role !== "admin") return c.json({ error: "forbidden" }, 403);
  const claims = claimsOf(token);

  if (!claims.session_id) return c.json({ error: "unauthorized" }, 401);
  const state = evaluateSession(await sessionStartedAt(claims.session_id), Date.now(), SESSION_MAX_HOURS);
  if (state.status === "missing") return c.json({ error: "unauthorized" }, 401);
  if (state.status === "expired") {
    // Cabut sesi ini saja ("local"), supaya refresh token-nya mati dan tidak bisa dipakai lagi.
    await service.auth.admin.signOut(token, "local").catch(() => undefined);
    return c.json({ error: "session_expired" }, 401);
  }
  c.set("userId", data.user.id);
  c.set("sessionExpiresAt", state.expiresAt);
  await next();
};
