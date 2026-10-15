import type { MetadataRoute } from "next";

import { brandAssets, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1320",
    theme_color: "#0b1320",
    icons: [
      { src: brandAssets.icons.icon192, sizes: "192x192", type: "image/png" },
      { src: brandAssets.icons.icon512, sizes: "512x512", type: "image/png" },
    ],
  };
}
