const CACHE_NAME = "minhas-compras-v2";

const FILES_TO_CACHE = [
	"/",
	"/index.html",
	"/estilo.css",
	"/index.js"
	
];

self.addEventListener("install", (event) => {
	event.waitUntill(

		caches.open(CAHE_NAME)
		.then((cahe) => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
	
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request)
		.then((response) => {
			return response || fetch(event.request);
		})
	);
});