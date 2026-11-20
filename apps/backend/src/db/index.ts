import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

// Supabase transaction pooler (port 6543):
// - tanpa prepared statements,
// - tanpa pipelining (max_pipeline: 1): beberapa query di satu koneksi tanpa menunggu balasan membuat koneksi macet,
// - beberapa koneksi + timeout agar permintaan serentak tidak saling menunggu / menggantung selamanya.
const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  max: 5,
  max_pipeline: 1,
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 5,
});
export const db = drizzle(client, { schema });
export { schema };
