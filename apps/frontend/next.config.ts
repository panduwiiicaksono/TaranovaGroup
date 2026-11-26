import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Content-Security-Policy. 'unsafe-inline' pada script diperlukan oleh skrip bawaan Next.js (tanpa nonce);
// pengetatan lebih lanjut (nonce) bisa menyusul.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co",
  "font-src 'self' data:",
  `connect-src 'self' ${api} https://*.supabase.co${isDev ? " ws: http://localhost:*" : ""}`,
  // Formulir Microsoft Forms yang disematkan (lihat src/lib/forms.ts)
  "frame-src https://forms.office.com https://forms.cloud.microsoft https://forms.microsoft.com",
  "frame-ancestors 'none'", // halaman ini tidak boleh disematkan di situs lain (clickjacking)
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/en/impressum", destination: "/en/legal-notice", permanent: true },
      { source: "/en/datenschutz", destination: "/en/privacy-policy", permanent: true },
      { source: "/en/cookies", destination: "/en/cookie-policy", permanent: true },
    ];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
