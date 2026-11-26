const KEY = "taranova-logout-reason";
export type LogoutReason = "idle" | "max";

/** Simpan alasan logout otomatis supaya layar login bisa menjelaskannya. */
export function setLogoutReason(r: LogoutReason) {
  try { sessionStorage.setItem(KEY, r); } catch { /* penyimpanan diblokir: abaikan */ }
}
export function takeLogoutReason(): LogoutReason | null {
  try {
    const v = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return v === "idle" || v === "max" ? v : null;
  } catch { return null; }
}
