import { API } from "./config";

export type EnquiryInput = {
  company: string; contact: string; email: string; phone?: string;
  occupations?: string; places?: string; start?: string; message?: string; consent: boolean;
};

export async function submitEnquiry(data: EnquiryInput): Promise<{ ok: boolean }> {
  const r = await fetch(`${API}/api/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: r.ok };
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
