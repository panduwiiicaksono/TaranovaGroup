import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { ui } from "@/lib/i18n";

export const metadata: Metadata = { title: ui.de.metaTitle, description: ui.de.metaDescription };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="de">{children}</RootShell>;
}
