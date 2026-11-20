import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
