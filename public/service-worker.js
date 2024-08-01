/*const CACHE_NAME = 'offline-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/HomePage',
  '/addedrecepie',
  '/logincomponent',
  '/uicomponent',
  '/loginverification',
  '/recepiedetail',
  '/SignupComponent'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Fetching resource from cache:', event.request.url);
        return response;
      }
      console.log('[Service Worker] Fetching resource from network:', event.request.url);
      return fetch(event.request).catch(() => {
        console.error('[Service Worker] Fetch failed; returning offline page instead.');
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
*/
// public/service-worker.js

//best
/*self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open('offline-cache-v1').then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll([
        '/',
        '/HomePage',
        '/addedrecepie',
        '/logincomponent',
        '/uicomponent?category=din',
        '/manifest/manifest.json',
        '/manifest/logo2.png',
        '/manifest/sideimage.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Fetching resource from cache:', event.request.url);
        return response;
      }
      console.log('[Service Worker] Fetching resource from network:', event.request.url);
      return fetch(event.request).catch(() => {
        console.error('[Service Worker] Fetch failed; returning offline page instead.');
        return caches.match('/');
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'offline-cache-v1') {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open('offline-cache-v1').then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll([
        '/',
        '/HomePage',
        '/addedrecepie',
        '/logincomponent',
        '/uicomponent?category=din',
        '/manifest/manifest.json',
        '/manifest/logo2.png',
        '/manifest/sideimage.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Fetching resource from cache:', event.request.url);
        return response;
      }
      console.log('[Service Worker] Fetching resource from network:', event.request.url);
      return fetch(event.request).catch(() => {
        console.error('[Service Worker] Fetch failed; returning offline page instead.');
        return caches.match('/');
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'offline-cache-v1') {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



/*const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',
  '/HomePage',
  '/addedrecepie',
  '/logincomponent',
  'loginverification',
  '/uicomponent',
];

// Install event - caches specified URLs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('Failed to cache on install:', error);
    })
  );
});

// Fetch event - handles fetching from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        // Check if the request is in the cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          // Return the cached response if available
          return cachedResponse;
        }
        // Fetch from network if not in cache
        const networkResponse = await fetch(event.request);
        // Add non-GET requests to cache for future use
        if (event.request.method === 'GET') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        // Fallback to a cached fallback page or error page
        console.error('Fetch failed:', error);
        return caches.match('/');
      }
    })()
  );
});

// Activate event - clears old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).catch(error => {
      console.error('Failed to clean up old caches:', error);
    })
  );
});

*/