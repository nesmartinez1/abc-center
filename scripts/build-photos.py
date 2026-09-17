#!/usr/bin/env python3
"""
Turn ABC's supplied photographs into web-ready assets.

    python3 scripts/build-photos.py

Reads  assets-src/photos/<brand>/   (originals, NOT served)
Writes public/photos/<brand>/       (committed; what the site actually loads)

This is the photo sibling of build-logos.py, and deliberately much dumber.
Logos needed background removal and hand-measured crops; photographs need
neither. All that happens here is "downscale if oversized, save as WebP".

The one rule worth stating: WE NEVER UPSCALE. ABC has so far sent images below
the 1600px-wide cover photo we asked for (see ../abc-content-outstanding.md).
Blowing those up to fill a hero would look worse, not better, and would hide
the fact that a better source file is still outstanding. Photos smaller than
their MAX_W are passed through at native size.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "photos"
OUT = ROOT / "public" / "photos"

# Same encoder settings as build-logos.py. Photographs are exactly what lossy
# WebP is good at, so this is uncontroversial here.
WEBP = dict(quality=82, method=6)

# Widest the image will ever be *displayed*, times 2 for HiDPI. The hero is
# full-bleed; the about photo sits in a half-width column; a gallery photo is one
# cell of a three-up grid inside the 1200px container, so it never renders wider
# than (1200 - 64 padding - 32 gaps) / 3 = 368px.
#
# Keyed by the part of the output name before the first dash, so numbered
# variants (gallery-1, gallery-2, ...) share one budget.
MAX_W = {
    "hero": 2400,
    "about": 1200,
    "gallery": 800,
}

# Keep only the top N% of the source, before resizing. "brand/name" keys.
#
# Foundation's "hero" is not a photograph — it's a finished promotional graphic
# with three logo lockups across the top, its own headline text, and a
# "PEOPLE · OCEAN · NUTRITION · SPORTS" banner across the bottom. The banner
# lands exactly where PageHero puts its CTA buttons and its darkest scrim, so it
# is cropped away here rather than in CSS: object-position alone only works when
# the viewport is wide enough to force a vertical crop, and on a phone (portrait
# box, landscape image) `cover` crops the sides instead and the banner comes
# back. Cropping the source makes the framing hold at every viewport.
TOP_CROP = {
    "foundation/hero": 0.60,
}

# brand -> {output name: source filename}. Add entries as ABC sends photos.
PHOTOS = {
    "mas-que-atletas": {
        "hero": "MAQ-hero.jpeg",
        "about": "MAQ-1.jpeg",
    },
    "centro": {
        "hero": "abc-centro-hero.jpeg",
        **{f"gallery-{i}": f"centro-gallery-{i}.jpeg" for i in range(1, 9)},
    },
    "foundation": {
        "hero": "foundation-hero.jpeg",
    },
    "mental-care": {
        "hero": "mc-hero.jpeg",
        "hero-servicios": "mc-servicios-hero.jpeg",
        "hero-recursos": "mc-recursos-hero.jpeg",
        "hero-contacto": "mc-contacto-hero.jpeg",
    },
    "ocean-care": {
        "hero": "oc-hero.jpeg",
        "hero-actividades": "oc-actividades-hero.jpeg",
        "hero-calendario": "oc-calendario-hero.jpeg",
        "gallery-1": "oc-gallery-1.jpeg",
        "gallery-2": "oc-gallery-2.jpeg",
        "gallery-3": "oc-gallery-3.jpeg",
    },
}


def main() -> None:
    src_bytes = out_bytes = 0

    for brand, photos in PHOTOS.items():
        out_dir = OUT / brand
        out_dir.mkdir(parents=True, exist_ok=True)

        for name, filename in photos.items():
            src_path = SRC / brand / filename
            if not src_path.exists():
                raise SystemExit(f"missing source: {src_path}")
            src_bytes += src_path.stat().st_size

            im = Image.open(src_path).convert("RGB")
            original = im.size

            crop = TOP_CROP.get(f"{brand}/{name}")
            if crop:
                im = im.crop((0, 0, im.width, round(im.height * crop)))

            max_w = MAX_W[name.split("-")[0]]
            if im.width > max_w:
                height = round(im.height * max_w / im.width)
                im = im.resize((max_w, height), Image.LANCZOS)

            out_path = out_dir / f"{name}.webp"
            # Pillow writes no EXIF unless asked, so camera/location metadata
            # from ABC's phones doesn't reach the public folder.
            im.save(out_path, "WEBP", **WEBP)
            out_bytes += out_path.stat().st_size

            note = ""
            if crop:
                note = f"   [top {crop:.0%} only]"
            elif im.size == original:
                note = "   [native size — no upscale]"
            print(
                f"{brand}/{name:16s} {original[0]:4d}x{original[1]:<4d} "
                f"({src_path.stat().st_size // 1024:3d}KB) -> "
                f"{im.width:4d}x{im.height:<4d} "
                f"({out_path.stat().st_size // 1024:3d}KB){note}"
            )

    print(
        f"\nsource {src_bytes // 1024}KB -> generated {out_bytes // 1024}KB "
        f"({100 - 100 * out_bytes // src_bytes}% smaller)"
    )


if __name__ == "__main__":
    main()
