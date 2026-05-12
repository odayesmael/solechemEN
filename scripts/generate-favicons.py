#!/usr/bin/env python3
"""
Generate favicon variants from SVG using cairosvg
Install: pip install cairosvg
"""
import subprocess
import sys
from pathlib import Path

try:
    import cairosvg
except ImportError:
    print("cairosvg not installed. Trying with ImageMagick...")
    # Fallback to ImageMagick if cairosvg is not available
    use_magick = True
else:
    use_magick = False

public_dir = Path(__file__).parent.parent / "public"
svg_file = public_dir / "favicon.svg"

sizes = {
    "favicon-32x32.png": 32,
    "favicon-192x192.png": 192,
    "favicon-512x512.png": 512,
    "apple-touch-icon.png": 180,
    "favicon-maskable-192x192.png": 192,
    "favicon-maskable-512x512.png": 512,
}

print(f"📦 Generating favicon variants from {svg_file.name}...")

if not svg_file.exists():
    print(f"❌ Error: {svg_file} not found!")
    sys.exit(1)

for filename, size in sizes.items():
    output_file = public_dir / filename

    try:
        if use_magick:
            # Using ImageMagick
            cmd = [
                "convert",
                "-background", "none",
                "-density", "96",
                "-resize", f"{size}x{size}",
                f"{svg_file}",
                f"{output_file}"
            ]
            subprocess.run(cmd, check=True, capture_output=True)
        else:
            # Using cairosvg
            cairosvg.svg2png(
                url=str(svg_file),
                write_to=str(output_file),
                output_width=size,
                output_height=size
            )
        print(f"✓ {filename} ({size}x{size})")
    except Exception as e:
        print(f"⚠ Failed to generate {filename}: {e}")

print("✅ Favicon generation complete!")
print("\nManually add favicon.ico using:")
print("  pip install cairosvg && python scripts/generate-favicons.py")
print("  OR use an online converter: https://favicon-converter.com/")
