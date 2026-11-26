"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

/**
 * Kartu gambar di "Roles & costs". `label` ditampilkan sebagai pengganti selama gambar belum termuat
 * (koneksi lambat), atau bila gambar gagal dimuat / belum diunggah; juga dipakai sebagai alt text.
 */
export function RoleCard({ src, label }: { src?: string; label: string }) {
  const [state, setState] = useState<"ok" | "loading" | "error">(src ? "ok" : "error");

  // Dipanggil saat gambar terpasang di browser: jika belum selesai dimuat, tampilkan label sementara.
  const check = useCallback((el: HTMLImageElement | null) => {
    if (el && !(el.complete && el.naturalWidth > 0)) setState((s) => (s === "ok" ? "loading" : s));
  }, []);

  const showImage = !!src && state !== "error";
  return (
    <figure className="m-0 flex-[1_1_480px] self-start overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(23,39,60,.06)]">
      <div className="relative">
        {showImage && (
          <Image
            ref={check}
            src={src}
            alt={label}
            width={1200}
            height={800}
            sizes="(min-width: 1120px) 560px, 100vw"
            className="block h-auto w-full"
            onLoad={() => setState("ok")}
            onError={() => setState("error")}
          />
        )}
        {state !== "ok" && (
          <div
            data-fallback
            className={`flex items-center justify-center bg-white p-8 text-center ${showImage ? "absolute inset-0" : "min-h-[220px]"}`}
          >
            <p className="m-0 text-[12px] uppercase tracking-[0.2em] text-gold-text">{label}</p>
          </div>
        )}
      </div>
    </figure>
  );
}
