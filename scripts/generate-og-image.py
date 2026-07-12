#!/usr/bin/env python3
"""Generate a branded 1200x630 OG image for social sharing."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# Brand colors
royal = (30, 58, 138)
teal = (13, 148, 136)
healing = (16, 185, 129)
white = (255, 255, 255)
soft_white = (250, 250, 252)

# Create gradient background
img = Image.new("RGB", (W, H), royal)
draw = ImageDraw.Draw(img)

for y in range(H):
    t = y / H
    if t < 0.5:
        r = int(royal[0] + (teal[0] - royal[0]) * (t * 2))
        g = int(royal[1] + (teal[1] - royal[1]) * (t * 2))
        b = int(royal[2] + (teal[2] - royal[2]) * (t * 2))
    else:
        t2 = (t - 0.5) * 2
        r = int(teal[0] + (healing[0] - teal[0]) * t2)
        g = int(teal[1] + (healing[1] - teal[1]) * t2)
        b = int(teal[2] + (healing[2] - teal[2]) * t2)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Font loading
font_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
]
font_regular_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
]

def load_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font_title = load_font(font_paths, 52)
font_sub = load_font(font_regular_paths, 28)
font_small = load_font(font_regular_paths, 22)
font_badge = load_font(font_paths, 20)

# Badge
bx, by = 80, 80
draw.rounded_rectangle([bx, by, bx + 260, by + 48], radius=24, outline=white, width=1)
draw.text((bx + 18, by + 12), "★ ★ ★ ★ ★  4.9", fill=white, font=font_badge)

# Title
ty = 180
draw.text((80, ty), "Dr. Samrudhhi A. Mane", fill=white, font=font_title)
draw.text((80, ty + 70), "Physiotherapist in Kopar Khairane", fill=soft_white, font=font_sub)
draw.text((80, ty + 110), "& Ghansoli, Navi Mumbai", fill=soft_white, font=font_sub)

# Tagline
draw.text((80, ty + 175), "Joint • Knee • Back • Neck Pain Expert", fill=(200, 230, 220), font=font_small)
draw.text((80, ty + 205), "Home Visit Physiotherapy Services", fill=(200, 230, 220), font=font_small)

# Pulse line
py = H - 100
pts = [(80, py), (200, py), (240, py-30), (280, py+20), (320, py-50), (360, py+10),
       (400, py), (520, py), (560, py-20), (600, py+15), (640, py-40), (680, py+5),
       (720, py), (840, py), (880, py-25), (920, py+10), (960, py), (1120, py)]
for i in range(len(pts) - 1):
    draw.line([pts[i], pts[i+1]], fill=white, width=3)

# Contact
draw.text((80, H - 60), "+91 97673 98194  •  Open 24x7  •  155+ Google Reviews", fill=soft_white, font=font_small)

out = "/home/z/my-project/public/og-image.png"
img.save(out, "PNG", optimize=True)
print(f"Saved {out} ({img.size})")
