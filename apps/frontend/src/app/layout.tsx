import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Taranova Group – Apprentices from abroad",
  description:
    "Fill your apprenticeship places with prepared trainees from abroad. German course and documents before departure, support up to the first day of training.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
