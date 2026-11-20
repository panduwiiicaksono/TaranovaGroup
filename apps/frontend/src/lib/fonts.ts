import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-source-serif", display: "swap" });
export const fontVars = `${plex.variable} ${serif.variable}`;
