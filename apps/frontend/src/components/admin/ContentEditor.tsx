"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { Node, type J } from "./JsonEditor";
import { defaultsFor } from "@/content/defaults";
import type { Locale } from "@/lib/i18n";

// [kunci, label Inggris, label Jerman]. Label Jerman mengikuti istilah di menu situs Jerman.
const SECTIONS: [string, string, string][] = [
  ["hero", "Hero", "Startbereich (Hero)"],
  ["services", "Service", "Leistung"],
  ["team", "Team", "Team"],
  ["process", "Process", "Ablauf"],
  ["roles", "Roles & costs", "Rollen & Kosten"],
  ["requirements", "Requirements & timing", "Voraussetzungen & Zeitplan"],
  ["references", "References", "Referenzen"],
  ["contact", "Contact", "Kontakt"],
  ["site", "Header, footer & company", "Kopfzeile, Fußzeile & Firma"],
  ["enquiryPage", "Enquiry page", "Anfrageseite"],
  ["legal", "Legal pages", "Rechtliche Seiten"],
];

export function ContentEditor() {
  const [locale, setLocale] = useState<Locale>("de");
  const [key, setKey] = useState("hero");
  const label = (k: string) => { const r = SECTIONS.find(([x]) => x === k); return r ? (locale === "de" ? r[2] : r[1]) : k; };
  const [fresh, setFresh] = useState(false); // true = belum pernah disimpan untuk bahasa ini, memakai teks bawaan
  const [data, setData] = useState<J | null>(null);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let alive = true;
    adminApi.getSection(locale, key)
      .then((d) => { if (alive) { setData(d); setFresh(false); setDirty(false); setState("idle"); } })
      .catch((e: Error & { status?: number }) => {
        if (!alive) return;
        if (e.status === 404) {
          // Belum ada versi tersimpan: mulai dari teks bawaan bahasa ini.
          setData(JSON.parse(JSON.stringify((defaultsFor(locale) as Record<string, unknown>)[key])) as J);
          setFresh(true); setDirty(false); setState("idle");
        } else { setState("error"); setMsg(e.message); }
      });
    return () => { alive = false; };
  }, [key, locale]);

  function choose(k: string) {
    if (k === key) return;
    if (dirty && !confirm("Discard unsaved changes?")) return;
    setState("loading"); setMsg(""); setKey(k);
  }
  function chooseLocale(l: Locale) {
    if (l === locale) return;
    if (dirty && !confirm("Discard unsaved changes?")) return;
    setState("loading"); setMsg(""); setLocale(l);
  }
  async function save() {
    setState("saving"); setMsg("");
    try { await adminApi.saveSection(locale, key, data); setDirty(false); setFresh(false); setState("saved"); }
    catch (e) { setState("error"); setMsg((e as Error).message); }
  }

  return (
    <div className="flex flex-wrap gap-8">
      <nav aria-label="Sections" className="flex-[1_1_200px] md:max-w-[240px]">
        <div role="group" aria-label="Language" className="mb-4 flex gap-1 rounded-lg border border-line bg-white p-1">
          {(["de", "en"] as const).map((l) => (
            <button key={l} type="button" onClick={() => chooseLocale(l)} aria-pressed={l === locale}
              className={`flex-1 rounded-md py-1.5 text-sm font-semibold ${l === locale ? "bg-navy text-white" : "hover:bg-sand"}`}>
              {l === "de" ? "Deutsch" : "English"}
            </button>
          ))}
        </div>
        {SECTIONS.map(([k, en, de]) => (
          <button key={k} type="button" onClick={() => choose(k)}
            className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-sm ${k === key ? "bg-navy font-semibold text-white" : "hover:bg-sand"}`}>{locale === "de" ? de : en}</button>
        ))}
      </nav>
      <div className="min-w-0 flex-[3_1_480px]">
        <div className="sticky top-0 z-10 -mx-1 mb-5 flex items-center justify-between gap-3 bg-cream/95 px-1 py-3 backdrop-blur">
          <h2 className="m-0 font-serif text-2xl font-normal">{label(key)} <span className="text-base text-ink-2">({locale.toUpperCase()})</span></h2>
          <div className="flex items-center gap-3 text-sm">
            {state === "saved" && <span className="text-[#067647]" role="status">Saved. Site updates shortly.</span>}
            {state === "error" && <span className="text-[#B42318]" role="alert">{msg}</span>}
            {dirty && state !== "saving" && <span className="text-ink-2">Unsaved changes</span>}
            <button type="button" onClick={save} disabled={!dirty || state === "saving"} className="min-h-10 rounded-lg bg-navy px-5 font-semibold text-white disabled:opacity-40">
              {state === "saving" ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
        {fresh && state !== "loading" && (
          <p role="note" className="mb-4 rounded-lg border border-gold bg-white p-3 text-sm">
            Not saved yet for {locale === "de" ? "German" : "English"}: showing the default text. Edit it and press Save to publish this language version.
          </p>
        )}
        {state === "loading" ? <p>Loading…</p> : data && (
          <div className="rounded-xl border border-line bg-white p-6">
            <Node name={key} value={data} onChange={(v) => { setData(v); setDirty(true); setState("idle"); }} />
          </div>
        )}
      </div>
    </div>
  );
}
