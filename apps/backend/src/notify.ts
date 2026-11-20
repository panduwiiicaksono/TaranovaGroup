/** Minta frontend membuang cache konten. Gagal tidak boleh membatalkan penyimpanan. */
export async function revalidateFrontend() {
  const url = process.env.FRONTEND_URL, secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;
  try {
    await fetch(`${url.replace(/\/$/, "")}/api/revalidate`, { method: "POST", headers: { "x-revalidate-secret": secret } });
  } catch (e) { console.error("revalidate failed", e); }
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Email notifikasi enquiry via Resend. Dilewati bila RESEND_API_KEY / NOTIFY_EMAIL kosong. */
export async function sendEnquiryMail(d: Record<string, string | null | undefined>) {
  const key = process.env.RESEND_API_KEY, to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  const rows = Object.entries(d).filter(([, v]) => v).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`).join("");
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM ?? "Taranova <onboarding@resend.dev>",
        to: to.split(","), reply_to: d.email ?? undefined,
        subject: `New enquiry: ${d.company}`, html: `<table cellpadding="6">${rows}</table>`,
      }),
    });
  } catch (e) { console.error("mail failed", e); }
}
