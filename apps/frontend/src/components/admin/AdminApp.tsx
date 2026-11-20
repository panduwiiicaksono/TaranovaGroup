"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ContentEditor } from "./ContentEditor";
import { Enquiries } from "./Enquiries";
import { Mark } from "../ui/primitives";

function Login() {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    if (error) setErr("Invalid email or password.");
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-24 flex w-full max-w-sm flex-col gap-4 rounded-xl border border-line bg-white p-8">
      <Mark size={40} />
      <h1 className="m-0 font-serif text-3xl font-normal">Admin login</h1>
      <label className="text-sm font-semibold">Email
        <input name="email" type="email" required autoComplete="username" className="mt-1 min-h-11 w-full rounded-lg border border-[#6B7788] px-3 font-normal" /></label>
      <label className="text-sm font-semibold">Password
        <input name="password" type="password" required autoComplete="current-password" className="mt-1 min-h-11 w-full rounded-lg border border-[#6B7788] px-3 font-normal" /></label>
      {err && <p role="alert" className="m-0 text-sm text-[#B42318]">{err}</p>}
      <button disabled={busy} className="min-h-11 rounded-lg bg-navy font-semibold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

export function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [tab, setTab] = useState<"content" | "enquiries">("content");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <p className="p-8">Loading…</p>;
  if (!session) return <Login />;

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3"><Mark /><span className="font-serif text-lg uppercase tracking-[0.12em]">Taranova admin</span></div>
        <div className="flex items-center gap-4 text-sm">
          {(["content", "enquiries"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`pb-1 capitalize ${tab === t ? "border-b-2 border-gold font-semibold" : "text-ink-2"}`}>{t}</button>
          ))}
          <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
          <button type="button" className="rounded-md border border-line px-3 py-1" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </header>
      {tab === "content" ? <ContentEditor /> : <Enquiries />}
    </div>
  );
}
