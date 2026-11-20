import { readFile, stat } from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const manifest = JSON.parse(await readFile('dist/manifest.webmanifest', 'utf8'));
assert.equal(manifest.display, 'standalone');
assert.equal(manifest.name, '環遊世界 365 天');
assert.equal(manifest.scope, './');
assert.equal(manifest.start_url, './');
for (const icon of manifest.icons) assert.ok((await stat('dist/' + icon.src)).size);
const html = await readFile('dist/index.html', 'utf8');
for (const [, ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!ref.startsWith('https:')) assert.ok((await stat('dist/' + ref)).isFile(), ref);
}

for (const path of ['/https-island-days-tw-1113.workspace-926599.chatgpt.site-/', '/https-island-days-tw-1113.workspace-926599.chatgpt.site-/1113/island-days/dist/']) {
  const root = new URL(path, 'https://xhw0122-web.github.io');
  const listeners = {};
  const stores = new Map();
  let offline = false;
  let activatedOnInstall = false;
  const key = request => new URL(typeof request === 'string' ? request : request.url, root).href;
  const get = async request => {
    if (offline) throw new Error('Offline');
    const url = new URL(key(request));
    assert.ok(url.pathname.startsWith(root.pathname));
    const file = url.pathname.slice(root.pathname.length) || 'index.html';
    return new Response(await readFile('dist/' + file));
  };
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async addAll(files) { for (const file of files) store.set(key(file), await get(file)); },
        async put(request, response) { store.set(key(request), response); },
        async match(request) { return store.get(key(request))?.clone(); }
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); }
  };
  const self = {
    location: { href: new URL('sw.js', root).href },
    clients: { claim: async () => {} },
    skipWaiting: async () => { activatedOnInstall = true; },
    addEventListener: (name, handler) => { listeners[name] = handler; }
  };
  vm.runInNewContext(await readFile('dist/sw.js', 'utf8'), { URL, caches, fetch: get, self });

  let pending;
  const waitUntil = promise => { pending = promise; };
  listeners.install({ waitUntil });
  await pending;
  assert.equal(activatedOnInstall, true);
  await caches.open('unrelated-app');
  await caches.open('island-days-shell-obsolete');
  listeners.activate({ waitUntil });
  await pending;
  assert.ok(stores.has('unrelated-app'));
  assert.ok(!stores.has('island-days-shell-obsolete'));

  async function request(url, mode) {
    let response;
    listeners.fetch({
      request: { url: new URL(url, root).href, mode, method: 'GET' },
      respondWith: promise => { response = promise; },
      waitUntil
    });
    return response;
  }

  assert.match(await (await request('./?fresh=1', 'navigate')).text(), /環遊世界 365 天/);
  await pending;
  offline = true;
  assert.match(await (await request('./?offline=1', 'navigate')).text(), /環遊世界 365 天/);
  assert.match(await (await request('index.html', 'navigate')).text(), /環遊世界 365 天/);
  assert.match(await (await request('app.js?v=1', 'cors')).text(), /renderPlan/);
  assert.match(await (await request('travel-plan.js', 'cors')).text(), /從泰國走到越南/);
  assert.equal((await (await request('world-land.json', 'cors')).json()).type, 'MultiPolygon');
  assert.match(await (await request('vendor/leaflet/leaflet.js', 'cors')).text(), /Leaflet/);
  assert.equal(await request('https://www.boca.gov.tw/', 'cors'), undefined);
  assert.equal(await request('../other-app/app.js', 'cors'), undefined);
}
console.log('通過：PWA 識別、兩種 GitHub Pages 路徑、離線首頁／行程／地圖、快取換版與隔離。');
