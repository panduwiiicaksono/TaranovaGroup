"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { Node, type J } from "./JsonEditor";

const SECTIONS: [string, string][] = [
  ["hero", "Hero"], ["services", "Service"], ["team", "Team"], ["process", "Process"],
  ["roles", "Roles & costs"], ["requirements", "Requirements & timing"], ["references", "References"],
  ["contact", "Contact"], ["site", "Header, footer & company"], ["enquiryPage", "Enquiry page"],
];

export function ContentEditor() {
  const [key, setKey] = useState("hero");
  const [data, setData] = useState<J | null>(null);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let alive = true;
    adminApi.getSection("en", key)
      .then((d) => { if (alive) { setData(d); setDirty(false); setState("idle"); } })
      .catch((e: Error) => { if (alive) { setState("error"); setMsg(e.message); } });
    return () => { alive = false; };
  }, [key]);

  function choose(k: string) {
    if (k === key) return;
    if (dirty && !confirm("Discard unsaved changes?")) return;
    setState("loading"); setMsg(""); setKey(k);
  }
  async function save() {
    setState("saving"); setMsg("");
    try { await adminApi.saveSection("en", key, data); setDirty(false); setState("saved"); }
    catch (e) { setState("error"); setMsg((e as Error).message); }
  }

  return (
    <div className="flex flex-wrap gap-8">
      <nav aria-label="Sections" className="flex-[1_1_200px] md:max-w-[240px]">
        {SECTIONS.map(([k, t]) => (
          <button key={k} type="button" onClick={() => choose(k)}
            className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-sm ${k === key ? "bg-navy font-semibold text-white" : "hover:bg-sand"}`}>{t}</button>
        ))}
      </nav>
      <div className="min-w-0 flex-[3_1_480px]">
        <div className="sticky top-0 z-10 -mx-1 mb-5 flex items-center justify-between gap-3 bg-cream/95 px-1 py-3 backdrop-blur">
          <h2 className="m-0 font-serif text-2xl font-normal">{SECTIONS.find(([k]) => k === key)?.[1]}</h2>
          <div className="flex items-center gap-3 text-sm">
            {state === "saved" && <span className="text-[#067647]" role="status">Saved. Site updates shortly.</span>}
            {state === "error" && <span className="text-[#B42318]" role="alert">{msg}</span>}
            {dirty && state !== "saving" && <span className="text-ink-2">Unsaved changes</span>}
            <button type="button" onClick={save} disabled={!dirty || state === "saving"} className="min-h-10 rounded-lg bg-navy px-5 font-semibold text-white disabled:opacity-40">
              {state === "saving" ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
        {state === "loading" ? <p>Loading…</p> : data && (
          <div className="rounded-xl border border-line bg-white p-6">
            <Node name={key} value={data} onChange={(v) => { setData(v); setDirty(true); setState("idle"); }} />
          </div>
        )}
      </div>
    </div>
  );
}
