"use client";
import { useRef, useState } from "react";
import { adminApi } from "@/lib/adminApi";

export type J = string | number | boolean | null | J[] | { [k: string]: J };
type Obj = { [k: string]: J };

const ICONS = ["company", "chat", "people", "contract", "shield", "arrival"];
const SELECTS: Record<string, string[]> = { icon: ICONS, toStyle: ["solid", "gold"], kind: ["text", "row"] };
const LONG = new Set(["text", "quote", "note", "message", "caption", "body", "intro", "notice"]);

const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const input = "w-full rounded-lg border border-[#6B7788] bg-white px-3 py-2 text-sm text-navy";
const btn = "rounded-md border border-line px-2.5 py-1 text-xs font-medium hover:bg-sand disabled:opacity-40";

function blank(v: J): J {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return null;
}

function ImageField({ value, onChange }: { value: Obj; onChange: (v: Obj) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const src = typeof value.src === "string" ? value.src : "";
  async function pick(f?: File) {
    if (!f) return;
    setBusy(true); setErr("");
    try { onChange({ ...value, src: (await adminApi.upload(f)).url }); }
    catch (e) { setErr((e as Error).message); }
    setBusy(false);
  }
  return (
    <div className="flex flex-wrap items-start gap-4 rounded-lg border border-dashed border-dash p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt="" className="h-24 w-32 rounded-md object-cover" /> :
        <div className="flex h-24 w-32 items-center justify-center rounded-md bg-sand text-xs text-ink-2">No image</div>}
      <div className="min-w-[200px] flex-1 space-y-2">
        <div className="flex gap-2">
          <button type="button" className={btn} disabled={busy} onClick={() => ref.current?.click()}>{busy ? "Uploading…" : src ? "Replace image" : "Upload image"}</button>
          {src && <button type="button" className={btn} onClick={() => { const n = { ...value }; delete n.src; onChange(n); }}>Remove</button>}
          <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
        </div>
        <label className="block text-xs text-ink-2">Alt text
          <input className={`${input} mt-1`} value={String(value.alt ?? "")} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
        </label>
        <label className="block text-xs text-ink-2">Placeholder label (shown while no image)
          <input className={`${input} mt-1`} value={String(value.hint ?? "")} onChange={(e) => onChange({ ...value, hint: e.target.value })} />
        </label>
        {err && <p className="m-0 text-xs text-[#B42318]">{err}</p>}
      </div>
    </div>
  );
}

export function Node({ name, value, onChange, depth = 0 }: { name: string; value: J; onChange: (v: J) => void; depth?: number }) {
  const title = label(name);

  if (typeof value === "string") {
    if (SELECTS[name]) return (
      <label className="block text-sm font-medium">{title}
        <select className={`${input} mt-1`} value={value} onChange={(e) => onChange(e.target.value)}>
          {SELECTS[name].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>);
    const long = LONG.has(name) || value.length > 90;
    return (
      <label className="block text-sm font-medium">{title}
        {long
          ? <textarea className={`${input} mt-1`} rows={Math.min(8, Math.ceil(value.length / 70) + 1)} value={value} onChange={(e) => onChange(e.target.value)} />
          : <input className={`${input} mt-1`} value={value} onChange={(e) => onChange(e.target.value)} />}
      </label>);
  }
  if (typeof value === "number") return (
    <label className="block text-sm font-medium">{title}
      <input type="number" className={`${input} mt-1`} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>);
  if (typeof value === "boolean") return (
    <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />{title}</label>);

  if (Array.isArray(value)) {
    const set = (i: number, v: J) => onChange(value.map((x, j) => (j === i ? v : x)));
    const move = (i: number, d: number) => { const a = [...value]; [a[i], a[i + d]] = [a[i + d], a[i]]; onChange(a); };
    const add = () => onChange([...value, value.length ? blank(value[value.length - 1]) : ""]);
    return (
      <div className="space-y-3">
        <p className="m-0 text-sm font-semibold">{title} <span className="font-normal text-ink-2">({value.length})</span></p>
        {value.map((item, i) => (
          <div key={i} className="rounded-lg border border-line bg-cream/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gold-text">#{i + 1}</span>
              <span className="flex gap-1.5">
                <button type="button" className={btn} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                <button type="button" className={btn} disabled={i === value.length - 1} onClick={() => move(i, 1)}>↓</button>
                <button type="button" className={btn} onClick={() => onChange(value.filter((_, j) => j !== i))}>Delete</button>
              </span>
            </div>
            <Node name={typeof item === "string" ? "text" : "item"} value={item} onChange={(v) => set(i, v)} depth={depth + 1} />
          </div>
        ))}
        <button type="button" className={btn} onClick={add}>+ Add</button>
      </div>);
  }

  if (value && typeof value === "object") {
    if (typeof value.hint === "string") return (
      <div><p className="m-0 mb-1 text-sm font-semibold">{title}</p><ImageField value={value} onChange={onChange} /></div>);
    return (
      <div className={depth ? "space-y-3" : "space-y-5"}>
        {Object.entries(value).filter(([k]) => k !== "src" || typeof value.hint !== "string").map(([k, v]) => (
          <Node key={k} name={k} value={v} depth={depth + 1} onChange={(nv) => onChange({ ...value, [k]: nv })} />
        ))}
      </div>);
  }
  return null;
}
