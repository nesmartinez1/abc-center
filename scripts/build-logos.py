#!/usr/bin/env python3
"""
Turn ABC's supplied logo JPEGs into web-ready assets.

    python3 scripts/build-logos.py

Reads  assets-src/logos/*.jpeg   (originals, NOT served — kept out of public/)
Writes public/logos/*            (committed; what the site actually loads)

Why this exists
---------------
The supplied files are JPEG exports of vector logos: white background, no
transparency, ~1556x2000 each, and 53-84% of every file is blank padding. Used
as-is they'd carry a white box onto the dark navbar and ship 636KB of mostly
empty pixels.

Two things here are load-bearing and easy to break:

1. BACKGROUND REMOVAL IS AN EDGE FLOOD-FILL, NOT A GLOBAL WHITE->ALPHA PASS.
   Some artwork *is* white: the A/B/C letters inside ABC Centro's blocks, and
   the "TRANSFORMANDO COMUNIDADES" text inside ABC Foundation's red pill. A
   global colour replace punches holes straight through them. Flooding inward
   from the borders only reaches the outside background, so enclosed whites
   survive. There is a test for exactly this in scripts/check-logos.py.

2. THE MARK CROPS ARE HAND-PICKED (see MARKS below) AND CANNOT BE DERIVED.
   The lockups aren't structured consistently — Centro's wordmark arcs *around*
   its symbol, Brilliant Brains' character stands *on* the letters, and Ocean
   Care is a single circular badge that can't be split at all.
"""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "logos"
OUT = ROOT / "public" / "logos"

# Tolerance for "this pixel is background". JPEG compression leaves a soft halo
# around the artwork, so pure-white-only matching leaves a grey fringe.
FLOOD_THRESH = 42

# Full lockups render ~140-180px tall (hero, cards), so 440 covers 2x DPI with
# room to spare. Marks render at 42px in the navbar; 160 covers 3x.
FULL_MAX_H = 440
MARK_SIZE = 160

# Lossy beats lossless by ~2x here: Ocean Care and Mental Care carry gradients
# and soft shading, which lossless WebP handles badly.
WEBP = dict(quality=82, method=6)

LOGOS = {
    "abc-center": "abc-center-logo.jpeg",
    "brilliant-brains": "abc-bb-logo.jpeg",
    "mental-care": "mental-care-logo.jpeg",
    "foundation": "abc-foundation-logo.jpeg",
    "mas-que-atletas": "MAQ-logo.jpeg",
    "ocean-care": "abc-oc-logo.jpeg",
    "abc-nutrition": "abc-nutrition-logo.jpeg",
}

# Symbol crop within the ORIGINAL image, as (left, top, right, bottom).
# Measured from the source files, not guessed. `None` means the logo is a single
# composition and its "mark" is simply the whole trimmed lockup.
MARKS = {
    # ABC blocks in the middle; the yellow arc wordmark curves around them.
    "abc-center": (480, 790, 1130, 1216),
    # Brain character + the A B C letters it stands on — one unit.
    "brilliant-brains": (168, 460, 1140, 1140),
    # The brain; "ABC / MENTAL CARE" sits below it.
    "mental-care": (500, 660, 1036, 1120),
    # Heart, figures and the big ABC; drops the pill and "FOUNDATION".
    "foundation": (284, 570, 1264, 1048),
    # The three figures in their circle; wordmark is below.
    "mas-que-atletas": (400, 415, 1165, 1075),
    # Unified circular badge — turtle, ABC, wave and manatee are one mark.
    "ocean-care": None,
    # The "C" enclosing the figure-and-leaves motif. The full lockup is 2.5:1 and
    # shrinks to nothing at mark sizes; the C is the one near-square,
    # self-contained element that survives below ~80px. Left edge is 900, not
    # the C's own start: the tan "B" runs to x=896 and a wider crop drags a
    # brown sliver into the frame.
    "abc-nutrition": (900, 730, 1270, 1100),
}


def strip_background(im: Image.Image) -> Image.Image:
    """White background -> transparent, flooding inward from the borders only."""
    im = im.convert("RGBA")
    w, h = im.size
    # Seed every border midpoint and corner. One seed can miss a background
    # region that the artwork visually cuts off from the rest.
    seeds = []
    for x in (0, w // 4, w // 2, 3 * w // 4, w - 1):
        seeds += [(x, 0), (x, h - 1)]
    for y in (0, h // 4, h // 2, 3 * h // 4, h - 1):
        seeds += [(0, y), (w - 1, y)]

    for seed in seeds:
        if im.getpixel(seed)[3] == 0:
            continue  # already cleared by an earlier seed
        ImageDraw.floodfill(im, seed, (255, 255, 255, 0), thresh=FLOOD_THRESH)
    return im


def trim(im: Image.Image) -> Image.Image:
    """Crop to the alpha bounding box."""
    box = im.split()[3].getbbox()
    return im.crop(box) if box else im


def pad_square(im: Image.Image) -> Image.Image:
    """Centre on a transparent square so marks share one aspect ratio."""
    side = max(im.size)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
    return out


def fit_height(im: Image.Image, max_h: int) -> Image.Image:
    if im.height <= max_h:
        return im
    w = round(im.width * max_h / im.height)
    return im.resize((w, max_h), Image.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    src_bytes = out_bytes = 0

    for brand, filename in LOGOS.items():
        path = SRC / filename
        src_bytes += path.stat().st_size
        original = Image.open(path)
        cleaned = strip_background(original)

        # --- full lockup -------------------------------------------------
        full = fit_height(trim(cleaned), FULL_MAX_H)
        full_path = OUT / f"{brand}-full.webp"
        full.save(full_path, "WEBP", **WEBP)
        out_bytes += full_path.stat().st_size

        # --- square mark -------------------------------------------------
        box = MARKS[brand]
        mark = trim(cleaned.crop(box)) if box else trim(cleaned)
        mark = pad_square(mark).resize((MARK_SIZE, MARK_SIZE), Image.LANCZOS)
        mark_path = OUT / f"{brand}-mark.webp"
        mark.save(mark_path, "WEBP", **WEBP)
        out_bytes += mark_path.stat().st_size

        print(
            f"{brand:18s} full {full.width:4d}x{full.height:<4d} "
            f"({full_path.stat().st_size // 1024:3d}KB)   "
            f"mark {MARK_SIZE}x{MARK_SIZE} ({mark_path.stat().st_size // 1024:3d}KB)"
            f"{'' if box else '   [whole badge]'}"
        )

        # --- favicons, from the umbrella brand's mark ---------------------
        if brand == "abc-center":
            square = pad_square(trim(cleaned.crop(MARKS[brand])))
            for size, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png")):
                icon = square.resize((size, size), Image.LANCZOS)
                if name == "apple-touch-icon.png":
                    # iOS ignores transparency and composites on black.
                    bg = Image.new("RGBA", icon.size, (255, 255, 255, 255))
                    bg.alpha_composite(icon)
                    icon = bg
                icon_path = OUT / name
                icon.save(icon_path, "PNG", optimize=True)
                out_bytes += icon_path.stat().st_size
                print(f"{'':18s} {name} ({icon_path.stat().st_size // 1024}KB)")

    print(
        f"\nsource {src_bytes // 1024}KB -> generated {out_bytes // 1024}KB "
        f"({100 - 100 * out_bytes // src_bytes}% smaller)"
    )


if __name__ == "__main__":
    main()
