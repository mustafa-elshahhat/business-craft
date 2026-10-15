import type { StaticImageData } from "next/image";

import type { caseStudySlugs } from "./routes";

import dermivaBuybox from "@/assets/projects/dermiva-skincare-buybox.jpg";
import dermivaCart from "@/assets/projects/dermiva-skincare-cart.jpg";
import dermivaCartMobile from "@/assets/projects/dermiva-skincare-cart-mobile.jpg";
import dermivaCategory from "@/assets/projects/dermiva-skincare-category.jpg";
import dermivaHome from "@/assets/projects/dermiva-skincare-home.jpg";
import dermivaHomeAr from "@/assets/projects/dermiva-skincare-home-ar.jpg";
import dermivaHomeArMobile from "@/assets/projects/dermiva-skincare-home-ar-mobile.jpg";
import dermivaSearch from "@/assets/projects/dermiva-skincare-search.jpg";
import drMirrorCart from "@/assets/projects/dr-mirror-cart.jpg";
import drMirrorHome from "@/assets/projects/dr-mirror-home.jpg";
import drMirrorHomeEn from "@/assets/projects/dr-mirror-home-en.jpg";
import drMirrorHomeMobile from "@/assets/projects/dr-mirror-home-mobile.jpg";
import drMirrorProduct from "@/assets/projects/dr-mirror-product.jpg";
import drMirrorProductMobile from "@/assets/projects/dr-mirror-product-mobile.jpg";
import drMirrorProducts from "@/assets/projects/dr-mirror-products.jpg";
import saadHome from "@/assets/projects/saad-logistic-desktop.jpg";
import saadHomeEn from "@/assets/projects/saad-logistic-home-en.jpg";
import saadHomeMobile from "@/assets/projects/saad-logistic-home-mobile.jpg";
import saadServices from "@/assets/projects/saad-logistic-services.jpg";
import soulmateBag from "@/assets/projects/soulmate-gift-store-bag.jpg";
import soulmateCatalogue from "@/assets/projects/soulmate-gift-store-catalogue.jpg";
import soulmateDetail from "@/assets/projects/soulmate-gift-store-product-detail.jpg";
import soulmateHome from "@/assets/projects/soulmate-gift-store-home.jpg";
import soulmateHomeAr from "@/assets/projects/soulmate-gift-store-home-ar.jpg";
import soulmateHomeArMobile from "@/assets/projects/soulmate-gift-store-home-ar-mobile.jpg";
import ztsCart from "@/assets/projects/zts-fashion-cart.jpg";
import ztsCollection from "@/assets/projects/zts-fashion-collection.jpg";
import ztsHome from "@/assets/projects/zts-fashion-home.jpg";
import ztsHomeAr from "@/assets/projects/zts-fashion-home-ar.jpg";
import ztsHomeArMobile from "@/assets/projects/zts-fashion-home-ar-mobile.jpg";
import ztsProduct from "@/assets/projects/zts-fashion-product.jpg";
import ztsProductMobile from "@/assets/projects/zts-fashion-product-mobile.jpg";

/**
 * Case studies.
 *
 * Every statement describes what the live site visibly does, verified by
 * capture of the live sites in October 2026. No
 * results, metrics, dates, clients' internal facts or technology stacks.
 */
export type Shot = { src: StaticImageData; alt: string; caption?: string };

export type CaseStudy = {
  slug: (typeof caseStudySlugs)[number];
  /** Facts shown in the hero. Only verified values. */
  facts: { label: string; value: string }[];
  /** Context: what the business is and what the site needs to do. */
  context: string;
  /** What the live site includes. */
  built: { title: string; text: string }[];
  /** The key interaction, shown large. "soulmate-builder" renders the interactive story. */
  highlight:
    | { kind: "pair"; title: string; text: string; desktop: Shot; mobile: Shot }
    | { kind: "soulmate-builder"; title: string; text: string };
  /** Real interface gallery. */
  gallery: Shot[];
  /** English and Arabic proof (both live, right-to-left verified). primary = hero language, secondary = the other. */
  bilingual: { primary: Shot; secondary: Shot; mobile: Shot; note: string };
  /** Optional real clip (muted scroll of the live site). */
  video?: { mp4: string; webm: string; poster: Shot };
  /** Precise scope notes, where a reader could otherwise over-assume. */
  note?: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "zts-fashion",
    facts: [
      { label: "Service", value: "E-commerce" },
      { label: "Languages", value: "English and Arabic (right-to-left)" },
      { label: "Live at", value: "ztsbrand.com" },
    ],
    context:
      "ZTS is a clothing brand of minimalist everyday basics, made in Egypt. The store has to present a growing catalogue simply, in English and Arabic, and give shoppers the size, colour and stock detail they need to buy with confidence.",
    built: [
      { title: "Collections and filters", text: "Collections with filters for size, colour, price and collection, plus sorting." },
      { title: "Product pages", text: "Colour and size options, a size guide, stock notes and reviews on every product." },
      { title: "Cart and checkout", text: "A cart page and a three-step guest checkout: address, payment, confirmation." },
      { title: "English and Arabic", text: "A language switch to a fully mirrored right-to-left store." },
    ],
    highlight: {
      kind: "pair",
      title: "A product page built for choosing",
      text: "Colour, size, stock and price sit together beside the product photography, on desktop and on the phone.",
      desktop: { src: ztsProduct, alt: "ZTS Fashion product page: Linen Set in Baby Blue, EGP 1,600, with colour and size options and Add to cart" },
      mobile: { src: ztsProductMobile, alt: "ZTS Fashion product page on a phone" },
    },
    gallery: [
      { src: ztsCollection, alt: "ZTS Fashion New Arrivals collection with size, colour and price filters", caption: "Collection with filters" },
      { src: ztsCart, alt: "ZTS Fashion shopping cart with order summary and checkout options", caption: "Cart and order summary" },
    ],
    bilingual: {
      primary: { src: ztsHome, alt: "ZTS Fashion home page in English: “Minimal basics, ready to wear”" },
      secondary: { src: ztsHomeAr, alt: "ZTS Fashion home page in Arabic, mirrored right to left" },
      mobile: { src: ztsHomeArMobile, alt: "ZTS Fashion Arabic home page on a phone" },
      note: "The Arabic store mirrors the whole layout: navigation, carousels and prices, not just the text.",
    },
    video: {
      mp4: "/media/work/zts-fashion.mp4",
      webm: "/media/work/zts-fashion.webm",
      poster: { src: ztsHome, alt: "ZTS Fashion home page" },
    },
  },
  {
    slug: "dermiva-skincare",
    facts: [
      { label: "Service", value: "E-commerce storefront" },
      { label: "Languages", value: "English and Arabic (right-to-left)" },
      { label: "Live at", value: "dermiva-eg.vercel.app" },
    ],
    context:
      "Dermiva sells face, hair, body and lip care. The storefront organises a compact catalogue by category and keeps the path from discovery to cart short, in English and Arabic.",
    built: [
      { title: "Category browsing", text: "Four care categories with filters, sorting and breadcrumbs." },
      { title: "Search", text: "Search across the catalogue with results shown as a product grid." },
      { title: "Product pages", text: "Price, quantity, Add to cart and Buy now, with delivery details on the page." },
      { title: "Cart", text: "A cart with a free-delivery threshold, promo code field and order total." },
    ],
    highlight: {
      kind: "pair",
      title: "From product to cart",
      text: "A focused product page, then a cart that shows delivery and totals clearly on any screen.",
      desktop: { src: dermivaBuybox, alt: "Dermiva Skincare product page close-up: Super Serum, EGP 550.00, Add to cart and Buy now" },
      mobile: { src: dermivaCartMobile, alt: "Dermiva Skincare cart on a phone" },
    },
    gallery: [
      { src: dermivaCategory, alt: "Dermiva Skincare Face Care category with product grid, filters and sorting", caption: "Category page" },
      { src: dermivaSearch, alt: "Dermiva Skincare search results for “serum”", caption: "Search results" },
      { src: dermivaCart, alt: "Dermiva Skincare cart: free delivery unlocked, promo code and total", caption: "Cart" },
    ],
    bilingual: {
      primary: { src: dermivaHome, alt: "Dermiva Skincare home page in English" },
      secondary: { src: dermivaHomeAr, alt: "Dermiva Skincare home page in Arabic, mirrored right to left" },
      mobile: { src: dermivaHomeArMobile, alt: "Dermiva Skincare Arabic home page on a phone" },
      note: "The Arabic storefront mirrors navigation, hero and product rows; product names stay in English as on the packaging.",
    },
    video: {
      mp4: "/media/work/dermiva-skincare.mp4",
      webm: "/media/work/dermiva-skincare.webm",
      poster: { src: dermivaHome, alt: "Dermiva Skincare home page" },
    },
    note: "This project covers the storefront experience: catalogue, search, product pages and cart.",
  },
  {
    slug: "soulmate-gift-store",
    facts: [
      { label: "Service", value: "E-commerce" },
      { label: "Languages", value: "English and Arabic (right-to-left)" },
      { label: "Live at", value: "soulmate-accessories-store.vercel.app" },
    ],
    context:
      "Soulmate sells gifts and lets customers build a gift box for one person: choose a box, fill its numbered places and, if they want, add names, a date and a message.",
    built: [
      { title: "Gift box builder", text: "Four stages: choose the box, fill each place, write the label (optional) and review." },
      { title: "Optional personalisation", text: "Pieces can be personalised for a small fee, with a live preview of the label." },
      { title: "Catalogue", text: "Gifts by category and occasion, with personalisation offered on product pages." },
      { title: "Bag", text: "The finished box arrives in the bag itemised, with its label details." },
    ],
    highlight: {
      kind: "soulmate-builder",
      title: "The builder, step by step",
      text: "Real screens from the live builder. Choose a step to see that state.",
    },
    gallery: [
      { src: soulmateCatalogue, alt: "Soulmate Gift Store watches catalogue with filters and prices", caption: "Catalogue" },
      { src: soulmateDetail, alt: "Soulmate Gift Store product close-up: Casio watch, 2,943 EGP, Personalize this piece and Add to bag", caption: "Product with optional personalisation" },
      { src: soulmateBag, alt: "Soulmate Gift Store bag with a Couple’s Box, its pieces and label details", caption: "Bag" },
    ],
    bilingual: {
      primary: { src: soulmateHome, alt: "Soulmate Gift Store home page in English" },
      secondary: { src: soulmateHomeAr, alt: "Soulmate Gift Store home page in Arabic, mirrored right to left" },
      mobile: { src: soulmateHomeArMobile, alt: "Soulmate Gift Store Arabic home page on a phone" },
      note: "Switching to Arabic mirrors the store, including the builder’s stepper and panels.",
    },
  },
  {
    slug: "dr-mirror",
    facts: [
      { label: "Service", value: "E-commerce" },
      { label: "Languages", value: "Arabic and English (right-to-left)" },
      { label: "Live at", value: "dr-mirror.vercel.app" },
    ],
    context:
      "Dr Mirror sells medical scrubs and uniforms, with delivery across Egypt. Shoppers need the right size and colour, so the catalogue and product pages are organised around those options. Arabic is the default language.",
    built: [
      { title: "Catalogue and filters", text: "Products by category, with filters for size, colour and price." },
      { title: "Variants with stock", text: "Size and colour options, with the stock available for each combination." },
      { title: "Search", text: "Suggestions appear as the shopper types." },
      { title: "Cart", text: "An estimated total and a route to checkout." },
    ],
    highlight: {
      kind: "pair",
      title: "Size and colour, clearly",
      text: "The product page puts colour, size and price in one place, in Arabic first and in English.",
      desktop: { src: drMirrorProduct, alt: "Dr Mirror product page in Arabic: scrub top with colour and size options and price in EGP" },
      mobile: { src: drMirrorProductMobile, alt: "Dr Mirror product page on a phone" },
    },
    gallery: [
      { src: drMirrorProducts, alt: "Dr Mirror product listing in Arabic with category and filter sidebar", caption: "Catalogue with filters" },
      { src: drMirrorCart, alt: "Dr Mirror cart in Arabic with estimated total and checkout button", caption: "Cart" },
    ],
    bilingual: {
      primary: { src: drMirrorHome, alt: "Dr Mirror home page in Arabic" },
      secondary: { src: drMirrorHomeEn, alt: "Dr Mirror home page in English: “Scrubs that fit, ordered with confidence.”" },
      mobile: { src: drMirrorHomeMobile, alt: "Dr Mirror Arabic home page on a phone" },
      note: "Arabic is the default; the English store swaps the layout direction, including the hero image.",
    },
  },
  {
    slug: "saad-logistic",
    facts: [
      { label: "Service", value: "Website" },
      { label: "Languages", value: "Arabic and English (right-to-left)" },
      { label: "Live at", value: "saadlogistic.com" },
    ],
    context:
      "Saad Logistic provides shipping and logistics services. The company website presents those services in Arabic and English and leads visitors to booking and enquiry actions.",
    built: [
      { title: "Service pages", text: "Sea, air and land freight, warehousing, customs clearance and tracking, each with its own section." },
      { title: "Clear actions", text: "Booking and enquiry actions in the hero and throughout the site." },
      { title: "Company pages", text: "Clients, news, FAQ and contact pages." },
      { title: "Arabic and English", text: "Arabic by default, with an English version in a mirrored layout." },
    ],
    highlight: {
      kind: "pair",
      title: "Services, presented plainly",
      text: "Each service gets a clear title, image and short description, leading to the detail page.",
      desktop: { src: saadServices, alt: "Saad Logistic services section in English: sea freight, air freight, land transport, warehousing, customs clearance and live tracking" },
      mobile: { src: saadHomeMobile, alt: "Saad Logistic Arabic home page on a phone" },
    },
    gallery: [],
    bilingual: {
      primary: { src: saadHome, alt: "Saad Logistic home page in Arabic" },
      secondary: { src: saadHomeEn, alt: "Saad Logistic home page in English: “Enjoy Advanced Global Shipping Solutions”" },
      mobile: { src: saadHomeMobile, alt: "Saad Logistic Arabic home page on a phone" },
      note: "Arabic is the default; the English version mirrors the layout.",
    },
  },
];

/** Case-study order, also used for "Next project". */
export const caseStudyOrder = caseStudies.map((study) => study.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
