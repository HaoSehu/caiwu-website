#!/usr/bin/env node
/**
 * 本地预览整站（含 /demo/）：在 dist/ 上起一个只读静态服务器。
 * 用法：npm run demo:serve [-- --port 4320]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', 'dist');

let port = 4320;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--port') {
    port = Number(args[i + 1]) || port;
    i += 1;
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function send(response, status, body, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  response.end(body);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const target = path.normalize(path.join(root, decoded));

  // 防目录穿越：解析结果必须在根目录内
  if (!target.startsWith(root)) {
    return null;
  }

  if (existsSync(target) && statSync(target).isDirectory()) {
    const index = path.join(target, 'index.html');
    return existsSync(index) ? index : null;
  }

  return existsSync(target) ? target : null;
}

const server = http.createServer((request, response) => {
  let file = resolveFile(request.url || '/');

  // 与 GitHub Pages 行为对齐：未命中的路径回退到 404.html（若存在）
  if (!file) {
    const notFound = path.join(root, '404.html');
    if (existsSync(notFound)) {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      createReadStream(notFound).pipe(response);
      console.log(`404 ${request.url} -> 404.html`);
      return;
    }
    send(response, 404, `404 Not Found: ${request.url}\n`);
    console.log(`404 ${request.url}`);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  response.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
  });
  createReadStream(file).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`静态服务器已启动：http://127.0.0.1:${port}/`);
  console.log(`在线演示入口：http://127.0.0.1:${port}/demo/`);
});
