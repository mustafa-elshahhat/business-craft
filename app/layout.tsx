import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { brandAssets, siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const defaultTitle = `${siteConfig.name} — ${siteConfig.descriptor}`;

export const metadata: Metadata = {
  // Production origin comes from SITE_URL. Without it, URLs stay relative.
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: defaultTitle,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: siteConfig.description },
  icons: {
    icon: [
      { url: brandAssets.favicon.svg, type: "image/svg+xml" },
      { url: brandAssets.favicon.png32, type: "image/png", sizes: "32x32" },
    ],
    shortcut: brandAssets.favicon.ico,
    apple: { url: brandAssets.favicon.apple, sizes: "180x180" },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1320",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-control bg-white px-4 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
