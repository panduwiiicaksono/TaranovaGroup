import "../app/globals.css";
import { fontVars } from "@/lib/fonts";

export function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
