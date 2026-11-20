import { API } from "./config";
import { supabase } from "./supabase";

async function call(path: string, init: RequestInit = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const r = await fetch(`${API}/api/admin${path}`, { ...init, headers }).catch(() => {
    throw new Error("Cannot reach the server. Make sure the backend is running, then try again.");
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(body.error ?? `HTTP ${r.status}`), { status: r.status });
  return body;
}

export const adminApi = {
  getSection: (locale: string, key: string) => call(`/content/${locale}/${key}`),
  saveSection: (locale: string, key: string, data: unknown) =>
    call(`/content/${locale}/${key}`, { method: "PUT", body: JSON.stringify(data) }),
  upload: (file: File) => {
    const f = new FormData();
    f.set("file", file);
    return call("/upload", { method: "POST", body: f }) as Promise<{ url: string }>;
  },
  enquiries: () => call("/enquiries") as Promise<Enquiry[]>,
  setHandled: (id: string, handled: boolean) => call(`/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ handled }) }),
  remove: (id: string) => call(`/enquiries/${id}`, { method: "DELETE" }),
};

export type Enquiry = {
  id: string; company: string; contact: string; email: string; phone: string | null;
  occupations: string | null; places: string | null; startDate: string | null;
  message: string | null; handled: boolean; createdAt: string;
};
