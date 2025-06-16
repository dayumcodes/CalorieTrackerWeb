// Service Worker for asset caching
const CACHE_NAME = 'app-cache-v1';

// List of assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/index.css',
  '/assets/index.js',
];

// Install event - pre-cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For non-HTML requests, use "stale-while-revalidate" strategy
  if (!event.request.url.includes('/api/') && !event.request.url.endsWith('.html')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update the cache
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If both cache and network fail, return a fallback
          if (event.request.url.endsWith('.png') || 
              event.request.url.endsWith('.jpg') || 
              event.request.url.endsWith('.jpeg')) {
            return new Response('', {
              headers: { 'Content-Type': 'image/png' },
            });
          }
        });

        // Return cached response immediately, update cache in background
        return cachedResponse || fetchPromise;
      })
    );
  }
  
  // For HTML and API requests, use "network-first" strategy
  else {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
}); 