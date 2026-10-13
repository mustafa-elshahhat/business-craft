#!/usr/bin/env python3
"""Export the favicon / app-icon rasters from the SVGs produced by build_logos.py.

Maintenance / reproduction utility only. See scripts/brand/README.md.

Usage:
    python3 scripts/brand/export_favicons.py --svg-dir /tmp/brand-build --out /tmp/brand-favicon

Renders with headless Chromium (transparent background) and writes:
favicon 16.png, favicon 32.png, favicon.ico (16/32/48), icon 192.png,
icon 512.png and apple touch icon.png (180px, opaque full-bleed).
"""
import argparse
import os
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--svg-dir", type=Path, required=True, help="output directory of build_logos.py")
ap.add_argument("--out", type=Path, required=True)
ap.add_argument("--chromium", default=os.environ.get("CHROMIUM_BIN", "chromium"),
                help="headless Chromium binary (or set CHROMIUM_BIN)")
args = ap.parse_args()
args.out.mkdir(parents=True, exist_ok=True)


def render(svg: Path, size: int, dest: Path):
    with tempfile.TemporaryDirectory() as td:
        html = Path(td) / "r.html"
        html.write_text(f'<!doctype html><body style="margin:0;background:transparent">'
                        f'<img src="{svg.resolve().as_uri()}" style="display:block;width:{size}px;height:{size}px"></body>')
        subprocess.run([args.chromium, "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                        "--default-background-color=00000000", "--force-device-scale-factor=1",
                        f"--window-size={size},{size}", f"--screenshot={dest}", html.as_uri()],
                       check=True, capture_output=True)


fav = args.svg_dir / "favicon.svg"
for size, name in ((16, "favicon 16.png"), (32, "favicon 32.png"), (192, "icon 192.png"), (512, "icon 512.png")):
    render(fav, size, args.out / name)
render(args.svg_dir / "apple touch icon.svg", 180, args.out / "apple touch icon.png")
Image.open(args.out / "apple touch icon.png").convert("RGB").save(args.out / "apple touch icon.png")

with tempfile.TemporaryDirectory() as td:
    p48 = Path(td) / "48.png"
    render(fav, 48, p48)
    sizes = [Image.open(args.out / "favicon 16.png").convert("RGBA"),
             Image.open(args.out / "favicon 32.png").convert("RGBA")]
    Image.open(p48).convert("RGBA").save(args.out / "favicon.ico", format="ICO",
                                          sizes=[(16, 16), (32, 32), (48, 48)], append_images=sizes)
print("written to", args.out)
