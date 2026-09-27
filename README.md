# Crew FX — currency calculator

A one-page, phone-friendly currency calculator for cabin crew.

- Pick the **local currency** of wherever you've landed (dropdown or one-tap chips).
- **AED, KRW, CAD and USD** are always shown on the same page.
- Type an amount in **any** box and all the others convert instantly.
- **Live rates** (free, no API key): `open.er-api.com`, with `fawazahmed0/currency-api` as a fallback. Auto-refreshes every 5 minutes and whenever the app is reopened.
- The last rates are saved on the phone, so it still works offline in flight (marked "Offline · using saved rates").

## Use it

It's a single file: `index.html`. Easiest way to put it on a phone:

1. On GitHub: **Settings → Pages → Deploy from a branch →** pick the branch and `/ (root)`.
2. Open the Pages URL on the phone, then **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android). It opens like an app.

To change the always-shown currencies, edit `FAVOURITES` near the top of the script in `index.html`.
