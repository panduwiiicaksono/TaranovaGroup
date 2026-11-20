import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";

export const metadata: Metadata = { title: "Cookie policy – Taranova Group" };

export default function Page() {
  return <LegalView locale="en" page="cookies" />;
}
