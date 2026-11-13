import {readFile, stat} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const manifest = JSON.parse(await readFile('dist/manifest.webmanifest', 'utf8'));
assert.equal(manifest.display, 'standalone');
assert.equal(manifest.scope, './');
assert.equal(manifest.start_url, './');
for (const icon of manifest.icons) assert.ok((await stat('dist/' + icon.src)).size);
const html = await readFile('dist/index.html', 'utf8');
for (const [, reference] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!reference.startsWith('https:')) assert.ok((await stat('dist/' + reference)).isFile(), reference);
}

// Exercise installation and offline navigation at the actual project subpath,
// plus the nested folder used by branch-based Pages.
for (const path of ['/https-island-days-tw-1113.workspace-926599.chatgpt.site-/', '/https-island-days-tw-1113.workspace-926599.chatgpt.site-/1113/island-days/dist/']) {
  const root = new URL(path, 'https://xhw0122-web.github.io');
  const listeners = {};
  const stores = new Map();
  let offline = false;
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
        async put(request, response) { store.set(key(request), response); }
      };
    },
    async match(request) {
      for (const store of stores.values()) if (store.has(key(request))) return store.get(key(request)).clone();
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); }
  };
  const context = vm.createContext({URL, caches, fetch:get, self:{location:{href:new URL('sw.js',root).href}, clients:{claim:async()=>{}}, addEventListener:(name, handler)=>{listeners[name]=handler;}}});
  vm.runInContext(await readFile('dist/sw.js','utf8'), context);
  let pending;
  listeners.install({waitUntil:promise=>{pending=promise;}});
  await pending;
  await caches.open('unrelated-app');
  await caches.open('island-days-shell-obsolete');
  listeners.activate({waitUntil:promise=>{pending=promise;}});
  await pending;
  assert.ok(stores.has('unrelated-app'), 'Other apps must retain their caches');
  assert.ok(!stores.has('island-days-shell-obsolete'));
  offline = true;
  async function request(url, mode) {
    let response;
    listeners.fetch({request:{url,mode,method:'GET'},respondWith:promise=>{response=promise;},waitUntil:()=>{}});
    return response;
  }
  assert.match(await (await request(root.href, 'navigate')).text(), /島日子/);
  assert.match(await (await request(new URL('app.js', root).href, 'cors')).text(), /function render/);
  assert.match(await (await request(new URL('vendor/leaflet/leaflet.js', root).href, 'cors')).text(), /Leaflet/);
  assert.equal(await request('https://images.unsplash.com/photo-test', 'cors'), undefined);
  assert.equal(await request(new URL('../other-app/app.js', root).href, 'cors'), undefined);
}
console.log('通過：手機安裝設定、所有首頁資源、兩種專案子路徑、離線首頁／程式／地圖程式快取與快取隔離。');
