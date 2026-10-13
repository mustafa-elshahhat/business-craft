# Business Craft — Brand Assets

Production logo files live in `public/brand/`. They are vector conversions of the 12 approved logo PNGs (October 2026), which remain the visual source of truth. All SVGs have transparent backgrounds, use outlined shapes only (no fonts, no embedded images) and have tight viewBoxes. Clear space is handled in layout, not inside the files.

## Logos — `public/brand/logo/`

| File | Use on | Contains |
|---|---|---|
| `primary logo light.svg` | Light backgrounds | Colour B, stacked navy wordmark, tagline |
| `primary logo dark.svg` | Dark / navy backgrounds | Colour B, stacked light wordmark, tagline |
| `horizontal logo light.svg` | Light backgrounds, wide spaces | Colour B, single-line navy wordmark, tagline |
| `horizontal logo dark.svg` | Dark / navy backgrounds, wide spaces | Colour B, single-line light wordmark, tagline |
| `compact logo light.svg` | Light backgrounds: header and other tight placements | Colour B, stacked navy wordmark, no tagline |
| `compact logo dark.svg` | Dark / navy backgrounds: header and other tight placements | Colour B, stacked light wordmark, no tagline |
| `monogram color.svg` | Any background where the B stands alone | Colour B (three approved blue tones) |
| `monogram black.svg` | Single-colour use on light backgrounds | Navy B |
| `monogram white.svg` | Single-colour use on dark backgrounds | Light B |
| `wordmark dark.svg` | Wordmark without the B, light backgrounds | Navy "Business Craft" |
| `wordmark white.svg` | Wordmark without the B, dark backgrounds | Light "Business Craft" |

- **Header:** use a compact logo, matching the background behind the header (dark hero → `compact logo dark.svg`).
- **Monochrome:** use `monogram black.svg` or `monogram white.svg` where colour cannot be reproduced.

## Favicon and app icons — `public/brand/favicon/`

| File | Purpose |
|---|---|
| `favicon.svg` | Browser favicon: navy rounded tile with the colour B |
| `favicon.ico` | Legacy favicon (16, 32 and 48 px) |
| `favicon 16.png`, `favicon 32.png` | PNG favicons |
| `apple touch icon.png` | 180 × 180 iOS home-screen icon. Full-bleed navy square because iOS applies its own corner mask. |
| `icon 192.png`, `icon 512.png` | Web app manifest icons (rounded tile, transparent corners) |

## Colours

| Token | Hex | Where it appears in the logos |
|---|---|---|
| Brand Navy | `#0B1320` | Wordmark on light, monogram black, favicon tile |
| Light | `#F8FAFC` | Wordmark on dark, monogram white |
| Muted dark | `#64748B` | Tagline on light |
| Muted light | `#CBD5E1` | Tagline on dark |
| Monogram tones | `#1D7FFD`, `#0669FC`, `#0261F8` | The three facets of the colour B, sampled from `monogram color.png` |

Website UI colours remain Brand Accent `#3B82F6` and Action Blue `#2563EB` (see `docs/DESIGN_SYSTEM.md`). The monogram tones belong to the logo artwork only.

## Notes

- File names contain spaces, as approved. In URLs, encode them, for example `/brand/logo/compact%20logo%20light.svg`. `next/image` and `<img src>` handle encoded paths.
- Do not recolour, stretch, outline or add effects to any logo.
