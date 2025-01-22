
// Define the cache name and files to cache
const CACHE_NAME = 'semester-average-app-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/static/media/logo.svg', // Add other assets if needed
];

// Install the service worker and cache essential files
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate the service worker and remove outdated caches
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          // Ensure that we're deleting only outdated caches
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Return the promise from delete
          }
        })
      );
    })
  );
});

// Serve assets from the cache if available, otherwise fetch from the network
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
