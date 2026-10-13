# Soulmate Gift Store — capture set

Live site: https://soulmate-accessories-store.vercel.app/ — captured 2026-10-13 with Playwright Chromium.
Desktop masters 1440×900 @2x (2880 px wide). Mobile masters 390×844 @3x (1170 px wide), isMobile, hasTouch, iPhone UA.
Before each shot: networkidle, `document.fonts.ready`, a scroll through for lazy images, 800 ms settle. Nothing was hidden or changed: there was no chat launcher or cookie banner to hide. Crops were cut from the masters with PIL only.
No order, checkout, sign-in or personal data. Label text was typed only because step 03 needs a name and a date before it continues. The text used is the site's own example: "Sara" & "Omar" and "For every ordinary Tuesday." from the home page's "Example label", and 14.02.2027 from the site's date hint "Any format, e.g. 14.02.2027". The box was added to the bag, and capture stopped at "Sign in to check out" without clicking it.

## Exact builder flow (as on the page)

Stepper (desktop): **01 Box · 02 Pieces · 03 Personalize · 04 Review**. Mobile shows the same steps as "Step 01 of 04 — Box", and so on. The Arabic labels are "البوكس / القطع / الإهداء / المراجعة".

| # | URL | Page heading | What really happens |
|---|---|---|---|
| 01 | `/builder` → redirects to `/builder/select` (`?box=couple-box` preselects) | "Choose the box" | 3 boxes: Couple's Box "7 places", "Box from 350 EGP"; Men's Box and Women's Box "5 places", "Box from 200 EGP". Choosing one marks it "Chosen" and fills the "Your box" panel with numbered places ("NO. 01 Watch for Him · required — To choose" …), Box, "Pieces (0 of 7)" and "Estimated total". CTA "Continue to pieces". Before a box is chosen the panel says "No box yet". |
| 02 | `/builder/customize` | "Fill each place" | Numbered place chips (`*` = "Must be filled"). Each place shows only matching products with prices and "Can be personalized +50 EGP" / +40 / +30. Picking one gives "Chosen: …", a tick on the chip, a "Next: <place>" button, an optional "Personalize this piece — Names, date and message · +30 EGP" toggle and a live total. Couple's Box total went 350 → 2,625 → 5,568 → 7,367 → 7,696 (after the +30 toggle) → … → 12,423 EGP. The status line reads "… added to No. 07. All places are filled." |
| 03 | `/builder/personalize` | "Write their label" | Appears **only if at least one piece is personalized**. Without a personalized piece, "Continue to review" goes straight to 04 and step 03 is shown as done. Fields: "First name" / "Second name" (Couple's Box; Men's Box shows "Their name" / "Second name (optional)"), each 0/40; "Date" ("Any format, e.g. 14.02.2027"); "Message (Optional)" with "300 characters left". "The label sets itself as you type": the live preview card reads SOULMATE / names / date / message, under the caption "Live preview of the label". "Continue to review" stays disabled ("Add their name and a date to continue.") until a name and a date are entered. |
| 04 | `/builder/preview` | "Review your box" | "The box", "The pieces", "The label" (each with "Edit"), PRICE breakdown with "Personalizing IKEA DINERA Mug 30 cl – Dark Grey +30 EGP", "Total 12,423 EGP", "Shipping is added at checkout, by governorate." CTA "Add box to bag", which then shows "Couple's Box is in your bag" with "Go to bag" / "Build another box". |
| Bag | `/cart` | "Your bag" | "1 item(s) ready for checkout", Couple's Box "Gift box" 12,423 EGP, "7 piece(s) in the box", Names "Sara & Omar", Date, Message, quantity stepper, Summary, "Delivery — Priced by governorate at checkout", **"Sign in to check out"** (checkout needs sign-in, not entered). |

Everything above was genuinely interactive: the totals were recalculated live, the chips changed state, and the preview rendered the typed text. Builder state lives in the browser tab (sessionStorage). The bag kept the box across the language switch.

## Recording

| File | Spec | Content |
|---|---|---|
| `soulmate-builder-recording-master.mp4` | 1440×900, H.264 crf 16, yuv420p, 30 fps, no audio, 15.0 s, ~1.4 MB | Real flow at normal pace: step 01 → small scroll → choose Couple's Box (panel fills) → Continue to pieces → pick Watch for Him → Next → Watch for Her → Next → Wallet, with the estimated total rising 350 → 7,367 EGP. No cursor overlay, no zoom. |
| `soulmate-builder-recording-raw.webm` | 1440×900 Playwright recordVideo, ~19.7 s, ~1.9 MB | Untrimmed source. Trim used: 3.4 s → 18.4 s. Product images were pre-cached in a separate tab of the same context, so no image loading is visible. |

## Verification

| Check | Verdict | Evidence (page shows) |
|---|---|---|
| English live | Yes | `<html lang="en" dir="ltr">`, title "Personalized gifts and custom gift boxes in Egypt \| Soulmate" |
| Arabic live | Yes | Real switch: top-bar button "العربية" (aria-label "Switch to Arabic"; inside the Menu on mobile). Same URL (`/`); the switch sets the cookie `soulmate_lang=ar`. Hero "اصنع هدية لشخص واحد بعينه." |
| RTL implemented | Yes | After the switch `<html lang="ar" dir="rtl">`; logo and nav move to the right, the cart icon moves left, the stepper and box panel are mirrored, Arabic-Indic numerals ("الخطوة ٠٢ من ٠٤ — القطع", "١٢٬٤٢٣ ج.م"). Note: `document.title` stayed English after the client-side switch. |
| Mobile Arabic captured | Yes | `soulmate-ar-home-mobile(-full).png`, `ar-builder-*-mobile`, `ar-cart-mobile` |
| Catalogue / categories | Yes | "All gifts, Watches, Wallets, Mugs, Necklaces, Rings, Gift boxes"; filters "For him / For her / For couples" |
| Occasions | Yes | "Birthday gifts", "Anniversary gifts", "Custom gift boxes", "Personalized mugs", "For couples" (`/gifts/...`) |
| Prices | Yes | EGP everywhere, e.g. "2,943 EGP", "Box from 350 EGP" |
| Cart | Yes | `/cart` "Your bag" with the built box |
| Checkout presence | Exists (not entered) | "Sign in to check out"; "Have a coupon? Add it at checkout." |
| Payment (page shows) | Text only | "Pay by Vodafone Cash or InstaPay, then upload the transfer receipt. We confirm your order once it is checked." |
| Delivery (page shows) | Text only | "Delivery across Egypt, priced by governorate" |
| Personalization | Yes | Names (2 × 40 chars), date, message (300 chars); per-piece fee "+50 EGP" watch, "+40 EGP" wallet, "+30 EGP" mug; "Charged only for the pieces you chose to personalize." |
| Builder mechanics | Yes | Places count per box (7/5/5), required `*`, "Pieces (n of 7)", live "Estimated total", "The price below is calculated by our system for exactly this box." |
| Responsive | Yes | Mobile has its own stepper "Step 0X of 04", a sticky bottom bar "n of 7 places · price / View box / Continue" and a "Your box" bottom sheet |
| Other | — | Top-bar "Sounds" toggle (not used); "Sign in"; product reviews "No reviews yet." |

## Story-section feasibility

A 4-beat story is fully supported by real states: **Choose the box → Fill every place → Write the label → Review & add to bag**. The site's own home-page strip uses exactly "1 Choose the box", "2 Fill every place" and "3 Write the label". The builder's stepper names are "Box / Pieces / Personalize / Review". Caveat: "Write the label" is only reached when a piece is personalized.

## Files

| File | px | KB | What it shows | Source |
|---|---|---|---|---|
| `soulmate-after-add-to-bag-desktop.png` | 2880×1800 | 222 | "Couple's Box is in your bag" confirmation with "Go to bag" / "Build another box" (bag badge 1) | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-after-add-to-bag-mobile.png` | 1170×2532 | 182 | "Couple's Box is in your bag" confirmation with "Go to bag" / "Build another box" (bag badge 1) | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-ar-builder-box-desktop.png` | 2880×1800 | 755 | Arabic builder step 01 (RTL) | https://soulmate-accessories-store.vercel.app/builder/select?box=couple-box |
| `soulmate-ar-builder-box-mobile.png` | 1170×2532 | 693 | Arabic builder step 01 (RTL) | https://soulmate-accessories-store.vercel.app/builder/select?box=couple-box |
| `soulmate-ar-builder-pieces-desktop.png` | 2880×1800 | 526 | Arabic builder step 02 "املا كل خانة" (RTL) | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-ar-builder-pieces-mobile.png` | 1170×2532 | 464 | Arabic builder step 02 "املا كل خانة" (RTL) | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-ar-cart-desktop.png` | 2880×1800 | 367 | Arabic bag "حقيبتك" with the built box (RTL) | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-ar-cart-mobile.png` | 1170×2532 | 353 | Arabic bag "حقيبتك" with the built box (RTL) | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-ar-home-desktop-full.png` | 2880×8602 | 5556 | Arabic home (lang=ar, dir=rtl), mirrored header/hero — full page | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-ar-home-desktop.png` | 2880×1800 | 1826 | Arabic home (lang=ar, dir=rtl), mirrored header/hero | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-ar-home-mobile-full.png` | 1170×16089 | 3038 | Arabic home (lang=ar, dir=rtl), mirrored header/hero — full page | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-ar-home-mobile.png` | 1170×2532 | 1082 | Arabic home (lang=ar, dir=rtl), mirrored header/hero | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-builder-01-box-chosen-desktop-full.png` | 2880×3590 | 1352 | Step 01 with Couple's Box selected ("Chosen"); side panel lists 7 numbered places, Box 350 EGP, Estimated total 350 EGP — full page | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-chosen-desktop.png` | 2880×1800 | 784 | Step 01 with Couple's Box selected ("Chosen"); side panel lists 7 numbered places, Box 350 EGP, Estimated total 350 EGP | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-chosen-mobile-full.png` | 1170×9639 | 2178 | Step 01 with Couple's Box selected ("Chosen"); side panel lists 7 numbered places, Box 350 EGP, Estimated total 350 EGP — full page | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-chosen-mobile.png` | 1170×2532 | 711 | Step 01 with Couple's Box selected ("Chosen"); side panel lists 7 numbered places, Box 350 EGP, Estimated total 350 EGP | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-chosen-panel-desktop.png` | 2880×1800 | 784 | Step 01 scrolled so the 'Couple's Box' places panel and 'Continue to pieces' are in view | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-entry-desktop-full.png` | 2880×3590 | 1273 | Builder step 01 "Choose the box", no box chosen ("No box yet"); 3 box types — full page | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-entry-desktop.png` | 2880×1800 | 732 | Builder step 01 "Choose the box", no box chosen ("No box yet"); 3 box types | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-entry-mobile-full.png` | 1170×9639 | 2190 | Builder step 01 "Choose the box", no box chosen ("No box yet"); 3 box types — full page | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-box-entry-mobile.png` | 1170×2532 | 716 | Builder step 01 "Choose the box", no box chosen ("No box yet"); 3 box types | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-01-view-box-sheet-mobile.png` | 1170×2532 | 248 | Mobile: 'View box' bottom sheet open after choosing Couple's Box (7 places, 350 EGP) | https://soulmate-accessories-store.vercel.app/builder/select |
| `soulmate-builder-02-pieces-1-filled-desktop.png` | 2880×1800 | 597 | Step 02 after choosing first piece: chip ticked, "Chosen:" line, "Personalize this piece" toggle, total 2,625 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-1-filled-mobile.png` | 1170×2532 | 362 | Step 02 after choosing first piece: chip ticked, "Chosen:" line, "Personalize this piece" toggle, total 2,625 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-3-filled-desktop.png` | 2880×1800 | 479 | Step 02 with 3 of 7 places filled; estimated total 7,367 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-3-filled-mobile.png` | 1170×2532 | 301 | Step 02 with 3 of 7 places filled; estimated total 7,367 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-complete-desktop-full.png` | 2880×3452 | 816 | Step 02 all 7 of 7 places filled; total 12,423 EGP; CTA becomes "Continue to personalize" — full page | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-complete-desktop.png` | 2880×1800 | 612 | Step 02 all 7 of 7 places filled; total 12,423 EGP; CTA becomes "Continue to personalize" | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-complete-mobile-full.png` | 1170×7665 | 737 | Step 02 all 7 of 7 places filled; total 12,423 EGP; CTA becomes "Continue to personalize" — full page | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-complete-mobile.png` | 1170×2532 | 406 | Step 02 all 7 of 7 places filled; total 12,423 EGP; CTA becomes "Continue to personalize" | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-empty-desktop-full.png` | 2880×3590 | 821 | Step 02 "Fill each place": 7 place chips with * (required), place No. 01 Watch for Him product options, 0 of 7 — full page | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-empty-desktop.png` | 2880×1800 | 579 | Step 02 "Fill each place": 7 place chips with * (required), place No. 01 Watch for Him product options, 0 of 7 | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-empty-mobile-full.png` | 1170×6891 | 734 | Step 02 "Fill each place": 7 place chips with * (required), place No. 01 Watch for Him product options, 0 of 7 — full page | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-empty-mobile.png` | 1170×2532 | 481 | Step 02 "Fill each place": 7 place chips with * (required), place No. 01 Watch for Him product options, 0 of 7 | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-personalize-toggle-desktop.png` | 2880×1800 | 422 | Step 02 at No. 04 Mug for Him with "Personalize this piece" switched on (+30 EGP); panel shows "Personalized", Personalization 30 EGP, total 7,696 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-pieces-personalize-toggle-mobile.png` | 1170×2532 | 263 | Step 02 at No. 04 Mug for Him with "Personalize this piece" switched on (+30 EGP); panel shows "Personalized", Personalization 30 EGP, total 7,696 EGP | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-02-view-box-sheet-mobile.png` | 1170×2532 | 270 | Mobile: 'View box' sheet with all 7 pieces and 12,423 EGP total | https://soulmate-accessories-store.vercel.app/builder/customize |
| `soulmate-builder-03-label-empty-desktop-full.png` | 2880×3438 | 521 | Step 03 "Write their label": empty fields, placeholder label preview (SOULMATE / names / date / message) — full page | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-empty-desktop.png` | 2880×1800 | 353 | Step 03 "Write their label": empty fields, placeholder label preview (SOULMATE / names / date / message) | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-empty-mobile-full.png` | 1170×8589 | 521 | Step 03 "Write their label": empty fields, placeholder label preview (SOULMATE / names / date / message) — full page | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-empty-mobile.png` | 1170×2532 | 185 | Step 03 "Write their label": empty fields, placeholder label preview (SOULMATE / names / date / message) | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-filled-desktop-full.png` | 2880×3366 | 532 | Step 03 filled with sample "Sara" & "Omar", 14.02.2027, "For every ordinary Tuesday." (site's own example wording); live preview updated — full page | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-filled-desktop.png` | 2880×1800 | 362 | Step 03 filled with sample "Sara" & "Omar", 14.02.2027, "For every ordinary Tuesday." (site's own example wording); live preview updated | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-filled-mobile-full.png` | 1170×8589 | 536 | Step 03 filled with sample "Sara" & "Omar", 14.02.2027, "For every ordinary Tuesday." (site's own example wording); live preview updated — full page | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-filled-mobile.png` | 1170×2532 | 191 | Step 03 filled with sample "Sara" & "Omar", 14.02.2027, "For every ordinary Tuesday." (site's own example wording); live preview updated | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-preview-desktop.png` | 2880×1800 | 331 | Step 03 scrolled to the live label preview card ("Live preview of the label") | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-03-label-preview-mobile.png` | 1170×2532 | 162 | Step 03 scrolled to the live label preview card ("Live preview of the label") | https://soulmate-accessories-store.vercel.app/builder/personalize |
| `soulmate-builder-04-review-desktop-full.png` | 2880×5004 | 946 | Step 04 "Review your box": box, 7 pieces, label, itemised PRICE, Total 12,423 EGP, "Add box to bag" — full page | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-builder-04-review-desktop.png` | 2880×1800 | 586 | Step 04 "Review your box": box, 7 pieces, label, itemised PRICE, Total 12,423 EGP, "Add box to bag" | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-builder-04-review-mobile-full.png` | 1170×11439 | 1438 | Step 04 "Review your box": box, 7 pieces, label, itemised PRICE, Total 12,423 EGP, "Add box to bag" — full page | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-builder-04-review-mobile.png` | 1170×2532 | 698 | Step 04 "Review your box": box, 7 pieces, label, itemised PRICE, Total 12,423 EGP, "Add box to bag" | https://soulmate-accessories-store.vercel.app/builder/preview |
| `soulmate-cart-desktop-full.png` | 2880×2552 | 538 | Bag: "Your bag", Couple's Box 12,423 EGP, 7 pieces, names/date/message, Summary, "Sign in to check out" (not clicked) — full page | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-cart-desktop.png` | 2880×1800 | 391 | Bag: "Your bag", Couple's Box 12,423 EGP, 7 pieces, names/date/message, Summary, "Sign in to check out" (not clicked) | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-cart-mobile-full.png` | 1170×7149 | 703 | Bag: "Your bag", Couple's Box 12,423 EGP, 7 pieces, names/date/message, Summary, "Sign in to check out" (not clicked) — full page | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-cart-mobile.png` | 1170×2532 | 372 | Bag: "Your bag", Couple's Box 12,423 EGP, 7 pieces, names/date/message, Summary, "Sign in to check out" (not clicked) | https://soulmate-accessories-store.vercel.app/cart |
| `soulmate-catalogue-watches-desktop-full.png` | 2880×3336 | 1074 | Catalogue filtered to Watches: search, sort, "Who it's for" and Category filters, product cards with prices — full page | https://soulmate-accessories-store.vercel.app/products?category=watch |
| `soulmate-catalogue-watches-desktop.png` | 2880×1800 | 898 | Catalogue filtered to Watches: search, sort, "Who it's for" and Category filters, product cards with prices | https://soulmate-accessories-store.vercel.app/products?category=watch |
| `soulmate-catalogue-watches-mobile.png` | 1170×2532 | 549 | Catalogue filtered to Watches: search, sort, "Who it's for" and Category filters, product cards with prices | https://soulmate-accessories-store.vercel.app/products?category=watch |
| `soulmate-crop-box-grid.png` | 2560×1732 | 1063 | Crop: the 3 box types + places panel + Continue to pieces | PIL crop of soulmate-builder-01-box-chosen-desktop-full.png |
| `soulmate-crop-box-summary-panel.png` | 737×1333 | 158 | Crop: Couple's Box summary panel, 7 filled places, Personalization 30 EGP, Estimated total 12,423 EGP | PIL crop of soulmate-builder-03-label-preview-desktop.png |
| `soulmate-crop-couple-box-chosen.png` | 1664×567 | 322 | Crop: Couple's Box card selected (7 places, Box from 350 EGP, Chosen) | PIL crop of soulmate-builder-01-box-chosen-desktop.png |
| `soulmate-crop-label-form-and-preview.png` | 1700×1245 | 128 | Crop: label form fields + live preview side by side | PIL crop of soulmate-builder-03-label-preview-desktop.png |
| `soulmate-crop-label-preview.png` | 792×717 | 38 | Crop: live label card "Sara & Omar / 14.02.2027 / For every ordinary Tuesday." | PIL crop of soulmate-builder-03-label-preview-desktop.png |
| `soulmate-crop-place-chips-personalize-toggle.png` | 1700×741 | 88 | Crop: numbered place chips (ticks vs *), Mug for Him chosen, "Personalize this piece" toggle on (+30 EGP) | PIL crop of soulmate-builder-02-pieces-personalize-toggle-desktop.png |
| `soulmate-crop-stepper.png` | 2564×101 | 14 | Crop: 4-step progress bar 01 Box ✓ / 02 Pieces / 03 Personalize / 04 Review | PIL crop of soulmate-builder-02-pieces-complete-desktop.png |
| `soulmate-home-desktop-full.png` | 2880×8642 | 5652 | Home: hero "Build a gift for one person.", categories, featured gifts, build-your-own-box section, 3-step strip + example label, occasions, payment/delivery notes (EN) — full page | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-home-desktop.png` | 2880×1800 | 1887 | Home: hero "Build a gift for one person.", categories, featured gifts, build-your-own-box section, 3-step strip + example label, occasions, payment/delivery notes (EN) | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-home-mobile-full.png` | 1170×16761 | 3412 | Home: hero "Build a gift for one person.", categories, featured gifts, build-your-own-box section, 3-step strip + example label, occasions, payment/delivery notes (EN) — full page | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-home-mobile.png` | 1170×2532 | 793 | Home: hero "Build a gift for one person.", categories, featured gifts, build-your-own-box section, 3-step strip + example label, occasions, payment/delivery notes (EN) | https://soulmate-accessories-store.vercel.app/ |
| `soulmate-product-desktop-full.png` | 2880×5008 | 2179 | Product page: Casio LTP-1308D-1A2V Black Dial Watch, 2,943 EGP, In stock, "Personalize this piece +50 EGP", quantity, Add to bag, description — full page | https://soulmate-accessories-store.vercel.app/products/%D8%B3%D8%A7%D8%B9%D8%A9-casio-ltp-1308d-1a2v-%D8%A8%D9%85%D9%8A%D9%86%D8%A7%D8%A1-%D8%A3%D8%B3%D9%88%D8%AF |
| `soulmate-product-desktop.png` | 2880×1800 | 892 | Product page: Casio LTP-1308D-1A2V Black Dial Watch, 2,943 EGP, In stock, "Personalize this piece +50 EGP", quantity, Add to bag, description | https://soulmate-accessories-store.vercel.app/products/%D8%B3%D8%A7%D8%B9%D8%A9-casio-ltp-1308d-1a2v-%D8%A8%D9%85%D9%8A%D9%86%D8%A7%D8%A1-%D8%A3%D8%B3%D9%88%D8%AF |
| `soulmate-product-mobile-full.png` | 1170×11697 | 2053 | Product page: Casio LTP-1308D-1A2V Black Dial Watch, 2,943 EGP, In stock, "Personalize this piece +50 EGP", quantity, Add to bag, description — full page | https://soulmate-accessories-store.vercel.app/products/%D8%B3%D8%A7%D8%B9%D8%A9-casio-ltp-1308d-1a2v-%D8%A8%D9%85%D9%8A%D9%86%D8%A7%D8%A1-%D8%A3%D8%B3%D9%88%D8%AF |
| `soulmate-product-mobile.png` | 1170×2532 | 667 | Product page: Casio LTP-1308D-1A2V Black Dial Watch, 2,943 EGP, In stock, "Personalize this piece +50 EGP", quantity, Add to bag, description | https://soulmate-accessories-store.vercel.app/products/%D8%B3%D8%A7%D8%B9%D8%A9-casio-ltp-1308d-1a2v-%D8%A8%D9%85%D9%8A%D9%86%D8%A7%D8%A1-%D8%A3%D8%B3%D9%88%D8%AF |