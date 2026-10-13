#!/usr/bin/env python3
"""Rebuild the Business Craft production logo SVGs from the approved PNG masters.

Maintenance / reproduction utility only. It is NOT part of install, dev, build, CI
or deployment. See scripts/brand/README.md.

Method: per-colour coverage (alpha) maps are estimated from each PNG against its
flat presentation background, upsampled 4x (bicubic), thresholded at 50% and
traced to Bezier curves with potrace. Long straight runs are snapped to lines and
specks are removed. The colour monogram (3 tonal facets) is traced once from
"monogram color.png" and re-used, fitted to the B in every colour lockup and the
favicon, so the B geometry is identical across the system.

Usage:
    python3 scripts/brand/build_logos.py --out /tmp/brand-build
    (--src defaults to references/logo/approved)

Outputs into --out: the 11 logo SVGs, favicon.svg, "apple touch icon.svg"
(full-bleed source for the 180px PNG) and positions.json (where each SVG sits on
its PNG master, used by qa_contact_sheet.py).
"""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--src", type=Path, default=ROOT / "references/logo/approved")
ap.add_argument("--out", type=Path, required=True)
ARGS = ap.parse_args()
SRC, OUT = ARGS.src, ARGS.out
UP = 4  # supersampling factor for tracing

# Approved production colours (docs/BRAND_ASSETS.md)
NAVY = "#0B1320"
LIGHT = "#F8FAFC"
TAG_ON_LIGHT = "#64748B"
TAG_ON_DARK = "#CBD5E1"
# Logo-mark blues: the tonal facets sampled from monogram color.png
FACET_LIGHT, FACET_MID, FACET_DARK = "#1D7FFD", "#0669FC", "#0261F8"


def load(name):
    return np.asarray(Image.open(SRC / f"{name}.png").convert("RGB")).astype(float)


# ---------------------------------------------------------------- path tools
TOK = re.compile(r"[MmLlCcZz]|-?\d*\.?\d+(?:e-?\d+)?")


def parse_potrace(svg_text):
    """Return absolute subpaths [(cmd, [pts...]), ...] in potrace pixel space."""
    tr = re.search(r'translate\(([-\d.]+),([-\d.]+)\) scale\(([-\d.]+),([-\d.]+)\)', svg_text)
    tx, ty, sx, sy = map(float, tr.groups())
    cmds = []
    for d in re.findall(r' d="([^"]+)"', svg_text):
        toks = TOK.findall(d)
        i, cx, cy, sx0, sy0, cmd = 0, 0.0, 0.0, 0.0, 0.0, None
        while i < len(toks):
            t = toks[i]
            if t.isalpha():
                cmd = t
                i += 1
                if cmd in "Zz":
                    cmds.append(("Z", []))
                    cx, cy = sx0, sy0
                    continue
            n = {"M": 2, "m": 2, "L": 2, "l": 2, "C": 6, "c": 6}[cmd]
            v = list(map(float, toks[i:i + n]))
            i += n
            rel = cmd.islower()
            pts = [(v[k] + (cx if rel else 0), v[k + 1] + (cy if rel else 0)) for k in range(0, n, 2)]
            up = cmd.upper()
            cmds.append((up, pts))
            cx, cy = pts[-1]
            if up == "M":
                sx0, sy0 = cx, cy
                cmd = "l" if rel else "L"
    # potrace space -> bitmap pixel space
    return [(c, [(tx + sx * x, ty + sy * y) for x, y in p]) for c, p in cmds]


def _dist(p, a, b):
    ax, ay = a; bx, by = b; px, py = p
    dx, dy = bx - ax, by - ay
    L = (dx * dx + dy * dy) ** 0.5
    if L < 1e-9:
        return ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
    return abs((px - ax) * dy - (py - ay) * dx) / L


def straighten(cmds, tol=0.3, min_len=40.0):
    """Replace maximal runs of segments lying within `tol` px of their chord (and at least
    `min_len` px long) with a single line. Genuine curves are left untouched."""
    out, i, cur = [], 0, None
    while i < len(cmds):
        k, p = cmds[i]
        if k in "MZ" or cur is None:
            out.append((k, p)); cur = p[-1] if p else cur; i += 1
            if k == "Z":
                cur = None
            continue
        best, j, pts = None, i, []
        while j < len(cmds) and cmds[j][0] in "LC":
            pts = pts + cmds[j][1]
            end = cmds[j][1][-1]
            if all(_dist(q, cur, end) <= tol for q in pts):
                best = j
                j += 1
            else:
                break
        if best is not None:
            end = cmds[best][1][-1]
            if ((end[0] - cur[0]) ** 2 + (end[1] - cur[1]) ** 2) ** 0.5 >= min_len or cmds[i][0] == "L":
                out.append(("L", [end])); cur = end; i = best + 1
                continue
        out.append((k, p)); cur = p[-1]; i += 1
    return out


def xform(cmds, a, b, c, d):
    """x' = a*x + b ; y' = c*y + d"""
    return [(k, [(a * x + b, c * y + d) for x, y in p]) for k, p in cmds]


def bbox(cmds):
    """Tight bounds of the actual outline (cubic curves sampled, not their control points)."""
    xs, ys, cur = [], [], None
    for k, p in cmds:
        if k == "C" and cur is not None:
            p0, (p1, p2, p3) = cur, p
            for i in range(1, 33):
                t = i / 32
                u = 1 - t
                xs.append(u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0])
                ys.append(u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1])
        elif p:
            xs.append(p[-1][0]); ys.append(p[-1][1])
        if p:
            cur = p[-1]
    return min(xs), min(ys), max(xs), max(ys)


def drop_specks(cmds, min_area=4.0):
    """Remove degenerate subpaths (|area| below min_area px^2)."""
    subs, cur = [], []
    for k, p in cmds:
        if k == "M" and cur:
            subs.append(cur); cur = []
        cur.append((k, p))
    if cur:
        subs.append(cur)
    keep = []
    for sp in subs:
        pts = [q[-1] for _, q in sp if q]
        area = 0.5 * abs(sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1]
                             for i in range(len(pts))))
        if area >= min_area:
            keep.extend(sp)
    return keep


def to_d(cmds):
    out, last = [], None
    f = lambda v: ("%.1f" % v).rstrip("0").rstrip(".")
    for k, p in cmds:
        s = " ".join(f"{f(x)} {f(y)}" for x, y in p)
        out.append(k if k == "Z" else (s if k == last and k != "M" else k + s))
        last = k
    return "".join(x if x[0].isalpha() else " " + x for x in out)


def trace(alpha, turd=40):
    """alpha: float array 0..1 at source resolution. Returns cmds in source px."""
    h, w = alpha.shape
    img = Image.fromarray(np.clip(alpha * 255, 0, 255).astype(np.uint8))
    img = img.resize((w * UP, h * UP), Image.BICUBIC).filter(ImageFilter.GaussianBlur(3))
    bw = img.point(lambda v: 0 if v >= 128 else 255).convert("1")  # black = ink
    with tempfile.TemporaryDirectory() as td:
        bmp, svg = Path(td) / "m.bmp", Path(td) / "m.svg"
        bw.save(bmp)
        subprocess.run(["potrace", "-s", "-o", str(svg), "-t", str(turd), "-a", "1.0",
                        "-O", "2.0", str(bmp)], check=True)
        cmds = parse_potrace(svg.read_text())
    return drop_specks(straighten(xform(cmds, 1 / UP, 0, 1 / UP, 0)))


# ------------------------------------------------------------- coverage maps
def bg_colour(a):
    return np.median(np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3)]), axis=0)


def coverage(a, fg, bg):
    """Least-squares blend factor between bg and fg colours per pixel."""
    fg, bg = np.asarray(fg, float), np.asarray(bg, float)
    v = fg - bg
    return np.clip(((a - bg) @ v) / (v @ v), 0, 1)


def blue_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (b > 170) & (b - r > 110)


def region_bbox(m):
    ys, xs = np.nonzero(m)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def propagate(masks, domain, iters=8):
    """Label map: each pixel in domain gets the index of the nearest seed mask (iterative 3x3 growth)."""
    lab = np.full(domain.shape, -1, int)
    for i, m in enumerate(masks):
        lab[m] = i
    for _ in range(iters):
        un = (lab < 0) & domain
        if not un.any():
            break
        for i in range(len(masks)):
            grown = np.asarray(Image.fromarray(((lab == i) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 127
            take = un & grown & (lab < 0)
            lab[take] = i
    return lab


def opening(m, k=9):
    """Remove anti-aliasing slivers narrower than k px from a facet mask."""
    im = Image.fromarray((m * 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.MinFilter(k)).filter(ImageFilter.MaxFilter(k))) > 127


# ------------------------------------------------------------ colour monogram
def build_colour_b():
    a = load("monogram color")
    bg = bg_colour(a)
    base = coverage(a, (29, 127, 253), bg)
    g = a[..., 1]
    strict = blue_mask(a)
    # facet classes by green channel (light ~127, mid ~105, dark ~97)
    dark = opening(strict & (g < 101))
    mid = opening(strict & (g >= 101) & (g < 116))
    light = opening(strict & (g >= 116))
    lab = propagate([light, mid, dark], base > 0.02)
    # facet coverage = silhouette coverage x facet label, so outer edges coincide with the base
    def soft(m, r=2.0):
        return np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), float) / 255
    # smooth internal facet boundaries (labels are 1px-quantised), keep outer edges from `base`
    dark_cov = base * soft(lab == 2)
    # mid extends ~2px under the dark facet so no seam shows between them
    under = np.asarray(Image.fromarray(((lab == 1) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 127
    mid_cov = base * soft((lab == 1) | (under & (lab == 2)))
    layers = [(FACET_LIGHT, trace(base)), (FACET_MID, trace(mid_cov, 2000)), (FACET_DARK, trace(dark_cov, 2000))]
    x0, y0, x1, y1 = bbox(layers[0][1])
    B_ORIGIN[:] = [x0, y0]
    sx0, sy0, sx1, sy1 = region_bbox(strict)
    B_STRICT[:] = [sx0 - x0, sy0 - y0, sx1 - x0, sy1 - y0]
    layers = [(c, xform(p, 1, -x0, 1, -y0)) for c, p in layers]
    return layers, (x1 - x0, y1 - y0)


def place(layers, size, target_box):
    """Fit the canonical B so its strict blue-pixel box matches the PNG's (height-fit, x-centred)."""
    cx0, cy0, cx1, cy1 = B_STRICT
    tx0, ty0, tx1, ty1 = target_box
    s = (ty1 - ty0) / (cy1 - cy0)
    oy = ty0 - s * cy0
    ox = tx0 + ((tx1 - tx0) - s * (cx1 - cx0)) / 2 - s * cx0
    return [(c, xform(p, s, ox, s, oy)) for c, p in layers], s * (cx1 - cx0), (tx1 - tx0)


# ------------------------------------------------------------------- writers
def write_svg(name, w, h, layers, title):
    META[name] = META.pop(CUR[0], None)
    body = "\n".join(f'<path fill="{c}" d="{to_d(p)}"/>' for c, p in layers if p)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
           f'role="img" aria-label="{title}">\n<title>{title}</title>\n{body}\n</svg>\n')
    (OUT / f"{name}.svg").write_text(svg)


def normalise(layers):
    """Shift so the union bbox starts at 0,0; return layers, w, h."""
    bs = [bbox(p) for _, p in layers if p]
    x0, y0 = min(b[0] for b in bs), min(b[1] for b in bs)
    x1, y1 = max(b[2] for b in bs), max(b[3] for b in bs)
    META[CUR[0]] = (x0, y0)
    return [(c, xform(p, 1, -x0, 1, -y0)) for c, p in layers], x1 - x0, y1 - y0


META, CUR, B_ORIGIN, B_STRICT = {}, [None], [0, 0], [0, 0, 0, 0]


def split_rows(mask):
    """Split a text mask into wordmark and tagline at the widest empty row gap."""
    rows = np.nonzero(mask.any(axis=1))[0]
    gaps = np.diff(rows)
    k = np.argmax(gaps)
    return rows[k] + 1


def lockup(name, dark, has_tag, B, Bsize, report):
    a = load(name)
    bg = bg_colour(a)
    strict = blue_mask(a)
    bx0, by0, bx1, by1 = region_bbox(strict)
    pad = 6
    textcol = (250, 251, 252) if dark else (11, 19, 32)
    tx = coverage(a, textcol, bg)
    tx[by0 - pad:by1 + pad, bx0 - pad:bx1 + pad] = 0  # remove B region
    ink = tx > 0.5
    if has_tag:
        cut = split_rows(ink)
        word, tag = tx.copy(), tx.copy()
        word[cut:] = 0
        tag[:cut] = 0
        tagcol = np.median(a[tag > 0.5], axis=0)
        tag = coverage(a, tagcol, bg)
        tag[:cut] = 0
        tag[by0 - pad:by1 + pad, bx0 - pad:bx1 + pad] = 0
        report.append(f"  {name}: tagline sampled #%02X%02X%02X" % tuple(tagcol.astype(int)))
        wl = trace(word)
        tl = trace(tag, 20)
    else:
        wl, tl = trace(tx), []
    # canonical B fitted to this PNG's B
    placed, w_fit, w_ref = place(B, Bsize, region_bbox(strict))
    report.append(f"  {name}: B fitted width {w_fit:.1f}px vs PNG {w_ref:.1f}px ({100 * (w_fit / w_ref - 1):+.2f}%)")
    word_col = LIGHT if dark else NAVY
    layers = placed + [(word_col, wl)] + ([(TAG_ON_DARK if dark else TAG_ON_LIGHT, tl)] if has_tag else [])
    return normalise(layers)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    report = []
    B, Bsize = build_colour_b()
    CUR[0] = "monogram color"
    lay, w, h = normalise(B)
    write_svg("monogram color", w, h, lay, "Business Craft")
    META["monogram color"] = (META["monogram color"][0] + B_ORIGIN[0], META["monogram color"][1] + B_ORIGIN[1])
    report.append(f"monogram color: {w:.1f} x {h:.1f}")

    for name, col in (("monogram black", NAVY), ("monogram white", LIGHT)):
        a = load(name)
        bg = bg_colour(a)
        fg = (11, 19, 32) if col == NAVY else (250, 251, 252)
        CUR[0] = name
        lay, w, h = normalise([(col, trace(coverage(a, fg, bg)))])
        write_svg(name, w, h, lay, "Business Craft")
        report.append(f"{name}: {w:.1f} x {h:.1f}")

    for name, col in (("wordmark dark", NAVY), ("wordmark white", LIGHT)):
        a = load(name)
        bg = bg_colour(a)
        fg = (11, 19, 32) if col == NAVY else (250, 251, 252)
        CUR[0] = name
        lay, w, h = normalise([(col, trace(coverage(a, fg, bg)))])
        write_svg(name, w, h, lay, "Business Craft")
        report.append(f"{name}: {w:.1f} x {h:.1f}")

    for base, tag in (("primary logo", True), ("horizontal logo", True), ("compact logo", False)):
        for variant, dark in (("light", False), ("dark", True)):
            name = f"{base} {variant}"
            CUR[0] = name
            lay, w, h = lockup(name, dark, tag, B, Bsize, report)
            title = "Business Craft — Digital Solutions for Real Business" if tag else "Business Craft"
            write_svg(name, w, h, lay, title)
            report.append(f"{name}: {w:.1f} x {h:.1f}")

    # favicon: exact navy rounded square (measured from favicon.png: 800px tile, corner radius ~142px)
    # + canonical colour B fitted to the favicon's B
    a = load("favicon")
    strict = blue_mask(a)
    placed, w_fit, w_ref = place(B, Bsize, region_bbox(strict))
    report.append(f"  favicon: B fitted width {w_fit:.1f}px vs PNG {w_ref:.1f}px ({100 * (w_fit / w_ref - 1):+.2f}%)")
    TILE, RX = 800.0, 142.0
    tx0 = 228.0
    ty0 = (228.0 + 1025.0) / 2 - TILE / 2  # tile centred on the PNG tile's vertical centre
    placed = [(c, xform(p, 1, -tx0, 1, -ty0)) for c, p in placed]
    META["favicon"] = (tx0, ty0)
    body = (f'<rect width="{TILE:g}" height="{TILE:g}" rx="{RX:g}" fill="{NAVY}"/>\n'
            + "\n".join(f'<path fill="{c}" d="{to_d(p)}"/>' for c, p in placed))
    (OUT / "favicon.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TILE:g} {TILE:g}" role="img" aria-label="Business Craft">\n'
        f'<title>Business Craft</title>\n{body}\n</svg>\n')
    # apple touch icon source: full-bleed square (iOS applies its own corner mask)
    (OUT / "apple touch icon.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TILE:g} {TILE:g}">\n'
        f'<rect width="{TILE:g}" height="{TILE:g}" fill="{NAVY}"/>\n'
        + "\n".join(f'<path fill="{c}" d="{to_d(p)}"/>' for c, p in placed) + "\n</svg>\n")
    report.append("favicon: 800 x 800")
    print("\n".join(report))
    (OUT / "positions.json").write_text(json.dumps(META, indent=1))


if __name__ == "__main__":
    main()
