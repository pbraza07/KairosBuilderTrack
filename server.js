const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 10000;
const HOST = '0.0.0.0';
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'portal-state.json');
const DATABASE_URL = process.env.DATABASE_URL || '';
const MAX_BODY_BYTES = 50 * 1024 * 1024;

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
  '.txt': 'text/plain; charset=utf-8',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel'
};

let pool = null;
let shared = null;
let storageMode = 'file';

function passwordRecord(password, saltHex = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), Buffer.from(saltHex, 'hex'), 64).toString('hex');
  return { salt: saltHex, hash };
}

function verifyPassword(record, password) {
  if (!record?.salt || !record?.hash) return false;
  try {
    const actual = crypto.scryptSync(String(password), Buffer.from(record.salt, 'hex'), 64);
    const expected = Buffer.from(record.hash, 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function defaultSharedState() {
  const adminId = 'u-admin';
  return {
    meta: {
      initialized: false,
      updatedAt: new Date().toISOString(),
      storage: 'server',
      sessionSecret: crypto.randomBytes(32).toString('hex')
    },
    data: {
      users: [
        {
          id: adminId,
          name: 'Plinio Alves',
          email: 'admin@kairoslegacyhomes.com',
          role: 'admin',
          projectIds: []
        }
      ],
      projects: []
    },
    credentials: {
      [adminId]: passwordRecord('Kairos2026!')
    }
  };
}

function normalizeStoredShared(value) {
  if (!value || typeof value !== 'object') return defaultSharedState();
  value.meta = value.meta || {};
  value.meta.initialized = Boolean(value.meta.initialized);
  value.meta.sessionSecret = value.meta.sessionSecret || crypto.randomBytes(32).toString('hex');
  value.data = value.data || { users: [], projects: [] };
  value.data.users = Array.isArray(value.data.users) ? value.data.users : [];
  value.data.projects = Array.isArray(value.data.projects) ? value.data.projects : [];
  value.credentials = value.credentials || {};

  // Upgrade any earlier shared JSON that still contains plaintext passwords.
  value.data.users.forEach(u => {
    if (u.password) {
      value.credentials[u.id] = passwordRecord(u.password);
      delete u.password;
    }
    u.projectIds = Array.isArray(u.projectIds) ? u.projectIds : [];
    u.email = String(u.email || '').trim();
    u.role = u.role === 'admin' ? 'admin' : 'client';
  });
  value.data.projects.forEach(p => {
    p.tasks = Array.isArray(p.tasks) ? p.tasks : [];
    p.photos = Array.isArray(p.photos) ? p.photos : [];
    p.expenses = Array.isArray(p.expenses) ? p.expenses : [];
  });
  return value;
}

async function initStorage() {
  if (DATABASE_URL) {
    storageMode = 'postgres';
    const { Pool } = require('pg');
    pool = new Pool({ connectionString: DATABASE_URL });
    await pool.query(`CREATE TABLE IF NOT EXISTS kairos_portal_state (
      id INTEGER PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    const row = await pool.query('SELECT payload FROM kairos_portal_state WHERE id = 1');
    if (row.rows.length) {
      shared = normalizeStoredShared(row.rows[0].payload);
      await persistShared();
    } else {
      shared = defaultSharedState();
      await pool.query(
        'INSERT INTO kairos_portal_state (id, payload, updated_at) VALUES (1, $1::jsonb, NOW())',
        [JSON.stringify(shared)]
      );
    }
    return;
  }

  storageMode = 'file';
  fs.mkdirSync(DATA_DIR, { recursive: true });
  try {
    if (fs.existsSync(DATA_FILE)) shared = normalizeStoredShared(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
    else shared = defaultSharedState();
  } catch (err) {
    console.error('Unable to read local shared state; using a safe default:', err.message);
    shared = defaultSharedState();
  }
  await persistShared();
}

async function persistShared() {
  shared.meta = shared.meta || {};
  shared.meta.updatedAt = new Date().toISOString();
  shared.meta.storage = storageMode;
  if (storageMode === 'postgres') {
    await pool.query(
      `INSERT INTO kairos_portal_state (id, payload, updated_at)
       VALUES (1, $1::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
      [JSON.stringify(shared)]
    );
    return;
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(shared, null, 2), 'utf8');
  fs.renameSync(tmp, DATA_FILE);
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    ...headers
  });
  res.end(body);
}

function sendJson(res, status, value) {
  send(res, status, JSON.stringify(value), { 'Content-Type': 'application/json; charset=utf-8' });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Request too large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { statusCode: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function makeToken(userId) {
  const payload = base64url(JSON.stringify({ userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  const sig = crypto.createHmac('sha256', Buffer.from(shared.meta.sessionSecret, 'hex')).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function parseToken(token) {
  try {
    const [payload, sig] = String(token || '').split('.');
    if (!payload || !sig) return null;
    const expected = crypto.createHmac('sha256', Buffer.from(shared.meta.sessionSecret, 'hex')).update(payload).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!parsed.userId || Number(parsed.exp) < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function bearer(req) {
  const header = String(req.headers.authorization || '');
  const m = header.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : '';
}

function sessionUser(req) {
  const parsed = parseToken(bearer(req));
  if (!parsed) return null;
  return shared.data.users.find(u => u.id === parsed.userId) || null;
}

function stateForUser(user) {
  if (!user) return { users: [], projects: [] };
  if (user.role === 'admin') return shared.data;
  const allowed = new Set(Array.isArray(user.projectIds) ? user.projectIds : []);
  return {
    users: [user],
    projects: shared.data.projects.filter(p => allowed.has(p.id))
  };
}

function normalizeIncomingState(raw) {
  if (!raw || typeof raw !== 'object') throw Object.assign(new Error('State is required'), { statusCode: 400 });
  const data = {
    users: Array.isArray(raw.users) ? raw.users.map(u => ({ ...u })) : [],
    projects: Array.isArray(raw.projects) ? raw.projects : []
  };
  const passwordUpdates = new Map();
  data.users.forEach(u => {
    const pw = typeof u.password === 'string' ? u.password : '';
    if (pw) passwordUpdates.set(u.id, pw);
    delete u.password;
    u.projectIds = Array.isArray(u.projectIds) ? u.projectIds : [];
    u.email = String(u.email || '').trim();
    u.role = u.role === 'admin' ? 'admin' : 'client';
  });
  const admin = data.users.find(u => u.role === 'admin');
  if (!admin) throw Object.assign(new Error('State must contain an administrator account'), { statusCode: 400 });
  data.projects.forEach(p => {
    p.tasks = Array.isArray(p.tasks) ? p.tasks : [];
    p.photos = Array.isArray(p.photos) ? p.photos : [];
    p.expenses = Array.isArray(p.expenses) ? p.expenses : [];
  });
  return { data, passwordUpdates };
}

function applyCredentialUpdates(data, passwordUpdates, { preserveAdminId = null } = {}) {
  const nextCredentials = {};
  for (const u of data.users) {
    if (preserveAdminId && u.id === preserveAdminId && shared.credentials[u.id]) {
      nextCredentials[u.id] = shared.credentials[u.id];
      continue;
    }
    if (passwordUpdates.has(u.id)) nextCredentials[u.id] = passwordRecord(passwordUpdates.get(u.id));
    else if (shared.credentials[u.id]) nextCredentials[u.id] = shared.credentials[u.id];
    else throw Object.assign(new Error(`A password is required for new account ${u.email || u.name || u.id}`), { statusCode: 400 });
  }
  shared.credentials = nextCredentials;
}

async function handleApi(req, res, pathname) {
  if (pathname === '/api/status' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      sharedStorage: true,
      persistentStorage: storageMode === 'postgres' || Boolean(process.env.DATA_DIR),
      storageMode,
      initialized: Boolean(shared.meta.initialized),
      updatedAt: shared.meta.updatedAt || null
    });
  }

  if (pathname === '/api/login' && req.method === 'POST') {
    const body = await readJson(req);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const user = shared.data.users.find(u => String(u.email || '').trim().toLowerCase() === email);
    if (!user || !verifyPassword(shared.credentials[user.id], password)) {
      return sendJson(res, 401, { error: 'Invalid email or password' });
    }
    return sendJson(res, 200, {
      token: makeToken(user.id),
      user,
      state: stateForUser(user),
      serverInitialized: Boolean(shared.meta.initialized),
      storageMode,
      persistentStorage: storageMode === 'postgres' || Boolean(process.env.DATA_DIR),
      updatedAt: shared.meta.updatedAt || null
    });
  }

  if (pathname === '/api/logout' && req.method === 'POST') {
    return sendJson(res, 200, { ok: true });
  }

  const user = sessionUser(req);
  if (!user) return sendJson(res, 401, { error: 'Session expired. Please sign in again.' });

  if (pathname === '/api/state' && req.method === 'GET') {
    return sendJson(res, 200, {
      user,
      state: stateForUser(user),
      storageMode,
      persistentStorage: storageMode === 'postgres' || Boolean(process.env.DATA_DIR),
      updatedAt: shared.meta.updatedAt || null
    });
  }

  if (pathname === '/api/state' && req.method === 'PUT') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    const body = await readJson(req);
    const { data, passwordUpdates } = normalizeIncomingState(body.state);
    applyCredentialUpdates(data, passwordUpdates);
    shared.data = data;
    shared.meta.initialized = true;
    await persistShared();
    return sendJson(res, 200, { ok: true, updatedAt: shared.meta.updatedAt, state: shared.data });
  }

  if (pathname === '/api/admin/migrate-local' && req.method === 'POST') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    if (shared.meta.initialized) {
      return sendJson(res, 409, { error: 'Shared portal data is already initialized. Migration was not applied.' });
    }
    const body = await readJson(req);
    const { data, passwordUpdates } = normalizeIncomingState(body.state);
    const incomingAdmin = data.users.find(u => u.role === 'admin' && (u.id === user.id || String(u.email).toLowerCase() === String(user.email).toLowerCase()));
    if (!incomingAdmin) return sendJson(res, 400, { error: 'The local data does not contain the signed-in administrator.' });
    if (incomingAdmin.id !== user.id) {
      // Keep IDs consistent with the authenticated shared admin.
      const oldId = incomingAdmin.id;
      incomingAdmin.id = user.id;
      data.projects.forEach(p => { if (p.clientId === oldId) p.clientId = user.id; });
    }
    applyCredentialUpdates(data, passwordUpdates, { preserveAdminId: user.id });
    shared.data = data;
    shared.meta.initialized = true;
    shared.meta.migratedAt = new Date().toISOString();
    await persistShared();
    return sendJson(res, 200, {
      ok: true,
      state: shared.data,
      updatedAt: shared.meta.updatedAt,
      migratedUsers: shared.data.users.length,
      migratedProjects: shared.data.projects.length
    });
  }

  return sendJson(res, 404, { error: 'API endpoint not found' });
}

function serveIndex(res) {
  fs.readFile(path.join(ROOT, 'index.html'), (err, data) => {
    if (err) return send(res, 500, 'Unable to load application.', { 'Content-Type': 'text/plain; charset=utf-8' });
    send(res, 200, data, { 'Content-Type': 'text/html; charset=utf-8' });
  });
}

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return serveIndex(res);
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) return send(res, 500, 'Internal Server Error', { 'Content-Type': 'text/plain; charset=utf-8' });
      send(res, 200, data, { 'Content-Type': type, 'Cache-Control': ext === '.html' || ext === '.js' || ext === '.css' ? 'no-cache' : 'public, max-age=3600' });
    });
  });
}

async function start() {
  await initStorage();
  const server = http.createServer(async (req, res) => {
    const parsed = url.parse(req.url || '/');
    const pathname = decodeURIComponent(parsed.pathname || '/');

    if (pathname === '/health' || pathname === '/healthz') {
      return sendJson(res, 200, { status: 'ok', app: 'kairos-builder-portal', sharedStorage: true, storageMode });
    }

    if (pathname.startsWith('/api/')) {
      try {
        return await handleApi(req, res, pathname);
      } catch (err) {
        const status = Number(err.statusCode) || 500;
        console.error('API error:', err);
        return sendJson(res, status, { error: status >= 500 ? 'Server error' : err.message });
      }
    }

    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const filePath = path.join(ROOT, safePath);
    if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    serveFile(res, filePath);
  });

  server.listen(PORT, HOST, () => {
    console.log(`Kairos Builder Portal running on http://${HOST}:${PORT}`);
    console.log(`Shared storage mode: ${storageMode}`);
    if (storageMode === 'file') console.log(`Shared data file: ${DATA_FILE}`);
  });
}

start().catch(err => {
  console.error('Failed to start Kairos Builder Portal:', err);
  process.exit(1);
});
