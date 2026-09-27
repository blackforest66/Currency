# Crew FX — currency calculator

Currency exchange calculator for Zina.

A one-page, phone-friendly currency calculator for cabin crew.

- The **local currency is set automatically** from her location: phone GPS first (asks permission once), falling back to the network location. It re-checks when the app is reopened, and a manual choice sticks until she is in a new country. Tap **Use my location** to re-check, or **Change currency** to search by country, currency name or code (e.g. "Japan", "yen", "JPY").
- **AED, KRW, CAD and USD** are always shown on the same page.
- Type an amount in **any** box and all the others convert instantly.
- **Built-in calculator**: tap any amount to open a keypad with **+ − × ÷** (e.g. add up several receipts: 45 + 12.50 + 8). Every currency updates live as she types, and the totals in the other currencies show above the keys.
- **Auto day/night**: light between sunrise and sunset where she is (from her last GPS fix, or 07:00–19:00 on the phone clock if location is off), dark at night. Tap the **Auto / Light / Dark** button in the top bar to force one.
- **Live rates** (free, no API key): `open.er-api.com`, with `fawazahmed0/currency-api` as a fallback. Auto-refreshes every 5 minutes and whenever the app is reopened.
- The last rates are saved on the phone, so it still works offline in flight (marked "Offline · using saved rates").

## Use it

It's a single file: `index.html`. Easiest way to put it on a phone:

1. On GitHub: **Settings → Pages → Deploy from a branch →** pick the branch and `/ (root)`.
2. Open the Pages URL on the phone, then **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android). It opens like an app.

To change the always-shown currencies, edit `FAVOURITES` near the top of the script in `index.html`.
