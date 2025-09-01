// sw.js — basic offline caching for CSS/JS/images
const CACHE = "codequest-v1";
// Compute site base (folder that contains index.html). sw.js is at <BASE>/js/sw.js
const BASE = new URL(".", self.location).pathname.replace(/\/js\/?$/, "");
const ASSETS = [
  `${BASE}/index.html`,
  `${BASE}/about.html`,
  `${BASE}/contact.html`,
  `${BASE}/404.html`,
  `${BASE}/css/main.css`,
  `${BASE}/css/planets.css`,
  `${BASE}/css/404.css`,
  `${BASE}/js/galaxy.js`,
  `${BASE}/js/planetEngine.js`,
  `${BASE}/manifest.json`,
  `${BASE}/assets/icons/rocket.svg`,
  `${BASE}/planets/html-basics.html`,
  `${BASE}/planets/html-forms.html`,
  `${BASE}/planets/css-selectors.html`,
  `${BASE}/planets/css-flexgrid.html`,
  `${BASE}/planets/js-variables.html`,
  `${BASE}/planets/js-dom.html`,
  `${BASE}/planets/js-events.html`,
  `${BASE}/planets/mission-control.html`,
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  e.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches
            .open(CACHE)
            .then((cache) => cache.put(request, copy))
            .catch(() => {});
          return resp;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
