import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.en.metaTitle, description: ui.en.metaDescription };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
