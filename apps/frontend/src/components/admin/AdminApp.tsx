"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ContentEditor } from "./ContentEditor";
import { Enquiries } from "./Enquiries";
import { Account } from "./Account";
import { Mark } from "../ui/primitives";
import { adminApi } from "@/lib/adminApi";
import { setLogoutReason, takeLogoutReason } from "@/lib/sessionFlag";

const IDLE_MS = 30 * 60 * 1000; // logout otomatis setelah 30 menit tanpa aktivitas

export const fieldCls = "mt-1 min-h-11 w-full rounded-lg border border-[#6B7788] px-3 font-normal";
export const cardCls = "mx-auto mt-24 flex w-full max-w-sm flex-col gap-4 rounded-xl border border-line bg-white p-8";

function Login() {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice] = useState(() => {
    const reason = takeLogoutReason();
    if (reason === "idle") return "You were signed out after 30 minutes of inactivity.";
    if (reason === "max") return "Your session reached its maximum length. Please sign in again.";
    return "";
  });
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    if (error) setErr("Invalid email or password.");
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className={cardCls}>
      <Mark size={40} />
      <h1 className="m-0 font-serif text-3xl font-normal">Admin login</h1>
      {notice && <p role="status" className="m-0 text-sm text-ink-2">{notice}</p>}
      <label className="text-sm font-semibold">Email
        <input name="email" type="email" required autoComplete="username" className={fieldCls} /></label>
      <label className="text-sm font-semibold">Password
        <input name="password" type="password" required autoComplete="current-password" className={fieldCls} /></label>
      {err && <p role="alert" className="m-0 text-sm text-[#B42318]">{err}</p>}
      <button disabled={busy} className="min-h-11 rounded-lg bg-navy font-semibold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

export function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [tab, setTab] = useState<"content" | "enquiries" | "account">("content");
  const [limit, setLimit] = useState<{ endsAt: number; maxHours: number } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const ready = !!session;

  // Logout otomatis saat idle (hanya selama dashboard terbuka).
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!ready) return;
    const reset = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setLogoutReason("idle");
        void supabase.auth.signOut();
      }, IDLE_MS);
    };
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => { events.forEach((ev) => window.removeEventListener(ev, reset)); window.clearTimeout(timer.current); };
  }, [ready]);

  // Masa sesi maksimum: ambil batas dari backend, tampilkan, dan keluar otomatis saat habis.
  useEffect(() => {
    if (!ready) return;
    let alive = true;
    let t: number | undefined;
    adminApi.me().then((m) => {
      if (!alive) return;
      const endsAt = new Date(m.expiresAt).getTime();
      setLimit({ endsAt, maxHours: m.maxHours });
      t = window.setTimeout(() => { setLogoutReason("max"); void supabase.auth.signOut(); }, Math.max(0, endsAt - Date.now()));
    }).catch(() => { /* bila gagal, backend tetap menegakkan batasnya */ });
    return () => { alive = false; window.clearTimeout(t); };
  }, [ready]);

  if (session === undefined) return <p className="p-8">Loading…</p>;
  if (!session) return <Login />;

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3"><Mark /><span className="font-serif text-lg uppercase tracking-[0.12em]">Taranova admin</span></div>
        <div className="flex items-center gap-4 text-sm">
          {(["content", "enquiries", "account"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`pb-1 capitalize ${tab === t ? "border-b-2 border-gold font-semibold" : "text-ink-2"}`}>{t}</button>
          ))}
          {limit && (
            <span className="text-xs text-ink-2" title={`Sessions last at most ${limit.maxHours} hours`}>
              Session ends {new Date(limit.endsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
          <button type="button" className="rounded-md border border-line px-3 py-1" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </header>
      {tab === "content" ? <ContentEditor /> : tab === "enquiries" ? <Enquiries /> : <Account maxHours={limit?.maxHours} />}
    </div>
  );
}
