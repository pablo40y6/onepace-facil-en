import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const scope = 'https://example.test/onepace-facil-en/';

function worker() {
  const handlers = new Map();
  const stores = new Map([
    ['onepace-facil-en-v1', new Map()],
    ['other-app', new Map()],
  ]);
  const network = { online: true, version: 'original' };
  let activated = false;
  let claimed = false;

  runInNewContext(source, {
    URL, Request, Response,
    self: {
      registration: { scope },
      addEventListener: (event, handler) => handlers.set(event, handler),
      skipWaiting: async () => { activated = true; },
      clients: { claim: async () => { claimed = true; } },
    },
    caches: {
      keys: async () => [...stores.keys()],
      delete: async key => stores.delete(key),
      open: async key => {
        if (!stores.has(key)) stores.set(key, new Map());
        const contents = stores.get(key);
        return {
          addAll: async requests => {
            for (const request of requests) contents.set(request.url, new Response(network.version));
          },
          match: async url => contents.get(url)?.clone(),
          put: async (url, response) => contents.set(url, response),
        };
      },
    },
    fetch: async () => {
      if (!network.online) throw new Error('Offline');
      return new Response(network.version);
    },
  });

  function dispatch(type, request) {
    let result;
    const respond = promise => { result = promise; };
    handlers.get(type)({ request, waitUntil: respond, respondWith: respond });
    return result;
  }

  return { network, stores, dispatch, activation: () => ({ activated, claimed }) };
}

test('install and activation keep the app shell and remove only older One Pace caches', async () => {
  const app = worker();
  await app.dispatch('install');
  await app.dispatch('activate');

  assert.equal(app.stores.has('onepace-facil-en-v1'), false);
  assert.equal(app.stores.has('other-app'), true);
  assert.deepEqual(app.activation(), { activated: true, claimed: true });

  app.network.online = false;
  const home = await app.dispatch('fetch', { method: 'GET', url: scope, mode: 'navigate' });
  assert.equal(await home.text(), 'original');
  const catalogue = await app.dispatch('fetch', new Request(scope + 'catalog.js'));
  assert.equal(await catalogue.text(), 'original');
});

test('network takes priority when online and third-party and unrelated requests bypass the cache', async () => {
  const app = worker();
  await app.dispatch('install');
  app.network.version = 'updated';
  const shell = { method: 'GET', url: scope, mode: 'navigate' };
  const online = await app.dispatch('fetch', shell);
  assert.equal(await online.text(), 'updated');

  app.network.online = false;
  const offline = await app.dispatch('fetch', shell);
  assert.equal(await offline.text(), 'updated');
  assert.equal(app.dispatch('fetch', new Request('https://pixeldrain.net/l/LC22RWvq')), undefined);
  assert.equal(app.dispatch('fetch', new Request('https://example.test/another-app/app.js')), undefined);
});
