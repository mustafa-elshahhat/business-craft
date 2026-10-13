# Dermiva Skincare: live captures

Captured 2026-10-13 from https://dermiva-eg.vercel.app with headless Chromium (Playwright).
Desktop: 1440x900 viewport at deviceScaleFactor 2 (PNG 2880 px wide). Mobile: 390x844 viewport at DSF 3, isMobile, hasTouch, iPhone Safari UA (PNG 1170 px wide).
Before each shot the script waited for networkidle and `document.fonts.ready`, scrolled through once for lazy images, scrolled back, then waited about 1.6 s.
No UI was hidden or altered: the page had no chat launcher and no cookie banner. All crops were cut from the masters with PIL only.
Capture scripts are in the session scratchpad (`capture/dermiva/`), not in the repo.

## Files

| File | Pixels | KB | Shows | Source URL |
|---|---|---|---|---|
| dermiva-home-desktop.png | 2880x1800 | 1181 | EN home, first viewport: hero, two product hero tiles, category cards | /en |
| dermiva-home-desktop-full.png | 2880x5490 | 3465 | EN home full page: hero, Best sellers, New in, Under EGP 400, delivery/payment strip, footer | /en |
| dermiva-home-mobile.png | 1170x2532 | 814 | EN home mobile viewport | /en |
| dermiva-home-mobile-full.png | 1170x8706 | 2218 | EN home mobile full page | /en |
| dermiva-face-desktop.png | 2880x1800 | 931 | Face Care category: tabs, Filters, Sort by "Featured", 4-product grid | /en/category/face |
| dermiva-face-mobile.png | 1170x2532 | 553 | Face Care category, mobile | /en/category/face |
| dermiva-product-desktop.png | 2880x1800 | 829 | Super Serum product page: image, price, qty stepper, Add to cart, Buy now, details | /en/product/super-serum |
| dermiva-product-mobile.png | 1170x2532 | 634 | Super Serum product page, mobile | /en/product/super-serum |
| dermiva-product-added-desktop.png | 2880x1800 | 829 | Same product page about 1.5 s after clicking Add to cart: cart badge shows "1", button is in its post-click state | /en/product/super-serum |
| dermiva-product-added-mobile.png | 1170x2532 | 634 | Same as above, mobile | /en/product/super-serum |
| dermiva-search-desktop.png | 2880x1800 | 718 | Search results: 3 results for "serum" | /en/search?q=serum |
| dermiva-search-mobile.png | 1170x2532 | 548 | Search results, mobile | /en/search?q=serum |
| dermiva-cart-desktop.png | 2880x1800 | 274 | Cart with 1 item, order summary, promo code field, "Continue to checkout" | /en/cart |
| dermiva-cart-mobile.png | 1170x2532 | 247 | Cart mobile, with a sticky bottom bar showing total and "Continue to checkout" | /en/cart |
| dermiva-ar-home-desktop.png | 2880x1800 | 1138 | Arabic home, RTL, first viewport (fresh session, empty cart) | /ar |
| dermiva-ar-home-desktop-full.png | 2880x5600 | 3519 | Arabic home full page | /ar |
| dermiva-ar-home-mobile.png | 1170x2532 | 811 | Arabic home mobile viewport | /ar |
| dermiva-ar-home-mobile-full.png | 1170x8949 | 2225 | Arabic home mobile full page | /ar |
| dermiva-crop-hero-products.png | 1592x800 | 560 | Crop of the two hero product tiles (Super Serum, Glow Body Scrub with "New" tag) | from dermiva-home-desktop.png |
| dermiva-crop-bestsellers-grid.png | 2560x980 | 784 | Crop of the "Best sellers" 4-up product grid with prices | from dermiva-home-desktop-full.png |
| dermiva-crop-product-buybox.png | 2500x1360 | 731 | Crop of the product image and buy box (Super Serum) | from dermiva-product-desktop.png |
| dermiva-recording-master.mp4 | 1440x900 | 2927 | 10.0 s, H.264 crf 16, yuv420p, 30 fps, no audio stream: smooth rAF-eased scroll of the EN home from top to footer | /en |
| dermiva-recording-raw.webm | 1440x900 | 1923 | Raw Playwright recording (VP8, 16.8 s), including load and pre-scroll frames | /en |

The master was trimmed from the raw recording at 5.0 s to 15.0 s. The window was chosen from per-frame motion analysis. The trim removes the blank/load frames and the lazy-image pre-scroll.

## Verification

| Check | Verdict | Evidence |
|---|---|---|
| English live | Yes | `/en` returns 200. The page has `<html lang="en" dir="ltr">` and the title "Dermiva — Face, Hair, Body & Lip Care". The hero reads "Face, hair, body and lip care." |
| Arabic live | Yes | The header button (aria-label "Switch language", text "العربية") navigates to `https://dermiva-eg.vercel.app/ar`. The interface is in Arabic, e.g. the hero "عناية بالوجه والشعر والجسم والشفاه.", nav "الوجه / الشعر / الجسم / الشفاه / كل المنتجات", and "أضف إلى السلة" on the cards. Product names stay in English ("Super Serum"). |
| RTL implemented | Yes | `/ar` has `<html lang="ar" dir="rtl">` on both desktop and mobile. The layout is visibly mirrored: the logo moves to the right (x≈1282 of 1440 on desktop, x≈270 of 390 on mobile), the nav runs right to left, the hero copy sits on the right and the images on the left, carousels and footer columns are reversed, and the arrows are flipped. The switch button reads "English" on the AR page. |
| Mobile Arabic captured | Yes | dermiva-ar-home-mobile.png and -full.png. A first attempt showed one category thumbnail's alt text because the image had not loaded yet, which was transient. That shot was recaptured after a check that no images were broken. |
| Catalogue | Yes | Categories are Face Care (4 products), Hair Care (2), Body Care (2) and Lip Care (3). Shop all is at `/en/shop`. Products are named on the page, e.g. Super Serum, Niacinamide 10%, Vitamin C Serum, Glow Peel Pads, Hair Therapy Oil, Repair Shampoo, Glow Body Scrub, Nourish Body Lotion, Lip Balm, Strawberry Lip Balm, Plumping Lip Oil. |
| Prices | Yes (EGP) | "Super Serum 30 ml EGP 550.00", "Hair Therapy Oil 100 ml EGP 600.00", "Lip Balm Tube EGP 120.00". |
| Category page features | Yes | Category tabs with counts, a "Filters" button, a "Sort by" control set to "Featured", and breadcrumbs "Home / All products / Face Care". |
| Search | Yes | Header input placeholder "Search serums, oils, lip care…". `/en/search?q=serum` shows "3 results for “serum”" and "Clear search". |
| Cart | Yes | After one Add to cart, the cart shows "1 item", "Free delivery unlocked.", "Subtotal · 1 item EGP 550.00", "Shipping Free", "Promo code" with "Apply", and "Total EGP 550.00". |
| Checkout presence | Exists (not entered) | The cart has a button "Continue to checkout". A plain GET of `/en/checkout` returns HTTP 200. The page was not opened in the browser and no data was entered. |
| Payment text | Page shows | The cart says "Pay by cash on delivery, mobile wallet, Fawry or InstaPay." The top bar says "Cash on delivery, Fawry, InstaPay and wallets". |
| Delivery / returns text | Page shows | "Free delivery on orders over EGP 500", "EGP 40 flat on smaller orders.", "Delivered in 2–6 business days", "2–4 days in Cairo & Giza, 3–6 elsewhere in Egypt.", "14-day returns" and "On unopened products, counted from delivery." |
| Other observable features | Yes | Wishlist (heart on cards, `/en/wishlist`), account icon (`/en/login`, not opened), "Buy now" on the product page, quantity stepper, "Best seller" and "New" badges, "Under EGP 400" price-filtered row (`/en/shop?max=400&sort=price-asc`), "New in" (`/en/shop?sort=newest`), a carousel with "Previous products / Next products" buttons, and policy pages (shipping, returns, privacy, terms), About and Contact/FAQs. Footer: "© 2026 Dermiva. All rights reserved." |
| Responsive layout | Yes | At 390 px the nav collapses into a hamburger ("Open menu"), the search field gets its own full-width row, the category cards become a 2x2 grid, product grids show 2 columns, and the cart gets a sticky bottom checkout bar. |

Nothing was inferred about technology, stack, payment providers beyond the quoted page text, business impact or launch year.

## Not captured

- Checkout page screenshot: out of scope. Only its existence was confirmed, via the button and an HTTP 200.
- Add-to-cart toast: the page has a toast region (`.dm-toast-region`), but the "product-added" shots show only the post-click state (cart badge "1"). They do not reliably show a toast, and it is not claimed.
- Login/account and wishlist pages were not opened.
