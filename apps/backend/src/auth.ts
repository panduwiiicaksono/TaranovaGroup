import { createClient } from "@supabase/supabase-js";
import type { MiddlewareHandler } from "hono";

const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Hanya user Supabase dengan app_metadata.role = "admin" (tidak bisa diubah user sendiri). */
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const token = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return c.json({ error: "unauthorized" }, 401);
  const { data, error } = await supa.auth.getUser(token);
  if (error || !data.user) return c.json({ error: "unauthorized" }, 401);
  if (data.user.app_metadata?.role !== "admin") return c.json({ error: "forbidden" }, 403);
  c.set("userId", data.user.id);
  await next();
};
