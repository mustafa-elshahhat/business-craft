#!/usr/bin/env python3
"""Visual QA: compare each rebuilt SVG with its approved PNG master.

Maintenance / reproduction utility only. See scripts/brand/README.md.

Usage:
    python3 scripts/brand/qa_contact_sheet.py --svg-dir /tmp/brand-build --out /tmp/brand-qa

For every asset it renders the SVG with headless Chromium onto the PNG's own pixel
grid and background (using positions.json from build_logos.py), prints the ink
overlap (IoU) with the PNG, and writes "logo contact sheet.png":
approved PNG | rendered SVG on the same background | SVG on a transparency grid.
"""
import argparse
import json
import os
import re
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--src", type=Path, default=ROOT / "references/logo/approved")
ap.add_argument("--svg-dir", type=Path, required=True, help="output directory of build_logos.py")
ap.add_argument("--out", type=Path, required=True)
ap.add_argument("--chromium", default=os.environ.get("CHROMIUM_BIN", "chromium"),
                help="headless Chromium binary (or set CHROMIUM_BIN)")
args = ap.parse_args()
args.out.mkdir(parents=True, exist_ok=True)
pos = json.loads((args.svg_dir / "positions.json").read_text())

ORDER = ["primary logo light", "primary logo dark", "horizontal logo light", "horizontal logo dark",
         "compact logo light", "compact logo dark", "monogram color", "monogram black", "monogram white",
         "wordmark dark", "wordmark white", "favicon"]


def shot(html: Path, w: int, h: int, dest: Path):
    subprocess.run([args.chromium, "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                    "--force-device-scale-factor=1", f"--window-size={w},{h}", f"--screenshot={dest}",
                    html.as_uri()], check=True, capture_output=True)


def bg_of(a):
    return tuple(int(v) for v in np.median(np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3)]), axis=0))


rows = []
for name in ORDER:
    png = args.src / f"{name}.png"
    svg = (args.svg_dir / f"{name}.svg").resolve()
    a = np.asarray(Image.open(png).convert("RGB")).astype(int)
    H, W = a.shape[:2]
    bg = bg_of(a)
    vw, vh = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg.read_text()).groups()
    x0, y0 = pos[name]
    html = args.out / f"{name}.html"
    html.write_text(f'<!doctype html><body style="margin:0;background:rgb{bg};overflow:hidden">'
                    f'<img src="{svg.as_uri()}" style="position:absolute;left:{x0}px;top:{y0}px;'
                    f'width:{vw}px;height:{vh}px"></body>')
    render = args.out / f"{name} render.png"
    shot(html, W, H, render)
    html.unlink()
    r = np.asarray(Image.open(render).convert("RGB")).astype(int)
    render.unlink()
    ink_a = np.abs(a - bg).sum(-1) > 90
    ink_r = np.abs(r - bg).sum(-1) > 90
    iou = (ink_a & ink_r).sum() / (ink_a | ink_r).sum()
    print(f"{name:24s} ink IoU {iou:.4f}")
    rows.append(f'''<div class="row"><div class="lab">{name}<br><span>IoU {iou:.4f}</span></div>
<div><div class="cap">APPROVED PNG</div><img class="png" src="{png.resolve().as_uri()}"></div>
<div><div class="cap">RENDERED SVG (same background)</div><div class="box" style="background:rgb{bg}"><img src="{svg.as_uri()}"></div></div>
<div><div class="cap">SVG ON TRANSPARENCY GRID</div><div class="box chk"><img src="{svg.as_uri()}"></div></div></div>''')

sheet = args.out / "contact.html"
sheet.write_text('''<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;padding:24px;background:#fff;font:600 13px/1.3 sans-serif;color:#0B1320;width:1352px}
h1{font-size:20px;margin:0 0 16px}.row{display:flex;gap:16px;align-items:center;padding:12px 0;border-top:1px solid #e2e8f0}
.lab{width:150px}.lab span{font-weight:400;color:#64748B}.cap{font:500 10px sans-serif;color:#64748B;letter-spacing:.06em;margin-bottom:4px}
.png{width:380px;height:190px;object-fit:contain;background:#eee;display:block}
.box{width:380px;height:190px;display:flex;align-items:center;justify-content:center}.box img{max-width:300px;max-height:130px}
.chk{background:repeating-conic-gradient(#d4d4d8 0 25%,#fff 0 50%) 0 0/16px 16px}
</style></head><body><h1>Business Craft logo system: approved PNG vs rendered SVG</h1>''' + "\n".join(rows) + "</body></html>")
shot(sheet, 1400, 2900, args.out / "logo contact sheet.png")
sheet.unlink()
print("contact sheet:", args.out / "logo contact sheet.png")
