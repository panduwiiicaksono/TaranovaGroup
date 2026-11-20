import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";

export const metadata: Metadata = { title: "Impressum – Taranova Group" };

export default function Page() {
  return <LegalView locale="de" page="impressum" />;
}
