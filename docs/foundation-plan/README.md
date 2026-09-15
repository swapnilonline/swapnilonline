# The 7-Day Digital Business Foundation · Plan

Eight-page fillable workbook at `public/foundation-7-day-plan.pdf`, sent to each Foundation client on day 0. Edit `foundation-7-day-plan.html` (the day content is a Python list at the top of the generator in git history, or edit the HTML directly), then re-render:

```bash
cd docs/foundation-plan && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/../../public/foundation-7-day-plan.pdf" --virtual-time-budget=8000 "file://$PWD/foundation-7-day-plan.html"
```
