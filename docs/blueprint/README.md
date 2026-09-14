# The Digital Business Blueprint

Source for the lead-magnet PDF at `public/digital-business-blueprint.pdf`. Edit `blueprint.html`, then re-render:

```bash
cd docs/blueprint && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/../../public/digital-business-blueprint.pdf" --virtual-time-budget=8000 "file://$PWD/blueprint.html"
```

Fonts are embedded from `fonts/` so the render is identical offline. A4, 12 pages.
