'use strict';

const CACHE = 'island-days-shell-v5';
const SHELL = [
  './', './index.html', './style.css', './app.js', './travel-plan.js', './world-land.json',
  './pwa.js', './manifest.webmanifest', './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/maskable-512.png'
];
const root = new URL('./', self.location.href);
const assets = new Map(SHELL.map(file => {
  const url = new URL(file, root);
  return [url.pathname, url.href];
}));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith('island-days-shell-') && key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== root.origin || !assets.has(url.pathname)) return;
  const cacheKey = request.mode === 'navigate' ? root.href : assets.get(url.pathname);
  event.respondWith(fetch(request).then(response => {
    if (!response.ok) return response;
    const copy = response.clone();
    event.waitUntil(caches.open(CACHE).then(cache => cache.put(cacheKey, copy)).catch(() => {}));
    return response;
  }).catch(() => caches.open(CACHE).then(cache => cache.match(cacheKey))));
});
