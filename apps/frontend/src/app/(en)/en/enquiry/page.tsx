import type { Metadata } from "next";
import { EnquiryView } from "@/components/EnquiryView";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.en.metaEnquiryTitle };

export default function Page() {
  return <EnquiryView locale="en" />;
}
