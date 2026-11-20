import Image from "next/image";
import type { ReactNode } from "react";
import type { Img } from "@/content/home";

export const SERIF = "font-serif";

export function Mark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border-[1.5px] border-gold font-serif font-semibold text-gold ${className}`}
      style={{ width: size, height: size, fontSize: size <= 28 ? 16 : 22 }}
    >
      T
    </span>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`m-0 mb-4 text-[12px] uppercase tracking-[0.2em] ${dark ? "text-gold" : "text-gold-text"}`}>
      {children}
    </p>
  );
}

export function H2({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`m-0 mb-3 font-serif text-[36px] font-normal leading-[1.2] ${dark ? "text-white" : ""} ${className}`}>
      {children}
    </h2>
  );
}

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1120px] ${className}`}>{children}</div>
);

const PhotoIcon = ({ stroke }: { stroke: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-8 9" />
  </svg>
);
const PersonIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#4A5568" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
  </svg>
);

/** Slot gambar: tampilkan foto bila ada src (dari CMS), jika tidak placeholder bergaris. */
export function ImageSlot({
  image, ratio, tone = "light", portrait = false, className = "",
}: { image: Img; ratio: string; tone?: "light" | "dark"; portrait?: boolean; className?: string }) {
  const style = { aspectRatio: ratio };
  if (image.src) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl ${className}`} style={style}>
        <Image src={image.src} alt={image.alt ?? ""} fill sizes="(min-width: 1120px) 560px, 100vw" className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={portrait ? "Portrait placeholder" : "Photo placeholder"}
      style={style}
      className={`box-border flex w-full flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed p-4 text-center text-[13px] ${
        dark ? "border-[#5A6B84] bg-navy-mid text-mist" : "border-dash bg-sand text-[#4A5568]"
      } ${className}`}
    >
      {portrait ? <PersonIcon /> : <PhotoIcon stroke={dark ? "#B9C1CC" : "#4A5568"} />}
      <span>[{image.hint}]</span>
    </div>
  );
}

export function AvatarSlot() {
  return (
    <div role="img" aria-label="Portrait placeholder" className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-dashed border-dash bg-sand">
      <PersonIcon size={22} />
    </div>
  );
}
