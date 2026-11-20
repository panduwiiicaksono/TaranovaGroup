import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";

export const metadata: Metadata = { title: "Cookie-Richtlinie – Taranova Group" };

export default function Page() {
  return <LegalView locale="de" page="cookies" />;
}
