"use client";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

const MIN = 12;
const field = "mt-1 min-h-11 w-full rounded-lg border border-[#6B7788] px-3 font-normal";

export function Account({ maxHours }: { maxHours?: number }) {
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const pw = String(f.get("password") ?? ""), again = String(f.get("again") ?? "");
    if (pw.length < MIN) { setState("error"); setMsg(`Use at least ${MIN} characters.`); return; }
    if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) { setState("error"); setMsg("Use both letters and numbers."); return; }
    if (pw !== again) { setState("error"); setMsg("The two passwords do not match."); return; }
    setState("saving"); setMsg("");
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) { setState("error"); setMsg(error.message); return; }
    form.reset(); setState("done"); setMsg("Password changed.");
  }

  return (
    <div className="max-w-md space-y-10">
      <section>
        <h2 className="m-0 mb-1 font-serif text-2xl font-normal">Change password</h2>
        <p className="m-0 mb-4 text-sm text-ink-2">At least {MIN} characters, with letters and numbers. A passphrase of several words works well. Store it in a password manager.</p>
        <form onSubmit={submit} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6">
          <label className="text-sm font-semibold">New password
            <input name="password" type="password" autoComplete="new-password" minLength={MIN} required className={field} /></label>
          <label className="text-sm font-semibold">Repeat new password
            <input name="again" type="password" autoComplete="new-password" minLength={MIN} required className={field} /></label>
          {state === "error" && <p role="alert" className="m-0 text-sm text-[#B42318]">{msg}</p>}
          {state === "done" && <p role="status" className="m-0 text-sm text-[#067647]">{msg}</p>}
          <button disabled={state === "saving"} className="min-h-11 self-start rounded-lg bg-navy px-6 font-semibold text-white disabled:opacity-60">
            {state === "saving" ? "Saving…" : "Change password"}
          </button>
        </form>
      </section>
      <section>
        <h2 className="m-0 mb-1 font-serif text-2xl font-normal">Sessions</h2>
        <p className="m-0 mb-4 text-sm text-ink-2">You are signed out automatically after 30 minutes of inactivity{maxHours ? `, and every session ends after at most ${maxHours} hours` : ""}.</p>
        <button type="button" className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-sand"
          onClick={() => supabase.auth.signOut({ scope: "global" })}>Sign out on all devices</button>
      </section>
    </div>
  );
}
