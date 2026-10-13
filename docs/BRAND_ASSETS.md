# Business Craft — Brand Assets

**Status: final and locked.** Do not modify the logo system unless the owner explicitly requests it.

## Where things live

| Location | Contents |
|---|---|
| `references/logo/approved/` | The 12 approved logo PNGs: the **immutable raster masters** and visual source of truth. Never edit, recompress, resize or replace them. |
| `public/brand/` | The **production website assets**: vector logos and favicon/app icons generated from the masters. |
| `scripts/brand/` | Maintenance utilities that reproduce and QA the production assets. They never run automatically; see `scripts/brand/README.md`. |
| `docs/brand/qa/logo contact sheet.png` | QA record: approved PNG vs rendered SVG for all 12 assets. Documentation only; not shipped. |

All production SVGs:
- have transparent backgrounds;
- use outlined shapes only, with no fonts, embedded images, masks or filters;
- have tight viewBoxes.

Clear space is handled in layout, not inside the files. Every colour lockup and the favicon use the same canonical B geometry.

## Logos — `public/brand/logo/`

| File | Use on | Contains |
|---|---|---|
| `primary logo light.svg` | Light backgrounds | Colour B, stacked navy wordmark, tagline |
| `primary logo dark.svg` | Dark / navy backgrounds | Colour B, stacked light wordmark, tagline |
| `horizontal logo light.svg` | Light backgrounds, wide spaces | Colour B, single-line navy wordmark, tagline |
| `horizontal logo dark.svg` | Dark / navy backgrounds, wide spaces | Colour B, single-line light wordmark, tagline |
| `compact logo light.svg` | Light backgrounds: header and other tight placements | Colour B, stacked navy wordmark, no tagline |
| `compact logo dark.svg` | Dark / navy backgrounds: header and other tight placements | Colour B, stacked light wordmark, no tagline |
| `monogram color.svg` | Any background where the B stands alone | Colour B (the three logo-mark blues) |
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

### Logo colours (logo artwork only)

| Role | Hex |
|---|---|
| Logo-mark blue: light facet (stem, top bar, upper bowl) | `#1D7FFD` |
| Logo-mark blue: mid facet (chevron, lower bowl) | `#0669FC` |
| Logo-mark blue: dark facet (bottom bar) | `#0261F8` |
| Navy: wordmark on light, monogram black, favicon tile | `#0B1320` |
| Light: wordmark on dark, monogram white | `#F8FAFC` |
| Tagline on light backgrounds | `#64748B` |
| Tagline on dark backgrounds | `#CBD5E1` |

The three logo-mark blues are sampled directly from the approved `monogram color.png`. Never recolour the logo mark to the UI blues.

### UI accent colours (website interface only)

| Role | Hex |
|---|---|
| Brand accent | `#3B82F6` |
| Action blue: primary buttons, actionable blue text on light backgrounds | `#2563EB` |

The two sets are intentionally separate. The logo keeps its approved artwork blues, and the website UI uses `#3B82F6` / `#2563EB` as defined in `docs/DESIGN_SYSTEM.md`.

## Notes

- File names contain spaces, as approved. In URLs, encode them, for example `/brand/logo/compact%20logo%20light.svg`. `next/image` and `<img src>` handle encoded paths.
- Do not recolour, stretch, outline or add effects to any logo.
