import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Earlier service slugs.
    return [
      { source: "/services/ecommerce", destination: "/services/e-commerce", permanent: true },
      { source: "/services/systems", destination: "/services/business-systems", permanent: true },
    ];
  },
  async rewrites() {
    // Browsers request /favicon.ico by default; serve the locked brand asset.
    return [{ source: "/favicon.ico", destination: "/brand/favicon/favicon.ico" }];
  },
};

export default nextConfig;
