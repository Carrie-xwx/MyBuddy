// MyBuddy Service Worker — Network-first so users always get the latest
// code & data (deployed updates / daily data regeneration reach the browser
// immediately). Cache is only used as an OFFLINE fallback.
const CACHE_NAME = 'mybuddy-v10';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/data.js',
    './js/app.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-1024.png',
    './icons/apple-touch-icon.png'
];

// Install: just activate immediately (we don't pre-cache — network-first).
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Activate: purge any old caches so stale app.js / data.js never survive.
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.map(function(name) {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch: NETWORK-FIRST for every same-origin GET request.
// On success we refresh the cache (so offline still works). On failure we
// fall back to the cached response, and for HTML we fall back to index.html.
self.addEventListener('fetch', function(event) {
    if (event.request.method !== 'GET') return;

    var url = new URL(event.request.url);
    // Only handle same-origin requests; let cross-origin (APIs) pass through.
    if (url.origin !== location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Cache only successful, same-origin (basic) responses.
                if (response && response.status === 200 && response.type === 'basic') {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            })
            .catch(function() {
                return caches.match(event.request).then(function(cached) {
                    if (cached) return cached;
                    // Last-resort for navigation requests.
                    if (event.request.headers.get('accept') &&
                        event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./index.html');
                    }
                    return Response.error();
                });
            })
    );
});
