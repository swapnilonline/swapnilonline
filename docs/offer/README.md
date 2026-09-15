# The Offer

Four-page PDF at `public/offer.pdf`, sent to people who qualify. Edit `offer.html`, then re-render:

```bash
cd docs/offer && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/../../public/offer.pdf" --virtual-time-budget=8000 "file://$PWD/offer.html"
```
