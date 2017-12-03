let version = '0.1.2';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/music-page.html?timestamp=${timeStamp}`,
        `/music-selection.html?timestamp=${timeStamp}`,
        `/styles/webfonts/***timestamp=${timeStamp}`,
        `/styles/main.css?timestamp=${timeStamp}`,
        `/scripts/main.js?timestamp=${timeStamp}`,
        `/sounds/demo.mp3?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
