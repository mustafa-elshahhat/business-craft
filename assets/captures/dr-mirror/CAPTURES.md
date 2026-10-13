# Dr. Mirror — live captures

Source: https://dr-mirror.vercel.app/ (captured 2026-10-13, Playwright Chromium).
Desktop 1440x900 @2x; mobile 390x844 @3x (isMobile, hasTouch, iPhone UA). networkidle + document.fonts.ready + lazy-image scroll + 800 ms settle.
No alterations: no floating chat/WhatsApp launcher or cookie banner exists on the site, so nothing was hidden. Only one crop (PIL) was made. Nothing was ordered and no details were entered; the cart holds one item added in a throwaway browser context.

## Files

| File | px | KB | Shows | URL |
|---|---|---|---|---|
| drmirror-home-desktop.png | 2880x1800 | 1357 | Arabic (default) home, RTL hero "سكرابات على مقاسك، واطلبها بثقة." | / |
| drmirror-home-desktop-full.png | 2880x10458 | 4294 | Full Arabic home: categories, product grids, size guide, FAQ, footer | / |
| drmirror-home-mobile.png | 1170x2532 | 707 | Arabic home, mobile, RTL header + search | / |
| drmirror-home-mobile-full.png | 1170x22374 | 3819 | Full Arabic home, mobile | / |
| drmirror-products-desktop.png | 2880x1800 | 626 | Listing "كل المنتجات", 18 results, filter sidebar (category/gender), sort | /ar/products |
| drmirror-products-desktop-full.png | 2880x6610 | 2612 | Full listing with all filters (price EGP, size, colour) and 18 products | /ar/products |
| drmirror-products-mobile.png | 1170x2532 | 347 | Listing mobile, "تصفية" filter button + sort, 2-col grid | /ar/products |
| drmirror-pdp-desktop.png | 2880x1800 | 846 | PDP Med Couture Touch top, 1,400.00 ج.م, colour swatches, sizes XS–XXXL (default Black / L) | /ar/products/med-couture-touch-womens-tuck-in-scrub-top |
| drmirror-pdp-desktop-full.png | 2880x6270 | 2072 | Full PDP incl. accordions + related products | same |
| drmirror-pdp-mobile.png | 1170x2532 | 647 | PDP mobile, gallery top | same |
| drmirror-pdp-selected-desktop.png | 2880x1800 | 847 | Selected state: "اللون: كحلي", "المقاس: M" (checked swatch + highlighted size) | same |
| drmirror-pdp-selected-mobile.png | 1170x2532 | 208 | Same selection on mobile, sticky add-to-cart bar "كحلي · M" | same |
| drmirror-pdp-added-desktop.png | 2880x1800 | 847 | After add-to-cart: header cart badge "1" (confirmation text is below fold) | same |
| drmirror-pdp-added-mobile.png | 1170x2532 | 217 | After add: badge "1" and inline "قطعة واحدة في سلتك. عرض السلة" | same |
| drmirror-cart-desktop.png | 2880x1800 | 236 | Cart: item (كحلي, M), qty stepper, summary 1,400.00 ج.م, "إتمام الشراء", payment methods | /cart |
| drmirror-cart-mobile.png | 1170x2532 | 220 | Cart mobile, sticky "إتمام الشراء" bar | /cart |
| drmirror-search-desktop.png | 2880x1800 | 700 | Live search typeahead for "koi": 3 products, "عرض كل النتائج عن «koi»" | /ar/products |
| drmirror-home-en-desktop.png | 2880x1800 | 1405 | English home, LTR, mirrored layout "Scrubs that fit, ordered with confidence." | /en |
| drmirror-home-en-desktop-full.png | 2880x10168 | 4380 | Full English home | /en |
| drmirror-home-en-mobile.png | 1170x2532 | 782 | English home, mobile, LTR | /en |
| drmirror-home-en-mobile-full.png | 1170x21231 | 3933 | Full English home, mobile | /en |
| drmirror-pdp-en-desktop.png | 2880x1800 | 851 | English PDP | /en/products/med-couture-touch-womens-tuck-in-scrub-top |
| drmirror-pdp-en-mobile.png | 1170x2532 | 657 | English PDP mobile | same |
| drmirror-crop-pdp-variant-selection.png | 2520x1415 | 763 | PIL crop of pdp-selected-desktop: title, price, selected colour/size, add-to-cart, product photo | (crop) |

Note: the product photo stays the black-colour image after selecting Navy (كحلي); the site does not swap the gallery per colour for this product.

## Verification

| Question | Verdict | Evidence (quoted from page) |
|---|---|---|
| E-commerce? | Yes | Catalogue /ar/products "18 نتيجة" / "18 results"; prices in EGP ("1,400.00 ج.م", "1,400.00 EGP"); categories /ar/categories/scrub-tops, scrub-pants, lab-coats, surgical-caps, medical-footwear; filters Size/Color/"Price range Min (EGP) Max (EGP)"; sort "Price: low to high" |
| Variants | Yes | Colour swatches + size buttons; "اللون: كحلي", "المقاس: M"; PDP details: "كود المقاس واللون MC-7448-M-NVY", "التوفر 20 قطعة متوفرة · M / كحلي" |
| Cart | Yes | "أضف إلى السلة" → badge "1", "قطعة واحدة في سلتك. عرض السلة"; /cart shows "ملخص الطلب", "الإجمالي التقديري 1,400.00 ج.م", "تُضاف رسوم الشحن عند إتمام الطلب حسب محافظتك." |
| Checkout exists | Yes (not entered) | Cart button "إتمام الشراء" links to /checkout; "ستسجّل الدخول أو تنشئ حسابًا عند إتمام الطلب." |
| Search | Yes | Header combobox "ابحث عن سكرابات، بالطو…"; typeahead results for "koi" |
| Payment methods (page shows) | — | Page shows "الدفع عند الاستلام", "إنستاباي", "المحفظة الإلكترونية"; PDP: "ادفع عند الاستلام، عبر إنستاباي، أو بالمحفظة الإلكترونية." |
| Accounts | Present (not used) | Links /login "تسجيل الدخول", /account?tab=orders "طلباتي", /account?tab=addresses "عناوين الشحن" |
| Default language | Arabic | / → `<html lang="ar" dir="rtl">`, title "دكتور ميرور سكرابس \| يونيفورم وسكرابات طبية في مصر" |
| Arabic live | Yes | /ar/* pages lang=ar dir=rtl |
| English live | Yes | /en → `<html lang="en" dir="ltr">`, title "Dr.Mirror Scrubs \| Medical Scrubs & Uniforms in Egypt"; toggle "English"/"العربية" |
| RTL genuinely implemented | Yes | dir=rtl plus visual mirroring: logo/nav on right in AR vs left in EN, hero image left in AR vs right in EN, filter sidebar on right in AR |
| Mobile Arabic captured | Yes | drmirror-home-mobile*, products-mobile, pdp-mobile, cart-mobile |
| Other on-page facts | — | "توصيل لكل محافظات مصر الـ27" / "Delivery to all 27 governorates"; "الإرجاع خلال 14 يومًا من الاستلام"; client contact links shown in the footer (not recorded here); footer "© 2026 Dr.Mirror." |

Not captured: checkout page (out of scope — no details entered), login/account, a slide-out cart drawer (site uses inline confirmation + cart page instead), category-specific page (/ar/categories/*) — listing page used. No video recording.
