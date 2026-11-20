import { createClient } from "@supabase/supabase-js";
import { existsSync, unlinkSync } from "node:fs";

// Pakai: NEW_ADMIN_PASSWORD diisi lewat environment (jangan ditulis di file / riwayat terminal).
const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.NEW_ADMIN_PASSWORD ?? "";
if (!email) { console.error("ADMIN_EMAIL kosong di .env"); process.exit(1); }
if (password.length < 12) { console.error("NEW_ADMIN_PASSWORD minimal 12 karakter (belum diisi atau terlalu pendek)"); process.exit(1); }

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
const { data, error: listErr } = await sb.auth.admin.listUsers({ perPage: 200 });
if (listErr) throw listErr;
const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
if (!user) { console.error("User admin tidak ditemukan. Jalankan npm run db:seed dulu."); process.exit(1); }

const { error } = await sb.auth.admin.updateUserById(user.id, { password, app_metadata: { ...user.app_metadata, role: "admin" } });
if (error) throw error;

const old = new URL("../.admin-initial-password", import.meta.url);
if (existsSync(old)) { unlinkSync(old); console.log("File .admin-initial-password dihapus."); }
console.log("Password admin berhasil diganti.");
