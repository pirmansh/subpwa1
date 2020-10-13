const CACHE_NAME = "cache-v2";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/doc.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/nav.js",
    "/js/materialize.min.js",
    "/manifest.json",
    "/img/icons/android-icon-144x144.png",
    "/img/icons/android-icon-192x192.png",
    "/img/icons/android-icon-36x36.png",
    "/img/icons/android-icon-48x48.png",
    "/img/icons/android-icon-72x72.png",
    "/img/icons/android-icon-96x96.png",
    "/img/icons/apple-icon-114x114.png",
    "/img/icons/apple-icon-120x120.png",
    "/img/icons/apple-icon-152x152.png",
    "/img/icons/apple-icon-180x180.png",
    "/img/icons/apple-icon-76x76.png",
    "/img/icons/apple-icon-72x72.png",
    "/img/icons/apple-icon-60x60.png",
    "/img/icons/apple-icon-57x57.png",
    "/img/icons/favicon-16x16.png",
    "/img/icons/favicon-32x32.png",
    "/img/banner/skema-pwa.png",
    "/img/banner/loading.png",
    "/icon.png",
    "/img/banner/banner.svg",
    "/img/banner/pwa_doc.svg",
    "/img/banner/banner-footer.svg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});