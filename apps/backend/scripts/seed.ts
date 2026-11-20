import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { writeFileSync, existsSync } from "node:fs";
import { db, schema } from "../src/db/index.ts";
import * as home from "../../frontend/src/content/home.ts";

const sections = {
  site: home.site, hero: home.hero, services: home.services, team: home.team,
  process: home.process, roles: home.roles, requirements: home.requirements,
  references: home.references, contact: home.contact, enquiryPage: home.enquiryPage,
};

// Konten: tidak menimpa yang sudah diedit admin.
for (const [key, data] of Object.entries(sections)) {
  await db.insert(schema.siteContent).values({ key, locale: "en", data }).onConflictDoNothing();
}
console.log(`content: ${Object.keys(sections).length} section (en) siap`);

// Admin user (opsional): isi ADMIN_EMAIL di .env
const email = process.env.ADMIN_EMAIL?.trim();
if (!email) {
  console.log("admin: ADMIN_EMAIL kosong di .env, dilewati");
} else {
  const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: list } = await sb.auth.admin.listUsers({ perPage: 200 });
  const existing = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (existing) {
    await sb.auth.admin.updateUserById(existing.id, { app_metadata: { role: "admin" } });
    console.log("admin: user sudah ada, role admin dipastikan");
  } else {
    const password = randomBytes(15).toString("base64url");
    const { error } = await sb.auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { role: "admin" } });
    if (error) throw error;
    const file = new URL("../.admin-initial-password", import.meta.url);
    if (!existsSync(file)) writeFileSync(file, `${email}\n${password}\n`, { mode: 0o600 });
    console.log("admin: dibuat. Password sementara ada di apps/backend/.admin-initial-password");
  }
}
process.exit(0);
