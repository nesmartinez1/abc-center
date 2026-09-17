#!/usr/bin/env python3
"""
Assert the generated logos in public/logos/ are actually correct.

    python3 scripts/check-logos.py

The failure mode this exists to catch: if background removal is ever changed
from an edge flood-fill to a global white->transparent pass, the white A/B/C
letters inside ABC Centro's blocks and the white text inside ABC Foundation's
red pill get erased. That looks completely fine in a thumbnail and is wrong.
So we sample those specific regions and require them to still be opaque.
"""

import sys
from pathlib import Path
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "logos"
BRANDS = [
    "abc-center",
    "brilliant-brains",
    "mental-care",
    "foundation",
    "mas-que-atletas",
    "ocean-care",
]

results = []


def ok(name: str, passed: bool, detail: str = "") -> None:
    results.append(f"{'PASS' if passed else 'FAIL'}  {name}{'  — ' + detail if detail else ''}")


def opaque_white_ratio(im: Image.Image, box) -> float:
    """Share of pixels in `box` that are opaque and near-white."""
    region = im.crop(box).convert("RGBA")
    px = list(region.getdata())
    if not px:
        return 0.0
    hits = sum(1 for r, g, b, a in px if a > 200 and r > 205 and g > 205 and b > 205)
    return hits / len(px)


for brand in BRANDS:
    for variant in ("full", "mark"):
        p = OUT / f"{brand}-{variant}.webp"
        if not p.exists():
            ok(f"{brand}-{variant} exists", False)
            continue
        im = Image.open(p).convert("RGBA")
        w, h = im.size
        corners = [
            im.getpixel((0, 0)),
            im.getpixel((w - 1, 0)),
            im.getpixel((0, h - 1)),
            im.getpixel((w - 1, h - 1)),
        ]
        ok(
            f"{brand}-{variant}: background removed (corners transparent)",
            all(c[3] == 0 for c in corners),
            f"alphas={[c[3] for c in corners]}",
        )
        alpha_box = im.split()[3].getbbox()
        if variant == "full":
            # A trimmed lockup must touch all four edges, or trim didn't work.
            ok(
                f"{brand}-full: trimmed tight",
                alpha_box == (0, 0, w, h),
                str(alpha_box),
            )
        else:
            # Marks are deliberately padded to a square, so the short axis is
            # centred with transparent margins. Require: square canvas, content
            # spanning the long axis edge to edge, and centred on the other.
            spans = alpha_box[0] == 0 and alpha_box[2] == w or (
                alpha_box[1] == 0 and alpha_box[3] == h
            )
            lead, trail = alpha_box[1], h - alpha_box[3]
            if alpha_box[1] == 0 and alpha_box[3] == h:
                lead, trail = alpha_box[0], w - alpha_box[2]
            ok(
                f"{brand}-mark: square, content spans and is centred",
                w == h and spans and abs(lead - trail) <= 2,
                f"{w}x{h} box={alpha_box} margins={lead}/{trail}",
            )

# --- the interior-white check, the whole reason this file exists -------------
# ABC Centro's mark is the three blocks; their A/B/C letters are white.
mark = Image.open(OUT / "abc-center-mark.webp").convert("RGBA")
w, h = mark.size
ratio = opaque_white_ratio(mark, (int(w * 0.2), int(h * 0.2), int(w * 0.8), int(h * 0.8)))
ok(
    "ABC Centro: white A/B/C letters survived background removal",
    ratio > 0.02,
    f"{ratio * 100:.1f}% opaque-white in the blocks region (expect >2%)",
)

# ABC Foundation's full lockup has white text inside a red pill, lower third.
found = Image.open(OUT / "foundation-full.webp").convert("RGBA")
w, h = found.size
ratio = opaque_white_ratio(found, (int(w * 0.25), int(h * 0.72), int(w * 0.75), int(h * 0.95)))
ok(
    "ABC Foundation: white pill text survived background removal",
    ratio > 0.02,
    f"{ratio * 100:.1f}% opaque-white in the pill region (expect >2%)",
)

# --- size budget -------------------------------------------------------------
src = Path(__file__).resolve().parent.parent / "assets-src" / "logos"
src_bytes = sum(f.stat().st_size for f in src.glob("*.jpeg"))
out_bytes = sum(f.stat().st_size for f in OUT.iterdir() if f.is_file())
ok(
    "generated assets are smaller than the sources",
    out_bytes < src_bytes,
    f"{src_bytes // 1024}KB -> {out_bytes // 1024}KB",
)

print("\n".join(results))
failed = sum(1 for r in results if r.startswith("FAIL"))
print(f"\n{len(results) - failed}/{len(results)} checks passed")
sys.exit(1 if failed else 0)
