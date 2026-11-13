'use strict';
// Relative URLs keep both GitHub project Pages and folder previews working.
const CACHE = 'island-days-shell-v1';
const SHELL = ['./', './index.html', './style.css', './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css', './activities.js', './app.js', './pwa.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/maskable-512.png'];
const ROOT = new URL('./', self.location.href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('island-days-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return;
  // Only cache this app's files; external photos, maps and official sites need a connection.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok && url.pathname === ROOT.pathname) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put('./', copy)));
      }
      return response;
    }).catch(() => caches.match('./')));
    return;
  }
  const asset = SHELL.find(file => new URL(file, ROOT).href === url.href);
  if (!asset) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)));
    }
    return response;
  }).catch(() => caches.match(request)));
});
