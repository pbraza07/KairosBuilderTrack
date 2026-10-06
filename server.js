const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = Number(process.env.PORT) || 10000;
const HOST = '0.0.0.0';
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    ...headers
  });
  res.end(body);
}

function serveIndex(res) {
  fs.readFile(path.join(ROOT, 'index.html'), (err, data) => {
    if (err) {
      return send(res, 500, 'Unable to load application.', { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    send(res, 200, data, { 'Content-Type': 'text/html; charset=utf-8' });
  });
}

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return serveIndex(res);

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        return send(res, 500, 'Internal Server Error', { 'Content-Type': 'text/plain; charset=utf-8' });
      }
      send(res, 200, data, { 'Content-Type': type });
    });
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || '/');
  const pathname = decodeURIComponent(parsed.pathname || '/');

  if (pathname === '/health' || pathname === '/healthz') {
    return send(res, 200, JSON.stringify({ status: 'ok', app: 'kairos-builder-portal' }), {
      'Content-Type': 'application/json; charset=utf-8'
    });
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  serveFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`Kairos Builder Portal running on http://${HOST}:${PORT}`);
});
