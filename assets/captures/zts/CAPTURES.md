# ZTS Fashion — live-site captures

Captured 2026-10-13 from https://www.ztsbrand.com with Playwright Chromium.
- Desktop: 1440x900 viewport, deviceScaleFactor 2 (PNG 2880x1800)
- Mobile: 390x844 viewport, deviceScaleFactor 3, isMobile, hasTouch, iPhone Safari UA (PNG 1170x2532)
- Before each shot: networkidle, `document.fonts.ready`, one full scroll-through and back (lazy images), image-complete wait, +800 ms.
- Only local alteration: the floating WhatsApp launcher (`a.fixed[href*="wa.me"]`) hidden with CSS `display:none`. No cookie banner was present. No other UI changes, no retouching.
- Cart state was created by adding 1 x Linen Set (Baby Blue, S/M). No checkout data was entered; nothing was submitted.
- Note: the home hero is a moving video, so the model's pose differs slightly between EN and AR frames.

## Files

| File | Pixels | KB | What it shows | Source URL |
|---|---|---|---|---|
| zts-home-desktop.png | 2880x1800 | 1472 | EN home, first viewport: announcement bar, nav, hero "Minimal basics, ready to wear" | https://www.ztsbrand.com/en |
| zts-home-desktop-full.png | 2880x10672 | 9967 | EN home, full page | https://www.ztsbrand.com/en |
| zts-home-mobile.png | 1170x2532 | 499 | EN home, mobile viewport | https://www.ztsbrand.com/en |
| zts-home-mobile-full.png | 1170x13863 | 3940 | EN home, mobile full page | https://www.ztsbrand.com/en |
| zts-collection-desktop.png | 2880x1800 | 1592 | New Arrivals collection: filters (size/colour/price), sort, product grid with sale/NEW badges | https://www.ztsbrand.com/en/collections/new-arrivals |
| zts-collection-mobile.png | 1170x2532 | 1181 | Same collection, mobile (Filters button + sort, 2-col grid) | https://www.ztsbrand.com/en/collections/new-arrivals |
| zts-product-desktop.png | 2880x1800 | 1018 | Product "Linen Set — Baby Blue", colour Baby Blue + size S/M selected, "2 pieces left" | https://www.ztsbrand.com/en/product/linen-set |
| zts-product-mobile.png | 1170x2532 | 1118 | Same product, mobile, size S/M selected (selector below fold); sticky ADD TO CART / BUY ON WHATSAPP | https://www.ztsbrand.com/en/product/linen-set |
| zts-cart-desktop.png | 2880x1800 | 1027 | After add-to-cart: cart badge "1", toast "Linen Set added to your cart" (site uses a toast, not a drawer) | https://www.ztsbrand.com/en/product/linen-set |
| zts-cart-mobile.png | 1170x2532 | 1120 | Same add-to-cart state, mobile | https://www.ztsbrand.com/en/product/linen-set |
| zts-cartpage-desktop.png | 2880x1800 | 230 | Shopping Cart page with 1 item and Order Summary | https://www.ztsbrand.com/en/cart |
| zts-cartpage-mobile.png | 1170x2532 | 239 | Shopping Cart page, mobile | https://www.ztsbrand.com/en/cart |
| zts-checkout-signin-desktop.png | 2880x1800 | 188 | Page reached via "SIGN IN TO CHECK OUT" (sign-in form, empty) | https://www.ztsbrand.com/en/login?next=/checkout |
| zts-checkout-desktop.png | 2880x1800 | 236 | First checkout screen via "CONTINUE AS GUEST": Step 1 of 3 Address, empty form, order summary | https://www.ztsbrand.com/en/checkout |
| zts-home-ar-desktop.png | 2880x1800 | 1502 | AR home, desktop viewport (RTL, mirrored header) | https://www.ztsbrand.com/ar |
| zts-home-ar-desktop-full.png | 2880x10668 | 9761 | AR home, full page | https://www.ztsbrand.com/ar |
| zts-home-ar-mobile.png | 1170x2532 | 487 | AR home, mobile viewport (hamburger on right, cart/search on left) | https://www.ztsbrand.com/ar |
| zts-home-ar-mobile-full.png | 1170x13857 | 3834 | AR home, mobile full page | https://www.ztsbrand.com/ar |
| zts-menu-mobile.png | 1170x2532 | 133 | EN mobile menu open: Collections, Categories, Reviews, Account, Wishlist, Language "العربية" | https://www.ztsbrand.com/en |
| zts-crop-product-grid.png | 2216x864 | 1352 | Crop of zts-collection-desktop.png: 4-up product grid with badges and prices | (crop) |
| zts-crop-header-en.png | 2880x216 | 23 | Crop of zts-home-desktop.png: EN header (logo left, "العربية" switch + icons right) | (crop) |
| zts-crop-header-ar.png | 2880x216 | 23 | Crop of zts-home-ar-desktop.png: AR header mirrored (logo right, "English" + icons left) | (crop) |
| zts-crop-product-options.png | 1684x850 | 41 | Crop of zts-product-desktop.png: colour swatches, size selector (S/M active), quantity | (crop) |
| zts-recording-master.mp4 | 1440x900 | 3901 | 10.0 s, H.264 crf 16, yuv420p, 30 fps, no audio: smooth eased scroll of EN home from hero through reviews, New Arrivals, Instagram videos to Shop All | https://www.ztsbrand.com/en |
| zts-recording-raw.webm | 1440x900 | 3596 | Raw Playwright recording (29.7 s, incl. load + lazy-load pass); master trimmed from 17.0 s–27.0 s | https://www.ztsbrand.com/en |

## Verification (live site, 2026-10-13)

| Check | Verdict | Evidence |
|---|---|---|
| English live | Yes | /en returns 200; `<html lang="en" dir="ltr">`; title "ZTS — Essential. Timeless. Everyday wear." |
| Arabic live | Yes | Header button `aria-label="Switch to العربية"` navigates to https://www.ztsbrand.com/ar; `<html lang="ar" dir="rtl">`; title "ZTS — أساسية. خالدة. لكل يوم."; hero "أساسيات بسيطة، جاهزة للارتداء" |
| RTL genuinely implemented | Yes | Desktop header boxes (CSS px): EN logo x=40, cart x=1356; AR logo x=1358, cart x=40, search x=128. Nav order, review carousel arrows and product carousels mirrored (see crops/AR shots). AR product page also translated: "سوت كتان — بيبي بلو", prices "1,600 ج.م." |
| Mobile Arabic captured | Yes | zts-home-ar-mobile(.png/-full.png); on mobile the language switch lives in the menu ("Language / العربية") |
| Product catalogue | Yes | /en/shop "All Products"; collections Essentials, New Arrivals, Best seller; New Arrivals shows "5 products" |
| Prices | Yes | e.g. "EGP 1,600" with strikethrough "EGP 2,300"; badges "37% OFF", "NEW", "BEST SELLER", "LOW STOCK" |
| Category navigation | Yes | Header "Collections" and "Categories" dropdowns; breadcrumbs "Home > Linen suit > Linen Set"; categories e.g. "Linen suit", "Jaz pants", "Track pants", "Polo top" |
| Filters / sort | Yes | "SIZE", "COLOR", "PRICE RANGE", "COLLECTION" filters; sort "Our selection / Newest / Price: low to high / Price: high to low"; grid/list view toggle |
| Search | Yes | /en/search with input placeholder "Search for pieces, colors, sizes…" |
| Variants | Yes | "Color: Baby Blue" (Baby Blue / Off white / Rose), sizes "S/M", "L/XL", "XXL", "Size Guide", stock note "2 pieces left" |
| Cart | Yes | Toast "Linen Set added to your cart", badge "Cart, 1 item"; /en/cart "Shopping Cart", "Add a gift note", "Subtotal (1 item) EGP 1,600" |
| Checkout flow present | Yes (not proceeded) | Cart buttons "SIGN IN TO CHECK OUT" and "CONTINUE AS GUEST"; /en/checkout "Step 1 of 3, Address" (Address → Payment → Confirmation), "CONTINUE TO PAYMENT". Stopped here, no data entered. |
| Free-shipping messaging | Yes | "FREE SHIPPING OVER EGP 1,500"; "Add this item to unlock FREE SHIPPING"; "You’ve unlocked FREE SHIPPING" |
| WhatsApp ordering | Yes | Product page "BUY ON WHATSAPP"; floating link "Message ZTS on WhatsApp" |
| Wishlist | Yes | "Add to wishlist — Linen Set" buttons; /en/wishlist 200 "Wishlist — ZTS" |
| Reviews | Yes | /en/reviews "4.2 out of 5, from 15 reviews."; product "4 (3 reviews)"; home "WHAT OUR CUSTOMERS SAY" |
| Accounts | Present (not used) | /en/login "Sign in", "Create account", "Track every order from confirmed to delivered." |
| Order tracking / policies | Yes | Footer "Track Your Order", "Shipping & Delivery" ("The estimated delivery time is 2–4 days after your order is confirmed."), "Returns", "FAQ" |
| Egypt-specific checkout | Yes | Checkout "Governorate *" list (Cairo, Giza, …), "Egyptian mobile, 11 digits." |
| Responsive mobile layout | Yes | Mobile: hamburger menu drawer, 2-column grid, Filters button, sticky add-to-cart bar |
| Payment providers | Not shown | No payment provider named on pages visited (payment step not opened) |

Not inferred: technology stack, payment providers, business impact, launch year.
