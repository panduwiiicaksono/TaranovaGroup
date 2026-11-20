# Backend (Hono + Drizzle + Supabase)

API untuk konten Home (CMS), upload gambar, dan enquiry. Deploy sebagai project Vercel terpisah (Root Directory: `apps/backend`).

## Jalankan lokal
```
cp .env.example .env     # isi nilainya (lihat .env.example)
npm install
npm run db:push          # buat tabel di Supabase
npm run db:seed          # isi konten awal (+ admin bila ADMIN_EMAIL diisi)
npm run dev              # http://localhost:4000/api/health
```

## Endpoint
- Publik: `GET /api/content/:locale`, `POST /api/enquiry`
- Admin (Bearer token Supabase, role admin): `/api/admin/content/:locale/:key`, `/api/admin/enquiries`, `/api/admin/upload`
