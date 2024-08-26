const CACHE_VERSION = "2024-08-26 1:10 PM";

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/main.js",
          "/icon.png",
          "/manifest.json",
          "/sw.js",

          "/png/plank.png",
          "/png/power pose.png",
          "/png/rest.png",
          "/png/round.png",

          "/gif/squat.gif",
          "/gif/push-up.gif",
      ]);
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
