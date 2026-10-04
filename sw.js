const CORE='chunk-loop-core-v2',AUDIO='chunk-loop-audio-v2';
const core=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg','./data/lessons.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CORE).then(c=>c.addAll(core)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(xs=>Promise.all(xs.filter(x=>x.startsWith('chunk-loop-')&&!['chunk-loop-core-v2','chunk-loop-audio-v2'].includes(x)).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(async cached=>{if(cached)return cached;const response=await fetch(e.request);if(e.request.url.includes('/audio/')&&response.ok){const c=await caches.open(AUDIO);c.put(e.request,response.clone())}return response})));
