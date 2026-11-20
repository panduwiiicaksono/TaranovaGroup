import { revalidateTag } from "next/cache";

// Dipanggil backend setelah admin menyimpan konten.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("content", { expire: 0 });
  return Response.json({ ok: true });
}
