const CACHE_NAME = "minha-lista-v1";

const FILES_TO_CACHE = [
	"/",
	"/index.html",
	"/index.js",
	"/estilo.css"
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