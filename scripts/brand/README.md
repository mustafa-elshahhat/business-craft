# Brand asset scripts

Maintenance and reproduction utilities for the Business Craft logo system.

**These scripts never run automatically.** They are not wired into install, dev, build, CI or deployment, and nothing should import them. Run them by hand only when the logo system needs to be reproduced or audited. The logo system is final and locked, so the normal output is a byte-for-byte match with the committed files.

| Script | What it does |
|---|---|
| `build_logos.py` | Rebuilds the 11 logo SVGs and `favicon.svg` from the PNG masters in `references/logo/approved/` |
| `export_favicons.py` | Renders `favicon.ico`, `favicon 16.png`, `favicon 32.png`, `icon 192.png`, `icon 512.png` and `apple touch icon.png` from the build output |
| `qa_contact_sheet.py` | Renders every SVG onto its PNG master, prints the ink overlap (IoU) and writes `logo contact sheet.png` |

## Dependencies (not vendored)

- Python 3.10+ with `numpy` and `Pillow`.
- [Potrace](https://potrace.sourceforge.net/) on `PATH`, used by `build_logos.py`. Last run with potrace 1.16. Install with `apt-get install potrace` or `brew install potrace`.
- Headless Chromium, used by `export_favicons.py` and `qa_contact_sheet.py`. Pass `--chromium <path>` or set `CHROMIUM_BIN`. Playwright's `chromium_headless_shell` works; the full Chromium binary in `--headless=new` mode crops the viewport.

## Reproduce and verify

```sh
python3 scripts/brand/build_logos.py --out /tmp/brand-build
python3 scripts/brand/export_favicons.py --svg-dir /tmp/brand-build --out /tmp/brand-favicon
python3 scripts/brand/qa_contact_sheet.py --svg-dir /tmp/brand-build --out /tmp/brand-qa

# The SVGs should be byte-identical to the committed production files
for f in public/brand/logo/*.svg public/brand/favicon/favicon.svg; do
  cmp "$f" "/tmp/brand-build/$(basename "$f")"
done
```

The scripts write only to the `--out` directory you pass. They never overwrite `public/brand/` or `references/`. Copy files into `public/brand/` by hand, and only when an explicitly approved logo change requires it.

`build_logos.py` also writes two helper files that are not production assets:
- `apple touch icon.svg`: the full-bleed source for the 180px PNG;
- `positions.json`: offsets used by the QA script.

## Method

1. For each PNG master, a coverage (alpha) map is estimated per colour against the flat presentation background.
2. The map is upsampled 4×, slightly smoothed, thresholded at 50% and traced with Potrace.
3. Long straight runs are snapped to true lines and degenerate specks are removed.
4. ViewBoxes are set to the tight outline bounds.
5. The colour B is traced once from `monogram color.png` as three tonal facets and reused, fitted to the B, in every colour lockup and the favicon. This is the single canonical B.
6. The favicon tile is an exact 800 × 800 rounded square with corner radius 142, measured from `favicon.png`.
7. Colours are fixed to the approved values listed in `docs/BRAND_ASSETS.md`.
