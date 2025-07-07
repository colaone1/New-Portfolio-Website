// AI-OPTIMIZED: Service Worker for offline functionality and performance caching
// TROUBLESHOOTING: This service worker caches critical assets for offline access

const CACHE_NAME = 'portfolio-cache-v2'; // Increment version for cache busting
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
  '/js/theme.js',
  '/js/navigation.js',
  '/assets/icons/favicon.svg',
  '/assets/icons/apple-touch-icon.png',
  '/manifest.json',
  '/offline.html', // Ensure offline page is cached
];

// PERFORMANCE: Install event - cache critical assets immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        // AI-OPTIMIZED: Cache critical assets for offline functionality
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // PERFORMANCE: Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch(error => {
        // TROUBLESHOOTING: Log cache installation errors
        console.error('Service Worker cache installation failed:', error);
      })
  );
});

// PERFORMANCE: Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // AI-OPTIMIZED: Remove old cache versions
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // PERFORMANCE: Claim all clients immediately
        return self.clients.claim();
      })
      .catch(error => {
        // TROUBLESHOOTING: Log cache activation errors
        console.error('Service Worker activation failed:', error);
      })
  );
});

// PERFORMANCE: Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // AI-OPTIMIZED: Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // PERFORMANCE: Cache hit - return cached response
      if (response) {
        return response;
      }

      // AI-OPTIMIZED: Clone the request for network fetch
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
        // TROUBLESHOOTING: Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // AI-OPTIMIZED: Clone the response for caching
        const responseToCache = response.clone();

        // PERFORMANCE: Cache successful responses asynchronously
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        }).catch(error => {
          // TROUBLESHOOTING: Log cache storage errors
          console.warn('Failed to cache response:', error);
        });

        return response;
      }).catch(error => {
        // TROUBLESHOOTING: Log network fetch errors
        console.warn('Network fetch failed:', error);
        
        // AI-OPTIMIZED: Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

// AI-OPTIMIZED: Handle offline fallback for navigation requests
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // PERFORMANCE: Return offline page when network is unavailable
        return caches.match('/offline.html');
      })
    );
  }
});
