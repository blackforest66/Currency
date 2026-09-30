// Crew FX offline support: keeps the app itself on the phone so it opens with no signal.
// Exchange rates are not handled here; the page saves the latest rates in localStorage.
const CACHE = 'crewfx-v2';
const APP_SHELL = [
  './',
  'index.html',
  'manifest.webmanifest?v=7',
  'icons/icon.svg?v=7',
  'icons/favicon-32.png?v=7',
  'icons/apple-touch-icon.png?v=7',
  'icons/icon-192.png?v=7',
  'icons/icon-512.png?v=7',
  'icons/icon-maskable-512.png?v=7',
];
const NETWORK_TIMEOUT_MS = 3500;   // aircraft / hotel wifi can hang; fall back to the saved copy

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Only our own files; rate and location lookups go straight to the network.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // The page: newest version when online (so updates arrive), saved copy when offline.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await withTimeout(fetch(req), NETWORK_TIMEOUT_MS);
        if (fresh.ok) cache.put('./', fresh.clone());
        return fresh;
      } catch {
        return (await cache.match('./')) || (await cache.match('index.html')) || Response.error();
      }
    })());
    return;
  }

  // Icons and manifest: saved copy first, refreshed in the background.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req) || await cache.match(req, { ignoreSearch: true });
    const network = fetch(req).then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return cached || (await network) || Response.error();
  })());
});
