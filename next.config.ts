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
};

export default nextConfig;
