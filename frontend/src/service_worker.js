window.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("timer-cache").then((cache) => {
      return cache.addAll(["/elapsed-time"]);
    })
  );
});

window.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
