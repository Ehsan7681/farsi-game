const CACHE_NAME = 'word-farm-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // اگر فایل‌های تصویری محلی دارید، آدرس آن‌ها را اینجا اضافه کنید
  // '/sun.png',
  // '/scarecrow.png',
  // '/grassland.png',
  // '/sky.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // اگر فایل در کش پیدا شد، آن را برگردان
        if (response) {
          return response;
        }
        // در غیر این صورت، از شبکه درخواست کن
        return fetch(event.request);
      })
  );
});