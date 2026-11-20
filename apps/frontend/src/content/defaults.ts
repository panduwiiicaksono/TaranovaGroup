import { defaults as en } from "./home";
import { defaultsDe as de } from "./home.de";
import type { Locale } from "@/lib/i18n";

export const defaultsFor = (l: Locale) => (l === "de" ? de : en);
