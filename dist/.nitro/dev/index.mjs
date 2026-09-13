import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import destr from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, getHeader, appendResponseHeader, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, createError as createError$1, getRouterParam, readBody, getQuery as getQuery$1 } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/node-mock-http@1.0.5/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/unstorage@1.17.5_@netlify+blobs@9.1.2_db0@0.3.2_@libsql+client@0.15.4_better-sqlite3@11_15b74207e1fcb7bb18df9c9d4bcf7d72/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/unstorage@1.17.5_@netlify+blobs@9.1.2_db0@0.3.2_@libsql+client@0.15.4_better-sqlite3@11_15b74207e1fcb7bb18df9c9d4bcf7d72/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import { defuFn } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import defu from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import consola, { createConsola } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/youch@4.1.1/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import process$1 from 'node:process';
import { createError, defineEventHandler as defineEventHandler$1, getRequestURL as getRequestURL$1, getHeader as getHeader$1, readBody as readBody$1, getQuery as getQuery$2, createEventStream, sendRedirect as sendRedirect$1 } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { jwtVerify, SignJWT } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/jose@6.0.11/node_modules/jose/dist/webapi/index.js';
import { Server } from 'node:http';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { tool, generateText, stepCountIs, streamText } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/ai@7.0.97_zod@3.25.76/node_modules/ai/dist/index.js';
import { createAnthropic } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/@ai-sdk+anthropic@4.0.52_zod@3.25.76/node_modules/@ai-sdk/anthropic/dist/index.js';
import { createOpenAICompatible } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/@ai-sdk+openai-compatible@3.0.47_zod@3.25.76/node_modules/@ai-sdk/openai-compatible/dist/index.js';
import { StreamableHTTPServerTransport } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/@modelcontextprotocol+sdk@1.11.1/node_modules/@modelcontextprotocol/sdk/dist/esm/server/streamableHttp.js';
import z$1, { z } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js';
import { McpServer } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/@modelcontextprotocol+sdk@1.11.1/node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js';
import { $fetch as $fetch$1 } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { XMLParser } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/fast-xml-parser@5.2.2/node_modules/fast-xml-parser/src/fxp.js';
import * as cheerio from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/cheerio@1.0.0/node_modules/cheerio/dist/esm/index.js';
import { load } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/cheerio@1.0.0/node_modules/cheerio/dist/esm/index.js';
import _md5 from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/md5@2.3.0/node_modules/md5/md5.js';
import { subtle as subtle$1 } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/uncrypto@0.1.3/node_modules/uncrypto/dist/crypto.node.mjs';
import { Buffer as Buffer$1 } from 'node:buffer';
import iconv from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/iconv-lite@0.6.3/node_modules/iconv-lite/lib/index.js';
import { createDatabase } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/db0@0.3.2_@libsql+client@0.15.4_better-sqlite3@11.10.0_mysql2@3.14.3/node_modules/db0/dist/index.mjs';
import { neon } from 'file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/@neondatabase+serverless@1.1.0/node_modules/@neondatabase/serverless/index.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/mahaoxuan/Desktop/newsnow-yi/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mahaoxuan/Desktop/newsnow-yi"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mahaoxuan/Desktop/newsnow-yi/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mahaoxuan/Desktop/newsnow-yi/dist/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mahaoxuan/Desktop/newsnow-yi/dist/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/mahaoxuan/Desktop/newsnow-yi/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {
      "/**/*.html": {
        "headers": {
          "cache-control": "no-cache, no-store, must-revalidate"
        }
      },
      "/**": {
        "isr": 3600,
        "proxy": {
          "to": "/api/**",
          "_proxyStripBase": ""
        }
      },
      "/assets/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
const goHeader = "x-nitro-go";
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    const goAhead = !!routeRules.headers?.[goHeader] || getHeader(event, goHeader);
    if (!goAhead) {
      if (routeRules.redirect) {
        let target = routeRules.redirect.to;
        if (target.endsWith("/**")) {
          let targetPath = event.path;
          const strpBase = routeRules.redirect._redirectStripBase;
          if (strpBase) {
            targetPath = withoutBase(targetPath, strpBase);
          }
          target = joinURL(target.slice(0, -3), targetPath);
        } else if (event.path.includes("?")) {
          const query = getQuery(event.path);
          target = withQuery(target, query);
        }
        appendResponseHeader(event, goHeader, "true");
        return sendRedirect(event, target, routeRules.redirect.statusCode);
      }
      if (routeRules.proxy) {
        let target = routeRules.proxy.to;
        if (target.endsWith("/**")) {
          let targetPath = event.path;
          const strpBase = routeRules.proxy._proxyStripBase;
          if (strpBase) {
            targetPath = withoutBase(targetPath, strpBase);
          }
          target = joinURL(target.slice(0, -3), targetPath);
        } else if (event.path.includes("?")) {
          const query = getQuery(event.path);
          target = withQuery(target, query);
        }
        return proxyRequest(event, target, {
          fetch: ctx.localFetch,
          headers: {
            [goHeader]: "true",
            ...routeRules.proxy.headers
          },
          ...routeRules.proxy
        });
      }
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

const logger = createConsola({
  level: 4,
  formatOptions: {
    columns: 80,
    colors: true,
    compact: false,
    date: true
  }
});

function neonHttpConnector(opts) {
  const sql = neon(opts.url);
  const normalize = (text, params) => {
    let i = 0;
    return { text: text.replace(/\?/g, () => `$${++i}`), params };
  };
  const query = async (text, params = []) => {
    const { text: normalized, params: values } = normalize(text, params);
    return await sql.query(normalized, values);
  };
  const makeStatement = (text, bound = []) => ({
    all: (...params) => query(text, params.length ? params : bound),
    get: async (...params) => (await query(text, params.length ? params : bound))[0],
    run: async (...params) => ({ success: true, rows: await query(text, params.length ? params : bound) })
  });
  return {
    name: "neon-http",
    dialect: "postgresql",
    getInstance: () => sql,
    exec: (text) => query(text),
    prepare: (text) => ({
      ...makeStatement(text),
      bind: (...params) => makeStatement(text, params)
    })
  };
}

let instance;
let pending;
async function getDatabase() {
  if (instance) return instance;
  if (pending) return pending;
  pending = (async () => {
    const url = process$1.env.DATABASE_URL;
    if (url) {
      instance = createDatabase(neonHttpConnector({ url }));
      return instance;
    }
    const { default: nodeSqlite } = await import('file:///Users/mahaoxuan/Desktop/newsnow-yi/node_modules/.pnpm/db0@0.3.2_@libsql+client@0.15.4_better-sqlite3@11.10.0_mysql2@3.14.3/node_modules/db0/dist/connectors/node-sqlite.mjs');
    instance = createDatabase(nodeSqlite({ name: ".data/db.sqlite3" }));
    return instance;
  })();
  return pending;
}

var version = "0.0.40";
const packageJSON = {
	version: version};

const TTL = 30 * 60 * 1e3;
const Version = packageJSON.version;

const Brand = {
  /** 站点名：浏览器标题、PWA、Agent 自我介绍 */
  name: "\u95FB\u89C1"};

const FALLBACK_PROVIDERS = {
  minimax: {
    baseUrl: "https://api.minimaxi.com/anthropic",
    model: "MiniMax-M3",
    protocol: "anthropic"
  },
  deepseek: {
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-v4-pro",
    protocol: "openai"
  },
  agnes: {
    baseUrl: "https://apihub.agnes-ai.com/v1",
    model: "agnes-2.0-flash",
    protocol: "openai",
    // Agnes free-tier key (公测期 $0). Override via NEWSNOW_LLM_FALLBACK_AGNES.
    defaultKey: "sk-g8xSqyMHEcOVtaKA3MqUFWZKApt6LNOA1JQwT8CBabi1iaRm"
  }
};
function detectProtocol(url) {
  if (url.includes("anthropic") || url.includes("minimaxi")) return "anthropic";
  return "openai";
}
function normalizeUrl(url) {
  if (!url) return "https://api.openai.com/v1";
  const trimmed = url.replace(/\/+$/, "");
  if (detectProtocol(trimmed) === "anthropic") return trimmed;
  if (!trimmed.endsWith("/v1")) return `${trimmed}/v1`;
  return trimmed;
}
function getLLMProviders() {
  const providers = [];
  const primaryKey = process$1.env.NEWSNOW_LLM_API_KEY;
  if (primaryKey) {
    providers.push({
      name: "primary",
      apiKey: primaryKey,
      baseUrl: normalizeUrl(process$1.env.NEWSNOW_LLM_API_URL || ""),
      model: process$1.env.NEWSNOW_LLM_MODEL || "gpt-4o-mini",
      protocol: detectProtocol(process$1.env.NEWSNOW_LLM_API_URL || "https://api.openai.com/v1")
    });
  }
  if (process$1.env.NEWSNOW_LLM_FALLBACK_MINIMAX) {
    providers.push({
      name: "minimax",
      apiKey: process$1.env.NEWSNOW_LLM_FALLBACK_MINIMAX,
      ...FALLBACK_PROVIDERS.minimax
    });
  }
  if (process$1.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK) {
    providers.push({
      name: "deepseek",
      apiKey: process$1.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK,
      ...FALLBACK_PROVIDERS.deepseek
    });
  }
  providers.push({
    name: "agnes",
    apiKey: process$1.env.NEWSNOW_LLM_FALLBACK_AGNES || FALLBACK_PROVIDERS.agnes.defaultKey,
    ...FALLBACK_PROVIDERS.agnes
  });
  return providers;
}
function anthropicMessagesBaseUrl(url) {
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}
const SEMAFORM_HEADINGS = ["\u4E8B\u5B9E", "\u5404\u6E90\u53E3\u5F84", "\u5DEE\u5F02"];
const COMPARE_SYSTEM_RULE = `\u672C\u6B21\u662F\u5BF9\u6BD4\u5206\u6790\u3002\u5148\u7528\u4E00\u53E5\u8BDD\u7ED3\u8BBA\uFF0C\u518D\u6309\u4E09\u4E2A\u6807\u9898\u8F93\u51FA\uFF08\u6BCF\u4E2A\u6807\u9898\u5355\u72EC\u6210\u884C\uFF0C\u53EF\u7528 ##\uFF09\uFF1A

\u4E8B\u5B9E
\u5404\u6E90\u53E3\u5F84
\u5DEE\u5F02

\u4E8B\u5B9E\uFF1A\u53EA\u5199\u5404\u65B9\u90FD\u627F\u8BA4\u6216\u53EF\u6838\u5BF9\u7684\u5185\u5BB9\u3002
\u5404\u6E90\u53E3\u5F84\uFF1A\u6309\u6765\u6E90\u5206\u70B9\uFF0C\u5199\u5404\u81EA\u5F3A\u8C03\u4EC0\u4E48\u3001\u56DE\u907F\u4EC0\u4E48\u3002
\u5DEE\u5F02\uFF1A\u6570\u5B57\u3001\u65F6\u95F4\u7EBF\u3001\u56E0\u679C\u4E0A\u7684\u77DB\u76FE\u6216\u7F3A\u53E3\u3002\u4FE1\u606F\u4E0D\u8DB3\u5199\u300C\u672A\u63D0\u53CA\u300D\uFF0C\u4E0D\u8981\u7F16\uFF0C\u4E0D\u8981\u8868\u683C\u3002`;
function hasSemaformSections(text) {
  if (!text) return false;
  return SEMAFORM_HEADINGS.every((heading) => hasSemaformHeading(text, heading));
}
function hasSemaformHeading(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\n)\\s*#{0,3}\\s*${escaped}\\s*$`, "m").test(text);
}
function shouldForceNewsTool(message) {
  return /今天|最近|现在|搜|热点|大事|有什么|跟进|再挖|递归|盯|细节|后续|再看|具体看|再查/.test(message);
}
function mockAgentReply(message, context, degradedReason = "\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u578B") {
  const titleHint = (context == null ? void 0 : context.title) ? `\u5173\u4E8E"${context.title}"` : "";
  return {
    reply: `[mock] \u6536\u5230\u4F60\u7684\u6D88\u606F${titleHint}\uFF1A"${message.slice(0, 50)}${message.length > 50 ? "..." : ""}"\u3002\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u578B\uFF0C\u8FD9\u6761\u662F\u672C\u5730\u5360\u4F4D\u56DE\u590D\u3002\u914D\u7F6E NEWSNOW_LLM_API_KEY \u6216 NEWSNOW_LLM_FALLBACK_MINIMAX \u540E\u542F\u7528\u771F\u5B9E\u56DE\u7B54\u3002`,
    model: "mock",
    mock: true,
    degradedReason,
    steps: []
  };
}
const HISTORY_LIMIT = 40;
const HISTORY_CONTENT_LIMIT = 4e3;
const PROMPT_HISTORY_LIMIT = 8;
const PROMPT_TURN_LIMIT = 1500;
function trimHistoryForPrompt(history, limit = PROMPT_HISTORY_LIMIT) {
  if (!Array.isArray(history)) return [];
  return history.filter((turn) => !!turn && typeof turn === "object" && (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string").filter((turn) => turn.mock !== true && !turn.content.startsWith("[mock]")).slice(-limit).map((turn) => ({
    role: turn.role,
    content: turn.content.slice(0, PROMPT_TURN_LIMIT)
  }));
}
function trimAgentHistory(messages, limit = HISTORY_LIMIT) {
  if (!Array.isArray(messages)) return [];
  return messages.filter((m) => !!m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-limit).map((m) => {
    var _a, _b, _c, _d;
    return {
      role: m.role,
      content: m.content.slice(0, HISTORY_CONTENT_LIMIT),
      timestamp: typeof m.timestamp === "number" ? m.timestamp : Date.now(),
      ...((_a = m.context) == null ? void 0 : _a.title) || ((_b = m.context) == null ? void 0 : _b.url) ? { context: { title: (_c = m.context) == null ? void 0 : _c.title, url: (_d = m.context) == null ? void 0 : _d.url } } : {},
      ...m.role === "assistant" ? {
        ...m.mock ? { mock: true } : {},
        ...Array.isArray(m.steps) && m.steps.length ? { steps: m.steps } : {},
        ...m.provider ? { provider: m.provider } : {},
        ...m.model ? { model: m.model } : {}
      } : {}
    };
  });
}

const CJK_RUN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/g;
const LATIN_WORD = /[a-z0-9][a-z0-9+.#-]*/g;
function tokenizeQuery(query) {
  var _a, _b;
  const terms = /* @__PURE__ */ new Set();
  const lower = query.toLowerCase();
  for (const word of (_a = lower.match(LATIN_WORD)) != null ? _a : []) {
    if (word.length >= 2) terms.add(word);
  }
  for (const run of (_b = lower.match(CJK_RUN)) != null ? _b : []) {
    if (run.length === 1) {
      terms.add(run);
      continue;
    }
    for (let i = 0; i < run.length - 1; i++) terms.add(run.slice(i, i + 2));
  }
  return [...terms];
}
function scoreText(text, terms, weight = 1) {
  if (!text || terms.length === 0) return 0;
  const haystack = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    let index = haystack.indexOf(term);
    while (index !== -1) {
      score += weight;
      index = haystack.indexOf(term, index + term.length);
    }
  }
  return score;
}
function searchNewsItems(items, query, limit = 10) {
  var _a;
  const terms = tokenizeQuery(query);
  if (terms.length === 0) return [];
  const seen = /* @__PURE__ */ new Set();
  const scored = [];
  for (const item of items) {
    const key = `${item.title}|${item.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const score = scoreText(item.title, terms, 3) + scoreText((_a = item.text) != null ? _a : "", terms, 1);
    if (score > 0) scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
function newsSearchQuery(message) {
  let q = message.trim().replace(/[？?！!]+$/g, "");
  q = q.replace(/^(今天|最近|现在)?(有什么|有哪些)?/u, "");
  q = q.replace(/(相关的新闻|相关新闻|的新闻|新闻)$/u, "");
  q = q.replace(/帮我|搜一下|搜搜|请/g, " ").replace(/\s+/g, " ").trim();
  if (q.length < 2) return null;
  if (/递归|更详细|继续|换个角度|换关键词|细节|后续|具体看|什么意思|啥意思/.test(q) && !/[A-Z0-9]/i.test(q)) return null;
  return q;
}
function resolveNewsSearchQuery(message, history) {
  const own = newsSearchQuery(message);
  if (own) return own;
  if (!(history == null ? void 0 : history.length)) return null;
  for (let i = history.length - 1; i >= 0; i--) {
    const turn = history[i];
    if (turn.role !== "user") continue;
    const query = newsSearchQuery(turn.content);
    if (query) return query;
  }
  return null;
}

var v2ex$2 = {
	redirect: "v2ex-share",
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
};
var zhihu$2 = {
	name: "知乎",
	type: "hottest",
	column: "china",
	home: "https://www.zhihu.com",
	color: "blue",
	interval: 600000
};
var weibo$2 = {
	title: "实时热搜",
	name: "微博",
	type: "hottest",
	column: "china",
	home: "https://weibo.com",
	color: "red",
	interval: 120000
};
var zaobao$2 = {
	name: "联合早报",
	type: "realtime",
	desc: "来自第三方网站: 早晨报",
	column: "world",
	home: "https://www.zaobao.com",
	color: "red",
	interval: 1800000
};
var coolapk = {
	title: "今日最热",
	name: "酷安",
	type: "hottest",
	column: "tech",
	home: "https://coolapk.com",
	color: "green",
	interval: 600000
};
var mktnews$2 = {
	redirect: "mktnews-flash",
	name: "MKTNews",
	column: "finance",
	home: "https://mktnews.net",
	color: "indigo",
	interval: 120000,
	title: "快讯"
};
var wallstreetcn$2 = {
	redirect: "wallstreetcn-quick",
	name: "华尔街见闻",
	type: "realtime",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 300000,
	title: "快讯"
};
var douyin$2 = {
	name: "抖音",
	type: "hottest",
	column: "china",
	home: "https://www.douyin.com",
	color: "gray",
	interval: 600000
};
var hupu$2 = {
	title: "主干道热帖",
	name: "虎扑",
	type: "hottest",
	column: "china",
	home: "https://hupu.com",
	color: "red",
	interval: 600000
};
var tieba$2 = {
	title: "热议",
	name: "百度贴吧",
	type: "hottest",
	column: "china",
	home: "https://tieba.baidu.com",
	color: "blue",
	interval: 600000
};
var toutiao$2 = {
	name: "今日头条",
	type: "hottest",
	column: "china",
	home: "https://www.toutiao.com",
	color: "red",
	interval: 600000
};
var ithome$2 = {
	name: "IT之家",
	type: "realtime",
	column: "tech",
	home: "https://www.ithome.com",
	color: "red",
	interval: 600000
};
var thepaper$2 = {
	title: "热榜",
	name: "澎湃新闻",
	type: "hottest",
	column: "china",
	home: "https://www.thepaper.cn",
	color: "gray",
	interval: 1800000
};
var sputniknewscn$2 = {
	name: "卫星通讯社",
	column: "world",
	home: "https://sputniknews.cn",
	color: "orange",
	interval: 600000
};
var cankaoxiaoxi$2 = {
	name: "参考消息",
	column: "world",
	home: "https://china.cankaoxiaoxi.com",
	color: "red",
	interval: 1800000
};
var pcbeta$2 = {
	redirect: "pcbeta-windows11",
	name: "远景论坛",
	type: "realtime",
	column: "tech",
	home: "https://bbs.pcbeta.com",
	color: "blue",
	interval: 300000,
	title: "Win11"
};
var cls = {
	redirect: "cls-telegraph",
	name: "财联社",
	type: "realtime",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 300000,
	title: "电报"
};
var xueqiu$2 = {
	redirect: "xueqiu-hotstock",
	name: "雪球",
	type: "hottest",
	column: "finance",
	home: "https://xueqiu.com",
	color: "blue",
	interval: 120000,
	title: "热门股票"
};
var gelonghui$2 = {
	title: "事件",
	name: "格隆汇",
	type: "realtime",
	column: "finance",
	home: "https://www.gelonghui.com",
	color: "blue",
	interval: 120000
};
var fastbull$2 = {
	redirect: "fastbull-express",
	name: "法布财经",
	type: "realtime",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 120000,
	title: "快讯"
};
var solidot$2 = {
	name: "Solidot",
	column: "tech",
	home: "https://solidot.org",
	color: "teal",
	interval: 3600000
};
var hackernews$2 = {
	name: "Hacker News",
	type: "hottest",
	column: "tech",
	home: "https://news.ycombinator.com/",
	color: "orange",
	interval: 600000
};
var producthunt$2 = {
	name: "Product Hunt",
	type: "hottest",
	column: "tech",
	home: "https://www.producthunt.com/",
	color: "red",
	interval: 600000
};
var qbitai$2 = {
	name: "量子位",
	column: "ai",
	home: "https://www.qbitai.com",
	color: "purple",
	interval: 1800000
};
var github$4 = {
	redirect: "github-trending-today",
	name: "Github",
	type: "hottest",
	column: "tech",
	home: "https://github.com/",
	color: "gray",
	interval: 600000,
	title: "Today"
};
var bilibili$2 = {
	redirect: "bilibili-hot-search",
	name: "哔哩哔哩",
	type: "hottest",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热搜"
};
var kuaishou$2 = {
	name: "快手",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.kuaishou.com",
	color: "orange",
	interval: 600000
};
var latepost$2 = {
	name: "晚点LatePost",
	column: "china",
	home: "https://www.latepost.com",
	color: "indigo",
	interval: 3600000
};
var kaopu$2 = {
	name: "靠谱新闻",
	desc: "不一定靠谱，多看多思考",
	column: "world",
	home: "https://kaopu.news/",
	color: "gray",
	interval: 1800000
};
var jin10$2 = {
	name: "金十数据",
	type: "realtime",
	column: "finance",
	home: "https://www.jin10.com",
	color: "blue",
	interval: 600000
};
var baidu$2 = {
	name: "百度热搜",
	type: "hottest",
	column: "china",
	home: "https://www.baidu.com",
	color: "blue",
	interval: 600000
};
var nowcoder$2 = {
	name: "牛客",
	type: "hottest",
	column: "china",
	home: "https://www.nowcoder.com",
	color: "blue",
	interval: 600000
};
var sspai$2 = {
	name: "少数派",
	type: "hottest",
	column: "tech",
	home: "https://sspai.com",
	color: "red",
	interval: 600000
};
var juejin$2 = {
	name: "稀土掘金",
	type: "hottest",
	column: "tech",
	home: "https://juejin.cn",
	color: "blue",
	interval: 600000
};
var ifeng$2 = {
	title: "热点资讯",
	name: "凤凰网",
	type: "hottest",
	column: "china",
	home: "https://www.ifeng.com",
	color: "red",
	interval: 600000
};
var chongbuluo$2 = {
	redirect: "chongbuluo-latest",
	name: "虫部落",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=newthread",
	color: "green",
	interval: 1800000,
	title: "最新"
};
var douban$2 = {
	title: "热门电影",
	name: "豆瓣",
	type: "hottest",
	column: "china",
	home: "https://www.douban.com",
	color: "green",
	interval: 600000
};
var steam$2 = {
	title: "在线人数",
	name: "Steam",
	type: "hottest",
	column: "world",
	home: "https://store.steampowered.com",
	color: "blue",
	interval: 600000
};
var tencent$2 = {
	redirect: "tencent-hot",
	name: "腾讯新闻",
	type: "hottest",
	column: "china",
	home: "https://news.qq.com/tag/aEWqxLtdgmQ=",
	color: "blue",
	interval: 1800000,
	title: "综合早报"
};
var freebuf$2 = {
	title: "网络安全",
	name: "Freebuf",
	type: "hottest",
	column: "china",
	home: "https://www.freebuf.com/",
	color: "green",
	interval: 600000
};
var qqvideo$2 = {
	redirect: "qqvideo-tv-hotsearch",
	name: "腾讯视频",
	type: "hottest",
	column: "china",
	home: "https://v.qq.com/channel/tv",
	color: "blue",
	interval: 1800000,
	title: "热搜榜"
};
var iqiyi$2 = {
	redirect: "iqiyi-hot-ranklist",
	name: "爱奇艺",
	type: "hottest",
	column: "china",
	home: "https://www.iqiyi.com",
	color: "green",
	interval: 1800000,
	title: "热播榜"
};
var stratechery$2 = {
	name: "Stratechery",
	type: "realtime",
	column: "english",
	home: "https://stratechery.com",
	color: "orange",
	interval: 1800000
};
var lennys$2 = {
	name: "Lenny's Newsletter",
	type: "realtime",
	column: "english",
	home: "https://www.lennysnewsletter.com",
	color: "red",
	interval: 1800000
};
var tldr$2 = {
	name: "TLDR",
	type: "realtime",
	column: "english",
	home: "https://tldr.tech",
	color: "teal",
	interval: 1800000
};
var openai$2 = {
	name: "OpenAI Research",
	type: "realtime",
	column: "english",
	home: "https://openai.com/news/research/",
	color: "green",
	interval: 1800000
};
var robertheaton$2 = {
	name: "Robert Heaton",
	type: "realtime",
	column: "english",
	home: "https://robertheaton.com",
	color: "blue",
	interval: 1800000
};
var ruanyifeng$2 = {
	name: "阮一峰的网络日志",
	type: "realtime",
	column: "tech",
	home: "http://www.ruanyifeng.com/blog/",
	color: "blue",
	interval: 1800000
};
var aeon$2 = {
	name: "Aeon",
	type: "realtime",
	desc: "哲学与深度随笔",
	column: "english",
	home: "https://aeon.co",
	color: "purple",
	interval: 1800000
};
var psyche$2 = {
	name: "Psyche",
	type: "realtime",
	desc: "心理学与生活哲学",
	column: "english",
	home: "https://psyche.co",
	color: "teal",
	interval: 1800000
};
const sources$1 = {
	v2ex: v2ex$2,
	"v2ex-share": {
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
},
	zhihu: zhihu$2,
	weibo: weibo$2,
	zaobao: zaobao$2,
	coolapk: coolapk,
	mktnews: mktnews$2,
	"mktnews-flash": {
	name: "MKTNews",
	column: "finance",
	home: "https://mktnews.net",
	color: "indigo",
	interval: 120000,
	title: "快讯"
},
	wallstreetcn: wallstreetcn$2,
	"wallstreetcn-quick": {
	name: "华尔街见闻",
	type: "realtime",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 300000,
	title: "快讯"
},
	"wallstreetcn-news": {
	name: "华尔街见闻",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 1800000,
	title: "最新"
},
	"wallstreetcn-hot": {
	name: "华尔街见闻",
	type: "hottest",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 1800000,
	title: "最热"
},
	"36kr": {
	redirect: "36kr-quick",
	name: "36氪",
	type: "realtime",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "快讯"
},
	"36kr-quick": {
	name: "36氪",
	type: "realtime",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "快讯"
},
	"36kr-renqi": {
	name: "36氪",
	type: "hottest",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "人气榜"
},
	douyin: douyin$2,
	hupu: hupu$2,
	tieba: tieba$2,
	toutiao: toutiao$2,
	ithome: ithome$2,
	thepaper: thepaper$2,
	sputniknewscn: sputniknewscn$2,
	cankaoxiaoxi: cankaoxiaoxi$2,
	pcbeta: pcbeta$2,
	"pcbeta-windows11": {
	name: "远景论坛",
	type: "realtime",
	column: "tech",
	home: "https://bbs.pcbeta.com",
	color: "blue",
	interval: 300000,
	title: "Win11"
},
	cls: cls,
	"cls-telegraph": {
	name: "财联社",
	type: "realtime",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 300000,
	title: "电报"
},
	"cls-depth": {
	name: "财联社",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 600000,
	title: "深度"
},
	"cls-hot": {
	name: "财联社",
	type: "hottest",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 600000,
	title: "热门"
},
	xueqiu: xueqiu$2,
	"xueqiu-hotstock": {
	name: "雪球",
	type: "hottest",
	column: "finance",
	home: "https://xueqiu.com",
	color: "blue",
	interval: 120000,
	title: "热门股票"
},
	gelonghui: gelonghui$2,
	fastbull: fastbull$2,
	"fastbull-express": {
	name: "法布财经",
	type: "realtime",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 120000,
	title: "快讯"
},
	"fastbull-news": {
	name: "法布财经",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 1800000,
	title: "头条"
},
	solidot: solidot$2,
	hackernews: hackernews$2,
	producthunt: producthunt$2,
	qbitai: qbitai$2,
	github: github$4,
	"github-trending-today": {
	name: "Github",
	type: "hottest",
	column: "tech",
	home: "https://github.com/",
	color: "gray",
	interval: 600000,
	title: "Today"
},
	bilibili: bilibili$2,
	"bilibili-hot-search": {
	name: "哔哩哔哩",
	type: "hottest",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热搜"
},
	"bilibili-hot-video": {
	name: "哔哩哔哩",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热门视频"
},
	"bilibili-ranking": {
	name: "哔哩哔哩",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 1800000,
	title: "排行榜"
},
	kuaishou: kuaishou$2,
	latepost: latepost$2,
	kaopu: kaopu$2,
	jin10: jin10$2,
	baidu: baidu$2,
	nowcoder: nowcoder$2,
	sspai: sspai$2,
	juejin: juejin$2,
	ifeng: ifeng$2,
	chongbuluo: chongbuluo$2,
	"chongbuluo-latest": {
	name: "虫部落",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=newthread",
	color: "green",
	interval: 1800000,
	title: "最新"
},
	"chongbuluo-hot": {
	name: "虫部落",
	type: "hottest",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=hot",
	color: "green",
	interval: 1800000,
	title: "最热"
},
	douban: douban$2,
	steam: steam$2,
	tencent: tencent$2,
	"tencent-hot": {
	name: "腾讯新闻",
	type: "hottest",
	column: "china",
	home: "https://news.qq.com/tag/aEWqxLtdgmQ=",
	color: "blue",
	interval: 1800000,
	title: "综合早报"
},
	freebuf: freebuf$2,
	qqvideo: qqvideo$2,
	"qqvideo-tv-hotsearch": {
	name: "腾讯视频",
	type: "hottest",
	column: "china",
	home: "https://v.qq.com/channel/tv",
	color: "blue",
	interval: 1800000,
	title: "热搜榜"
},
	iqiyi: iqiyi$2,
	"iqiyi-hot-ranklist": {
	name: "爱奇艺",
	type: "hottest",
	column: "china",
	home: "https://www.iqiyi.com",
	color: "green",
	interval: 1800000,
	title: "热播榜"
},
	stratechery: stratechery$2,
	lennys: lennys$2,
	tldr: tldr$2,
	"reddit-ai-monitor": {
	name: "Reddit AI Monitor",
	type: "realtime",
	column: "english",
	home: "https://reddit.com",
	color: "red",
	interval: 1800000
},
	openai: openai$2,
	robertheaton: robertheaton$2,
	"google-alert-musk": {
	name: "马斯克动态",
	type: "realtime",
	column: "english",
	home: "https://www.google.com/alerts",
	color: "red",
	interval: 1800000
},
	"farnam-street": {
	name: "Farnam Street",
	type: "realtime",
	desc: "思考与决策",
	column: "english",
	home: "https://fs.blog",
	color: "slate",
	interval: 1800000
},
	ruanyifeng: ruanyifeng$2,
	aeon: aeon$2,
	psyche: psyche$2,
	"paul-graham": {
	name: "Paul Graham Essays",
	type: "realtime",
	desc: "创业与黑客精神",
	column: "english",
	home: "https://paulgraham.com",
	color: "orange",
	interval: 3600000
}
};

const sources = sources$1;

const TRACKER_DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1e3;
const TRACKER_MIN_INTERVAL_MS = 60 * 1e3;
const BRIEFING_LIST_LIMIT = 12;
function clampInterval(intervalMs) {
  if (!intervalMs || Number.isNaN(intervalMs)) return TRACKER_DEFAULT_INTERVAL_MS;
  return Math.max(TRACKER_MIN_INTERVAL_MS, Math.floor(intervalMs));
}

function typeSafeObjectEntries(obj) {
  return Object.entries(obj);
}

const myFetch = $fetch$1.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
  },
  timeout: 1e4,
  retry: 3
});

async function rss2json(url, request) {
  var _a, _b, _c, _d, _e;
  if (!/^https?:\/\/[^\s$.?#].\S*/i.test(url)) return;
  const data = await myFetch(url, {
    ...request,
    responseType: "text"
  });
  const xml = new XMLParser({
    attributeNamePrefix: "",
    textNodeName: "$text",
    ignoreAttributes: false
  });
  const result = xml.parse(data);
  let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;
  if (Array.isArray(channel)) channel = channel[0];
  if (!channel || typeof channel !== "object") return void 0;
  const rss = {
    title: (_a = channel.title) != null ? _a : "",
    description: (_b = channel.description) != null ? _b : "",
    link: channel.link && channel.link.href ? channel.link.href : channel.link,
    image: channel.image ? channel.image.url : channel["itunes:image"] ? channel["itunes:image"].href : "",
    category: channel.category || [],
    updatedTime: (_c = channel.lastBuildDate) != null ? _c : channel.updated,
    items: []
  };
  let items = channel.item || channel.entry || [];
  if (items && !Array.isArray(items)) items = [items];
  for (let i = 0; i < items.length; i++) {
    const val = items[i];
    const media = {};
    const obj = {
      id: val.guid && val.guid.$text ? val.guid.$text : val.id,
      title: val.title && val.title.$text ? val.title.$text : val.title,
      description: val.summary && val.summary.$text ? val.summary.$text : val.description,
      link: val.link && val.link.href ? val.link.href : val.link,
      author: val.author && val.author.name ? val.author.name : val["dc:creator"],
      created: (_e = (_d = val.updated) != null ? _d : val.pubDate) != null ? _e : val.created,
      category: val.category || [],
      content: val.content && val.content.$text ? val.content.$text : val["content:encoded"],
      enclosures: val.enclosure ? Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure] : []
    };
    ["content:encoded", "podcast:transcript", "itunes:summary", "itunes:author", "itunes:explicit", "itunes:duration", "itunes:season", "itunes:episode", "itunes:episodeType", "itunes:image"].forEach((s) => {
      if (val[s]) obj[s.replace(":", "_")] = val[s];
    });
    if (val["media:thumbnail"]) {
      Object.assign(media, { thumbnail: val["media:thumbnail"] });
      obj.enclosures.push(val["media:thumbnail"]);
    }
    if (val["media:content"]) {
      Object.assign(media, { thumbnail: val["media:content"] });
      obj.enclosures.push(val["media:content"]);
    }
    if (val["media:group"]) {
      if (val["media:group"]["media:title"]) obj.title = val["media:group"]["media:title"];
      if (val["media:group"]["media:description"]) obj.description = val["media:group"]["media:description"];
      if (val["media:group"]["media:thumbnail"]) obj.enclosures.push(val["media:group"]["media:thumbnail"].url);
      if (val["media:group"]["media:content"]) obj.enclosures.push(val["media:group"]["media:content"]);
    }
    Object.assign(obj, { media });
    rss.items.push(obj);
  }
  return rss;
}

function defineSource(source) {
  return source;
}
function defineRSSSource(url, option) {
  return async () => {
    const data = await rss2json(url, option == null ? void 0 : option.request);
    const items = Array.isArray(data == null ? void 0 : data.items) ? data.items.filter((item) => item && (item.title || item.link)) : [];
    if (!items.length) throw new Error(`RSS \u6CA1\u6709\u53EF\u7528\u6761\u76EE\uFF1A${url}`);
    return items.map((item) => {
      var _a;
      return {
        title: item.title,
        url: item.link,
        id: (_a = item.link) != null ? _a : item.title,
        pubDate: !(option == null ? void 0 : option.hiddenDate) ? item.created : void 0
      };
    });
  };
}
function proxySource(proxyUrl, source) {
  return process$1.env.CF_PAGES ? defineSource(async () => {
    const data = await myFetch(proxyUrl);
    return data.items;
  }) : source;
}

var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var DATE = 'date';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var INVALID_DATE_STRING = 'Invalid Date'; // regex

var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
const en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  if (a.date() < b.date()) return -monthDiff(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit$1 = function prettyUnit(u) {
  var special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q: Q
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit$1,
  u: isUndefined
};

var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = en;
var IS_DAYJS = '$isDayjsObject'; // eslint-disable-next-line no-use-before-define

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
};

var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return L;

  if (typeof preset === 'string') {
    var presetLower = preset.toLowerCase();

    if (Ls[presetLower]) {
      l = presetLower;
    }

    if (object) {
      Ls[presetLower] = object;
      l = presetLower;
    }

    var presetSplit = preset.split('-');

    if (!l && presetSplit.length > 1) {
      return parseLocale(presetSplit[0]);
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal && l) L = l;
  return l || !isLocal && L;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  } // eslint-disable-next-line no-nested-ternary


  var cfg = typeof c === 'object' ? c : {};
  cfg.date = date;
  cfg.args = arguments; // eslint-disable-line prefer-rest-params

  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper$1 = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset // todo: refactor; do not use this.$offset in you code

  });
};

var Utils = U; // for plugin use

Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper$1;

var parseDate = function parseDate(cfg) {
  var date = cfg.date,
      utc = cfg.utc;
  if (date === null) return new Date(NaN); // null is invalid

  if (Utils.u(date)) return new Date(); // today

  if (date instanceof Date) return new Date(date);

  if (typeof date === 'string' && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);

    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || '0').substring(0, 3);

      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }

      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }

  return new Date(date); // everything else
};

var Dayjs = /*#__PURE__*/function () {
  function Dayjs(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg); // for plugin

    this.$x = this.$x || cfg.x || {};
    this[IS_DAYJS] = true;
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.init();
  };

  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };

  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };

  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };

  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };

  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input)) return this[get];
    return this.set(set, input);
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;

    // startOf -> endOf
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate('s'), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };

    var $W = this.$W,
        $M = this.$M,
        $D = this.$D;
    var utcPad = "set" + (this.$u ? 'UTC' : '');

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

      case W:
        {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);

      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);

      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);

      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;

    // private set
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? 'UTC' : '');
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;

    if (unit === M || unit === Y) {
      // clone is for badMutable plugin
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name) this.$d[name](arg);

    this.init();
    return this;
  };

  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };

  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };

  _proto.add = function add(number, units) {
    var _this2 = this,
        _C$MIN$C$H$C$S$unit;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.p(units);

    var instanceFactorySet = function instanceFactorySet(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };

    if (unit === M) {
      return this.set(M, this.$M + number);
    }

    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }

    if (unit === D) {
      return instanceFactorySet(1);
    }

    if (unit === W) {
      return instanceFactorySet(7);
    }

    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    var locale = this.$locale();
    if (!this.isValid()) return locale.invalidDate || INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H,
        $m = this.$m,
        $M = this.$M;
    var weekdays = locale.weekdays,
        months = locale.months,
        meridiem = locale.meridiem;

    var getShort = function getShort(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].slice(0, length);
    };

    var get$H = function get$H(num) {
      return Utils.s($H % 12 || 12, num, '0');
    };

    var meridiemFunc = meridiem || function (hour, minute, isLowercase) {
      var m = hour < 12 ? 'AM' : 'PM';
      return isLowercase ? m.toLowerCase() : m;
    };

    var matches = function matches(match) {
      switch (match) {
        case 'YY':
          return String(_this3.$y).slice(-2);

        case 'YYYY':
          return Utils.s(_this3.$y, 4, '0');

        case 'M':
          return $M + 1;

        case 'MM':
          return Utils.s($M + 1, 2, '0');

        case 'MMM':
          return getShort(locale.monthsShort, $M, months, 3);

        case 'MMMM':
          return getShort(months, $M);

        case 'D':
          return _this3.$D;

        case 'DD':
          return Utils.s(_this3.$D, 2, '0');

        case 'd':
          return String(_this3.$W);

        case 'dd':
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);

        case 'ddd':
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);

        case 'dddd':
          return weekdays[_this3.$W];

        case 'H':
          return String($H);

        case 'HH':
          return Utils.s($H, 2, '0');

        case 'h':
          return get$H(1);

        case 'hh':
          return get$H(2);

        case 'a':
          return meridiemFunc($H, $m, true);

        case 'A':
          return meridiemFunc($H, $m, false);

        case 'm':
          return String($m);

        case 'mm':
          return Utils.s($m, 2, '0');

        case 's':
          return String(_this3.$s);

        case 'ss':
          return Utils.s(_this3.$s, 2, '0');

        case 'SSS':
          return Utils.s(_this3.$ms, 3, '0');

        case 'Z':
          return zoneStr;
      }

      return null;
    };

    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || matches(match) || zoneStr.replace(':', '');
    }); // 'ZZ'
  };

  _proto.utcOffset = function utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };

  _proto.diff = function diff(input, units, _float) {
    var _this4 = this;

    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff = this - that;

    var getMonth = function getMonth() {
      return Utils.m(_this4, that);
    };

    var result;

    switch (unit) {
      case Y:
        result = getMonth() / 12;
        break;

      case M:
        result = getMonth();
        break;

      case Q:
        result = getMonth() / 3;
        break;

      case W:
        result = (diff - zoneDelta) / MILLISECONDS_A_WEEK;
        break;

      case D:
        result = (diff - zoneDelta) / MILLISECONDS_A_DAY;
        break;

      case H:
        result = diff / MILLISECONDS_A_HOUR;
        break;

      case MIN:
        result = diff / MILLISECONDS_A_MINUTE;
        break;

      case S:
        result = diff / MILLISECONDS_A_SECOND;
        break;

      default:
        result = diff; // milliseconds

        break;
    }

    return _float ? result : Utils.a(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    if (!preset) return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName) that.$L = nextLocaleName;
    return that;
  };

  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };

  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

var proto = Dayjs.prototype;
dayjs.prototype = proto;
[['$ms', MS], ['$s', S], ['$m', MIN], ['$H', H], ['$W', D], ['$M', M], ['$y', Y], ['$D', DATE]].forEach(function (g) {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1]);
  };
});

dayjs.extend = function (plugin, option) {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }

  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;

dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3);
};

dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};

var REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g;
var REGEX_OFFSET_HOURS_MINUTES_FORMAT = /([+-]|\d\d)/g;

function offsetFromString$1(value) {
  if (value === void 0) {
    value = '';
  }

  var offset = value.match(REGEX_VALID_OFFSET_FORMAT);

  if (!offset) {
    return null;
  }

  var _ref = ("" + offset[0]).match(REGEX_OFFSET_HOURS_MINUTES_FORMAT) || ['-', 0, 0],
      indicator = _ref[0],
      hoursOffset = _ref[1],
      minutesOffset = _ref[2];

  var totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset;

  if (totalOffsetInMinutes === 0) {
    return 0;
  }

  return indicator === '+' ? totalOffsetInMinutes : -totalOffsetInMinutes;
}

const utcPlugin = (function (option, Dayjs, dayjs) {
  var proto = Dayjs.prototype;

  dayjs.utc = function (date) {
    var cfg = {
      date: date,
      utc: true,
      args: arguments
    }; // eslint-disable-line prefer-rest-params

    return new Dayjs(cfg); // eslint-disable-line no-use-before-define
  };

  proto.utc = function (keepLocalTime) {
    var ins = dayjs(this.toDate(), {
      locale: this.$L,
      utc: true
    });

    if (keepLocalTime) {
      return ins.add(this.utcOffset(), MIN);
    }

    return ins;
  };

  proto.local = function () {
    return dayjs(this.toDate(), {
      locale: this.$L,
      utc: false
    });
  };

  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    if (cfg.utc) {
      this.$u = true;
    }

    if (!this.$utils().u(cfg.$offset)) {
      this.$offset = cfg.$offset;
    }

    oldParse.call(this, cfg);
  };

  var oldInit = proto.init;

  proto.init = function () {
    if (this.$u) {
      var $d = this.$d;
      this.$y = $d.getUTCFullYear();
      this.$M = $d.getUTCMonth();
      this.$D = $d.getUTCDate();
      this.$W = $d.getUTCDay();
      this.$H = $d.getUTCHours();
      this.$m = $d.getUTCMinutes();
      this.$s = $d.getUTCSeconds();
      this.$ms = $d.getUTCMilliseconds();
    } else {
      oldInit.call(this);
    }
  };

  var oldUtcOffset = proto.utcOffset;

  proto.utcOffset = function (input, keepLocalTime) {
    var _this$$utils = this.$utils(),
        u = _this$$utils.u;

    if (u(input)) {
      if (this.$u) {
        return 0;
      }

      if (!u(this.$offset)) {
        return this.$offset;
      }

      return oldUtcOffset.call(this);
    }

    if (typeof input === 'string') {
      input = offsetFromString$1(input);

      if (input === null) {
        return this;
      }
    }

    var offset = Math.abs(input) <= 16 ? input * 60 : input;
    var ins = this;

    if (keepLocalTime) {
      ins.$offset = offset;
      ins.$u = input === 0;
      return ins;
    }

    if (input !== 0) {
      var localTimezoneOffset = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
      ins = this.local().add(offset + localTimezoneOffset, MIN);
      ins.$offset = offset;
      ins.$x.$localOffset = localTimezoneOffset;
    } else {
      ins = this.utc();
    }

    return ins;
  };

  var oldFormat = proto.format;
  var UTC_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss[Z]';

  proto.format = function (formatStr) {
    var str = formatStr || (this.$u ? UTC_FORMAT_DEFAULT : '');
    return oldFormat.call(this, str);
  };

  proto.valueOf = function () {
    var addedOffset = !this.$utils().u(this.$offset) ? this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset()) : 0;
    return this.$d.valueOf() - addedOffset * MILLISECONDS_A_MINUTE;
  };

  proto.isUTC = function () {
    return !!this.$u;
  };

  proto.toISOString = function () {
    return this.toDate().toISOString();
  };

  proto.toString = function () {
    return this.toDate().toUTCString();
  };

  var oldToDate = proto.toDate;

  proto.toDate = function (type) {
    if (type === 's' && this.$offset) {
      return dayjs(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate();
    }

    return oldToDate.call(this);
  };

  var oldDiff = proto.diff;

  proto.diff = function (input, units, _float) {
    if (input && this.$u === input.$u) {
      return oldDiff.call(this, input, units, _float);
    }

    var localThis = this.local();
    var localInput = dayjs(input).local();
    return oldDiff.call(localThis, localInput, units, _float);
  };
});

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}; // Cache time-zone lookups from Intl.DateTimeFormat,
// as it is a *very* slow method.

var dtfCache = {};

var getDateTimeFormat = function getDateTimeFormat(timezone, options) {
  if (options === void 0) {
    options = {};
  }

  var timeZoneName = options.timeZoneName || 'short';
  var key = timezone + "|" + timeZoneName;
  var dtf = dtfCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: timeZoneName
    });
    dtfCache[key] = dtf;
  }

  return dtf;
};

const timezonePlugin = (function (o, c, d) {
  var defaultTimezone;

  var makeFormatParts = function makeFormatParts(timestamp, timezone, options) {
    if (options === void 0) {
      options = {};
    }

    var date = new Date(timestamp);
    var dtf = getDateTimeFormat(timezone, options);
    return dtf.formatToParts(date);
  };

  var tzOffset = function tzOffset(timestamp, timezone) {
    var formatResult = makeFormatParts(timestamp, timezone);
    var filled = [];

    for (var i = 0; i < formatResult.length; i += 1) {
      var _formatResult$i = formatResult[i],
          type = _formatResult$i.type,
          value = _formatResult$i.value;
      var pos = typeToPos[type];

      if (pos >= 0) {
        filled[pos] = parseInt(value, 10);
      }
    }

    var hour = filled[3]; // Workaround for the same behavior in different node version
    // https://github.com/nodejs/node/issues/33027

    /* istanbul ignore next */

    var fixedHour = hour === 24 ? 0 : hour;
    var utcString = filled[0] + "-" + filled[1] + "-" + filled[2] + " " + fixedHour + ":" + filled[4] + ":" + filled[5] + ":000";
    var utcTs = d.utc(utcString).valueOf();
    var asTS = +timestamp;
    var over = asTS % 1000;
    asTS -= over;
    return (utcTs - asTS) / (60 * 1000);
  }; // find the right offset a given local time. The o input is our guess, which determines which
  // offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
  // https://github.com/moment/luxon/blob/master/src/datetime.js#L76


  var fixOffset = function fixOffset(localTS, o0, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    var utcGuess = localTS - o0 * 60 * 1000; // Test whether the zone matches the offset for this ts

    var o2 = tzOffset(utcGuess, tz); // If so, offset didn't change and we're done

    if (o0 === o2) {
      return [utcGuess, o0];
    } // If not, change the ts by the difference in the offset


    utcGuess -= (o2 - o0) * 60 * 1000; // If that gives us the local time we want, we're done

    var o3 = tzOffset(utcGuess, tz);

    if (o2 === o3) {
      return [utcGuess, o2];
    } // If it's different, we're in a hole time.
    // The offset has changed, but the we don't adjust the time


    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
  };

  var proto = c.prototype;

  proto.tz = function (timezone, keepLocalTime) {
    if (timezone === void 0) {
      timezone = defaultTimezone;
    }

    var oldOffset = this.utcOffset();
    var date = this.toDate();
    var target = date.toLocaleString('en-US', {
      timeZone: timezone
    });
    var diff = Math.round((date - new Date(target)) / 1000 / 60);
    var offset = -Math.round(date.getTimezoneOffset() / 15) * 15 - diff;
    var isUTC = !Number(offset);
    var ins;

    if (isUTC) {
      // if utcOffset is 0, turn it to UTC mode
      ins = this.utcOffset(0, keepLocalTime);
    } else {
      ins = d(target, {
        locale: this.$L
      }).$set(MS, this.$ms).utcOffset(offset, true);

      if (keepLocalTime) {
        var newOffset = ins.utcOffset();
        ins = ins.add(oldOffset - newOffset, MIN);
      }
    }

    ins.$x.$timezone = timezone;
    return ins;
  };

  proto.offsetName = function (type) {
    // type: short(default) / long
    var zone = this.$x.$timezone || d.tz.guess();
    var result = makeFormatParts(this.valueOf(), zone, {
      timeZoneName: type
    }).find(function (m) {
      return m.type.toLowerCase() === 'timezonename';
    });
    return result && result.value;
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    if (!this.$x || !this.$x.$timezone) {
      return oldStartOf.call(this, units, startOf);
    }

    var withoutTz = d(this.format('YYYY-MM-DD HH:mm:ss:SSS'), {
      locale: this.$L
    });
    var startOfWithoutTz = oldStartOf.call(withoutTz, units, startOf);
    return startOfWithoutTz.tz(this.$x.$timezone, true);
  };

  d.tz = function (input, arg1, arg2) {
    var parseFormat = arg2 && arg1;
    var timezone = arg2 || arg1 || defaultTimezone;
    var previousOffset = tzOffset(+d(), timezone);

    if (typeof input !== 'string') {
      // timestamp number || js Date || Day.js
      return d(input).tz(timezone);
    }

    var localTs = d.utc(input, parseFormat).valueOf();

    var _fixOffset = fixOffset(localTs, previousOffset, timezone),
        targetTs = _fixOffset[0],
        targetOffset = _fixOffset[1];

    var ins = d(targetTs).utcOffset(targetOffset);
    ins.$x.$timezone = timezone;
    return ins;
  };

  d.tz.guess = function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  d.tz.setDefault = function (timezone) {
    defaultTimezone = timezone;
  };
});

// eslint-disable-next-line import/prefer-default-export
var t = function t(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
    return a || b.slice(1);
  });
};
var englishFormats = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
var u = function u(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
    var B = b && b.toUpperCase();
    return a || formats[b] || englishFormats[b] || t(formats[B]);
  });
};

var formattingTokens = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchOffset = /[+-]\d\d:?(\d\d)?|Z/; // +00:00 -00:00 +0000 or -0000 +00 or Z

var matchWord = /\d*[^-_:/,()\s\d]+/; // Word

var locale = {};

var parseTwoDigitYear = function parseTwoDigitYear(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2000);
};

function offsetFromString(string) {
  if (!string) return 0;
  if (string === 'Z') return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === '+' ? -minutes : minutes; // eslint-disable-line no-nested-ternary
}

var addInput = function addInput(property) {
  return function (input) {
    this[property] = +input;
  };
};

var zoneExpressions = [matchOffset, function (input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];

var getLocalePart = function getLocalePart(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
};

var meridiemMatch = function meridiemMatch(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale,
      meridiem = _locale.meridiem;

  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? 'pm' : 'PM');
  } else {
    for (var i = 1; i <= 24; i += 1) {
      // todo: fix input === meridiem(i, 0, isLowerCase)
      if (input.indexOf(meridiem(i, 0, isLowerCase)) > -1) {
        isAfternoon = i > 12;
        break;
      }
    }
  }

  return isAfternoon;
};

var expressions = {
  A: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  Q: [match1, function (input) {
    this.month = (input - 1) * 3 + 1;
  }],
  S: [match1, function (input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function (input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function (input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput('seconds')],
  ss: [match1to2, addInput('seconds')],
  m: [match1to2, addInput('minutes')],
  mm: [match1to2, addInput('minutes')],
  H: [match1to2, addInput('hours')],
  h: [match1to2, addInput('hours')],
  HH: [match1to2, addInput('hours')],
  hh: [match1to2, addInput('hours')],
  D: [match1to2, addInput('day')],
  DD: [match2, addInput('day')],
  Do: [matchWord, function (input) {
    var _locale2 = locale,
        ordinal = _locale2.ordinal;

    var _input$match = input.match(/\d+/);

    this.day = _input$match[0];
    if (!ordinal) return;

    for (var i = 1; i <= 31; i += 1) {
      if (ordinal(i).replace(/\[|\]/g, '') === input) {
        this.day = i;
      }
    }
  }],
  w: [match1to2, addInput('week')],
  ww: [match2, addInput('week')],
  M: [match1to2, addInput('month')],
  MM: [match2, addInput('month')],
  MMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var monthsShort = getLocalePart('monthsShort');
    var matchIndex = (monthsShort || months.map(function (_) {
      return _.slice(0, 3);
    })).indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var matchIndex = months.indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput('year')],
  YY: [match2, function (input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput('year')],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};

function correctHours(time) {
  var afternoon = time.afternoon;

  if (afternoon !== undefined) {
    var hours = time.hours;

    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }

    delete time.afternoon;
  }
}

function makeParser(format) {
  format = u(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;

  for (var i = 0; i < length; i += 1) {
    var token = array[i];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];

    if (parser) {
      array[i] = {
        regex: regex,
        parser: parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (input) {
    var time = {};

    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];

      if (typeof _token === 'string') {
        start += _token.length;
      } else {
        var _regex = _token.regex,
            _parser = _token.parser;
        var part = input.slice(start);

        var match = _regex.exec(part);

        var value = match[0];

        _parser.call(time, value);

        input = input.replace(value, '');
      }
    }

    correctHours(time);
    return time;
  };
}

var parseFormattedInput = function parseFormattedInput(input, format, utc, dayjs) {
  try {
    if (['x', 'X'].indexOf(format) > -1) return new Date((format === 'X' ? 1000 : 1) * input);
    var parser = makeParser(format);

    var _parser2 = parser(input),
        year = _parser2.year,
        month = _parser2.month,
        day = _parser2.day,
        hours = _parser2.hours,
        minutes = _parser2.minutes,
        seconds = _parser2.seconds,
        milliseconds = _parser2.milliseconds,
        zone = _parser2.zone,
        week = _parser2.week;

    var now = new Date();
    var d = day || (!year && !month ? now.getDate() : 1);
    var y = year || now.getFullYear();
    var M = 0;

    if (!(year && !month)) {
      M = month > 0 ? month - 1 : now.getMonth();
    }

    var h = hours || 0;
    var m = minutes || 0;
    var s = seconds || 0;
    var ms = milliseconds || 0;

    if (zone) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms + zone.offset * 60 * 1000));
    }

    if (utc) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms));
    }

    var newDate;
    newDate = new Date(y, M, d, h, m, s, ms);

    if (week) {
      newDate = dayjs(newDate).week(week).toDate();
    }

    return newDate;
  } catch (e) {
    return new Date(''); // Invalid Date
  }
};

const customParseFormat = (function (o, C, d) {
  d.p.customParseFormat = true;

  if (o && o.parseTwoDigitYear) {
    parseTwoDigitYear = o.parseTwoDigitYear;
  }

  var proto = C.prototype;
  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    var date = cfg.date,
        utc = cfg.utc,
        args = cfg.args;
    this.$u = utc;
    var format = args[1];

    if (typeof format === 'string') {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];

      if (isStrictWithLocale) {
        pl = args[2];
      }

      locale = this.$locale();

      if (!isStrictWithoutLocale && pl) {
        locale = d.Ls[pl];
      }

      this.$d = parseFormattedInput(date, format, utc, d);
      this.init();
      if (pl && pl !== true) this.$L = this.locale(pl).$L; // use != to treat
      // input number 1410715640579 and format string '1410715640579' equal
      // eslint-disable-next-line eqeqeq

      if (isStrict && date != this.format(format)) {
        this.$d = new Date('');
      } // reset global locale to make parallel unit test


      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;

      for (var i = 1; i <= len; i += 1) {
        args[1] = format[i - 1];
        var result = d.apply(this, args);

        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }

        if (i === len) this.$d = new Date('');
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
});

var MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365;
var MILLISECONDS_A_MONTH = MILLISECONDS_A_DAY * 30;
var durationRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
var unitToMS = {
  years: MILLISECONDS_A_YEAR,
  months: MILLISECONDS_A_MONTH,
  days: MILLISECONDS_A_DAY,
  hours: MILLISECONDS_A_HOUR,
  minutes: MILLISECONDS_A_MINUTE,
  seconds: MILLISECONDS_A_SECOND,
  milliseconds: 1,
  weeks: MILLISECONDS_A_WEEK
};

var isDuration = function isDuration(d) {
  return d instanceof Duration;
}; // eslint-disable-line no-use-before-define


var $d;
var $u;

var wrapper = function wrapper(input, instance, unit) {
  return new Duration(input, unit, instance.$l);
}; // eslint-disable-line no-use-before-define


var prettyUnit = function prettyUnit(unit) {
  return $u.p(unit) + "s";
};

var isNegative = function isNegative(number) {
  return number < 0;
};

var roundNumber = function roundNumber(number) {
  return isNegative(number) ? Math.ceil(number) : Math.floor(number);
};

var absolute = function absolute(number) {
  return Math.abs(number);
};

var getNumberUnitFormat = function getNumberUnitFormat(number, unit) {
  if (!number) {
    return {
      negative: false,
      format: ''
    };
  }

  if (isNegative(number)) {
    return {
      negative: true,
      format: "" + absolute(number) + unit
    };
  }

  return {
    negative: false,
    format: "" + number + unit
  };
};

var Duration = /*#__PURE__*/function () {
  function Duration(input, unit, locale) {
    var _this = this;

    this.$d = {};
    this.$l = locale;

    if (input === undefined) {
      this.$ms = 0;
      this.parseFromMilliseconds();
    }

    if (unit) {
      return wrapper(input * unitToMS[prettyUnit(unit)], this);
    }

    if (typeof input === 'number') {
      this.$ms = input;
      this.parseFromMilliseconds();
      return this;
    }

    if (typeof input === 'object') {
      Object.keys(input).forEach(function (k) {
        _this.$d[prettyUnit(k)] = input[k];
      });
      this.calMilliseconds();
      return this;
    }

    if (typeof input === 'string') {
      var d = input.match(durationRegex);

      if (d) {
        var properties = d.slice(2);
        var numberD = properties.map(function (value) {
          return value != null ? Number(value) : 0;
        });
        this.$d.years = numberD[0];
        this.$d.months = numberD[1];
        this.$d.weeks = numberD[2];
        this.$d.days = numberD[3];
        this.$d.hours = numberD[4];
        this.$d.minutes = numberD[5];
        this.$d.seconds = numberD[6];
        this.calMilliseconds();
        return this;
      }
    }

    return this;
  }

  var _proto = Duration.prototype;

  _proto.calMilliseconds = function calMilliseconds() {
    var _this2 = this;

    this.$ms = Object.keys(this.$d).reduce(function (total, unit) {
      return total + (_this2.$d[unit] || 0) * unitToMS[unit];
    }, 0);
  };

  _proto.parseFromMilliseconds = function parseFromMilliseconds() {
    var $ms = this.$ms;
    this.$d.years = roundNumber($ms / MILLISECONDS_A_YEAR);
    $ms %= MILLISECONDS_A_YEAR;
    this.$d.months = roundNumber($ms / MILLISECONDS_A_MONTH);
    $ms %= MILLISECONDS_A_MONTH;
    this.$d.days = roundNumber($ms / MILLISECONDS_A_DAY);
    $ms %= MILLISECONDS_A_DAY;
    this.$d.hours = roundNumber($ms / MILLISECONDS_A_HOUR);
    $ms %= MILLISECONDS_A_HOUR;
    this.$d.minutes = roundNumber($ms / MILLISECONDS_A_MINUTE);
    $ms %= MILLISECONDS_A_MINUTE;
    this.$d.seconds = roundNumber($ms / MILLISECONDS_A_SECOND);
    $ms %= MILLISECONDS_A_SECOND;
    this.$d.milliseconds = $ms;
  };

  _proto.toISOString = function toISOString() {
    var Y = getNumberUnitFormat(this.$d.years, 'Y');
    var M = getNumberUnitFormat(this.$d.months, 'M');
    var days = +this.$d.days || 0;

    if (this.$d.weeks) {
      days += this.$d.weeks * 7;
    }

    var D = getNumberUnitFormat(days, 'D');
    var H = getNumberUnitFormat(this.$d.hours, 'H');
    var m = getNumberUnitFormat(this.$d.minutes, 'M');
    var seconds = this.$d.seconds || 0;

    if (this.$d.milliseconds) {
      seconds += this.$d.milliseconds / 1000;
    }

    var S = getNumberUnitFormat(seconds, 'S');
    var negativeMode = Y.negative || M.negative || D.negative || H.negative || m.negative || S.negative;
    var T = H.format || m.format || S.format ? 'T' : '';
    var P = negativeMode ? '-' : '';
    var result = P + "P" + Y.format + M.format + D.format + T + H.format + m.format + S.format;
    return result === 'P' || result === '-P' ? 'P0D' : result;
  };

  _proto.toJSON = function toJSON() {
    return this.toISOString();
  };

  _proto.format = function format(formatStr) {
    var str = formatStr || 'YYYY-MM-DDTHH:mm:ss';
    var matches = {
      Y: this.$d.years,
      YY: $u.s(this.$d.years, 2, '0'),
      YYYY: $u.s(this.$d.years, 4, '0'),
      M: this.$d.months,
      MM: $u.s(this.$d.months, 2, '0'),
      D: this.$d.days,
      DD: $u.s(this.$d.days, 2, '0'),
      H: this.$d.hours,
      HH: $u.s(this.$d.hours, 2, '0'),
      m: this.$d.minutes,
      mm: $u.s(this.$d.minutes, 2, '0'),
      s: this.$d.seconds,
      ss: $u.s(this.$d.seconds, 2, '0'),
      SSS: $u.s(this.$d.milliseconds, 3, '0')
    };
    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || String(matches[match]);
    });
  };

  _proto.as = function as(unit) {
    return this.$ms / unitToMS[prettyUnit(unit)];
  };

  _proto.get = function get(unit) {
    var base = this.$ms;
    var pUnit = prettyUnit(unit);

    if (pUnit === 'milliseconds') {
      base %= 1000;
    } else if (pUnit === 'weeks') {
      base = roundNumber(base / unitToMS[pUnit]);
    } else {
      base = this.$d[pUnit];
    }

    return base === 0 ? 0 : base; // a === 0 will be true on both 0 and -0
  };

  _proto.add = function add(input, unit, isSubtract) {
    var another;

    if (unit) {
      another = input * unitToMS[prettyUnit(unit)];
    } else if (isDuration(input)) {
      another = input.$ms;
    } else {
      another = wrapper(input, this).$ms;
    }

    return wrapper(this.$ms + another * (isSubtract ? -1 : 1), this);
  };

  _proto.subtract = function subtract(input, unit) {
    return this.add(input, unit, true);
  };

  _proto.locale = function locale(l) {
    var that = this.clone();
    that.$l = l;
    return that;
  };

  _proto.clone = function clone() {
    return wrapper(this.$ms, this);
  };

  _proto.humanize = function humanize(withSuffix) {
    return $d().add(this.$ms, 'ms').locale(this.$l).fromNow(!withSuffix);
  };

  _proto.valueOf = function valueOf() {
    return this.asMilliseconds();
  };

  _proto.milliseconds = function milliseconds() {
    return this.get('milliseconds');
  };

  _proto.asMilliseconds = function asMilliseconds() {
    return this.as('milliseconds');
  };

  _proto.seconds = function seconds() {
    return this.get('seconds');
  };

  _proto.asSeconds = function asSeconds() {
    return this.as('seconds');
  };

  _proto.minutes = function minutes() {
    return this.get('minutes');
  };

  _proto.asMinutes = function asMinutes() {
    return this.as('minutes');
  };

  _proto.hours = function hours() {
    return this.get('hours');
  };

  _proto.asHours = function asHours() {
    return this.as('hours');
  };

  _proto.days = function days() {
    return this.get('days');
  };

  _proto.asDays = function asDays() {
    return this.as('days');
  };

  _proto.weeks = function weeks() {
    return this.get('weeks');
  };

  _proto.asWeeks = function asWeeks() {
    return this.as('weeks');
  };

  _proto.months = function months() {
    return this.get('months');
  };

  _proto.asMonths = function asMonths() {
    return this.as('months');
  };

  _proto.years = function years() {
    return this.get('years');
  };

  _proto.asYears = function asYears() {
    return this.as('years');
  };

  return Duration;
}();

const duration = (function (option, Dayjs, dayjs) {
  $d = dayjs;
  $u = dayjs().$utils();

  dayjs.duration = function (input, unit) {
    var $l = dayjs.locale();
    return wrapper(input, {
      $l: $l
    }, unit);
  };

  dayjs.isDuration = isDuration;
  var oldAdd = Dayjs.prototype.add;
  var oldSubtract = Dayjs.prototype.subtract;

  Dayjs.prototype.add = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds();
    return oldAdd.bind(this)(value, unit);
  };

  Dayjs.prototype.subtract = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds();
    return oldSubtract.bind(this)(value, unit);
  };
});

const isSameOrBefore = (function (o, c) {
  c.prototype.isSameOrBefore = function (that, units) {
    return this.isSame(that, units) || this.isBefore(that, units);
  };
});

const weekday = (function (o, c) {
  var proto = c.prototype;

  proto.weekday = function (input) {
    var weekStart = this.$locale().weekStart || 0;
    var $W = this.$W;
    var weekday = ($W < weekStart ? $W + 7 : $W) - weekStart;

    if (this.$utils().u(input)) {
      return weekday;
    }

    return this.subtract(weekday, 'day').add(input, 'day');
  };
});

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
function tranformToUTC(date, format, timezone = "Asia/Shanghai") {
  return dayjs.tz(date, timezone).valueOf();
}
function words() {
  return [
    {
      startAt: dayjs(),
      regExp: /^(?:今[天日]|to?day?)(.*)/
    },
    {
      startAt: dayjs().subtract(1, "days"),
      regExp: /^(?:昨[天日]|y(?:ester)?day?)(.*)/
    },
    {
      startAt: dayjs().subtract(2, "days"),
      regExp: /^(?:前天|(?:the)?d(?:ay)?b(?:eforeyesterda)?y)(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(1)) ? dayjs().weekday(1).subtract(1, "week") : dayjs().weekday(1),
      regExp: /^(?:周|星期)一(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(2)) ? dayjs().weekday(2).subtract(1, "week") : dayjs().weekday(2),
      regExp: /^(?:周|星期)二(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(3)) ? dayjs().weekday(3).subtract(1, "week") : dayjs().weekday(3),
      regExp: /^(?:周|星期)三(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(4)) ? dayjs().weekday(4).subtract(1, "week") : dayjs().weekday(4),
      regExp: /^(?:周|星期)四(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(5)) ? dayjs().weekday(5).subtract(1, "week") : dayjs().weekday(5),
      regExp: /^(?:周|星期)五(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(6)) ? dayjs().weekday(6).subtract(1, "week") : dayjs().weekday(6),
      regExp: /^(?:周|星期)六(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(7)) ? dayjs().weekday(7).subtract(1, "week") : dayjs().weekday(7),
      regExp: /^(?:周|星期)[天日](.*)/
    },
    {
      startAt: dayjs().add(1, "days"),
      regExp: /^(?:明[天日]|y(?:ester)?day?)(.*)/
    },
    {
      startAt: dayjs().add(2, "days"),
      regExp: /^(?:[后後][天日]|(?:the)?d(?:ay)?a(?:fter)?t(?:omrrow)?)(.*)/
    }
  ];
}
const patterns = [
  {
    unit: "years",
    regExp: /(\d+)(?:年|y(?:ea)?rs?)/
  },
  {
    unit: "months",
    regExp: /(\d+)(?:[个個]?月|months?)/
  },
  {
    unit: "weeks",
    regExp: /(\d+)(?:周|[个個]?星期|weeks?)/
  },
  {
    unit: "days",
    regExp: /(\d+)(?:天|日|d(?:ay)?s?)/
  },
  {
    unit: "hours",
    regExp: /(\d+)(?:[个個]?(?:小?时|[時点點])|h(?:(?:ou)?r)?s?)/
  },
  {
    unit: "minutes",
    regExp: /(\d+)(?:分[鐘钟]?|m(?:in(?:ute)?)?s?)/
  },
  {
    unit: "seconds",
    regExp: /(\d+)(?:秒[鐘钟]?|s(?:ec(?:ond)?)?s?)/
  }
];
const patternSize = Object.keys(patterns).length;
function toDate(date) {
  return date.toLowerCase().replace(/(^an?\s)|(\san?\s)/g, "1").replace(/几|幾/g, "3").replace(/[\s,]/g, "");
}
function toDurations(matches) {
  const durations = {};
  let p = 0;
  for (const m of matches) {
    for (; p <= patternSize; p++) {
      const match = patterns[p].regExp.exec(m);
      if (match) {
        durations[patterns[p].unit] = match[1];
        break;
      }
    }
  }
  return durations;
}
function parseRelativeDate(date, timezone = "UTC") {
  var _a;
  if (date === "\u521A\u521A") return /* @__PURE__ */ new Date();
  const theDate = toDate(date);
  const matches = theDate.match(/\D*\d+(?![:\-/]|(a|p)m)\D+/g);
  const offset = dayjs.duration({ hours: (dayjs().tz(timezone).utcOffset() - dayjs().utcOffset()) / 60 });
  if (matches) {
    const lastMatch = matches.pop();
    if (lastMatch) {
      const beforeMatches = /(.*)(?:前|ago)$/.exec(lastMatch);
      if (beforeMatches) {
        matches.push(beforeMatches[1]);
        return dayjs().subtract(dayjs.duration(toDurations(matches))).toDate();
      }
      const afterMatches = /(?:^in(.*)|(.*)[后後])$/.exec(lastMatch);
      if (afterMatches) {
        matches.push((_a = afterMatches[1]) != null ? _a : afterMatches[2]);
        return dayjs().add(dayjs.duration(toDurations(matches))).toDate();
      }
      matches.push(lastMatch);
    }
    const firstMatch = matches.shift();
    if (firstMatch) {
      for (const w of words()) {
        const wordMatches = w.regExp.exec(firstMatch);
        if (wordMatches) {
          matches.unshift(wordMatches[1]);
          return dayjs.tz(w.startAt.set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).add(dayjs.duration(toDurations(matches))).add(offset), timezone).toDate();
        }
      }
    }
  } else {
    for (const w of words()) {
      const wordMatches = w.regExp.exec(theDate);
      if (wordMatches) {
        return dayjs.tz(`${w.startAt.add(offset).format("YYYY-MM-DD")} ${/a|pm$/.test(wordMatches[1]) ? wordMatches[1].replace(/a|pm/, " $&") : wordMatches[1]}`, timezone).toDate();
      }
    }
  }
  return date;
}

const quick = defineSource(async () => {
  const baseURL = "https://www.36kr.com";
  const url = `${baseURL}/newsflashes`;
  const response = await myFetch(url);
  const $ = load(response);
  const news = [];
  const $items = $(".newsflash-item");
  $items.each((_, el) => {
    const $el = $(el);
    const $a = $el.find("a.item-title");
    const url2 = $a.attr("href");
    const title = $a.text();
    const relativeDate = $el.find(".time").text();
    if (url2 && title && relativeDate) {
      news.push({
        url: `${baseURL}${url2}`,
        title,
        id: url2,
        extra: {
          date: parseRelativeDate(relativeDate, "Asia/Shanghai").valueOf()
        }
      });
    }
  });
  return news;
});
const renqi = defineSource(async () => {
  var _a;
  const baseURL = "https://36kr.com";
  const response = await myFetch("https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Referer": `${baseURL}/`
    },
    body: {
      partner_id: "wap",
      param: {
        siteId: 1,
        platformId: 2
      },
      timestamp: Date.now()
    }
  });
  const ranking = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.hotRankList;
  if (!Array.isArray(ranking) || ranking.length === 0) {
    throw new Error("36\u6C2A\u4EBA\u6C14\u699C\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6570\u636E");
  }
  const items = ranking.filter((item) => {
    var _a2;
    return item.itemId && ((_a2 = item.templateMaterial) == null ? void 0 : _a2.widgetTitle);
  }).map((item) => {
    var _a2;
    const material = item.templateMaterial;
    return {
      id: String(item.itemId),
      title: material.widgetTitle,
      url: `${baseURL}/p/${item.itemId}`,
      pubDate: (_a2 = material.publishTime) != null ? _a2 : item.publishTime,
      extra: {
        info: [material.authorName, material.statFormat || (material.statRead !== void 0 ? `${material.statRead} \u9605\u8BFB` : "")].filter(Boolean).join(" \xB7 ")
      }
    };
  });
  if (items.length === 0) throw new Error("36\u6C2A\u4EBA\u6C14\u699C\u6570\u636E\u7F3A\u5C11\u5FC5\u8981\u5B57\u6BB5");
  return items;
});
const _36kr = defineSource({
  "36kr": quick,
  "36kr-quick": quick,
  "36kr-renqi": renqi
});

const _36kr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _36kr
});

const baidu = defineSource(async () => {
  const rawData = await myFetch(`https://top.baidu.com/board?tab=realtime`);
  const jsonStr = rawData.match(/<!--s-data:(.*?)-->/s);
  const data = JSON.parse(jsonStr[1]);
  return data.data.cards[0].content.filter((k) => !k.isTop).map((k) => {
    return {
      id: k.rawUrl,
      title: k.word,
      url: k.rawUrl,
      extra: {
        hover: k.desc
      }
    };
  });
});

const baidu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: baidu
});

const hotSearch$1 = defineSource(async () => {
  const data = await myFetch("https://s.search.bilibili.com/main/hotword", {
    headers: { Referer: "https://www.bilibili.com/" }
  });
  const list = data == null ? void 0 : data.list;
  if (!Array.isArray(list) || list.length === 0) throw new Error("B \u7AD9\u70ED\u8BCD\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6570\u636E");
  return list.map((item) => {
    var _a, _b, _c;
    return {
      id: String((_a = item.hot_id) != null ? _a : item.keyword),
      title: item.show_name || item.keyword,
      url: `https://search.bilibili.com/all?keyword=${encodeURIComponent((_b = item.keyword) != null ? _b : "")}`,
      extra: {
        info: "\u70ED\u641C",
        hover: (_c = item.keyword) != null ? _c : ""
      }
    };
  });
});
const hotVideo = defineSource(async () => {
  var _a;
  const data = await myFetch("https://api.bilibili.com/x/web-interface/popular?ps=50&pn=1", {
    headers: { Referer: "https://www.bilibili.com/" }
  });
  const list = (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.list;
  if (!Array.isArray(list) || list.length === 0) throw new Error("B \u7AD9\u70ED\u95E8\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6570\u636E");
  return list.map((item) => {
    var _a2, _b;
    return {
      id: String((_a2 = item.bvid) != null ? _a2 : item.aid),
      title: item.title,
      url: item.bvid ? `https://www.bilibili.com/video/${item.bvid}` : "https://www.bilibili.com",
      pubDate: item.pubdate ? item.pubdate * 1e3 : void 0,
      extra: {
        info: (_b = item.tname) != null ? _b : "",
        hover: typeof item.desc === "string" ? item.desc.slice(0, 200) : ""
      }
    };
  });
});
const ranking = defineSource(async () => {
  const data = await myFetch("https://api.bilibili.com/x/web-interface/ranking/index?day=3", {
    headers: { Referer: "https://www.bilibili.com/" }
  });
  const list = data == null ? void 0 : data.data;
  if (!Array.isArray(list) || list.length === 0) throw new Error("B \u7AD9\u6392\u884C\u699C\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6570\u636E");
  return list.map((item) => {
    var _a;
    return {
      id: String((_a = item.bvid) != null ? _a : item.aid),
      title: item.title,
      url: item.bvid ? `https://www.bilibili.com/video/${item.bvid}` : "https://www.bilibili.com",
      extra: {
        info: [item.author, item.typename].filter(Boolean).join(" \xB7 "),
        hover: typeof item.description === "string" ? item.description.slice(0, 200) : ""
      }
    };
  });
});
const bilibili = defineSource({
  "bilibili": hotSearch$1,
  "bilibili-hot-search": hotSearch$1,
  "bilibili-hot-video": hotVideo,
  "bilibili-ranking": ranking
});

const bilibili$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: bilibili
});

const cankaoxiaoxi = defineSource(async () => {
  const res = await Promise.all(["zhongguo", "guandian", "gj"].map((k) => myFetch(`https://china.cankaoxiaoxi.com/json/channel/${k}/list.json`)));
  return res.map((k) => k.list).flat().map((k) => ({
    id: k.data.id,
    title: k.data.title,
    extra: {
      date: tranformToUTC(k.data.publishTime)
    },
    url: k.data.url
  })).sort((m, n) => m.extra.date < n.extra.date ? 1 : -1);
});

const cankaoxiaoxi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: cankaoxiaoxi
});

const hot$3 = defineSource(async () => {
  const baseUrl = "https://www.chongbuluo.com/";
  const html = await myFetch(`${baseUrl}forum.php?mod=guide&view=hot`);
  const $ = cheerio.load(html);
  const news = [];
  $(".bmw table tr").each((_, elem) => {
    const xst = $(elem).find(".common .xst").text();
    const url = $(elem).find(".common a").attr("href");
    news.push({
      id: baseUrl + url,
      url: baseUrl + url,
      title: xst,
      extra: {
        hover: xst
      }
    });
  });
  return news;
});
const latest$3 = defineRSSSource("https://www.chongbuluo.com/forum.php?mod=rss&view=newthread");
const chongbuluo = defineSource({
  "chongbuluo": hot$3,
  "chongbuluo-hot": hot$3,
  "chongbuluo-latest": latest$3
});

const chongbuluo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: chongbuluo
});

const subtle = subtle$1;
async function md5(s) {
  try {
    return await myCrypto(s, "MD5");
  } catch {
    return _md5(s);
  }
}
async function myCrypto(s, algorithm) {
  const sUint8 = new TextEncoder().encode(s);
  const hashBuffer = await subtle.digest(algorithm, sUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

const params = {
  appName: "CailianpressWeb",
  os: "web",
  sv: "7.7.5"
};
async function getSearchParams(moreParams) {
  const searchParams = new URLSearchParams({ ...params, ...moreParams });
  searchParams.sort();
  searchParams.append("sign", await md5(await myCrypto(searchParams.toString(), "SHA-1")));
  return searchParams;
}

const depth = defineSource(async () => {
  const apiUrl = `https://www.cls.cn/v3/depth/home/assembled/1000`;
  const res = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams())
  });
  return res.data.depth_list.sort((m, n) => n.ctime - m.ctime).map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      pubDate: k.ctime * 1e3,
      url: `https://www.cls.cn/detail/${k.id}`
    };
  });
});
const hot$2 = defineSource(async () => {
  const apiUrl = `https://www.cls.cn/v2/article/hot/list`;
  const res = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams())
  });
  return res.data.map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      url: `https://www.cls.cn/detail/${k.id}`
    };
  });
});
const telegraph = defineSource(async () => {
  var _a;
  const apiUrl = "https://www.cls.cn/v1/roll/get_roll_list";
  const res = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams())
  });
  const rollData = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.roll_data;
  if (!Array.isArray(rollData) || rollData.length === 0) {
    throw new Error("\u8D22\u8054\u793E\u7535\u62A5\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6570\u636E");
  }
  const items = rollData.filter((k) => !k.is_ad && (k.title || k.brief)).map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      pubDate: k.ctime * 1e3,
      url: `https://www.cls.cn/detail/${k.id}`
    };
  });
  if (items.length === 0) throw new Error("\u8D22\u8054\u793E\u7535\u62A5\u63A5\u53E3\u6CA1\u6709\u53EF\u7528\u6761\u76EE");
  return items;
});
const index$8 = defineSource({
  "cls": telegraph,
  "cls-telegraph": telegraph,
  "cls-depth": depth,
  "cls-hot": hot$2
});

const index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$8
});

function encodeBase64(str) {
  return Buffer$1.from(str).toString("base64");
}

function getRandomDEVICE_ID() {
  const r = [10, 6, 6, 6, 14];
  const id = r.map((i) => Math.random().toString(36).substring(2, i));
  return id.join("-");
}
async function get_app_token() {
  const DEVICE_ID = getRandomDEVICE_ID();
  const now = Math.round(Date.now() / 1e3);
  const hex_now = `0x${now.toString(16)}`;
  const md5_now = await md5(now.toString());
  const s = `token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?${md5_now}$${DEVICE_ID}&com.coolapk.market`;
  const md5_s = await md5(encodeBase64(s));
  const token = md5_s + DEVICE_ID + hex_now;
  return token;
}
async function genHeaders() {
  return {
    "X-Requested-With": "XMLHttpRequest",
    "X-App-Id": "com.coolapk.market",
    "X-App-Token": await get_app_token(),
    "X-Sdk-Int": "29",
    "X-Sdk-Locale": "zh-CN",
    "X-App-Version": "11.0",
    "X-Api-Version": "11",
    "X-App-Code": "2101202",
    "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; Redmi K30 5G MIUI/V12.0.3.0.QGICMXM) (#Build; Redmi; Redmi K30 5G; QKQ1.191222.002 test-keys; 10) +CoolMarket/11.0-2101202"
  };
}

const index$6 = defineSource({
  coolapk: async () => {
    const url = "https://api.coolapk.com/v6/page/dataList?url=%2Ffeed%2FstatList%3FcacheExpires%3D300%26statType%3Dday%26sortField%3Ddetailnum%26title%3D%E4%BB%8A%E6%97%A5%E7%83%AD%E9%97%A8&title=%E4%BB%8A%E6%97%A5%E7%83%AD%E9%97%A8&subTitle=&page=1";
    const r = await myFetch(url, {
      headers: await genHeaders()
    });
    if (!r.data.length) throw new Error("Failed to fetch");
    return r.data.filter((k) => k.id).map((i) => {
      var _a;
      return {
        id: i.id,
        title: i.editor_title || load(i.message).text().split("\n")[0],
        url: `https://www.coolapk.com${i.url}`,
        extra: {
          info: (_a = i.targetRow) == null ? void 0 : _a.subTitle
          // date: new Date(i.dateline * 1000).getTime(),
        }
      };
    });
  }
});

const index$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$6
});

const douban = defineSource(async () => {
  const baseURL = "https://m.douban.com/rexxar/api/v2/subject/recent_hot/movie";
  const res = await myFetch(baseURL, {
    headers: {
      Referer: "https://movie.douban.com/",
      Accept: "application/json, text/plain, */*"
    }
  });
  return res.items.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: `https://movie.douban.com/subject/${movie.id}`,
    extra: {
      info: movie.card_subtitle.split(" / ").slice(0, 3).join(" / "),
      hover: movie.card_subtitle
    }
  }));
});

const douban$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: douban
});

const douyin = defineSource(async () => {
  const url = "https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1";
  const cookie = (await $fetch.raw("https://login.douyin.com/")).headers.getSetCookie();
  const res = await myFetch(url, {
    headers: {
      cookie: cookie.join("; ")
    }
  });
  return res.data.word_list.map((k) => {
    return {
      id: k.sentence_id,
      title: k.word,
      url: `https://www.douyin.com/hot/${k.sentence_id}`
    };
  });
});

const douyin$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: douyin
});

const express = defineSource(async () => {
  const baseURL = "https://www.fastbull.com";
  const html = await myFetch(`${baseURL}/cn/express-news`);
  const $ = cheerio.load(html);
  const $main = $(".news-list");
  const news2 = [];
  $main.each((_, el) => {
    var _a, _b, _c;
    const a = $(el).find(".title_name");
    const titleText = a.text().trim();
    const title = (_b = (_a = titleText.match(/【(.+)】/)) == null ? void 0 : _a[1]) != null ? _b : titleText;
    const date = $(el).attr("data-date");
    const id = (_c = $(el).attr("data-id")) != null ? _c : `${date}-${title.slice(0, 24)}`;
    if (title && date) {
      news2.push({
        url: `${baseURL}/cn/express-news`,
        title: title.length < 4 ? titleText : title,
        id,
        pubDate: Number(date)
      });
    }
  });
  return news2;
});
const news$1 = defineSource(async () => {
  const baseURL = "https://www.fastbull.com";
  const html = await myFetch(`${baseURL}/cn/news`);
  const $ = cheerio.load(html);
  const $main = $(".trending_type");
  const news2 = [];
  $main.each((_, el) => {
    const a = $(el);
    const url = a.attr("href");
    const title = a.find(".title").text();
    const date = a.find("[data-date]").attr("data-date");
    if (url && title && date) {
      news2.push({
        url: baseURL + url,
        title,
        id: url,
        pubDate: Number(date)
      });
    }
  });
  return news2;
});
const fastbull = defineSource(
  {
    "fastbull": express,
    "fastbull-express": express,
    "fastbull-news": news$1
  }
);

const fastbull$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fastbull
});

function defineForeignSource(url) {
  return async () => {
    const gateway = "https://api.rss2json.com/v1/api.json?rss_url=";
    const target = gateway + encodeURIComponent(url);
    const res = await myFetch(target);
    if (res.status !== "ok") {
      throw new Error(`Failed to fetch foreign source via proxy: ${url}`);
    }
    return res.items.map((item) => ({
      id: item.link || item.guid,
      title: item.title,
      url: item.link,
      pubDate: item.pubDate,
      // RSS2JSON returns "2024-01-01 12:00:00" format usually
      extra: {
        info: item.author || item.pubDate,
        hover: item.description
      }
    }));
  };
}

const aeon = defineSource({
  aeon: defineForeignSource("https://aeon.co/feed.rss")
});

const aeon$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: aeon
});

const farnam_street = defineSource({
  "farnam-street": defineForeignSource("https://fs.blog/feed/")
});

const farnam_street$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: farnam_street
});

const google_alert_musk = defineSource({
  "google-alert-musk": defineForeignSource("https://www.google.com/alerts/feeds/04523461521629564221/11282325001568930399")
});

const google_alert_musk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: google_alert_musk
});

const lennys = defineSource({
  lennys: defineForeignSource("https://www.lennysnewsletter.com/feed")
});

const lennys$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: lennys
});

const paul_graham = defineSource({
  "paul-graham": defineForeignSource("https://filipesilva.github.io/paulgraham-rss/feed.rss")
});

const paul_graham$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: paul_graham
});

const psyche = defineSource({
  psyche: defineForeignSource("https://psyche.co/feed")
});

const psyche$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: psyche
});

const reddit_ai_monitor = defineSource({
  "reddit-ai-monitor": defineRSSSource("https://www.reddit.com/r/artificial/.rss", {
    request: {
      headers: {
        "User-Agent": "newsnow:v0.0.40 (source health monitor)",
        "Accept": "application/atom+xml, application/xml;q=0.9, */*;q=0.8"
      },
      retry: 0
    }
  })
});

const reddit_ai_monitor$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reddit_ai_monitor
});

const robertheaton = defineSource({
  robertheaton: defineForeignSource("https://robertheaton.com/feed.xml")
});

const robertheaton$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: robertheaton
});

const ruanyifeng = defineSource({
  ruanyifeng: defineForeignSource("http://www.ruanyifeng.com/blog/atom.xml")
});

const ruanyifeng$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ruanyifeng
});

const stratechery = defineSource({
  stratechery: defineForeignSource("https://stratechery.com/feed/")
});

const stratechery$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: stratechery
});

const tldr = defineSource({
  tldr: defineForeignSource("https://tldr.tech/api/rss/tech")
});

const tldr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tldr
});

const freebuf = defineSource(async () => {
  var _a;
  const baseURL = "https://www.freebuf.com";
  const response = await myFetch(`${baseURL}/fapi/frontend/home/article`, {
    query: {
      page: 1,
      limit: 20,
      type: 1
    },
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Referer": `${baseURL}/`
    }
  });
  const articles = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.list;
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("FreeBuf \u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u6587\u7AE0");
  }
  const items = articles.filter((article) => article.ID && article.post_title && article.url).map((article) => {
    var _a2;
    return {
      id: String(article.ID),
      title: article.post_title,
      url: new URL(article.url, baseURL).toString(),
      pubDate: article.post_date,
      extra: {
        info: [article.nickname, article.category, article.read_count !== void 0 ? `${article.read_count} \u9605\u8BFB` : ""].filter(Boolean).join(" \xB7 "),
        hover: (_a2 = article.content) != null ? _a2 : ""
      }
    };
  });
  if (items.length === 0) throw new Error("FreeBuf \u63A5\u53E3\u8FD4\u56DE\u7684\u6587\u7AE0\u7F3A\u5C11\u5FC5\u8981\u5B57\u6BB5");
  return items;
});

const freebuf$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: freebuf
});

const gelonghui = defineSource(async () => {
  const baseURL = "https://www.gelonghui.com";
  const html = await myFetch("https://www.gelonghui.com/news/");
  const $ = cheerio.load(html);
  const $main = $(".article-content");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find(".detail-right>a");
    const url = a.attr("href");
    const title = a.find("h2").text();
    const info = $(el).find(".time > span:nth-child(1)").text();
    const relatieveTime = $(el).find(".time > span:nth-child(3)").text();
    if (url && title && relatieveTime) {
      news.push({
        url: baseURL + url,
        title,
        id: url,
        extra: {
          date: parseRelativeDate(relatieveTime, "Asia/Shanghai").valueOf(),
          info
        }
      });
    }
  });
  return news;
});

const gelonghui$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: gelonghui
});

const relativeTimeToDate = function(timeStr) {
  const units = {
    \u79D2: 1e3,
    \u5206\u949F: 60 * 1e3,
    \u5C0F\u65F6: 60 * 60 * 1e3,
    \u5929: 24 * 60 * 60 * 1e3,
    \u5468: 7 * 24 * 60 * 60 * 1e3,
    \u6708: 30 * 24 * 60 * 60 * 1e3,
    \u5E74: 365 * 24 * 60 * 60 * 1e3
  };
  const match = timeStr.match(/^(\d+)\s*([秒天周月年]|分钟|小时)/);
  if (!match) {
    return "";
  }
  const num = Number.parseInt(match[1]);
  const unit = match[2];
  const msAgo = num * units[unit];
  return new Date(Date.now() - msAgo).valueOf();
};
const source$1 = defineSource(async () => {
  const html = await myFetch("https://www.ghxi.com/category/all");
  const $ = cheerio.load(html);
  const news = [];
  $(".sec-panel .sec-panel-body .post-loop li").each((_, elem) => {
    let summary_title = $(elem).find(".item-content .item-title").text();
    if (summary_title) {
      summary_title = summary_title.trim();
      summary_title = summary_title.replaceAll("'", "''");
    }
    let summary_description = $(elem).find(".item-content .item-excerpt").text();
    if (summary_description) {
      summary_description = summary_description.trim();
      summary_description = summary_description.replaceAll("'", "''");
    }
    const date = $(elem).find(".item-content .date").text();
    const url = $(elem).find(".item-content .item-title a").attr("href");
    if (url) {
      news.push({
        id: url,
        url,
        title: summary_title,
        extra: {
          hover: summary_description,
          date: relativeTimeToDate(date)
        }
      });
    }
  });
  return news;
});
const ghxi = proxySource("https://newsnow-omega-one.vercel.app/api/s?id=ghxi&latest=", source$1);

const ghxi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ghxi
});

const trending = defineSource(async () => {
  const baseURL = "https://github.com";
  const html = await myFetch("https://github.com/trending?spoken_language_code=");
  const $ = cheerio.load(html);
  const $main = $("main .Box div[data-hpc] > article");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find(">h2 a");
    const title = a.text().replace(/\n+/g, "").trim();
    const url = a.attr("href");
    const star = $(el).find("[href$=stargazers]").text().replace(/\s+/g, "").trim();
    const desc = $(el).find(">p").text().replace(/\n+/g, "").trim();
    if (url && title) {
      news.push({
        url: `${baseURL}${url}`,
        title,
        id: url,
        extra: {
          info: `\u2730 ${star}`,
          hover: desc
        }
      });
    }
  });
  return news;
});
const github$2 = defineSource({
  "github": trending,
  "github-trending-today": trending
});

const github$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: github$2
});

const hackernews = defineSource(async () => {
  const baseURL = "https://news.ycombinator.com";
  const html = await myFetch(baseURL);
  const $ = cheerio.load(html);
  const $main = $(".athing");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find(".titleline a").first();
    const title = a.text();
    const id = $(el).attr("id");
    const score = $(`#score_${id}`).text();
    const url = `${baseURL}/item?id=${id}`;
    if (url && id && title) {
      news.push({
        url,
        title,
        id,
        extra: {
          info: score
        }
      });
    }
  });
  return news;
});

const hackernews$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hackernews
});

const hupu = defineSource(async () => {
  const html = await myFetch(`https://bbs.hupu.com/topic-daily-hot`);
  const regex = /<li class="bbs-sl-web-post-body">[\s\S]*?<a href="(\/[^"]+?\.html)"[^>]*?class="p-title"[^>]*>([^<]+)<\/a>/g;
  const result = [];
  let match;
  while (true) {
    match = regex.exec(html);
    if (!match) break;
    const [, path, title] = match;
    const url = `https://bbs.hupu.com${path}`;
    result.push({
      id: path,
      title: title.trim(),
      url,
      mobileUrl: url
    });
  }
  return result;
});

const hupu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hupu
});

const ifeng = defineSource(async () => {
  const html = await myFetch("https://www.ifeng.com/");
  const regex = /var\s+allData\s*=\s*(\{[\s\S]*?\});/;
  const match = regex.exec(html);
  const news = [];
  if (match) {
    const realData = JSON.parse(match[1]);
    const rawNews = realData.hotNews1;
    rawNews.forEach((hotNews) => {
      news.push({
        id: hotNews.url,
        url: hotNews.url,
        title: hotNews.title,
        extra: {
          date: hotNews.newsTime
        }
      });
    });
  }
  return news;
});

const ifeng$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ifeng
});

const hotRankList = defineSource(async () => {
  var _a, _b;
  const url = "https://mesh.if.iqiyi.com/portal/lw/v7/channel/card/videoTab?channelName=recommend&data_source=v7_rec_sec_hot_rank_list&tempId=85&count=30&block_id=hot_ranklist&device=14a4b5ba98e790dce6dc07482447cf48&from=webapp";
  const resp = await myFetch(url, {
    headers: { Referer: "https://www.iqiyi.com" }
  });
  return (_b = (_a = resp == null ? void 0 : resp.items[0]) == null ? void 0 : _a.video[0]) == null ? void 0 : _b.data.map((item) => {
    return {
      id: item.entity_id,
      title: item.title,
      url: item.page_url,
      pubDate: item == null ? void 0 : item.showDate,
      extra: {
        info: item.desc,
        hover: item.description,
        tag: item.tag
      }
    };
  });
});
const iqiyi = defineSource({
  "iqiyi-hot-ranklist": hotRankList
});

const iqiyi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: iqiyi
});

const ithome = defineSource(async () => {
  const response = await myFetch("https://www.ithome.com/list/");
  const $ = cheerio.load(response);
  const $main = $("#list > div.fl > ul > li");
  const news = [];
  $main.each((_, el) => {
    const $el = $(el);
    const $a = $el.find("a.t");
    const url = $a.attr("href");
    const title = $a.text();
    const date = $(el).find("i").text();
    if (url && title && date) {
      const isAd = (url == null ? void 0 : url.includes("lapin")) || ["\u795E\u5238", "\u4F18\u60E0", "\u8865\u8D34", "\u4EAC\u4E1C"].find((k) => title.includes(k));
      if (!isAd) {
        news.push({
          url,
          title,
          id: url,
          pubDate: parseRelativeDate(date, "Asia/Shanghai").valueOf()
        });
      }
    }
  });
  return news.sort((m, n) => n.pubDate > m.pubDate ? 1 : -1);
});

const ithome$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ithome
});

const jin10 = defineSource(async () => {
  const timestamp = Date.now();
  const url = `https://www.jin10.com/flash_newest.js?t=${timestamp}`;
  const rawData = await myFetch(url);
  const jsonStr = rawData.replace(/^var\s+newest\s*=\s*/, "").replace(/;*$/, "").trim();
  const data = JSON.parse(jsonStr);
  return data.filter((k) => {
    var _a;
    return (k.data.title || k.data.content) && !((_a = k.channel) == null ? void 0 : _a.includes(5));
  }).map((k) => {
    var _a;
    const text = (k.data.title || k.data.content).replace(/<\/?b>/g, "");
    const [, title, desc] = (_a = text.match(/^【([^】]*)】(.*)$/)) != null ? _a : [];
    return {
      id: k.id,
      title: title != null ? title : text,
      pubDate: parseRelativeDate(k.time, "Asia/Shanghai").valueOf(),
      url: `https://flash.jin10.com/detail/${k.id}`,
      extra: {
        hover: desc,
        info: !!k.important && "\u2730"
      }
    };
  });
});

const jin10$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: jin10
});

const juejin = defineSource(async () => {
  const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&spider=0`;
  const res = await myFetch(url);
  return res.data.map((k) => {
    const url2 = `https://juejin.cn/post/${k.content.content_id}`;
    return {
      id: k.content.content_id,
      title: k.content.title,
      url: url2
    };
  });
});

const juejin$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: juejin
});

const kaopu = defineSource(
  async () => {
    const res = await $fetch("https://kaopustorage.blob.core.windows.net/news-prod/news_list_hans_0.json");
    return res.filter((k) => ["\u8D22\u65B0", "\u516C\u89C6"].every((h) => k.publisher !== h)).map((k) => {
      return {
        id: k.link,
        title: k.title,
        pubDate: k.pub_date,
        extra: {
          hover: k.description,
          info: k.publisher
        },
        url: k.link
      };
    });
  }
);

const kaopu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: kaopu
});

const kuaishou = defineSource(async () => {
  const html = await myFetch("https://www.kuaishou.com/?isHome=1");
  const matches = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.+?\});/);
  if (!matches) {
    throw new Error("\u65E0\u6CD5\u83B7\u53D6\u5FEB\u624B\u70ED\u699C\u6570\u636E");
  }
  const data = JSON.parse(matches[1]);
  const hotRankId = data.defaultClient.ROOT_QUERY['visionHotRank({"page":"home"})'].id;
  const hotRankData = data.defaultClient[hotRankId];
  return hotRankData.items.filter((k) => data.defaultClient[k.id].tagType !== "\u7F6E\u9876").map((item) => {
    const hotSearchWord = item.id.replace("VisionHotRankItem:", "");
    const hotItem = data.defaultClient[item.id];
    return {
      id: hotSearchWord,
      title: hotItem.name,
      url: `https://www.kuaishou.com/search/video?searchKey=${encodeURIComponent(hotItem.name)}`,
      extra: {
        icon: hotItem.iconUrl
      }
    };
  });
});

const kuaishou$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: kuaishou
});

const latepost = defineSource(async () => {
  const url = "https://www.latepost.com/";
  const html = await myFetch(url);
  const $ = cheerio.load(html);
  const items = [];
  $(".headlines-title a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const title = $(el).text().trim();
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`;
      items.push({ id: u, title, url: u });
    }
  });
  $(".Newsletter-li-title").each((_, el) => {
    const a = $(el).closest("a");
    const href = a.attr("href") || "";
    const title = $(el).text().trim();
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`;
      items.push({ id: u, title, url: u });
    }
  });
  $(".Q-A-title").each((_, el) => {
    const a = $(el).closest("a");
    const href = a.attr("href") || "";
    const title = $(el).text().trim();
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`;
      items.push({ id: u, title, url: u });
    }
  });
  $(".oldNewsletter-title").each((_, el) => {
    const href = $(el).attr("href") || "";
    const title = $(el).text().trim();
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`;
      items.push({ id: u, title, url: u });
    }
  });
  const seen = /* @__PURE__ */ new Set();
  const unique = items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
  return unique.slice(0, 30);
});

const latepost$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: latepost
});

const hot$1 = defineSource(async () => {
  const res = await myFetch("https://linux.do/top/daily.json");
  return res.topic_list.topics.filter((k) => k.visible && !k.archived && !k.pinned).map((k) => ({
    id: k.id,
    title: k.title,
    url: `https://linux.do/t/topic/${k.id}`
  }));
});
const latest$2 = defineSource(async () => {
  const res = await myFetch("https://linux.do/latest.json?order=created");
  return res.topic_list.topics.filter((k) => k.visible && !k.archived && !k.pinned).map((k) => ({
    id: k.id,
    title: k.title,
    pubDate: new Date(k.created_at).valueOf(),
    url: `https://linux.do/t/topic/${k.id}`
  }));
});
const linuxdo = defineSource({
  "linuxdo": latest$2,
  "linuxdo-latest": latest$2,
  "linuxdo-hot": hot$1
});

const linuxdo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: linuxdo
});

const flash = defineSource(async () => {
  const res = await myFetch("https://api.mktnews.net/api/flash?type=0&limit=50");
  return res.data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).map((item) => {
    var _a;
    return {
      id: item.id,
      title: item.data.title || ((_a = item.data.content.match(/^【([^】]*)】(.*)$/)) == null ? void 0 : _a[1]) || item.data.content,
      pubDate: item.time,
      extra: {
        info: item.important === 1 ? "Important" : void 0,
        hover: item.data.content
      },
      url: `https://mktnews.net/flashDetail.html?id=${item.id}`
    };
  });
});
const mktnews = defineSource({
  "mktnews": flash,
  "mktnews-flash": flash
});

const mktnews$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mktnews
});

const nowcoder = defineSource(async () => {
  const timestamp = Date.now();
  const url = `https://gw-c.nowcoder.com/api/sparta/hot-search/top-hot-pc?size=20&_=${timestamp}&t=`;
  const res = await myFetch(url);
  return res.data.result.map((k) => {
    let url2, id;
    if (k.type === 74) {
      url2 = `https://www.nowcoder.com/feed/main/detail/${k.uuid}`;
      id = k.uuid;
    } else if (k.type === 0) {
      url2 = `https://www.nowcoder.com/discuss/${k.id}`;
      id = k.id;
    }
    return {
      id,
      title: k.title,
      url: url2
    };
  });
});

const nowcoder$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: nowcoder
});

const openai = defineSource({
  openai: async () => {
    const url = "https://openai.com/news/research/";
    const res = await myFetch(url);
    const $ = load(res);
    return $("a[href^='/index/']").map((_, el) => {
      const $el = $(el);
      const title = $el.find(".text-h5").text().trim();
      const href = $el.attr("href");
      const date = $el.find("time").text().trim();
      return {
        id: href != null ? href : "",
        title: title || "OpenAI Research",
        url: (href == null ? void 0 : href.startsWith("http")) ? href : `https://openai.com${href}`,
        extra: {
          info: date
        }
      };
    }).get();
  }
});

const openai$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: openai
});

const pcbeta = defineSource({
  "pcbeta-windows11": defineRSSSource("https://bbs.pcbeta.com/forum.php?mod=rss&fid=563&auth=0"),
  "pcbeta-windows": defineRSSSource("https://bbs.pcbeta.com/forum.php?mod=rss&fid=521&auth=0")
});

const pcbeta$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: pcbeta
});

const producthunt = defineSource(async () => {
  var _a, _b;
  const apiToken = process$1.env.PRODUCTHUNT_API_TOKEN;
  const token = `Bearer ${apiToken}`;
  if (!apiToken) {
    throw new Error("PRODUCTHUNT_API_TOKEN is not set");
  }
  const query = `
    query {
      posts(first: 30, order: VOTES) {
        edges {
          node {
            id
            name
            tagline
            votesCount
            url
            slug
          }
        }
      }
    }
  `;
  const response = await myFetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ query })
  });
  const news = [];
  const posts = ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.posts) == null ? void 0 : _b.edges) || [];
  for (const edge of posts) {
    const post = edge.node;
    if (post.id && post.name) {
      news.push({
        id: post.id,
        title: post.name,
        url: post.url || `https://www.producthunt.com/posts/${post.slug}`,
        extra: {
          info: ` \u25B3\uFE0E ${post.votesCount || 0}`,
          hover: post.tagline
        }
      });
    }
  }
  return news;
});

const producthunt$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: producthunt
});

const qbitai = defineSource(async () => {
  const url = "https://www.qbitai.com/feed";
  const rss = await myFetch(url, {
    headers: { Accept: "application/rss+xml, application/xml" },
    responseType: "text"
  });
  const $ = cheerio.load(rss, { xmlMode: true });
  const items = [];
  $("item").each((_, el) => {
    const title = $("title", el).text().trim();
    const link = $("link", el).text().trim();
    const pubDate = $("pubDate", el).text().trim();
    if (title && link) {
      items.push({ id: link, title, url: link, pubDate });
    }
  });
  return items;
});

const qbitai$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: qbitai
});

const hotSearch = defineSource(async () => {
  var _a, _b, _c, _d, _e;
  const url = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getCard?video_appid=3000010&vversion_platform=2";
  const resp = await myFetch(url, {
    method: "POST",
    headers: { Referer: "https://v.qq.com/" },
    body: {
      page_params: {
        rank_channel_id: "100113",
        rank_name: "HotSearch",
        rank_page_size: "30",
        tab_mvl_sub_mod_id: "792ac_19e77Sub_1b2",
        tab_name: "\u70ED\u641C\u699C",
        tab_type: "hot_rank",
        tab_vl_data_src: "f5200deb4596bbf3",
        page_id: "scms_shake",
        page_type: "scms_shake",
        source_key: "",
        tag_id: "",
        tag_type: "",
        new_mark_label_enabled: "1"
      },
      page_context: {
        page_index: "1"
      },
      flip_info: {
        page_strategy_id: "",
        page_module_id: "792ac_19e77",
        module_strategy_id: {},
        sub_module_id: "20251106065177",
        flip_params: {
          folding_screen_show_num: "",
          is_mvl: "1",
          mvl_strategy_info: '{"default_strategy_id":"06755800b45b49238582a6fa1ad0f5c5","default_version":"3836","hit_page_uuid":"b5080d97dc694a5fb50eb9e7c99326ac","hit_tab_info":null,"gray_status_info":null,"bypass_to_un_exp_id":""}',
          mvl_sub_mod_id: "20251106065177",
          pad_post_show_num: "",
          pad_pro_post_show_num: "",
          pad_pro_small_hor_pic_display_num: "",
          pad_small_hor_pic_display_num: "",
          page_id: "scms_shake",
          page_num: "0",
          page_type: "scms_shake",
          post_show_num: "",
          shake_size: "",
          small_hor_pic_display_num: "",
          source_key: "100113",
          un_policy_id: "06755800b45b49238582a6fa1ad0f5c5",
          un_strategy_id: "06755800b45b49238582a6fa1ad0f5c5"
        },
        relace_children_key: []
      }
    }
  });
  return (_e = (_d = (_c = (_b = (_a = resp == null ? void 0 : resp.data) == null ? void 0 : _a.card) == null ? void 0 : _b.children_list) == null ? void 0 : _c.list) == null ? void 0 : _d.cards) == null ? void 0 : _e.map((item) => {
    var _a2, _b2, _c2, _d2;
    return {
      id: item == null ? void 0 : item.id,
      title: (_a2 = item == null ? void 0 : item.params) == null ? void 0 : _a2.title,
      url: getQqVideoUrl(item == null ? void 0 : item.id),
      pubDate: (_c2 = (_b2 = item == null ? void 0 : item.params) == null ? void 0 : _b2.publish_date) != null ? _c2 : getTodaySlash(),
      extra: {
        hover: (_d2 = item == null ? void 0 : item.params) == null ? void 0 : _d2.sub_title
      }
    };
  });
});
function getQqVideoUrl(cid) {
  return `https://v.qq.com/x/cover/${cid}.html`;
}
function getTodaySlash() {
  return dayjs().format("YYYY-MM-DD");
}
const qqvideo = defineSource({
  "qqvideo-tv-hotsearch": hotSearch
});

const qqvideo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: qqvideo
});

const smzdm = defineSource(async () => {
  const baseURL = "https://post.smzdm.com/hot_1/";
  const html = await myFetch(baseURL);
  const $ = cheerio.load(html);
  const $main = $("#feed-main-list .z-feed-title");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find("a");
    const url = a.attr("href");
    const title = a.text();
    news.push({
      url,
      title,
      id: url
    });
  });
  return news;
});

const smzdm$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: smzdm
});

const solidot = defineSource(async () => {
  const baseURL = "https://www.solidot.org";
  const html = await myFetch(baseURL);
  const $ = cheerio.load(html);
  const $main = $(".block_m");
  const news = [];
  $main.each((_, el) => {
    var _a;
    const a = $(el).find(".bg_htit a").last();
    const url = a.attr("href");
    const title = a.text();
    const date_raw = (_a = $(el).find(".talk_time").text().match(/发表于(.*?分)/)) == null ? void 0 : _a[1];
    const date = date_raw == null ? void 0 : date_raw.replace(/[年月]/g, "-").replace("\u65F6", ":").replace(/[分日]/g, "");
    if (url && title && date) {
      news.push({
        url: baseURL + url,
        title,
        id: url,
        pubDate: parseRelativeDate(date, "Asia/Shanghai").valueOf()
      });
    }
  });
  return news;
});

const solidot$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: solidot
});

const source = defineSource(async () => {
  const response = await myFetch("https://sputniknews.cn/services/widget/lenta/");
  const $ = cheerio.load(response);
  const $items = $(".lenta__item");
  const news = [];
  $items.each((_, el) => {
    const $el = $(el);
    const $a = $el.find("a");
    const url = $a.attr("href");
    const title = $a.find(".lenta__item-text").text();
    const date = $a.find(".lenta__item-date").attr("data-unixtime");
    if (url && title && date) {
      news.push({
        url: `https://sputniknews.cn${url}`,
        title,
        id: url,
        extra: {
          date: new Date(Number(`${date}000`)).getTime()
        }
      });
    }
  });
  return news;
});
const sputniknewscn = proxySource("https://newsnow-omega-one.vercel.app/api/s?id=sputniknewscn&latest=", source);

const sputniknewscn$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sputniknewscn
});

const sspai = defineSource(async () => {
  const timestamp = Date.now();
  const limit = 30;
  const url = `https://sspai.com/api/v1/article/tag/page/get?limit=${limit}&offset=0&created_at=${timestamp}&tag=%E7%83%AD%E9%97%A8%E6%96%87%E7%AB%A0&released=false`;
  const res = await myFetch(url);
  return res.data.map((k) => {
    const url2 = `https://sspai.com/post/${k.id}`;
    return {
      id: k.id,
      title: k.title,
      url: url2
    };
  });
});

const sspai$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sspai
});

const steam = defineSource(async () => {
  const response = await myFetch("https://store.steampowered.com/stats/stats/");
  const $ = cheerio.load(response);
  const $rows = $("#detailStats tr.player_count_row");
  const news = [];
  $rows.each((_, el) => {
    const $el = $(el);
    const $a = $el.find("a.gameLink");
    const url = $a.attr("href");
    const gameName = $a.text().trim();
    const currentPlayers = $el.find("td:first-child .currentServers").text().trim();
    if (url && gameName && currentPlayers) {
      const title = gameName;
      news.push({
        url,
        title,
        id: url,
        pubDate: Date.now(),
        extra: {
          info: currentPlayers
        }
      });
    }
  });
  return news;
});

const steam$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: steam
});

const comprehensiveNews = defineSource(async () => {
  const url = "https://i.news.qq.com/web_backend/v2/getTagInfo?tagId=aEWqxLtdgmQ%3D";
  const res = await myFetch(url, {
    headers: {
      Referer: "https://news.qq.com/"
    }
  });
  return res.data.tabs[0].articleList.map((news) => ({
    id: news.id,
    title: news.title,
    url: news.link_info.url,
    extra: {
      hover: news.desc
    }
  }));
});
const tencent = defineSource({
  "tencent-hot": comprehensiveNews
});

const tencent$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tencent
});

const thepaper = defineSource(async () => {
  const url = "https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar";
  const res = await myFetch(url);
  return res.data.hotNews.map((k) => {
    return {
      id: k.contId,
      title: k.name,
      url: `https://www.thepaper.cn/newsDetail_forward_${k.contId}`,
      mobileUrl: `https://m.thepaper.cn/newsDetail_forward_${k.contId}`
    };
  });
});

const thepaper$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: thepaper
});

const tieba = defineSource(async () => {
  const url = "https://tieba.baidu.com/hottopic/browse/topicList";
  const res = await myFetch(url);
  return res.data.bang_topic.topic_list.map((k) => {
    return {
      id: k.topic_id,
      title: k.topic_name,
      url: k.topic_url
    };
  });
});

const tieba$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tieba
});

const toutiao = defineSource(async () => {
  const url = "https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc";
  const res = await myFetch(url);
  return res.data.map((k) => {
    var _a;
    return {
      id: k.ClusterIdStr,
      title: k.Title,
      url: `https://www.toutiao.com/trending/${k.ClusterIdStr}/`,
      extra: {
        icon: (_a = k.LabelUri) == null ? void 0 : _a.url
      }
    };
  });
});

const toutiao$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: toutiao
});

const share = defineSource(async () => {
  const res = await Promise.all(["create", "ideas", "programmer", "share"].map((k) => myFetch(`https://www.v2ex.com/feed/${k}.json`)));
  return res.map((k) => k.items).flat().map((k) => {
    var _a;
    return {
      id: k.id,
      title: k.title,
      extra: {
        date: (_a = k.date_modified) != null ? _a : k.date_published
      },
      url: k.url
    };
  }).sort((m, n) => m.extra.date < n.extra.date ? 1 : -1);
});
const v2ex = defineSource({
  "v2ex": share,
  "v2ex-share": share
});

const v2ex$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: v2ex
});

const live = defineSource(async () => {
  const apiUrl = `https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&limit=30`;
  const res = await myFetch(apiUrl);
  return res.data.items.map((k) => {
    return {
      id: k.id,
      title: k.title || k.content_text,
      extra: {
        date: k.display_time * 1e3
      },
      url: k.uri
    };
  });
});
const news = defineSource(async () => {
  const apiUrl = `https://api-one.wallstcn.com/apiv1/content/information-flow?channel=global-channel&accept=article&limit=30`;
  const res = await myFetch(apiUrl);
  return res.data.items.filter((k) => k.resource_type !== "theme" && k.resource_type !== "ad" && k.resource.type !== "live" && k.resource.uri).map(({ resource: h }) => {
    return {
      id: h.id,
      title: h.title || h.content_short,
      extra: {
        date: h.display_time * 1e3
      },
      url: h.uri
    };
  });
});
const hot = defineSource(async () => {
  const apiUrl = `https://api-one.wallstcn.com/apiv1/content/articles/hot?period=all`;
  const res = await myFetch(apiUrl);
  return res.data.day_items.map((h) => {
    return {
      id: h.id,
      title: h.title,
      url: h.uri
    };
  });
});
const wallstreetcn = defineSource({
  "wallstreetcn": live,
  "wallstreetcn-quick": live,
  "wallstreetcn-news": news,
  "wallstreetcn-hot": hot
});

const wallstreetcn$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: wallstreetcn
});

const weibo = defineSource(async () => {
  const baseurl = "https://s.weibo.com";
  const url = `${baseurl}/top/summary?cate=realtimehot`;
  const html = await myFetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      // https://github.com/v5tech/weibo-trending-hot-search
      "Cookie": "SUB=_2AkMWIuNSf8NxqwJRmP8dy2rhaoV2ygrEieKgfhKJJRMxHRl-yT9jqk86tRB6PaLNvQZR6zYUcYVT1zSjoSreQHidcUq7",
      "referer": url
    }
  });
  const $ = cheerio.load(html);
  const rows = $("#pl_top_realtimehot table tbody tr").slice(1);
  const hotNews = [];
  rows.each((_, row) => {
    const $row = $(row);
    const $link = $row.find("td.td-02 a").filter((_2, el) => {
      const href = $(el).attr("href");
      return !!(href && !href.includes("javascript:void(0);"));
    }).first();
    if ($link.length) {
      const title = $link.text().trim();
      const href = $link.attr("href");
      if (title && href) {
        const $flag = $row.find("td.td-03").text().trim();
        const flagUrl = {
          \u65B0: "https://simg.s.weibo.com/moter/flags/1_0.png",
          \u70ED: "https://simg.s.weibo.com/moter/flags/2_0.png",
          \u7206: "https://simg.s.weibo.com/moter/flags/4_0.png"
        }[$flag];
        hotNews.push({
          id: title,
          title,
          url: `${baseurl}${href}`,
          mobileUrl: `${baseurl}${href}`,
          extra: {
            icon: flagUrl ? { url: flagUrl, scale: 1.5 } : void 0
          }
        });
      }
    }
  });
  return hotNews;
});

const weibo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: weibo
});

const hotstock = defineSource(async () => {
  const url = "https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=30&_type=10&type=10";
  const cookie = (await $fetch.raw("https://xueqiu.com/hq")).headers.getSetCookie();
  const res = await myFetch(url, {
    headers: {
      cookie: cookie.join("; ")
    }
  });
  return res.data.items.filter((k) => !k.ad).map((k) => ({
    id: k.code,
    url: `https://xueqiu.com/s/${k.code}`,
    title: k.name,
    extra: {
      info: `${k.percent}% ${k.exchange}`
    }
  }));
});
const xueqiu = defineSource({
  "xueqiu": hotstock,
  "xueqiu-hotstock": hotstock
});

const xueqiu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: xueqiu
});

const zaobao = defineSource(async () => {
  const response = await myFetch("https://www.zaochenbao.com/realtime/", {
    responseType: "arrayBuffer"
  });
  const base = "https://www.zaochenbao.com";
  const utf8String = iconv.decode(Buffer$1.from(response), "gb2312");
  const $ = cheerio.load(utf8String);
  const $main = $("div.list-block>a.item");
  const news = [];
  $main.each((_, el) => {
    var _a, _b;
    const a = $(el);
    const url = a.attr("href");
    const title = (_a = a.find(".eps")) == null ? void 0 : _a.text();
    const date = (_b = a.find(".pdt10")) == null ? void 0 : _b.text().replace(/-\s/g, " ");
    if (url && title && date) {
      news.push({
        url: base + url,
        title,
        id: url,
        pubDate: parseRelativeDate(date, "Asia/Shanghai").valueOf()
      });
    }
  });
  return news.sort((m, n) => n.pubDate > m.pubDate ? 1 : -1);
});

const zaobao$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: zaobao
});

const zhihu = defineSource({
  zhihu: async () => {
    const url = "https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true";
    const res = await myFetch(url);
    return res.data.map((k) => {
      var _a, _b;
      return {
        id: (_b = (_a = k.target.link.url.match(/(\d+)$/)) == null ? void 0 : _a[1]) != null ? _b : k.target.link.url,
        title: k.target.title_area.text,
        extra: {
          info: k.target.metrics_area.text,
          hover: k.target.excerpt_area.text
        },
        url: k.target.link.url
      };
    });
  }
});

const zhihu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: zhihu
});

const x = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _36kr: _36kr$1,
  aeon: aeon$1,
  baidu: baidu$1,
  bilibili: bilibili$1,
  cankaoxiaoxi: cankaoxiaoxi$1,
  chongbuluo: chongbuluo$1,
  cls: index$9,
  coolapk: index$7,
  douban: douban$1,
  douyin: douyin$1,
  farnam_street: farnam_street$1,
  fastbull: fastbull$1,
  freebuf: freebuf$1,
  gelonghui: gelonghui$1,
  ghxi: ghxi$1,
  github: github$3,
  google_alert_musk: google_alert_musk$1,
  hackernews: hackernews$1,
  hupu: hupu$1,
  ifeng: ifeng$1,
  iqiyi: iqiyi$1,
  ithome: ithome$1,
  jin10: jin10$1,
  juejin: juejin$1,
  kaopu: kaopu$1,
  kuaishou: kuaishou$1,
  latepost: latepost$1,
  lennys: lennys$1,
  linuxdo: linuxdo$1,
  mktnews: mktnews$1,
  nowcoder: nowcoder$1,
  openai: openai$1,
  paul_graham: paul_graham$1,
  pcbeta: pcbeta$1,
  producthunt: producthunt$1,
  psyche: psyche$1,
  qbitai: qbitai$1,
  qqvideo: qqvideo$1,
  reddit_ai_monitor: reddit_ai_monitor$1,
  robertheaton: robertheaton$1,
  ruanyifeng: ruanyifeng$1,
  smzdm: smzdm$1,
  solidot: solidot$1,
  sputniknewscn: sputniknewscn$1,
  sspai: sspai$1,
  steam: steam$1,
  stratechery: stratechery$1,
  tencent: tencent$1,
  thepaper: thepaper$1,
  tieba: tieba$1,
  tldr: tldr$1,
  toutiao: toutiao$1,
  v2ex: v2ex$1,
  wallstreetcn: wallstreetcn$1,
  weibo: weibo$1,
  xueqiu: xueqiu$1,
  zaobao: zaobao$1,
  zhihu: zhihu$1
});

const getters = (function() {
  const getters2 = {};
  typeSafeObjectEntries(x).forEach(([id, x2]) => {
    if (x2.default instanceof Function) {
      Object.assign(getters2, { [id]: x2.default });
    } else {
      Object.assign(getters2, x2.default);
    }
  });
  return getters2;
})();

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class Cache {
  constructor(db) {
    __publicField$3(this, "db");
    this.db = db;
  }
  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS cache (
        id TEXT PRIMARY KEY,
        updated BIGINT,
        data TEXT
      );
    `).run();
    logger.success(`init cache table`);
  }
  async set(key, value) {
    const now = Date.now();
    await this.db.prepare(
      `INSERT INTO cache (id, data, updated) VALUES (?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated = excluded.updated`
    ).run(key, JSON.stringify(value), now);
    logger.success(`set ${key} cache`);
  }
  async get(key) {
    const row = await this.db.prepare(`SELECT id, data, updated FROM cache WHERE id = ?`).get(key);
    if (row) {
      logger.success(`get ${key} cache`);
      return {
        id: row.id,
        updated: row.updated,
        items: JSON.parse(row.data)
      };
    }
  }
  async getEntire(keys) {
    var _a;
    const keysStr = keys.map((k) => `id = '${k}'`).join(" or ");
    const res = await this.db.prepare(`SELECT id, data, updated FROM cache WHERE ${keysStr}`).all();
    const rows = (_a = res.results) != null ? _a : res;
    if (rows == null ? void 0 : rows.length) {
      logger.success(`get entire (...) cache`);
      return rows.map((row) => ({
        id: row.id,
        updated: row.updated,
        items: JSON.parse(row.data)
      }));
    } else {
      return [];
    }
  }
  async delete(key) {
    return await this.db.prepare(`DELETE FROM cache WHERE id = ?`).run(key);
  }
}
async function getCacheTable() {
  try {
    const db = await getDatabase();
    if (process$1.env.ENABLE_CACHE === "false") return;
    const cacheTable = new Cache(db);
    if (process$1.env.INIT_TABLE !== "false") await cacheTable.init();
    return cacheTable;
  } catch (e) {
    logger.error("failed to init database ", e);
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "" , value);
const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1e3;
class TrackerTable {
  constructor(db) {
    __publicField$2(this, "db");
    this.db = db;
  }
  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS trackers (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        topic TEXT,
        days BIGINT,
        interval_ms BIGINT,
        enabled BIGINT,
        created BIGINT,
        updated BIGINT,
        last_run BIGINT,
        next_run BIGINT
      );
    `).run();
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS briefings (
        id TEXT PRIMARY KEY,
        tracker_id TEXT,
        user_id TEXT,
        topic TEXT,
        summary TEXT,
        model TEXT,
        mock BIGINT,
        source_count BIGINT,
        steps TEXT,
        created BIGINT
      );
    `).run();
    logger.success(`init trackers + briefings tables`);
  }
  async createTracker(input) {
    var _a, _b, _c;
    const now = (_a = input.now) != null ? _a : Date.now();
    const intervalMs = (_b = input.intervalMs) != null ? _b : DEFAULT_INTERVAL_MS;
    const record = {
      id: crypto.randomUUID(),
      userId: input.userId,
      topic: input.topic,
      days: (_c = input.days) != null ? _c : 1,
      intervalMs,
      enabled: true,
      created: now,
      updated: now,
      lastRun: 0,
      // Due right away: the first run fills the briefing list with something.
      nextRun: now
    };
    await this.db.prepare(
      `INSERT INTO trackers (id, user_id, topic, days, interval_ms, enabled, created, updated, last_run, next_run) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(record.id, record.userId, record.topic, record.days, record.intervalMs, 1, record.created, record.updated, 0, record.nextRun);
    logger.success(`create tracker ${record.topic} for ${input.userId}`);
    return record;
  }
  async listTrackers(userId) {
    const rows = await this.db.prepare(
      `SELECT * FROM trackers WHERE user_id = ? ORDER BY created DESC`
    ).all(userId);
    return toRows(rows).map(rowToTracker);
  }
  async deleteTracker(id, userId) {
    const state = await this.db.prepare(`DELETE FROM trackers WHERE id = ? AND user_id = ?`).run(id, userId);
    if (!state.success) throw new Error(`delete tracker ${id} failed`);
    logger.success(`delete tracker ${id}`);
    return true;
  }
  /** Trackers that are enabled and whose next_run has passed. */
  async dueTrackers(now = Date.now()) {
    const rows = await this.db.prepare(
      `SELECT * FROM trackers WHERE enabled = 1 AND next_run <= ? ORDER BY next_run ASC`
    ).all(now);
    return toRows(rows).map(rowToTracker);
  }
  async markRun(id, now = Date.now()) {
    const tracker = await this.getTracker(id);
    if (!tracker) return;
    await this.db.prepare(`UPDATE trackers SET last_run = ?, next_run = ?, updated = ? WHERE id = ?`).run(now, now + tracker.intervalMs, now, id);
  }
  async getTracker(id) {
    const row = await this.db.prepare(`SELECT * FROM trackers WHERE id = ?`).get(id);
    return row ? rowToTracker(row) : void 0;
  }
  async addBriefing(input) {
    var _a;
    const now = (_a = input.now) != null ? _a : Date.now();
    const record = {
      id: crypto.randomUUID(),
      trackerId: input.tracker.id,
      userId: input.tracker.userId,
      topic: input.tracker.topic,
      summary: input.summary,
      model: input.model,
      mock: input.mock,
      sourceCount: input.sourceCount,
      steps: Array.isArray(input.steps) ? input.steps : [],
      created: now
    };
    await this.db.prepare(
      `INSERT INTO briefings (id, tracker_id, user_id, topic, summary, model, mock, source_count, steps, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(record.id, record.trackerId, record.userId, record.topic, record.summary, record.model, record.mock ? 1 : 0, record.sourceCount, JSON.stringify(record.steps), record.created);
    logger.success(`add briefing for tracker ${record.trackerId}`);
    return record;
  }
  async listBriefings(userId, limit = 20) {
    const rows = await this.db.prepare(
      `SELECT * FROM briefings WHERE user_id = ? ORDER BY created DESC LIMIT ?`
    ).all(userId, limit);
    return toRows(rows).map(rowToBriefing);
  }
}
function toRows(rows) {
  var _a;
  if (Array.isArray(rows)) return rows;
  return (_a = rows == null ? void 0 : rows.results) != null ? _a : [];
}
function rowToTracker(row) {
  var _a, _b, _c, _d, _e, _f;
  return {
    id: row.id,
    userId: row.user_id,
    topic: row.topic,
    days: Number((_a = row.days) != null ? _a : 1),
    intervalMs: Number((_b = row.interval_ms) != null ? _b : DEFAULT_INTERVAL_MS),
    enabled: Boolean(row.enabled),
    created: Number((_c = row.created) != null ? _c : 0),
    updated: Number((_d = row.updated) != null ? _d : 0),
    lastRun: Number((_e = row.last_run) != null ? _e : 0),
    nextRun: Number((_f = row.next_run) != null ? _f : 0)
  };
}
function rowToBriefing(row) {
  var _a, _b;
  return {
    id: row.id,
    trackerId: row.tracker_id,
    userId: row.user_id,
    topic: row.topic,
    summary: row.summary,
    model: row.model,
    mock: Boolean(row.mock),
    sourceCount: Number((_a = row.source_count) != null ? _a : 0),
    steps: parseSteps(row.steps),
    created: Number((_b = row.created) != null ? _b : 0)
  };
}
function parseSteps(value) {
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const disabledSources = {
  "kaopu": {
    kind: "upstream-dead",
    reason: "\u4E0A\u6E38\u6570\u636E\u5730\u5740\u5DF2\u5931\u6548\uFF0C\u7AD9\u70B9\u6682\u65E0\u53EF\u7528\u6570\u636E\u63A5\u53E3",
    since: "2026-09-12"
  },
  "pcbeta-windows11": {
    kind: "js-challenge",
    reason: "\u4E0A\u6E38\u542F\u7528\u4E86 JavaScript \u6311\u6218\uFF0C\u5F53\u524D\u65E0\u6CD5\u7A33\u5B9A\u83B7\u53D6\u5185\u5BB9",
    since: "2026-09-12"
  }
};
const credentialSources = {
  producthunt: {
    env: "PRODUCTHUNT_API_TOKEN",
    reason: "\u7F3A\u5C11 Product Hunt API \u51ED\u8BC1"
  }
};
function resolveDisabledSources(env) {
  var _a;
  const resolved = { ...disabledSources };
  for (const [id, credential] of Object.entries(credentialSources)) {
    if (credential && !((_a = env[credential.env]) == null ? void 0 : _a.trim())) {
      resolved[id] = {
        kind: "missing-credential",
        reason: credential.reason,
        requires: credential.env
      };
    }
  }
  return resolved;
}

function getDisabledSources() {
  return resolveDisabledSources(process$1.env);
}
function assertSourceEnabled(id) {
  const disabled = getDisabledSources()[id];
  if (disabled) {
    throw createError({
      statusCode: 503,
      message: `\u6E90\u5DF2\u505C\u7528\uFF1A${disabled.reason}`
    });
  }
}

const MAX_SOURCES_PER_SEARCH = 8;
const COLUMNS = ["china", "world", "tech", "finance", "ai", "english"];
function listSourceBriefs(column) {
  const disabled = getDisabledSources();
  return Object.entries(sources).filter(([id, value]) => value && !value.redirect && !disabled[id]).filter(([, value]) => !column || value.column === column).map(([id, value]) => ({ id, name: value.name, column: value.column, type: value.type }));
}
function resolveSourceId(id) {
  var _a;
  const entry = sources[id];
  return (_a = entry == null ? void 0 : entry.redirect) != null ? _a : id;
}
const fetchSourceItems = async (id) => {
  var _a, _b;
  const sourceId = resolveSourceId(id);
  const getter = getters[sourceId];
  if (!getter) throw new Error(`\u672A\u77E5\u6E90\uFF1A${id}`);
  assertSourceEnabled(sourceId);
  const cacheTable = await getCacheTable();
  const cache = cacheTable ? await cacheTable.get(sourceId) : void 0;
  const interval = (_b = (_a = sources[sourceId]) == null ? void 0 : _a.interval) != null ? _b : 0;
  if (cache && Date.now() - Number(cache.updated) < interval) return cache.items;
  try {
    const items = (await getter()).slice(0, 30);
    if (cacheTable && items.length) await cacheTable.set(sourceId, items);
    return items;
  } catch (e) {
    if (cache) return cache.items;
    throw e;
  }
};
function toLine(item, sourceName) {
  var _a;
  const when = item.pubDate ? ` \xB7 ${new Date(item.pubDate).toISOString().slice(0, 16).replace("T", " ")}` : "";
  const hover = ((_a = item.extra) == null ? void 0 : _a.hover) ? `
   ${String(item.extra.hover).slice(0, 160)}` : "";
  return `- [${sourceName}] ${item.title}${when}
   ${item.url}${hover}`;
}
function defaultSearchScope(column) {
  var _a, _b;
  const briefs = listSourceBriefs(column).filter((b) => b.type !== void 0);
  if (column) return briefs.slice(0, MAX_SOURCES_PER_SEARCH);
  const byColumn = /* @__PURE__ */ new Map();
  for (const brief of briefs) {
    const list = (_a = byColumn.get(brief.column)) != null ? _a : [];
    list.push(brief);
    byColumn.set(brief.column, list);
  }
  const picked = [];
  const columns = [...byColumn.keys()];
  let round = 0;
  while (picked.length < MAX_SOURCES_PER_SEARCH) {
    let added = false;
    for (const col of columns) {
      const candidate = (_b = byColumn.get(col)) == null ? void 0 : _b[round];
      if (candidate && picked.length < MAX_SOURCES_PER_SEARCH) {
        picked.push(candidate);
        added = true;
      }
    }
    if (!added) break;
    round += 1;
  }
  return picked;
}
async function searchNews(query, options = {}) {
  const { column, ids, limit = 10, fetchItems = fetchSourceItems } = options;
  const availableBriefs = listSourceBriefs();
  const availableIDs = new Set(availableBriefs.map((brief) => brief.id));
  const scope = (ids == null ? void 0 : ids.length) ? ids.filter((id) => availableIDs.has(resolveSourceId(id))).slice(0, MAX_SOURCES_PER_SEARCH).map((id) => {
    var _a, _b;
    return {
      id,
      name: (_b = (_a = availableBriefs.find((b) => b.id === resolveSourceId(id))) == null ? void 0 : _a.name) != null ? _b : id,
      column: ""
    };
  }) : defaultSearchScope(column);
  const settled = await Promise.all(scope.map(async (brief) => {
    try {
      const items = await fetchItems(brief.id);
      return {
        brief,
        error: "",
        items: items.map((item) => {
          var _a;
          return {
            id: item.id,
            title: item.title,
            url: item.url,
            text: ((_a = item.extra) == null ? void 0 : _a.hover) ? String(item.extra.hover) : "",
            source: brief.name
          };
        })
      };
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      console.error(`[news-tools] source ${brief.id} failed:`, reason);
      return { brief, error: reason.slice(0, 80), items: [] };
    }
  }));
  const flat = settled.flatMap((s) => s.items);
  const failed = settled.filter((s) => s.error);
  return {
    scanned: flat.length,
    scope: scope.map((s) => s.name),
    failed: failed.map((s) => `${s.brief.id}(${s.error})`),
    matches: searchNewsItems(flat, query, limit)
  };
}
function createNewsTools(options = {}) {
  var _a;
  const fetchItems = (_a = options.fetchItems) != null ? _a : fetchSourceItems;
  return {
    list_sources: tool({
      description: "\u5217\u51FA\u53EF\u7528\u7684\u65B0\u95FB\u6E90\uFF08id\u3001\u540D\u79F0\u3001\u680F\u76EE\uFF09\u3002\u641C\u7D22\u6216\u53D6\u65B0\u95FB\u524D\u5148\u7528\u5B83\u786E\u8BA4\u6709\u6CA1\u6709\u76F8\u5173\u6E90\u3002",
      inputSchema: z.object({
        column: z.enum(COLUMNS).optional().describe("\u53EA\u5217\u67D0\u4E2A\u680F\u76EE\uFF1Achina/world/tech/finance/ai/english")
      }),
      execute: async ({ column }) => {
        const briefs = listSourceBriefs(column);
        return `${briefs.length} \u4E2A\u6E90\uFF1A
${briefs.map((b) => `${b.id} (${b.column}) ${b.name}`).join("\n")}`;
      }
    }),
    get_source_items: tool({
      description: "\u53D6\u67D0\u4E00\u4E2A\u6E90\u5F53\u524D\u7684\u70ED\u699C\u6216\u6700\u65B0\u6761\u76EE\u3002\u77E5\u9053\u6E90 id \u65F6\u7528\u5B83\u3002",
      inputSchema: z.object({
        id: z.string().describe("\u6E90 id\uFF0C\u4F8B\u5982 zhihu\u3001tldr\u3001github-trending-today"),
        count: z.number().int().min(1).max(30).default(10).describe("\u8FD4\u56DE\u6761\u6570")
      }),
      execute: async ({ id, count }) => {
        var _a2, _b;
        const name = (_b = (_a2 = listSourceBriefs().find((b) => b.id === id)) == null ? void 0 : _a2.name) != null ? _b : id;
        try {
          const items = await fetchSourceItems(id);
          if (!items.length) return `\u6E90 ${id}\uFF08${name}\uFF09\u5F53\u524D\u6CA1\u6709\u6761\u76EE\u3002`;
          return `${name} \u524D ${Math.min(count, items.length)} \u6761\uFF1A
${items.slice(0, count).map((i) => toLine(i, name)).join("\n")}`;
        } catch (e) {
          return `\u53D6\u6E90 ${id} \u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}\u3002\u53EF\u4EE5\u6362\u4E00\u4E2A\u6E90\uFF0C\u6216\u7A0D\u540E\u91CD\u8BD5\u3002`;
        }
      }
    }),
    search_news: tool({
      description: "\u6309\u5173\u952E\u8BCD\u5728\u5F53\u524D\u6293\u5230\u7684\u65B0\u95FB\u91CC\u641C\u7D22\uFF0C\u8FD4\u56DE\u6700\u76F8\u5173\u7684\u6761\u76EE\uFF08\u6807\u9898\u3001\u94FE\u63A5\u3001\u6765\u6E90\uFF09\u3002\u95EE\u201C\u4ECA\u5929\u6709\u4EC0\u4E48\u5173\u4E8E X \u7684\u65B0\u95FB\u201D\u65F6\u7528\u5B83\u3002",
      inputSchema: z.object({
        query: z.string().describe("\u5173\u952E\u8BCD\uFF0C\u652F\u6301\u4E2D\u82F1\u6587"),
        column: z.enum(COLUMNS).optional().describe("\u9650\u5B9A\u680F\u76EE\uFF0C\u4E0D\u7ED9\u5C31\u5728\u591A\u4E2A\u680F\u76EE\u91CC\u5206\u6563\u53D6\u6E90"),
        limit: z.number().int().min(1).max(20).default(10).describe("\u8FD4\u56DE\u6761\u6570")
      }),
      execute: async ({ query, column, limit }) => {
        const { scanned, scope, failed, matches } = await searchNews(query, { column, limit, fetchItems });
        const failNote = failed.length ? `
\u53D6\u6570\u5931\u8D25\u7684\u6E90\uFF1A${failed.join("\u3001")}` : "";
        if (!matches.length) {
          return `\u5728 ${scope.join("\u3001")} \u8FD9 ${scope.length} \u4E2A\u6E90\uFF08\u5171 ${scanned} \u6761\uFF09\u91CC\u6CA1\u641C\u5230\u300C${query}\u300D\u3002\u53EF\u4EE5\u6362\u5173\u952E\u8BCD\uFF0C\u6216\u5148 list_sources \u6362\u4E2A\u6E90\u3002${failNote}`;
        }
        return `\u5728 ${scope.join("\u3001")} \u8FD9 ${scope.length} \u4E2A\u6E90\uFF08\u5171 ${scanned} \u6761\uFF09\u91CC\u5339\u914D ${matches.length} \u6761\uFF1A
${matches.map((m) => {
          var _a2;
          return toLine({ id: m.item.id, title: m.item.title, url: m.item.url }, (_a2 = m.item.source) != null ? _a2 : "");
        }).join("\n")}${failNote}`;
      }
    }),
    create_tracker: tool({
      description: "\u4E3A\u7528\u6237\u5EFA\u7ACB\u957F\u671F\u8FFD\u8E2A\uFF1A\u4E4B\u540E\u6309\u95F4\u9694\u81EA\u52A8\u751F\u6210\u8BE5\u4E3B\u9898\u7684\u7B80\u62A5\u3002\u7528\u6237\u8BF4\u300C\u5E2E\u6211\u76EF X\u300D\u300C\u4EE5\u540E\u6BCF\u5929\u7ED9\u6211 X \u7684\u7B80\u62A5\u300D\u65F6\u8C03\u7528\u5B83\uFF0C\u800C\u4E0D\u662F\u81EA\u5DF1\u627F\u8BFA\u5B9A\u65F6\u3002",
      inputSchema: z.object({
        topic: z.string().describe("\u8981\u76EF\u7684\u4E3B\u9898\uFF0C\u8D8A\u5177\u4F53\u8D8A\u597D"),
        days: z.number().int().min(1).max(7).default(1).describe("\u6BCF\u6B21\u7B80\u62A5\u56DE\u770B\u51E0\u5929\u5185\u7684\u7F13\u5B58"),
        intervalMs: z.number().int().optional().describe("\u95F4\u9694\u6BEB\u79D2\uFF0C\u9ED8\u8BA4\u4E00\u5929\uFF1B\u6700\u5C0F\u4E00\u5206\u949F")
      }),
      execute: async ({ topic, days, intervalMs }) => {
        if (!options.userId) {
          return "\u6CA1\u6709\u767B\u5F55\u7528\u6237\uFF0C\u65E0\u6CD5\u5EFA\u7ACB\u8FFD\u8E2A\u3002\u8BF7\u544A\u77E5\u7528\u6237\uFF1A\u767B\u5F55\u540E\u518D\u8BF4\u4E00\u6B21\u300C\u5E2E\u6211\u76EF X\u300D\u5373\u53EF\u3002";
        }
        try {
          const db = await getDatabase();
          const table = new TrackerTable(db);
          await table.init();
          const tracker = await table.createTracker({
            userId: options.userId,
            topic,
            days,
            intervalMs: clampInterval(intervalMs)
          });
          const hours = Math.round(tracker.intervalMs / 36e5);
          return `\u5DF2\u5EFA\u7ACB\u8FFD\u8E2A\u300C${tracker.topic}\u300D\uFF0C\u6BCF ${hours >= 1 ? `${hours} \u5C0F\u65F6` : `${Math.round(tracker.intervalMs / 6e4)} \u5206\u949F`}\u8DD1\u4E00\u6B21\uFF0C\u56DE\u770B ${tracker.days} \u5929\uFF1B\u9996\u6B21\u8FD0\u884C\u6392\u5728\u4E0B\u4E00\u6B21\u8C03\u5EA6\u3002\u8FFD\u8E2A id\uFF1A${tracker.id}`;
        } catch (e) {
          return `\u5EFA\u7ACB\u8FFD\u8E2A\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`;
        }
      }
    })
  };
}
const newsTools = createNewsTools();

const AGENT_MAX_STEPS = 6;
const MAX_OUTPUT_TOKENS = 1500;
function toLanguageModel(provider) {
  if (provider.protocol === "anthropic") {
    const anthropic = createAnthropic({
      apiKey: provider.apiKey,
      baseURL: anthropicMessagesBaseUrl(provider.baseUrl)
    });
    return anthropic(provider.model);
  }
  const compatible = createOpenAICompatible({
    name: provider.name,
    apiKey: provider.apiKey,
    baseURL: provider.baseUrl
  });
  return compatible(provider.model);
}
const AGENT_SYSTEM_PROMPT = `\u4F60\u662F ${Brand.name} \u7684\u65B0\u95FB\u52A9\u624B\uFF0C\u5E2E\u7528\u6237\u7406\u89E3\u548C\u68B3\u7406\u5F53\u524D\u6293\u5230\u7684\u8D44\u8BAF\u3002

\u4F60\u53EF\u4EE5\u8C03\u7528\u8FD9\u4E9B\u5DE5\u5177\uFF1A
- list_sources\uFF1A\u770B\u6709\u54EA\u4E9B\u6E90\uFF08\u53EF\u6309\u680F\u76EE\uFF09
- get_source_items\uFF1A\u53D6\u67D0\u4E2A\u6E90\u5F53\u524D\u7684\u6761\u76EE
- search_news\uFF1A\u6309\u5173\u952E\u8BCD\u8DE8\u6E90\u641C\u7D22

\u89C4\u5219\uFF1A
1. \u6BCF\u4E00\u8F6E\u6309\u5F53\u524D\u95EE\u9898\u67E5\u3002\u6362\u4E86\u4E3B\u9898\u3001\u95EE\u4ECA\u5929/\u6700\u8FD1/\u6709\u4EC0\u4E48\uFF0C\u5FC5\u987B\u91CD\u65B0\u8C03 search_news\uFF1B\u4E0A\u4E00\u8F6E\u7684\u7ED3\u8BBA\u4E0D\u662F\u8FD9\u4E00\u8F6E\u7684\u8BC1\u636E\u3002
2. \u5F15\u7528\u5199\u300C\u6807\u9898\uFF08\u6765\u6E90\uFF09\u300D\uFF1B\u4E0D\u8981\u8D34 http \u94FE\u63A5\uFF1B\u7EDD\u4E0D\u7F16\u9020\u6761\u76EE\u6216\u6570\u5B57\u3002
3. \u5148\u7ED9\u7ED3\u8BBA\uFF0C\u518D\u5217\u8BC1\u636E\uFF1B\u4E2D\u6587\uFF0C\u7B80\u6D01\u3002\u7EAF\u6587\u672C\uFF0C\u4E0D\u8981 **\u3001##\u3002\u4E0D\u8981\u5199\u300C\u6211\u5148\u641C\u4E00\u4E0B\u300D\u3002
4. \u6CA1\u8C03\u5DE5\u5177\u5C31\u4E0D\u8BB8\u8BF4\u300C\u6CA1\u641C\u5230/\u65E0\u7ED3\u679C\u300D\u3002\u5DE5\u5177\u771F\u7684\u7A7A\u624D\u8BF4\u6CA1\u67E5\u5230\uFF0C\u5E76\u7ED9\u53EF\u6362\u7684\u5173\u952E\u8BCD\u3002
5. \u540C\u4E00\u5173\u952E\u8BCD\u4E0D\u8981\u8FDE\u641C\u4E09\u6B21\uFF1B\u6362\u5173\u952E\u8BCD\u6700\u591A\u4E24\u6B21\u3002\u641C\u5230\u591F\u7528\u7684\u6761\u76EE\u5C31\u505C\u3002
6. \u7528\u6237\u8981\u76EF\u4E00\u4E2A\u4E3B\u9898\u65F6\uFF0C\u8C03 create_tracker\uFF0C\u4E0D\u8981\u53EA\u53E3\u5934\u627F\u8BFA\u3002`;
function buildSystemPrompt(context, contexts) {
  var _a;
  const compare = ((_a = contexts == null ? void 0 : contexts.length) != null ? _a : 0) > 1;
  const compareRule = compare ? `

${COMPARE_SYSTEM_RULE}` : "";
  if (compare) return `${AGENT_SYSTEM_PROMPT}${compareRule}`;
  if (!(context == null ? void 0 : context.title)) return AGENT_SYSTEM_PROMPT;
  const url = context.url ? `\uFF08${context.url}\uFF09` : "";
  return `${AGENT_SYSTEM_PROMPT}

\u5F53\u524D\u7528\u6237\u6B63\u6253\u5F00\u4E00\u6761\u65B0\u95FB\uFF1A\u300A${context.title}\u300B${url}\u3002\u4F18\u5148\u56F4\u7ED5\u8FD9\u6761\u56DE\u7B54\u3002`;
}
function buildPrompt(message, context, contexts) {
  if (contexts && contexts.length > 1) {
    const blocks = contexts.map((item, index) => {
      var _a;
      const title = (_a = item.title) != null ? _a : `\u6761\u76EE ${index + 1}`;
      const url = item.url ? `
\u94FE\u63A5\uFF1A${item.url}` : "";
      const body = item.content ? `
\u5185\u5BB9\u6458\u8981\uFF1A${item.content.slice(0, 1200)}` : "";
      return `${index + 1}. ${title}${url}${body}`;
    });
    return `\u4E0B\u9762\u662F\u6211\u9009\u4E2D\u7684 ${contexts.length} \u6761\u62A5\u9053\uFF1A

${blocks.join("\n\n")}

\u6211\u7684\u95EE\u9898\uFF1A${message}`;
  }
  if (!(context == null ? void 0 : context.content)) return message;
  return `\u8FD9\u6761\u65B0\u95FB\u7684\u5185\u5BB9\u6458\u8981\uFF1A
${context.content.slice(0, 3e3)}

\u7528\u6237\u95EE\u9898\uFF1A${message}`;
}
function collectSteps(steps) {
  var _a, _b, _c;
  const collected = [];
  const byCallId = /* @__PURE__ */ new Map();
  for (const step of steps != null ? steps : []) {
    for (const call of (_a = step == null ? void 0 : step.toolCalls) != null ? _a : []) {
      const entry = { tool: call.toolName, input: call.input, ok: true };
      byCallId.set(call.toolCallId, entry);
      collected.push(entry);
    }
    for (const result of (_b = step == null ? void 0 : step.toolResults) != null ? _b : []) {
      const entry = byCallId.get(result.toolCallId);
      if (entry) entry.summary = String((_c = result.output) != null ? _c : "").split("\n")[0].slice(0, 90);
    }
  }
  return collected;
}
function firstLine(value) {
  return String(value != null ? value : "").split("\n")[0].slice(0, 90);
}
function prepareNewsStep(message) {
  if (!shouldForceNewsTool(message)) return void 0;
  return ({ stepNumber }) => stepNumber === 0 ? { toolChoice: "required" } : void 0;
}
async function prefetchNewsSearch(message, emit, history) {
  if (!shouldForceNewsTool(message)) return null;
  const query = resolveNewsSearchQuery(message, history);
  if (!query) return null;
  const step = { id: "prefetch-search", tool: "search_news", input: { query }, ok: true };
  await (emit == null ? void 0 : emit({ type: "tool", id: step.id, tool: "search_news", status: "start", input: { query } }));
  try {
    const { scanned, scope, matches } = await searchNews(query, { limit: 10 });
    step.summary = matches.length ? `\u5339\u914D ${matches.length} \u6761` : `\u6CA1\u641C\u5230\u300C${query}\u300D`;
    await (emit == null ? void 0 : emit({ type: "tool", id: step.id, tool: "search_news", status: "done", input: { query }, summary: step.summary }));
    const block = matches.length ? `\u5DF2\u68C0\u7D22\u300C${query}\u300D\uFF08${scope.length} \u4E2A\u6E90 / ${scanned} \u6761\uFF09\u547D\u4E2D\uFF1A
${matches.map((m) => `- ${m.item.title}\uFF08${m.item.source}\uFF09`).join("\n")}` : `\u5DF2\u68C0\u7D22\u300C${query}\u300D\uFF0C\u6CA1\u6709\u547D\u4E2D\u3002\u53EF\u4EE5\u6362\u5173\u952E\u8BCD\u518D\u8C03 search_news\u3002`;
    return { block, step };
  } catch (e) {
    step.ok = false;
    await (emit == null ? void 0 : emit({ type: "tool", id: step.id, tool: "search_news", status: "error", input: { query } }));
    return { block: `\u68C0\u7D22\u300C${query}\u300D\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`, step };
  }
}
async function streamNewsAgent(message, context, history, options = {}, emit) {
  var _a, _b;
  const providers = getLLMProviders();
  if (providers.length === 0) return { ok: false, reason: "\u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55 LLM provider" };
  const failures = [];
  const turns = trimHistoryForPrompt(history);
  const tools = options.userId ? createNewsTools({ userId: options.userId }) : newsTools;
  let prefetch;
  for (const provider of providers) {
    let progressed = false;
    const steps = [];
    const byId = /* @__PURE__ */ new Map();
    let reply = "";
    const upsert = (id, tool, patch) => {
      const previous = byId.get(id);
      const entry = { id, tool, ok: true, ...previous, ...patch };
      byId.set(id, entry);
      const index = steps.findIndex((step) => step.id === id);
      if (index >= 0) steps[index] = entry;
      else steps.push(entry);
      return entry;
    };
    try {
      await emit({ type: "start", provider: provider.name, model: provider.model });
      if (prefetch === void 0) prefetch = await prefetchNewsSearch(message, emit, turns);
      if (prefetch == null ? void 0 : prefetch.step) {
        steps.push(prefetch.step);
        if (prefetch.step.id) byId.set(prefetch.step.id, prefetch.step);
      }
      const messages = [
        ...turns.map((turn) => ({ role: turn.role, content: turn.content })),
        { role: "user", content: (prefetch == null ? void 0 : prefetch.block) ? `${buildPrompt(message, context, options.contexts)}

${prefetch.block}` : buildPrompt(message, context, options.contexts) }
      ];
      const result = streamText({
        model: toLanguageModel(provider),
        system: buildSystemPrompt(context, options.contexts),
        messages,
        tools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        abortSignal: options.abortSignal,
        prepareStep: (prefetch == null ? void 0 : prefetch.step) ? void 0 : prepareNewsStep(message)
      });
      for await (const part of result.stream) {
        if ((_a = options.abortSignal) == null ? void 0 : _a.aborted) break;
        switch (part.type) {
          case "reasoning-delta":
            if (part.text) {
              progressed = true;
              await emit({ type: "reasoning", delta: part.text });
            }
            break;
          case "tool-input-start": {
            progressed = true;
            upsert(part.id, part.toolName, { ok: true });
            await emit({ type: "tool", id: part.id, tool: part.toolName, status: "start" });
            break;
          }
          case "tool-call": {
            progressed = true;
            upsert(part.toolCallId, part.toolName, { input: part.input, ok: true });
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "start", input: part.input });
            break;
          }
          case "tool-result": {
            const summary = firstLine(part.output);
            upsert(part.toolCallId, part.toolName, { input: part.input, summary, ok: true });
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "done", input: part.input, summary });
            break;
          }
          case "tool-error": {
            upsert(part.toolCallId, part.toolName, { ok: false });
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "error", input: part.input });
            break;
          }
          case "text-delta":
            if (part.text) {
              progressed = true;
              reply += part.text;
              await emit({ type: "text", delta: part.text });
            }
            break;
        }
      }
      reply = reply.trim() || "\uFF08\u5DE5\u5177\u8DD1\u5B8C\u4E86\uFF0C\u4F46\u6A21\u578B\u6CA1\u6709\u7ED9\u51FA\u56DE\u590D\uFF09";
      if (options.contexts && options.contexts.length > 1) {
        const rewritten = await ensureSemaform(toLanguageModel(provider), options.contexts, reply);
        if (rewritten !== reply) {
          reply = rewritten;
          await emit({ type: "replace", reply });
        }
      }
      console.log(`[agent/stream] provider=${provider.name} model=${provider.model} steps=${steps.length}`);
      await emit({ type: "done", reply, steps, provider: provider.name, model: provider.model });
      return { ok: true, reply, model: provider.model, provider: provider.name, steps };
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      if ((_b = options.abortSignal) == null ? void 0 : _b.aborted) {
        await emit({ type: "done", reply: reply.trim(), steps, provider: provider.name, model: provider.model });
        return { ok: true, reply: reply.trim(), model: provider.model, provider: provider.name, steps };
      }
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`);
      console.error(`[agent/stream] provider=${provider.name} failed:`, detail);
      if (progressed) {
        const fallback = reply.trim() || `\u62B1\u6B49\uFF0C\u8BF7\u6C42\u5931\u8D25\u4E86\uFF08${detail.slice(0, 80)}\uFF09\u3002\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002`;
        await emit({ type: "error", reason: detail.slice(0, 160) });
        await emit({ type: "done", reply: fallback, steps, provider: provider.name, model: provider.model, mock: true, degradedReason: detail.slice(0, 160) });
        return { ok: true, reply: fallback, model: provider.model, provider: provider.name, steps };
      }
    }
  }
  return { ok: false, reason: failures.join(" | ") };
}
const BRIEFING_SYSTEM_PROMPT = `\u4F60\u662F\u65B0\u95FB\u7B80\u62A5\u52A9\u624B\u3002\u7528\u6237\u4F1A\u7ED9\u4F60\u8FC7\u53BB\u82E5\u5E72\u5929\u6293\u5230\u7684\u6807\u9898\uFF0C\u6309\u6765\u6E90\u5206\u7EC4\u3002

\u89C4\u5219\uFF1A
1. \u5148\u57FA\u4E8E\u8FD9\u4E9B\u6807\u9898\u5199\u7B80\u62A5\uFF1B\u82E5\u67D0\u4E3B\u9898\u7684\u6761\u76EE\u592A\u5C11\u6216\u6CA1\u6709\uFF0C\u7528 search_news \u5DE5\u5177\u53BB\u53D6\u66F4\u591A\uFF08\u53EF\u9650\u5B9A column\uFF09\u3002\u5DE5\u5177\u8C03\u7528\u5408\u8BA1\u63A7\u5236\u5728 4 \u6B21\u4EE5\u5185\uFF0C\u641C\u4E0D\u5230\u5C31\u5982\u5B9E\u8BF4\u6CA1\u641C\u5230\u3002
2. \u7EAF\u6587\u672C\u8F93\u51FA\uFF0C\u4E0D\u8981 markdown \u5F3A\u8C03\u7B26\u53F7\uFF08**\u3001##\uFF09\uFF0C\u5206\u70B9\u7528\u77ED\u6A2A\u7EBF\u5F00\u5934\u3002
3. \u6309\u4E3B\u9898\u5206\u7EC4\uFF0C\u6BCF\u7EC4 2-3 \u6761\uFF0C\u6BCF\u6761\u4E00\u53E5\u8BDD\uFF0C\u53E5\u672B\u6807\u51FA\u6765\u6E90\u3002
4. \u603B\u5171 400 \u5B57\u4EE5\u5185\uFF1B\u4E0D\u8981\u7F16\u9020\u6761\u76EE\u6216\u94FE\u63A5\u3002
5. \u53EA\u8F93\u51FA\u7B80\u62A5\u6B63\u6587\u3002\u4E0D\u8981\u8F93\u51FA\u4F60\u7684\u8FC7\u7A0B\u3001\u8BA1\u5212\u3001\u601D\u8003\uFF08\u4F8B\u5982\u300C\u5148\u641C\u7D22\u300D\u300C\u8D44\u6599\u591F\u4E86\u300D\u300C\u5F00\u59CB\u5199\u300D\uFF09\uFF0C\u4E5F\u4E0D\u8981\u8BF4\u81EA\u5DF1\u5728\u8C03\u7528\u5DE5\u5177\u3002`;
async function runBriefing(options) {
  var _a;
  const { days, topic, seeds } = options;
  const providers = getLLMProviders();
  if (providers.length === 0) return { ok: false, reason: "\u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55 LLM provider" };
  const totalTitles = seeds.reduce((sum, seed) => sum + seed.titles.length, 0);
  const seedText = seeds.map((seed) => `## ${seed.id}
${seed.titles.slice(0, 40).map((title) => `- ${title}`).join("\n")}`).join("\n\n");
  const prompt = `\u8FC7\u53BB ${days} \u5929\u6293\u5230 ${totalTitles} \u6761\u6807\u9898\uFF0C\u6765\u81EA ${seeds.length} \u4E2A\u6765\u6E90\u3002${topic ? `\u805A\u7126\u4E3B\u9898\uFF1A${topic}\u3002` : ""}

${seedText.slice(0, 8e3)}`;
  const failures = [];
  for (const provider of providers) {
    try {
      const result = await generateText({
        model: toLanguageModel(provider),
        system: BRIEFING_SYSTEM_PROMPT,
        prompt,
        tools: newsTools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS
      });
      const steps = collectSteps(result.steps);
      console.log(`[agent/briefing] provider=${provider.name} model=${provider.model} steps=${steps.length}`);
      return {
        ok: true,
        summary: ((_a = result.text) == null ? void 0 : _a.trim()) || "\uFF08\u5DE5\u5177\u8DD1\u5B8C\u4E86\uFF0C\u4F46\u6A21\u578B\u6CA1\u6709\u7ED9\u51FA\u7B80\u62A5\uFF09",
        model: provider.model,
        provider: provider.name,
        sourceCount: seeds.length,
        steps
      };
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`);
      console.error(`[agent/briefing] provider=${provider.name} failed:`, detail);
    }
  }
  return { ok: false, reason: failures.join(" | ") };
}
async function ensureSemaform(model, contexts, reply) {
  var _a;
  if (hasSemaformSections(reply)) return reply;
  const sources = contexts.map((c, i) => {
    var _a2;
    return `${i + 1}. ${(_a2 = c.title) != null ? _a2 : `\u6761\u76EE ${i + 1}`}`;
  }).join("\n");
  try {
    const result = await generateText({
      model,
      system: `\u628A\u5DF2\u6709\u5BF9\u6BD4\u5206\u6790\u6539\u5199\u6210 Semaform\u3002${COMPARE_SYSTEM_RULE}\u53EA\u8F93\u51FA\u7ED3\u8BBA\u548C\u4E09\u6BB5\uFF0C\u4E0D\u8981\u89E3\u91CA\u3002`,
      prompt: `\u9009\u4E2D\u6765\u6E90\uFF1A
${sources}

\u5DF2\u6709\u5206\u6790\uFF1A
${reply.slice(0, 5e3)}`,
      maxOutputTokens: MAX_OUTPUT_TOKENS
    });
    const rewritten = (_a = result.text) == null ? void 0 : _a.trim();
    return rewritten && hasSemaformSections(rewritten) ? rewritten : reply;
  } catch (e) {
    console.error("[agent/compare] \u515C\u5E95\u6539\u5199\u5931\u8D25\uFF1A", e instanceof Error ? e.message.slice(0, 120) : e);
    return reply;
  }
}
async function runNewsAgent(message, context, history, options = {}) {
  var _a;
  const providers = getLLMProviders();
  if (providers.length === 0) return { ok: false, reason: "\u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55 LLM provider" };
  const failures = [];
  const turns = trimHistoryForPrompt(history);
  const tools = options.userId ? createNewsTools({ userId: options.userId }) : newsTools;
  const prefetch = await prefetchNewsSearch(message, void 0, turns);
  const messages = [
    ...turns.map((turn) => ({ role: turn.role, content: turn.content })),
    { role: "user", content: (prefetch == null ? void 0 : prefetch.block) ? `${buildPrompt(message, context, options.contexts)}

${prefetch.block}` : buildPrompt(message, context, options.contexts) }
  ];
  for (const provider of providers) {
    try {
      const result = await generateText({
        model: toLanguageModel(provider),
        system: buildSystemPrompt(context, options.contexts),
        messages,
        tools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        prepareStep: (prefetch == null ? void 0 : prefetch.step) ? void 0 : prepareNewsStep(message)
      });
      const steps = [...(prefetch == null ? void 0 : prefetch.step) ? [prefetch.step] : [], ...collectSteps(result.steps)];
      console.log(`[agent/run] provider=${provider.name} model=${provider.model} steps=${steps.length}`);
      let reply = ((_a = result.text) == null ? void 0 : _a.trim()) || "\uFF08\u5DE5\u5177\u8DD1\u5B8C\u4E86\uFF0C\u4F46\u6A21\u578B\u6CA1\u6709\u7ED9\u51FA\u56DE\u590D\uFF09";
      if (options.contexts && options.contexts.length > 1) {
        reply = await ensureSemaform(toLanguageModel(provider), options.contexts, reply);
      }
      return {
        ok: true,
        reply,
        model: provider.model,
        provider: provider.name,
        steps
      };
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`);
      console.error(`[agent/run] provider=${provider.name} failed:`, detail);
    }
  }
  return { ok: false, reason: failures.join(" | ") };
}

async function collectCachedSeeds(days) {
  var _a, _b;
  const db = await getDatabase();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1e3;
  const rows = await db.prepare(
    "SELECT id, data, updated FROM cache WHERE updated >= ?"
  ).all(cutoff);
  const results = (_b = (_a = rows.results) != null ? _a : rows) != null ? _b : [];
  const cacheItems = results.map((row) => {
    try {
      return {
        id: row.id,
        updated: row.updated,
        items: JSON.parse(row.data)
      };
    } catch {
      return null;
    }
  }).filter(Boolean);
  const seeds = cacheItems.map((c) => ({
    id: String(c.id),
    titles: c.items.map((i) => i.title).filter(Boolean)
  }));
  const totalItems = seeds.reduce((sum, seed) => sum + seed.titles.length, 0);
  const firstTitles = seeds.flatMap((seed) => seed.titles).slice(0, 30).join("\n");
  return {
    seeds,
    sourceCount: seeds.length,
    totalItems,
    firstTitles
  };
}

async function runDueTrackers(options = {}) {
  var _a, _b;
  const now = (_a = options.now) != null ? _a : Date.now();
  const db = await getDatabase();
  const table = new TrackerTable(db);
  await table.init();
  const due = (await table.dueTrackers(now)).slice(0, (_b = options.limit) != null ? _b : 5);
  const results = [];
  for (const tracker of due) {
    results.push(await runTracker(tracker, table, now));
  }
  return results;
}
async function runTracker(tracker, table, now) {
  try {
    const material = await collectCachedSeeds(tracker.days);
    const run = await runBriefing({
      days: tracker.days,
      topic: tracker.topic,
      seeds: material.seeds
    });
    let briefing;
    if (run.ok) {
      briefing = await table.addBriefing({
        tracker,
        summary: run.summary,
        model: run.model,
        mock: false,
        sourceCount: run.sourceCount,
        steps: run.steps,
        now
      });
    } else {
      briefing = await table.addBriefing({
        tracker,
        summary: `\u8FFD\u8E2A\u300C${tracker.topic}\u300D\u672C\u6B21\u672A\u751F\u6210\u7B80\u62A5\uFF1A${run.reason}`,
        model: "mock",
        mock: true,
        sourceCount: material.sourceCount,
        now
      });
    }
    await table.markRun(tracker.id, now);
    return { trackerId: tracker.id, topic: tracker.topic, ok: run.ok, briefingId: briefing.id, summary: briefing.summary };
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    logger.error(`tracker ${tracker.id} failed: ${reason}`);
    await table.markRun(tracker.id, now);
    return { trackerId: tracker.id, topic: tracker.topic, ok: false, reason };
  }
}

const _lTBUHngDOkMvFT_qDf9vR6HrRy_26_c0_QFDIeyj4U = defineNitroPlugin(() => {
  var _a, _b;
  if (process$1.env.ENABLE_TRACKER_SCHEDULER !== "true") return;
  const tickMs = Math.max(Number((_a = process$1.env.TRACKER_TICK_MS) != null ? _a : 6e4), 1e4);
  logger.success(`[scheduler] tracker scheduler on, tick ${tickMs}ms`);
  const timer = setInterval(async () => {
    try {
      const results = await runDueTrackers();
      if (results.length) logger.success(`[scheduler] ran ${results.length} tracker(s)`);
    } catch (e) {
      logger.error(`[scheduler] ${e instanceof Error ? e.message : String(e)}`);
    }
  }, tickMs);
  (_b = timer.unref) == null ? void 0 : _b.call(timer);
});

const plugins = [
  _lTBUHngDOkMvFT_qDf9vR6HrRy_26_c0_QFDIeyj4U
];

const _5qlM4G = defineEventHandler$1(async (event) => {
  var _a, _b;
  const url = getRequestURL$1(event);
  if (!url.pathname.startsWith("/api")) return;
  if (["JWT_SECRET", "G_CLIENT_ID", "G_CLIENT_SECRET"].find((k) => !process$1.env[k])) {
    event.context.disabledLogin = true;
    if (["/api/s", "/api/proxy", "/api/latest", "/api/mcp", "/api/agent", "/api/enable-login"].every((p) => !url.pathname.startsWith(p)))
      throw createError({ statusCode: 506, message: "Server not configured, disable login" });
  } else {
    if (["/api/s", "/api/me", "/api/agent"].find((p) => url.pathname.startsWith(p))) {
      const token = (_b = (_a = getHeader$1(event, "Authorization")) == null ? void 0 : _a.replace(/Bearer\s*/, "")) == null ? void 0 : _b.trim();
      if (token) {
        try {
          const { payload } = await jwtVerify(token, new TextEncoder().encode(process$1.env.JWT_SECRET));
          if (payload == null ? void 0 : payload.id) {
            event.context.user = {
              id: payload.id,
              type: payload.type
            };
          }
        } catch {
          if (url.pathname.startsWith("/api/me"))
            throw createError({ statusCode: 401, message: "JWT verification failed" });
          else logger.warn("JWT verification failed");
        }
      } else if (url.pathname.startsWith("/api/me")) {
        throw createError({ statusCode: 401, message: "JWT verification failed" });
      }
    }
  }
});

const _lazy_STEhfU = () => Promise.resolve().then(function () { return briefing_post$1; });
const _lazy_D2SyMV = () => Promise.resolve().then(function () { return briefings$1; });
const _lazy_wKBFzj = () => Promise.resolve().then(function () { return chat_post$1; });
const _lazy_TOQmZH = () => Promise.resolve().then(function () { return history$1; });
const _lazy_eMXUGl = () => Promise.resolve().then(function () { return index$5; });
const _lazy_z3PwAC = () => Promise.resolve().then(function () { return run_post$1; });
const _lazy_aNrmVt = () => Promise.resolve().then(function () { return enableLogin$1; });
const _lazy_oPkPDz = () => Promise.resolve().then(function () { return latest$1; });
const _lazy_o2fiOR = () => Promise.resolve().then(function () { return login$1; });
const _lazy_VTphhs = () => Promise.resolve().then(function () { return mcp_post$1; });
const _lazy_fXDJfY = () => Promise.resolve().then(function () { return index$3; });
const _lazy_xD0A92 = () => Promise.resolve().then(function () { return sync$1; });
const _lazy_Vji5sB = () => Promise.resolve().then(function () { return github$1; });
const _lazy_J2Hk3P = () => Promise.resolve().then(function () { return entire_post$1; });
const _lazy_XiXaCT = () => Promise.resolve().then(function () { return index$1; });
const _lazy_TdAFvB = () => Promise.resolve().then(function () { return health_get$1; });

const handlers = [
  { route: '', handler: _5qlM4G, lazy: false, middleware: true, method: undefined },
  { route: '/api/agent/briefing', handler: _lazy_STEhfU, lazy: true, middleware: false, method: "post" },
  { route: '/api/agent/briefings', handler: _lazy_D2SyMV, lazy: true, middleware: false, method: undefined },
  { route: '/api/agent/chat', handler: _lazy_wKBFzj, lazy: true, middleware: false, method: "post" },
  { route: '/api/agent/history', handler: _lazy_TOQmZH, lazy: true, middleware: false, method: undefined },
  { route: '/api/agent/trackers', handler: _lazy_eMXUGl, lazy: true, middleware: false, method: undefined },
  { route: '/api/agent/trackers/run', handler: _lazy_z3PwAC, lazy: true, middleware: false, method: "post" },
  { route: '/api/enable-login', handler: _lazy_aNrmVt, lazy: true, middleware: false, method: undefined },
  { route: '/api/latest', handler: _lazy_oPkPDz, lazy: true, middleware: false, method: undefined },
  { route: '/api/login', handler: _lazy_o2fiOR, lazy: true, middleware: false, method: undefined },
  { route: '/api/mcp', handler: _lazy_VTphhs, lazy: true, middleware: false, method: "post" },
  { route: '/api/me', handler: _lazy_fXDJfY, lazy: true, middleware: false, method: undefined },
  { route: '/api/me/sync', handler: _lazy_xD0A92, lazy: true, middleware: false, method: undefined },
  { route: '/api/oauth/github', handler: _lazy_Vji5sB, lazy: true, middleware: false, method: undefined },
  { route: '/api/s/entire', handler: _lazy_J2Hk3P, lazy: true, middleware: false, method: "post" },
  { route: '/api/s', handler: _lazy_XiXaCT, lazy: true, middleware: false, method: undefined },
  { route: '/api/sources/health', handler: _lazy_TdAFvB, lazy: true, middleware: false, method: "get" }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError$1({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError$1({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const briefing_post = defineEventHandler$1(async (event) => {
  var _a, _b;
  const body = await readBody$1(event);
  const days = body.days || 1;
  const topic = body.topic;
  if (process$1.env.ENABLE_CACHE === "false") {
    throw createError({
      statusCode: 503,
      message: "\u7F13\u5B58\u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u751F\u6210\u7B80\u62A5"
    });
  }
  const db = await getDatabase();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1e3;
  const rows = await db.prepare(
    "SELECT id, data, updated FROM cache WHERE updated >= ?"
  ).all(cutoff);
  const results = (_b = (_a = rows.results) != null ? _a : rows) != null ? _b : [];
  const cacheItems = results.map((row) => {
    try {
      return {
        id: row.id,
        updated: row.updated,
        items: JSON.parse(row.data)
      };
    } catch {
      return null;
    }
  }).filter(Boolean);
  const totalItems = cacheItems.reduce((sum, c) => sum + c.items.length, 0);
  if (totalItems === 0) {
    return {
      summary: topic ? `\u8FC7\u53BB ${days} \u5929\u5185\u6CA1\u6709\u627E\u5230\u5173\u4E8E"${topic}"\u7684\u65B0\u95FB\u7F13\u5B58\u3002` : `\u8FC7\u53BB ${days} \u5929\u5185\u6CA1\u6709\u65B0\u95FB\u7F13\u5B58\u6570\u636E\u3002`,
      model: "mock",
      mock: true,
      sourceCount: 0,
      degradedReason: "\u7F13\u5B58\u91CC\u6CA1\u6709\u6761\u76EE"
    };
  }
  const firstTitles = cacheItems.flatMap((c) => c.items).map((item) => item.title).filter(Boolean).slice(0, 30).join("\n");
  if (getLLMProviders().length === 0) {
    return {
      summary: `[mock] \u53D1\u73B0 ${totalItems} \u6761\u65B0\u95FB\uFF0C\u6765\u81EA ${cacheItems.length} \u4E2A\u6765\u6E90\u3002${topic ? `\u4E3B\u9898\uFF1A${topic}\u3002` : ""}\u524D\u51E0\u6761\u6807\u9898\uFF1A
${firstTitles.slice(0, 500)}

\u914D\u7F6E\u6A21\u578B\u540E\u53EF\u751F\u6210\u7B80\u62A5\u3002`,
      model: "mock",
      mock: true,
      sourceCount: cacheItems.length,
      degradedReason: "\u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55 LLM provider"
    };
  }
  const run = await runBriefing({
    days,
    topic,
    seeds: cacheItems.map((c) => ({ id: String(c.id), titles: c.items.map((i) => i.title).filter(Boolean) }))
  });
  if (run.ok) {
    return {
      summary: run.summary,
      model: run.model,
      provider: run.provider,
      mock: false,
      sourceCount: run.sourceCount,
      steps: run.steps
    };
  }
  return {
    summary: `[fallback] ${totalItems} \u6761\u65B0\u95FB\uFF0C${cacheItems.length} \u4E2A\u6765\u6E90\u3002\u7B80\u62A5\u751F\u6210\u5931\u8D25\u3002\u524D\u51E0\u6761\uFF1A
${firstTitles.slice(0, 500)}`,
    model: "mock",
    mock: true,
    sourceCount: cacheItems.length,
    degradedReason: run.reason
  };
});

const briefing_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: briefing_post
});

const briefings = defineEventHandler$1(async (event) => {
  var _a;
  const user = event.context.user;
  const db = await getDatabase();
  if (!(user == null ? void 0 : user.id) || !db) return { briefings: [], persisted: false };
  const table = new TrackerTable(db);
  if (process$1.env.INIT_TABLE !== "false") await table.init();
  const raw = Number((_a = getQuery$2(event).limit) != null ? _a : BRIEFING_LIST_LIMIT);
  const limit = Math.min(Math.max(Number.isFinite(raw) ? raw : BRIEFING_LIST_LIMIT, 1), BRIEFING_LIST_LIMIT);
  return { briefings: await table.listBriefings(user.id, limit), persisted: true };
});

const briefings$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: briefings
});

const chat_post = defineEventHandler$1(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody$1(event);
  const { message, context, history, contexts } = body;
  const user = event.context.user;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "message is required"
    });
  }
  const trimmed = message.trim();
  const accept = getHeader$1(event, "accept") || "";
  const streamFlag = String((_a = getQuery$2(event).stream) != null ? _a : "");
  const stream = accept.includes("text/event-stream") || streamFlag === "1" || streamFlag === "true";
  if (!stream) {
    const result = await runNewsAgent(trimmed, context, history, { userId: user == null ? void 0 : user.id, contexts });
    if (result.ok) {
      return {
        reply: result.reply,
        model: result.model,
        provider: result.provider,
        mock: false,
        steps: result.steps
      };
    }
    return mockAgentReply(trimmed, context, result.reason);
  }
  const eventStream = createEventStream(event);
  const abort = new AbortController();
  (_d = (_c = (_b = event.node) == null ? void 0 : _b.req) == null ? void 0 : _c.once) == null ? void 0 : _d.call(_c, "close", () => abort.abort());
  void (async () => {
    try {
      const result = await streamNewsAgent(
        trimmed,
        context,
        history,
        { userId: user == null ? void 0 : user.id, contexts, abortSignal: abort.signal },
        (event2) => eventStream.push(JSON.stringify(event2))
      );
      if (!result.ok) {
        const mock = mockAgentReply(trimmed, context, result.reason);
        await eventStream.push(JSON.stringify({
          type: "done",
          reply: mock.reply,
          steps: [],
          model: mock.model,
          mock: true,
          degradedReason: mock.degradedReason
        }));
      }
    } catch (e) {
      const reason = e instanceof Error ? e.message : "\u751F\u6210\u5931\u8D25";
      await eventStream.push(JSON.stringify({ type: "error", reason: reason.slice(0, 160) }));
    } finally {
      await eventStream.close();
    }
  })();
  return eventStream.send();
});

const chat_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: chat_post
});

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
class AgentHistoryTable {
  constructor(db) {
    __publicField$1(this, "db");
    this.db = db;
  }
  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS agent_history (
        id TEXT PRIMARY KEY,
        data TEXT,
        updated BIGINT
      );
    `).run();
    logger.success(`init agent_history table`);
  }
  async get(id) {
    var _a, _b;
    const row = await this.db.prepare(`SELECT data, updated FROM agent_history WHERE id = ?`).get(id);
    if (!row) return { messages: [], updated: 0 };
    try {
      const messages = JSON.parse(row.data);
      return { messages: Array.isArray(messages) ? messages : [], updated: (_a = row.updated) != null ? _a : 0 };
    } catch {
      return { messages: [], updated: (_b = row.updated) != null ? _b : 0 };
    }
  }
  async set(id, messages) {
    const now = Date.now();
    await this.db.prepare(
      `INSERT INTO agent_history (id, data, updated) VALUES (?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated = excluded.updated`
    ).run(id, JSON.stringify(messages), now);
    logger.success(`set agent history ${id} (${messages.length} messages)`);
    return now;
  }
  async clear(id) {
    await this.db.prepare(`DELETE FROM agent_history WHERE id = ?`).run(id);
    logger.success(`clear agent history ${id}`);
  }
}

const history = defineEventHandler$1(async (event) => {
  const user = event.context.user;
  const db = await getDatabase();
  if (!(user == null ? void 0 : user.id) || !db) {
    return { messages: [], updatedTime: 0, persisted: false };
  }
  const table = new AgentHistoryTable(db);
  if (process$1.env.INIT_TABLE !== "false") await table.init();
  if (event.method === "GET") {
    const { messages: messages2, updated } = await table.get(user.id);
    return { messages: messages2, updatedTime: updated, persisted: true };
  }
  const body = await readBody$1(event);
  const messages = trimAgentHistory(body == null ? void 0 : body.messages);
  const updatedTime = await table.set(user.id, messages);
  return { messages, updatedTime, persisted: true };
});

const history$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: history
});

const index$4 = defineEventHandler$1(async (event) => {
  var _a, _b;
  const user = event.context.user;
  const db = await getDatabase();
  if (!(user == null ? void 0 : user.id) || !db) return { trackers: [], persisted: false };
  const table = new TrackerTable(db);
  if (process$1.env.INIT_TABLE !== "false") await table.init();
  if (event.method === "GET") {
    return { trackers: await table.listTrackers(user.id), persisted: true };
  }
  if (event.method === "DELETE") {
    const id = String((_a = getQuery$2(event).id) != null ? _a : "");
    if (!id) throw createError({ statusCode: 400, message: "id is required" });
    await table.deleteTracker(id, user.id);
    return { deleted: true, persisted: true };
  }
  const body = await readBody$1(event);
  const topic = String((_b = body == null ? void 0 : body.topic) != null ? _b : "").trim();
  if (!topic) throw createError({ statusCode: 400, message: "topic is required" });
  const tracker = await table.createTracker({
    userId: user.id,
    topic,
    days: Number(body == null ? void 0 : body.days) || 1,
    intervalMs: clampInterval(Number(body == null ? void 0 : body.intervalMs))
  });
  return { tracker, persisted: true };
});

const index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$4
});

const run_post = defineEventHandler$1(async (event) => {
  var _a;
  const secret = process$1.env.CRON_SECRET;
  const provided = getHeader$1(event, "x-cron-secret") || String((_a = getQuery$2(event).secret) != null ? _a : "");
  if (!secret || provided !== secret) {
    throw createError({ statusCode: 401, message: "invalid cron secret" });
  }
  const results = await runDueTrackers();
  return { ran: results.length, results };
});

const run_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: run_post
});

const enableLogin = defineEventHandler$1(async () => {
  const clientId = process$1.env.G_CLIENT_ID;
  return {
    enable: Boolean(clientId),
    url: clientId ? `https://github.com/login/oauth/authorize?client_id=${clientId}` : ""
  };
});

const enableLogin$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enableLogin
});

const latest = defineEventHandler$1(async () => {
  return {
    v: Version
  };
});

const latest$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: latest
});

const login = defineEventHandler$1(async (event) => {
  sendRedirect$1(event, `https://github.com/login/oauth/authorize?client_id=${process$1.env.G_CLIENT_ID}`);
});

const login$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login
});

const description = Object.entries(sources$1).filter(([_, source]) => {
  if (source.redirect) {
    return false;
  }
  return true;
}).map(([id, source]) => {
  return source.title ? `${source.name}-${source.title} id is ${id}` : `${source.name} id is ${id}`;
}).join(";");

function getServer() {
  const server = new McpServer(
    {
      name: Brand.name,
      version: packageJSON.version
    },
    { capabilities: { logging: {} } }
  );
  server.tool(
    "get_hotest_latest_news",
    `get hotest or latest news from source by {id}, return {count: 10} news.`,
    {
      id: z.string().describe(`source id. e.g. ${description}`),
      count: z.any().default(10).describe("count of news to return.")
    },
    async ({ id, count }) => {
      const items = await fetchSourceItems(id);
      return {
        content: items.slice(0, count).map((item) => {
          return {
            text: `[${item.title}](${item.url})`,
            type: "text"
          };
        })
      };
    }
  );
  server.server.onerror = console.error.bind(console);
  return server;
}

const mcp_post = defineEventHandler$1(async (event) => {
  const req = event.node.req;
  if (!req.headers.accept) {
    req.headers.accept = "application/json, text/event-stream";
  }
  const res = event.node.res;
  const server = getServer();
  try {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: void 0 });
    transport.onerror = console.error.bind(console);
    await server.connect(transport);
    await transport.handleRequest(req, res, await readBody$1(event));
    res.on("close", () => {
      transport.close();
      server.close();
    });
    return res;
  } catch (e) {
    console.error(e);
    return {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error"
      },
      id: null
    };
  }
});

const mcp_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mcp_post
});

const index$2 = defineEventHandler$1(() => {
  return {
    hello: "world"
  };
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

function verifyPrimitiveMetadata(target) {
  return z$1.object({
    data: z$1.record(z$1.string(), z$1.array(z$1.string())),
    updatedTime: z$1.number()
  }).parse(target);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class UserTable {
  constructor(db) {
    __publicField(this, "db");
    this.db = db;
  }
  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS "user" (
        -- Postgres \u91CC user \u662F\u4FDD\u7559\u5B57\uFF0C\u5FC5\u987B\u52A0\u5F15\u53F7\uFF08SQLite \u4E5F\u63A5\u53D7\u8FD9\u79CD\u5199\u6CD5\uFF09
        id TEXT PRIMARY KEY,
        email TEXT,
        data TEXT,
        type TEXT,
        created BIGINT,
        updated BIGINT
      );
    `).run();
    logger.success(`init user table`);
  }
  async addUser(id, email, type) {
    const u = await this.getUser(id);
    const now = Date.now();
    if (!u) {
      await this.db.prepare(`INSERT INTO "user" (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`).run(id, email, "", type, now, now);
      logger.success(`add user ${id}`);
    } else if (u.email !== email && u.type !== type) {
      await this.db.prepare(`UPDATE "user" SET email = ?, updated = ? WHERE id = ?`).run(email, now, id);
      logger.success(`update user ${id} email`);
    } else {
      logger.info(`user ${id} already exists`);
    }
  }
  async getUser(id) {
    return await this.db.prepare(`SELECT id, email, data, created, updated FROM "user" WHERE id = ?`).get(id);
  }
  /**
   * Upsert: a token can be issued locally (or a row can be missing after a
   * manual cleanup) and we still want the write to land.
   */
  async setData(key, value, updatedTime = Date.now()) {
    const existing = await this.db.prepare(`SELECT id FROM "user" WHERE id = ?`).get(key);
    const state = existing ? await this.db.prepare(`UPDATE "user" SET data = ?, updated = ? WHERE id = ?`).run(value, updatedTime, key) : await this.db.prepare(`INSERT INTO "user" (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`).run(key, "", value, "github", updatedTime, updatedTime);
    if (!state.success) throw new Error(`set user ${key} data failed`);
    logger.success(`set ${key} data`);
  }
  /** Missing row means "no data yet", not an error. */
  async getData(id) {
    const row = await this.db.prepare(`SELECT data, updated FROM "user" WHERE id = ?`).get(id);
    if (!row) {
      logger.info(`user ${id} has no row yet`);
      return { data: "", updated: 0 };
    }
    logger.success(`get ${id} data`);
    return row;
  }
  async deleteUser(key) {
    const state = await this.db.prepare(`DELETE FROM "user" WHERE id = ?`).run(key);
    if (!state.success) throw new Error(`delete user ${key} failed`);
    logger.success(`delete user ${key}`);
  }
}

const sync = defineEventHandler$1(async (event) => {
  try {
    const { id } = event.context.user;
    const db = await getDatabase();
    if (!db) throw new Error("Not found database");
    const userTable = new UserTable(db);
    if (process$1.env.INIT_TABLE !== "false") await userTable.init();
    if (event.method === "GET") {
      const { data, updated } = await userTable.getData(id);
      return {
        data: data ? JSON.parse(data) : void 0,
        updatedTime: updated
      };
    } else if (event.method === "POST") {
      const body = await readBody$1(event);
      verifyPrimitiveMetadata(body);
      const { updatedTime, data } = body;
      await userTable.setData(id, JSON.stringify(data), updatedTime);
      return {
        success: true,
        updatedTime
      };
    }
  } catch (e) {
    logger.error(e);
    throw createError({
      statusCode: 500,
      message: e instanceof Error ? e.message : "Internal Server Error"
    });
  }
});

const sync$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sync
});

const github = defineEventHandler$1(async (event) => {
  const db = await getDatabase();
  const userTable = db ? new UserTable(db) : void 0;
  if (!userTable) throw new Error("db is not defined");
  if (process$1.env.INIT_TABLE !== "false") await userTable.init();
  const response = await myFetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: "POST",
      body: {
        client_id: process$1.env.G_CLIENT_ID,
        client_secret: process$1.env.G_CLIENT_SECRET,
        code: getQuery$2(event).code
      },
      headers: {
        accept: "application/json"
      }
    }
  );
  const userInfo = await myFetch(`https://api.github.com/user`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `token ${response.access_token}`,
      // 必须有 user-agent，在 cloudflare worker 会报错
      "User-Agent": `${Brand.name} App`
    }
  });
  const userID = String(userInfo.id);
  await userTable.addUser(userID, userInfo.notification_email || userInfo.email, "github");
  const jwtToken = await new SignJWT({
    id: userID,
    type: "github"
  }).setExpirationTime("60d").setProtectedHeader({ alg: "HS256" }).sign(new TextEncoder().encode(process$1.env.JWT_SECRET));
  const params = new URLSearchParams({
    login: "github",
    jwt: jwtToken,
    user: JSON.stringify({
      avatar: userInfo.avatar_url,
      name: userInfo.name
    })
  });
  return sendRedirect$1(event, `/?${params.toString()}`);
});

const github$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: github
});

const entire_post = defineEventHandler$1(async (event) => {
  try {
    const { sources: _ } = await readBody$1(event);
    const cacheTable = await getCacheTable();
    const ids = _ == null ? void 0 : _.filter((k) => sources[k]);
    if ((ids == null ? void 0 : ids.length) && cacheTable) {
      const caches = await cacheTable.getEntire(ids);
      const now = Date.now();
      return caches.map((cache) => ({
        status: "cache",
        id: cache.id,
        items: cache.items,
        updatedTime: now - cache.updated < sources[cache.id].interval ? now : cache.updated
      }));
    }
  } catch {
  }
});

const entire_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: entire_post
});

const index = defineEventHandler$1(async (event) => {
  var _a, _b;
  const query = getQuery$2(event);
  const latest = query.latest !== void 0 && query.latest !== "false";
  let id = query.id;
  const isValid = (sourceID) => !sourceID || !sources[sourceID] || !getters[sourceID];
  if (isValid(id)) {
    const redirectID = (_b = (_a = sources) == null ? void 0 : _a[id]) == null ? void 0 : _b.redirect;
    if (redirectID) id = redirectID;
    if (isValid(id)) {
      throw createError({
        statusCode: 400,
        message: "Invalid source id"
      });
    }
  }
  assertSourceEnabled(id);
  try {
    const cacheTable = await getCacheTable();
    const now = Date.now();
    let cache;
    if (cacheTable) {
      cache = await cacheTable.get(id);
      if (cache) {
        if (now - cache.updated < sources[id].interval) {
          return {
            status: "success",
            id,
            updatedTime: now,
            items: cache.items
          };
        }
        if (now - cache.updated < TTL) {
          if (!latest || !event.context.disabledLogin && !event.context.user) {
            return {
              status: "cache",
              id,
              updatedTime: cache.updated,
              items: cache.items
            };
          }
        }
      }
    }
    try {
      const newData = (await getters[id]()).slice(0, 30);
      if (cacheTable && newData.length) {
        if (event.context.waitUntil) event.context.waitUntil(cacheTable.set(id, newData));
        else await cacheTable.set(id, newData);
      }
      logger.success(`fetch ${id} latest`);
      return {
        status: "success",
        id,
        updatedTime: now,
        items: newData
      };
    } catch (e) {
      if (cache) {
        return {
          status: "cache",
          id,
          updatedTime: cache.updated,
          items: cache.items
        };
      } else {
        throw e;
      }
    }
  } catch (e) {
    logger.error(e);
    throw createError({
      statusCode: 500,
      message: e instanceof Error ? e.message : "Internal Server Error"
    });
  }
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const health_get = defineEventHandler$1(() => ({
  updatedAt: Date.now(),
  disabled: getDisabledSources()
}));

const health_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: health_get
});
 /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: health_get
});
