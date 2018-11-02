// Cria o nome do Cache no navegador com o nome da aplicação
var CACHE_NAME = 'Peacy App';

// Verifica se o aplicativo esta esta instalado e renova o Cache
self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// Registra se o Service Worker esta instalado no navegador e criar o Cache da aplicação no Navegador
self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
        files.map(function(file){
          return cache.add(file);
        })
      );
    })
  );
});


// Caso exista qualquer atualização em qualquer arquivo online, o service Worker faz uma requisição para o servidor e verifica se existe uma atualização
self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});