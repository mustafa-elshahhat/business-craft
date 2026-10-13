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
  async rewrites() {
    // Browsers request /favicon.ico by default; serve the locked brand asset.
    return [{ source: "/favicon.ico", destination: "/brand/favicon/favicon.ico" }];
  },
};

export default nextConfig;
