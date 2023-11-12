self.addEventListener('install', (event) => {
  // Execute ações necessárias na instalação do Service Worker
});

self.addEventListener('activate', (event) => {
  // Execute ações necessárias na ativação do Service Worker
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // A resposta em cache está aqui
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});
