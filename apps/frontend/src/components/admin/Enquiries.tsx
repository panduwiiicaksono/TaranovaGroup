"use client";
import { useCallback, useEffect, useState } from "react";
import { adminApi, type Enquiry } from "@/lib/adminApi";

export function Enquiries() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [err, setErr] = useState("");
  const load = useCallback(() => {
    adminApi.enquiries().then(setRows).catch((e: Error) => setErr(e.message));
  }, []);
  useEffect(() => {
    let alive = true;
    adminApi.enquiries().then((r) => alive && setRows(r)).catch((e: Error) => alive && setErr(e.message));
    return () => { alive = false; };
  }, []);

  if (err) return <p role="alert" className="text-[#B42318]">{err}</p>;
  if (!rows) return <p>Loading…</p>;
  if (!rows.length) return <p className="text-ink-2">No enquiries yet.</p>;
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <article key={r.id} className={`rounded-xl border bg-white p-5 ${r.handled ? "border-line opacity-70" : "border-gold"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="m-0 font-semibold">{r.company} <span className="font-normal text-ink-2">· {r.contact}</span></p>
              <p className="m-0 text-sm text-ink-2">
                <a href={`mailto:${r.email}`}>{r.email}</a>{r.phone && <> · {r.phone}</>} · {new Date(r.createdAt).toLocaleString("en-GB")}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-md border border-line px-3 py-1 text-sm hover:bg-sand"
                onClick={async () => { await adminApi.setHandled(r.id, !r.handled); load(); }}>{r.handled ? "Mark open" : "Mark handled"}</button>
              <button type="button" className="rounded-md border border-line px-3 py-1 text-sm text-[#B42318] hover:bg-sand"
                onClick={async () => { if (confirm("Delete this enquiry?")) { await adminApi.remove(r.id); load(); } }}>Delete</button>
            </div>
          </div>
          <dl className="mb-0 mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {([["Occupations", r.occupations], ["Places", r.places], ["Start", r.startDate], ["Message", r.message]] as const)
              .filter(([, v]) => v).map(([k, v]) => (<div key={k} className="contents"><dt className="text-ink-2">{k}</dt><dd className="m-0 whitespace-pre-wrap">{v}</dd></div>))}
          </dl>
        </article>
      ))}
    </div>
  );
}
