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
const IS_RENDER = Boolean(process.env.RENDER || process.env.RENDER_SERVICE_ID || process.env.RENDER_EXTERNAL_HOSTNAME);
const ALLOW_EPHEMERAL_STORAGE = String(process.env.ALLOW_EPHEMERAL_STORAGE || '').toLowerCase() === 'true';

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
let writeChain = Promise.resolve();

function isPersistentStorage() {
  return storageMode === 'postgres' || (storageMode === 'file' && Boolean(process.env.DATA_DIR));
}

function ensureWritablePersistentStorage() {
  if (storageMode === 'blocked-ephemeral') {
    throw Object.assign(new Error('Persistent storage is required on Render. Connect PostgreSQL and set DATABASE_URL before creating or editing portal data.'), { statusCode: 503 });
  }
}

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

function normalizeProjectTasks(project) {
  project.tasks = (Array.isArray(project.tasks) ? project.tasks : []).map(task =>
    task.id ? task : { ...task, id: `t-${crypto.randomUUID()}` }
  );
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
    normalizeProjectTasks(p);
    p.photos = Array.isArray(p.photos) ? p.photos : [];
    p.expenses = Array.isArray(p.expenses) ? p.expenses : [];
    p.expenseHistory = Array.isArray(p.expenseHistory) ? p.expenseHistory : [];
    p.notifications = Array.isArray(p.notifications) ? p.notifications : [];
  });
  return value;
}

async function initStorage() {
  if (DATABASE_URL) {
    storageMode = 'postgres';
    const { Pool } = require('pg');
    pool = new Pool({
      connectionString: DATABASE_URL,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
      statement_timeout: 30000,
      query_timeout: 35000,
      idle_in_transaction_session_timeout: 40000,
      keepAlive: true
    });
    // pg removes failed idle clients; handle the event so a dropped connection
    // cannot crash the portal and strand an administrator's save request.
    pool.on('error', error => console.error('Idle database connection error:', error.message));
    await pool.query(`CREATE TABLE IF NOT EXISTS kairos_portal_state (
      id INTEGER PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS kairos_portal_backups (
      backup_id BIGSERIAL PRIMARY KEY,
      payload JSONB NOT NULL,
      reason TEXT NOT NULL DEFAULT 'save',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    const row = await pool.query('SELECT payload FROM kairos_portal_state WHERE id = 1');
    if (row.rows.length) {
      shared = normalizeStoredShared(row.rows[0].payload);
      // Normalization is committed with the next real edit; do not rewrite all photos at startup.
    } else {
      shared = defaultSharedState();
      await pool.query(
        'INSERT INTO kairos_portal_state (id, payload, updated_at) VALUES (1, $1::jsonb, NOW())',
        [JSON.stringify(shared)]
      );
      await createDatabaseBackup('initial-state');
    }
    return;
  }

  // Render's normal filesystem is ephemeral. A free service can sleep/restart and
  // recreate the container, which makes a local JSON database disappear. Starting
  // with v1.8 we fail closed on Render rather than accepting data that can vanish.
  if (IS_RENDER && !process.env.DATA_DIR && !ALLOW_EPHEMERAL_STORAGE) {
    storageMode = 'blocked-ephemeral';
    shared = defaultSharedState();
    console.error('Persistent storage protection: DATABASE_URL is not configured. Writes are blocked to prevent data loss.');
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
  await persistShared('startup');
}

async function createDatabaseBackup(reason = 'save', db = pool, snapshot = shared) {
  if (storageMode !== 'postgres' || !db || !snapshot) return;
  // Copy the already-stored JSON inside PostgreSQL rather than sending and
  // parsing every photo again. Limit automatic snapshots to one per hour.
  await db.query(
    `INSERT INTO kairos_portal_backups (payload, reason, created_at)
     SELECT payload, $1, NOW() FROM kairos_portal_state WHERE id = 1
     AND NOT EXISTS (SELECT 1 FROM kairos_portal_backups WHERE created_at > NOW() - INTERVAL '1 hour')`,
    [String(reason).slice(0, 120)]
  );
  // Keep a generous rolling safety history without allowing unlimited growth.
  await db.query(`DELETE FROM kairos_portal_backups
    WHERE backup_id NOT IN (
      SELECT backup_id FROM kairos_portal_backups ORDER BY backup_id DESC LIMIT 250
    )`);
}

async function persistShared(reason = 'save', snapshot = shared, schedulePatch = null) {
  ensureWritablePersistentStorage();
  snapshot.meta = snapshot.meta || {};
  snapshot.meta.updatedAt = new Date().toISOString();
  snapshot.meta.storage = storageMode;
  if (storageMode === 'postgres') {
    const db = await pool.connect();
    let connectionError;
    const onConnectionError = error => { connectionError = error; };
    db.on('error', onConnectionError);
    try {
      await db.query('BEGIN');
      await createDatabaseBackup(reason, db, snapshot);
      if (schedulePatch) {
        // Patch only changed schedule fields. Re-submitting the entire project
        // photo collection exhausted the small database during JSON parsing.
        const projectIndex = shared.data.projects.findIndex(p => p.id === schedulePatch.id);
        const fields = ['tasks', 'start', 'target', 'status', 'completion', 'lastUpdate'];
        const changes = Object.fromEntries(fields.filter(field => Object.prototype.hasOwnProperty.call(schedulePatch, field)).map(field => [field, schedulePatch[field]]));
        const projectPath = ['data', 'projects', String(projectIndex)];
        const result = await db.query(
          `UPDATE kairos_portal_state
           SET payload = jsonb_set(payload, $1::text[], (payload #> $1::text[]) || $2::jsonb, false), updated_at = NOW()
           WHERE id = 1 AND payload #>> ($1::text[] || ARRAY['id']) = $3`,
          [projectPath, JSON.stringify(changes), schedulePatch.id]
        );
        if (result.rowCount !== 1) throw new Error('Stored project state is missing');
      } else {
        await db.query(
          `INSERT INTO kairos_portal_state (id, payload, updated_at)
           VALUES (1, $1::jsonb, NOW())
           ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
          [JSON.stringify(snapshot)]
        );
      }
      await db.query('COMMIT');
    } catch (error) {
      // Preserve the original failure and evict this client. A broken connection
      // may also reject ROLLBACK and must never re-enter the pool.
      connectionError = connectionError || error;
      try { await db.query('ROLLBACK'); } catch {}
      throw Object.assign(new Error('Unable to save changes to the database. Please try again.'), { statusCode: 503, cause: error });
    } finally {
      db.release(connectionError);
      db.removeListener('error', onConnectionError);
    }
    return;
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(snapshot, null, 2), 'utf8');
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
  const version = Number(shared.credentials[userId]?.version) || 0;
  const payload = base64url(JSON.stringify({ userId, version, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
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
  if ((Number(parsed.version) || 0) !== (Number(shared.credentials[parsed.userId]?.version) || 0)) return null;
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
    normalizeProjectTasks(p);
    p.photos = Array.isArray(p.photos) ? p.photos : [];
    p.expenses = Array.isArray(p.expenses) ? p.expenses : [];
    p.expenseHistory = Array.isArray(p.expenseHistory) ? p.expenseHistory : [];
    p.notifications = Array.isArray(p.notifications) ? p.notifications : [];
  });
  return { data, passwordUpdates };
}

function mergeByIdPreservingMissing(existing = [], incoming = []) {
  const out = new Map();
  for (const item of existing || []) if (item && item.id) out.set(item.id, item);
  for (const item of incoming || []) if (item && item.id) out.set(item.id, item);
  return [...out.values()];
}

function remapProjectAccount(project, fromId, toId) {
  return {
    ...project,
    clientId: project.clientId === fromId ? toId : project.clientId,
    expenses: (project.expenses || []).map(expense => ({
      ...expense,
      approvalRequestedBy: expense.approvalRequestedBy === fromId ? toId : expense.approvalRequestedBy,
      decisionBy: expense.decisionBy === fromId ? toId : expense.decisionBy
    })),
    notifications: (project.notifications || []).map(notification => ({
      ...notification,
      targetUserId: notification.targetUserId === fromId ? toId : notification.targetUserId
    }))
  };
}

function mergeIncomingStatePreservingExisting(incomingData, intent = {}) {
  // Retired identities must stay merged when another browser saves an older snapshot.
  for (const [fromId, merge] of Object.entries(shared.meta.mergedAccounts || {})) {
    incomingData.users = incomingData.users.filter(account => account.id !== fromId);
    incomingData.projects = incomingData.projects.map(project => remapProjectAccount(project, fromId, merge.targetId));
  }
  const replaceTasksFor = new Set(Array.isArray(intent.replaceTasksFor) ? intent.replaceTasksFor : []);
  const users = mergeByIdPreservingMissing(shared.data.users || [], incomingData.users || []);
  const projectMap = new Map((shared.data.projects || []).map(p => [p.id, p]));
  for (const incoming of incomingData.projects || []) {
    const old = projectMap.get(incoming.id);
    if (!old) {
      projectMap.set(incoming.id, incoming);
      continue;
    }
    const merged = { ...old, ...incoming };
    merged.tasks = replaceTasksFor.has(incoming.id)
      ? (incoming.tasks || [])
      : mergeByIdPreservingMissing(old.tasks || [], incoming.tasks || []);
    merged.photos = mergeByIdPreservingMissing(old.photos || [], incoming.photos || []);
    merged.expenses = mergeByIdPreservingMissing(old.expenses || [], incoming.expenses || []);
    merged.expenseHistory = mergeByIdPreservingMissing(old.expenseHistory || [], incoming.expenseHistory || []);
    merged.notifications = mergeByIdPreservingMissing(old.notifications || [], incoming.notifications || []);
    projectMap.set(incoming.id, merged);
  }
  return { users, projects: [...projectMap.values()] };
}

function recordDeletionAudit({ type, id, projectId = '', actor }) {
  shared.meta.deletionAudit = Array.isArray(shared.meta.deletionAudit) ? shared.meta.deletionAudit : [];
  shared.meta.deletionAudit.push({
    type, id, projectId, actorId: actor?.id || '', actorName: actor?.name || actor?.email || 'Administrator', at: new Date().toISOString()
  });
  if (shared.meta.deletionAudit.length > 500) shared.meta.deletionAudit = shared.meta.deletionAudit.slice(-500);
}

function scheduleDuration(start, end) {
  return Math.max(1, (Date.parse(end) - Date.parse(start)) / 86400000 + 1 || 1);
}

function serverScheduleCompletion(tasks = []) {
  let total = 0;
  let weighted = 0;
  for (const task of tasks) {
    const duration = Math.max(1, Number(task.duration) || scheduleDuration(task.start, task.end));
    const progress = task.status === 'done' ? 100 : Math.max(0, Math.min(100, Number(task.progress) || 0));
    total += duration;
    weighted += duration * progress;
  }
  return total ? Math.round(weighted / total) : 0;
}

function scheduleDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

function percentage(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}

function phaseValues(values, create) {
  const { start, end, progress, duration, statusOverride } = values;
  const textFields = ['code', 'name', 'category', 'trade', 'notes'];
  if (textFields.some(key => typeof values[key] !== 'string') || !values.name.trim() || !values.category.trim()) {
    throw Object.assign(new Error('Enter a phase name and category.'), { statusCode: 400 });
  }
  if (!((!create && start === '') || scheduleDate(start)) || !((!create && end === '') || scheduleDate(end)) || (start && end && end < start)) {
    throw Object.assign(new Error('Enter valid phase dates with the finish on or after the start.'), { statusCode: 400 });
  }
  if (!percentage(progress) || (duration !== null && (!Number.isSafeInteger(duration) || duration < 1))) {
    throw Object.assign(new Error('Enter progress from 0 to 100 and a positive whole number for duration.'), { statusCode: 400 });
  }
  if (!['', 'done', 'current', 'overdue', 'upcoming'].includes(statusOverride) ||
      (statusOverride && statusOverride !== 'done' && progress === 100)) {
    throw Object.assign(new Error('A phase at 100% progress must be marked Complete or Automatic.'), { statusCode: 400 });
  }
  return {
    ...Object.fromEntries(textFields.map(key => [key, values[key].trim()])),
    start, end, duration: duration ?? scheduleDuration(start, end), manualDuration: duration !== null,
    progress: statusOverride === 'done' ? 100 : progress,
    status: statusOverride || (progress === 100 ? 'done' : progress > 0 ? 'current' : 'upcoming'),
    statusOverride
  };
}

function mergeProtectedWorkflowState(incomingData) {
  // Admin updates currently submit the full project document. Preserve client approval
  // decisions that may have been made on another device after the Admin last loaded it.
  for (const project of incomingData.projects) {
    const existing = shared.data.projects.find(p => p.id === project.id);
    if (!existing) continue;
    project.expenseHistory = Array.isArray(project.expenseHistory) ? project.expenseHistory : [];
    project.notifications = Array.isArray(project.notifications) ? project.notifications : [];
    project.expenses = Array.isArray(project.expenses) ? project.expenses : [];

    const historyById = new Map(project.expenseHistory.map(h => [h.id, h]));
    for (const h of (existing.expenseHistory || [])) if (!historyById.has(h.id)) historyById.set(h.id, h);
    project.expenseHistory = [...historyById.values()].sort((a,b) => String(a.at || '').localeCompare(String(b.at || ''))).slice(-500);

    const incomingNotifications = new Map(project.notifications.map(n => [n.id, n]));
    for (const old of (existing.notifications || [])) {
      const inc = incomingNotifications.get(old.id);
      if (!inc) { incomingNotifications.set(old.id, old); continue; }
      // A resolved client notification wins over a stale pending copy from an Admin tab.
      if (old.status !== 'pending' && inc.status === 'pending') incomingNotifications.set(old.id, old);
    }
    project.notifications = [...incomingNotifications.values()].slice(-500);

    for (const expense of project.expenses) {
      const old = (existing.expenses || []).find(e => e.id === expense.id);
      if (!old) continue;
      const sameRequest = String(expense.approvalRequestedAt || '') === String(old.approvalRequestedAt || '');
      if (sameRequest && ['approved','rejected'].includes(old.approvalStatus)) {
        expense.approvalStatus = old.approvalStatus;
        expense.decisionAt = old.decisionAt || '';
        expense.decisionBy = old.decisionBy || '';
        expense.decisionComment = old.decisionComment || '';
      }
    }
  }
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

async function handleApi(req, res, pathname, mutationBody) {
  if (pathname === '/api/status' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      sharedStorage: true,
      persistentStorage: isPersistentStorage(),
      writeProtection: storageMode === 'blocked-ephemeral' ? 'persistent-storage-required' : null,
      storageMode,
      initialized: Boolean(shared.meta.initialized),
      updatedAt: shared.meta.updatedAt || null
    });
  }

  if (pathname === '/api/login' && req.method === 'POST') {
    if (storageMode === 'blocked-ephemeral') return sendJson(res, 503, { error: 'Persistent database is not configured. In Render, connect PostgreSQL and set DATABASE_URL. Data entry is blocked so accounts and projects cannot disappear after a restart.' });
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
      persistentStorage: isPersistentStorage(),
      writeProtection: storageMode === 'blocked-ephemeral' ? 'persistent-storage-required' : null,
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
      persistentStorage: isPersistentStorage(),
      writeProtection: storageMode === 'blocked-ephemeral' ? 'persistent-storage-required' : null,
      updatedAt: shared.meta.updatedAt || null
    });
  }

  if (pathname === '/api/state' && req.method === 'PUT') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    ensureWritablePersistentStorage();
    const body = mutationBody;
    const { data, passwordUpdates } = normalizeIncomingState(body.state);
    // Administrator accounts are managed separately so a stale project save cannot
    // restore an old email, password, or role after an administrator edits an account.
    data.users = data.users.map(incoming => {
      const existing = shared.data.users.find(account => account.id === incoming.id);
      if (existing?.role === 'admin') {
        passwordUpdates.delete(existing.id);
        return existing;
      }
      if (incoming.role === 'admin') {
        throw Object.assign(new Error('Use administrator account controls to add an administrator.'), { statusCode: 400 });
      }
      return incoming;
    });
    mergeProtectedWorkflowState(data);
    const mergedData = mergeIncomingStatePreservingExisting(data, body.intent || {});
    applyCredentialUpdates(mergedData, passwordUpdates);
    shared.data = mergedData;
    shared.meta.initialized = true;
    await persistShared('admin-save');
    return sendJson(res, 200, { ok: true, updatedAt: shared.meta.updatedAt, state: shared.data });
  }

  if (pathname === '/api/admin/accounts' && req.method === 'POST') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    ensureWritablePersistentStorage();
    const { id, name, email, password = '', currentPassword, mergeClientId } = mutationBody;
    if (typeof currentPassword !== 'string' || !verifyPassword(shared.credentials[user.id], currentPassword)) {
      return sendJson(res, 400, { error: 'Your current password is incorrect.' });
    }
    const existing = id ? shared.data.users.find(account => account.id === id && account.role === 'admin') : null;
    if (id && !existing) return sendJson(res, 404, { error: 'Administrator account not found.' });
    const accountName = typeof name === 'string' ? name.trim() : '';
    const accountEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!accountName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail)) {
      return sendJson(res, 400, { error: 'Enter an administrator name and valid email address.' });
    }
    const client = mergeClientId ? shared.data.users.find(account => account.id === mergeClientId && account.role === 'client') : null;
    if (mergeClientId && (!existing || existing.id !== user.id || !client || String(client.email || '').trim().toLowerCase() !== accountEmail)) {
      return sendJson(res, 400, { error: 'Select the client account matching the email to merge into your own administrator account.' });
    }
    if (shared.data.users.some(account => account.id !== existing?.id && account.id !== client?.id && String(account.email || '').trim().toLowerCase() === accountEmail)) {
      return sendJson(res, 409, { error: 'Email already exists' });
    }
    if (typeof password !== 'string' || ((!existing || password !== '') && password.length < 6)) {
      return sendJson(res, 400, { error: 'Administrator passwords must contain at least 6 characters.' });
    }
    const projectIds = [...new Set([...(existing?.projectIds || []), ...(client?.projectIds || []), ...(client ? shared.data.projects.filter(project => project.clientId === client.id).map(project => project.id) : [])])];
    const account = { ...client, ...existing, id: existing?.id || `u-${crypto.randomUUID()}`, name: accountName, email: accountEmail, role: 'admin', projectIds };
    const previous = shared.credentials[account.id];
    const credential = password ? passwordRecord(password) : { ...previous };
    credential.version = (Number(previous?.version) || 0) + (existing && (password || existing.email !== accountEmail) ? 1 : 0);
    const nextShared = {
      ...shared,
      meta: { ...shared.meta, initialized: true },
      data: { ...shared.data, users: existing ? shared.data.users.map(item => item.id === account.id ? account : item) : [...shared.data.users, account] },
      credentials: { ...shared.credentials, [account.id]: credential }
    };
    if (client) {
      nextShared.data.users = nextShared.data.users.filter(item => item.id !== client.id);
      nextShared.data.projects = shared.data.projects.map(project => remapProjectAccount(project, client.id, account.id));
      nextShared.meta.mergedAccounts = {
        ...shared.meta.mergedAccounts,
        [client.id]: { targetId: account.id, mergedAt: new Date().toISOString(), mergedBy: user.id, originalAccount: client }
      };
      delete nextShared.credentials[client.id];
    }
    await persistShared(existing ? 'admin-account-update' : 'admin-account-create', nextShared);
    shared = nextShared;
    return sendJson(res, 200, {
      ok: true, state: stateForUser(user),
      ...(account.id === user.id ? { token: makeToken(user.id) } : {})
    });
  }

  if (pathname === '/api/admin/schedule' && req.method === 'PUT') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    ensureWritablePersistentStorage();
    const { projectId, phaseId, create = false, values } = mutationBody;
    const project = shared.data.projects.find(p => p.id === projectId);
    if (!project) return sendJson(res, 404, { error: 'Project not found' });
    if (!values || typeof values !== 'object') return sendJson(res, 400, { error: 'Schedule changes are required.' });

    const nextProject = { ...project, lastUpdate: new Date().toISOString().slice(0, 10) };
    if (typeof phaseId === 'string' && phaseId) {
      const existing = project.tasks.find(t => t.id === phaseId);
      if (!existing && !create) return sendJson(res, 404, { error: 'This phase was removed. Reopen the schedule to refresh the list.' });
      const updated = { ...existing, ...phaseValues(values, create), id: phaseId };
      nextProject.tasks = existing
        ? project.tasks.map(t => t.id === phaseId ? updated : t)
        : [...project.tasks, updated];
      const completion = serverScheduleCompletion(nextProject.tasks);
      if (!existing || completion !== serverScheduleCompletion(project.tasks)) nextProject.completion = completion;
    } else {
      const { start, target, status, completion } = values;
      if ((start !== '' && !scheduleDate(start)) || (target !== '' && !scheduleDate(target)) || (start && target && target < start)) {
        return sendJson(res, 400, { error: 'Enter valid project dates with the target on or after the start.' });
      }
      if (!percentage(completion) || typeof status !== 'string' ||
          (!['Pre-Construction', 'In Construction', 'Punch List', 'Complete'].includes(status) && status !== project.status)) {
        return sendJson(res, 400, { error: 'Enter a project status and completion from 0 to 100.' });
      }
      Object.assign(nextProject, { start, target, status, completion });
    }
    const nextShared = {
      ...shared,
      meta: { ...shared.meta, initialized: true },
      data: { ...shared.data, projects: shared.data.projects.map(p => p.id === projectId ? nextProject : p) }
    };
    await persistShared('admin-schedule', nextShared, nextProject);
    shared = nextShared;
    return sendJson(res, 200, { ok: true, state: stateForUser(user) });
  }

  if (pathname === '/api/admin/delete' && req.method === 'POST') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    ensureWritablePersistentStorage();
    const body = mutationBody;
    const type = String(body.type || '');
    const id = String(body.id || '');
    const projectId = String(body.projectId || '');
    if (!id || !['task','photo','expense','client','project'].includes(type)) {
      return sendJson(res, 400, { error: 'A valid deletion type and record ID are required' });
    }

    let changed = false;
    if (type === 'project') {
      const before = shared.data.projects.length;
      shared.data.projects = shared.data.projects.filter(p => p.id !== id);
      changed = shared.data.projects.length !== before;
      if (changed) shared.data.users.forEach(u => { u.projectIds = (u.projectIds || []).filter(pid => pid !== id); });
    } else if (type === 'client') {
      const target = shared.data.users.find(u => u.id === id && u.role !== 'admin');
      if (target) {
        shared.data.projects.forEach(p => { if (p.clientId === id) p.clientId = ''; });
        shared.data.users = shared.data.users.filter(u => u.id !== id);
        delete shared.credentials[id];
        changed = true;
      }
    } else {
      const project = shared.data.projects.find(p => p.id === projectId);
      if (!project) return sendJson(res, 404, { error: 'Project not found' });
      if (type === 'task') {
        const before = (project.tasks || []).length;
        project.tasks = (project.tasks || []).filter(x => x.id !== id);
        changed = project.tasks.length !== before;
        if (changed) project.completion = serverScheduleCompletion(project.tasks);
      }
      if (type === 'photo') {
        const before = (project.photos || []).length;
        project.photos = (project.photos || []).filter(x => x.id !== id);
        changed = project.photos.length !== before;
      }
      if (type === 'expense') {
        const expense = (project.expenses || []).find(x => x.id === id);
        if (expense) {
          const amount = Number(expense.amount) || 0;
          project.expenseHistory = Array.isArray(project.expenseHistory) ? project.expenseHistory : [];
          project.expenseHistory.push({
            id: `eh-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`,
            expenseId: id,
            action: 'Expense deleted', category: expense.cat || 'Expense', amount, status: 'deleted',
            actorId: user.id, actorName: user.name || user.email || 'Administrator', at: new Date().toISOString(),
            details: `Human-initiated deletion. Previous approval status: ${expense.approvalStatus || 'not_required'}`
          });
          project.notifications = (project.notifications || []).map(n => n.expenseId === id && n.status === 'pending' ? { ...n, status: 'cancelled', resolvedAt: new Date().toISOString() } : n);
          project.expenses = (project.expenses || []).filter(x => x.id !== id);
          project.invested = Math.max(0, (Number(project.invested) || 0) - amount);
          project.budget = Math.max(0, (Number(project.budget) || 0) - amount);
          changed = true;
        }
      }
      if (changed) project.lastUpdate = new Date().toISOString().slice(0, 10);
    }

    if (!changed) return sendJson(res, 404, { error: 'Record not found or already deleted' });
    recordDeletionAudit({ type, id, projectId, actor: user });
    await persistShared(`human-delete:${type}`);
    return sendJson(res, 200, { ok: true, state: stateForUser(user), updatedAt: shared.meta.updatedAt });
  }

  if (pathname === '/api/expense-decision' && req.method === 'POST') {
    if (!['client', 'admin'].includes(user.role)) return sendJson(res, 403, { error: 'Client access required for expense decisions' });
    const body = mutationBody;
    const projectId = String(body.projectId || '');
    const expenseId = String(body.expenseId || '');
    const decision = String(body.decision || '').toLowerCase();
    const comment = String(body.comment || '').trim().slice(0, 2000);
    if (!['approved', 'rejected'].includes(decision)) return sendJson(res, 400, { error: 'Decision must be approved or rejected' });
    if (!user.projectIds.includes(projectId)) return sendJson(res, 403, { error: 'You do not have access to this project' });
    const project = shared.data.projects.find(p => p.id === projectId);
    if (!project || project.clientId !== user.id) return sendJson(res, 403, { error: 'This project is not assigned to your account' });
    project.expenses = Array.isArray(project.expenses) ? project.expenses : [];
    project.expenseHistory = Array.isArray(project.expenseHistory) ? project.expenseHistory : [];
    project.notifications = Array.isArray(project.notifications) ? project.notifications : [];
    const expense = project.expenses.find(e => e.id === expenseId);
    if (!expense) return sendJson(res, 404, { error: 'Expense not found' });
    if ((expense.approvalStatus || 'not_required') !== 'pending') return sendJson(res, 409, { error: 'This expense no longer has a pending approval request' });
    const at = new Date().toISOString();
    expense.approvalStatus = decision;
    expense.decisionAt = at;
    expense.decisionBy = user.id;
    expense.decisionComment = comment;
    project.notifications.forEach(n => {
      if (n.expenseId === expenseId && n.targetUserId === user.id && n.status === 'pending') {
        n.status = decision;
        n.resolvedAt = at;
        n.readAt = at;
      }
    });
    project.expenseHistory.push({
      id: `eh-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`,
      expenseId,
      action: decision === 'approved' ? 'Expense approved by client' : 'Expense not approved by client',
      category: expense.cat || 'Expense',
      amount: Number(expense.amount) || 0,
      status: decision,
      actorId: user.id,
      actorName: user.name || user.email || 'Client',
      at,
      details: comment
    });
    if (project.expenseHistory.length > 500) project.expenseHistory = project.expenseHistory.slice(-500);
    project.lastUpdate = at.slice(0, 10);
    await persistShared();
    return sendJson(res, 200, { ok: true, decision, user, state: stateForUser(user), updatedAt: shared.meta.updatedAt });
  }

  if (pathname === '/api/admin/migrate-local' && req.method === 'POST') {
    if (user.role !== 'admin') return sendJson(res, 403, { error: 'Administrator access required' });
    ensureWritablePersistentStorage();
    if (shared.meta.initialized) {
      return sendJson(res, 409, { error: 'Shared portal data is already initialized. Migration was not applied.' });
    }
    const body = mutationBody;
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
      return sendJson(res, 200, { status: 'ok', app: 'kairos-builder-portal', version: '2.13.0', sharedStorage: true, storageMode, persistentStorage: isPersistentStorage(), writeProtection: storageMode === 'blocked-ephemeral' });
    }

    if (pathname.startsWith('/api/')) {
      try {
        if (req.method === 'GET' || pathname === '/api/login' || pathname === '/api/logout') {
          return await handleApi(req, res, pathname);
        }
        // Read the request before joining the write queue so slow uploads cannot block other saves.
        if (!sessionUser(req)) return sendJson(res, 401, { error: 'Session expired. Please sign in again.' });
        const mutationBody = await readJson(req);
        // Serialize mutations so a schedule update cannot race a deletion or another save.
        const write = writeChain.then(() => handleApi(req, res, pathname, mutationBody));
        writeChain = write.catch(() => {});
        return await write;
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
