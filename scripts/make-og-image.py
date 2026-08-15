"""Generate public/og-image.png, the 1200x630 Open Graph card.

Drawn at 2x and downsampled, using the site's own Instrument Serif / Inter
(read straight from public/fonts and converted in memory) and the cream / ink /
accent tokens from src/index.css. Re-run it when the masthead copy or the
figures in the hero change:

    pip install pillow fonttools brotli
    python3 scripts/make-og-image.py
"""

import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

S = 2  # supersample factor
W, H = 1200 * S, 630 * S

CREAM = (250, 247, 242)
INK = (22, 21, 15)
MUTED = (111, 106, 92)
ACCENT = (190, 18, 60)
ACCENT_HI = (225, 29, 72)
ACCENT_WARM = (249, 115, 98)

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "public" / "fonts"

# PIL reads TrueType, not woff2, so unpack the self-hosted faces into a temp
# dir rather than keeping a second copy of each font in the repo.
_TMP = Path(tempfile.mkdtemp(prefix="beehoster-og-"))


def _ttf(stem):
    face = TTFont(FONTS / f"{stem}.woff2")
    face.flavor = None
    out = _TMP / f"{stem}.ttf"
    face.save(out)
    return str(out)


SERIF = _ttf("instrument-serif-latin")
SERIF_IT = _ttf("instrument-serif-italic-latin")
INTER = _ttf("inter-latin")

OUT = str(ROOT / "public" / "og-image.png")


def f(path, size):
    return ImageFont.truetype(path, int(size * S))


# ---------------------------------------------------------------- background
img = Image.new("RGB", (W, H), CREAM)

# Two soft washes, the accent one top-right and an apricot one bottom-left,
# tinted onto the cream through a blurred mask rather than subtracted from it.
for box, tint in (
    ((W - 620 * S, -300 * S, W + 200 * S, 330 * S), (246, 205, 217)),
    ((-320 * S, H - 300 * S, 300 * S, H + 320 * S), (250, 223, 192)),
):
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse(list(box), fill=105)
    mask = mask.filter(ImageFilter.GaussianBlur(150 * S))
    img.paste(Image.new("RGB", (W, H), tint), (0, 0), mask)

d = ImageDraw.Draw(img)

PAD_X = 84 * S


# ------------------------------------------------------------------ bee mark
def bee(x, y, size):
    """The BEEHOSTER badge from public/logo.svg, on a 64-unit grid."""
    u = size / 64.0
    layer = Image.new("RGBA", (int(size * 3), int(size * 3)), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ox = oy = size  # the mark sits in the middle cell of the 3x3 layer

    def p(vx, vy):
        return (ox + vx * u, oy + vy * u)

    ld.rounded_rectangle(
        [p(3, 3), p(61, 61)], radius=20 * u, fill=(255, 255, 255, 255),
        outline=ACCENT + (255,), width=max(1, int(2.5 * u)),
    )

    # Wings: drawn flat, rotated into place, then composited.
    for cx, cy, ang in ((17, 27, 22), (47, 27, -22)):
        wing = Image.new("RGBA", (int(size), int(size)), (0, 0, 0, 0))
        ImageDraw.Draw(wing).ellipse(
            [size / 2 - 11 * u, size / 2 - 6.4 * u, size / 2 + 11 * u, size / 2 + 6.4 * u],
            fill=(240, 110, 145, 130), outline=ACCENT + (255,), width=max(1, int(1.3 * u)),
        )
        wing = wing.rotate(ang, resample=Image.BICUBIC)
        layer.alpha_composite(wing, (int(ox + cx * u - size / 2), int(oy + cy * u - size / 2)))

    # Antennae
    for sx, ex in ((28.5, -5.4), (35.5, 5.4)):
        ld.line(
            [p(sx, 12.5), p(sx + ex * 0.55, 11.2), p(sx + ex, 10.6)],
            fill=INK + (255,), width=max(1, int(1.9 * u)), joint="curve",
        )

    ld.ellipse([p(26, 11.5), p(38, 23.5)], fill=INK + (255,))          # head
    ld.ellipse([p(19.5, 24.5), p(44.5, 49.5)], fill=INK + (255,))      # body

    stripes = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(stripes)
    sd.rectangle([p(18, 30.6), p(46, 35.0)], fill=ACCENT + (255,))
    sd.rectangle([p(18, 39.2), p(46, 43.6)], fill=ACCENT + (255,))
    mask = Image.new("L", layer.size, 0)
    ImageDraw.Draw(mask).ellipse([p(19.5, 24.5), p(44.5, 49.5)], fill=255)
    layer.paste(stripes, (0, 0), Image.composite(stripes.split()[3], mask.point(lambda v: 0), mask))

    img.paste(layer, (int(x - size), int(y - size)), layer)  # (x, y) = mark top-left


def tracked(draw, xy, text, fnt, fill, tracking):
    """PIL has no letter-spacing; step the pen manually."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def gradient_text(text, fnt, xy, stops):
    """Paint text through a horizontal gradient (the accent-gradient-text rule)."""
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).text(xy, text, font=fnt, fill=255)
    bbox = mask.getbbox()
    grad = Image.new("RGB", (W, H), stops[0])
    gd = ImageDraw.Draw(grad)
    x0, x1 = bbox[0], bbox[2]
    for x in range(x0, x1 + 1):
        t = (x - x0) / max(1, x1 - x0)
        if t < 0.52:
            u, a, b = t / 0.52, stops[0], stops[1]
        else:
            u, a, b = (t - 0.52) / 0.48, stops[1], stops[2]
        gd.line(
            [(x, 0), (x, H)],
            fill=tuple(int(a[i] + (b[i] - a[i]) * u) for i in range(3)),
        )
    img.paste(grad, (0, 0), mask)


# --------------------------------------------------------------------- brand
bee(PAD_X, 68 * S, 66 * S)
f_brand = f(INTER, 34)
tracked(d, (PAD_X + 86 * S, 68 * S + 14 * S), "BEEHOSTER", f_brand, INK, 4.8 * S)

# ------------------------------------------------------------------ headline
f_h1 = f(SERIF, 104)
f_h1i = f(SERIF_IT, 104)
d.text((PAD_X, 196 * S), "Alle zenders.", font=f_h1, fill=INK)
gradient_text(
    "Nul gehaper.", f_h1i, (PAD_X, 296 * S), (ACCENT, ACCENT_HI, ACCENT_WARM)
)

d.rectangle([PAD_X, 434 * S, PAD_X + 76 * S, 436 * S], fill=(214, 120, 141))

f_stand = f(INTER, 25)
d.text(
    (PAD_X, 462 * S),
    "Live sport, films en series in 4K UHD — op je smart-tv,\nFirestick, telefoon of laptop.",
    font=f_stand,
    fill=MUTED,
    spacing=12 * S,
)

# --------------------------------------------------------------------- specs
f_num = f(SERIF, 40)
f_lab = f(INTER, 13)
x = PAD_X
for num, lab in (("80.000+", "ZENDERS"), ("200.000+", "FILMS & SERIES"), ("99,99%", "UPTIME")):
    d.text((x, 542 * S), num, font=f_num, fill=INK)
    end = tracked(d, (x, 588 * S), lab, f_lab, MUTED, 1.7 * S)
    x = max(x + 200 * S, end + 44 * S)

f_dom = f(INTER, 20)
dom = "beehoster.pro"
d.text((W - PAD_X - d.textlength(dom, font=f_dom), 556 * S), dom, font=f_dom, fill=ACCENT)

img.resize((1200, 630), Image.LANCZOS).save(OUT, "PNG", optimize=True)
print("wrote", OUT)
