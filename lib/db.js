import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

const DB_PATH = path.join(process.cwd(), "data", "messages.json");
const USE_POSTGRES = !!process.env.DATABASE_URL;

let sql = null;
let tableReady = false;

function getSql() {
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

async function ensureTable() {
  if (tableReady) return;
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  tableReady = true;
}

// ---------- JSON file fallback (local dev without DATABASE_URL) ----------
function ensureJsonDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf-8");
}

function jsonGetMessages() {
  ensureJsonDb();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function jsonAddMessage(entry) {
  const messages = jsonGetMessages();
  messages.unshift(entry);
  fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2), "utf-8");
  return entry;
}

function jsonUpdateMessage(id, updates) {
  const messages = jsonGetMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  messages[idx] = { ...messages[idx], ...updates };
  fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2), "utf-8");
  return messages[idx];
}

function jsonDeleteMessage(id) {
  const messages = jsonGetMessages();
  const filtered = messages.filter((m) => m.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return filtered.length !== messages.length;
}

// ---------- Public API (Postgres when DATABASE_URL set, else JSON file) ----------

export async function getMessages() {
  if (!USE_POSTGRES) return jsonGetMessages();
  await ensureTable();
  const db = getSql();
  const rows = await db`SELECT * FROM messages ORDER BY created_at DESC`;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject,
    message: r.message,
    read: r.read,
    createdAt: r.created_at,
  }));
}

export async function addMessage({ name, email, subject, message }) {
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name,
    email,
    subject,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  if (!USE_POSTGRES) return jsonAddMessage(entry);

  await ensureTable();
  const db = getSql();
  await db`
    INSERT INTO messages (id, name, email, subject, message, read, created_at)
    VALUES (${entry.id}, ${entry.name}, ${entry.email}, ${entry.subject}, ${entry.message}, false, ${entry.createdAt})
  `;
  return entry;
}

export async function updateMessage(id, updates) {
  if (!USE_POSTGRES) return jsonUpdateMessage(id, updates);

  await ensureTable();
  const db = getSql();
  if (typeof updates.read === "boolean") {
    const rows = await db`
      UPDATE messages SET read = ${updates.read} WHERE id = ${id}
      RETURNING id, name, email, subject, message, read, created_at AS "createdAt"
    `;
    return rows[0] || null;
  }
  return null;
}

export async function deleteMessage(id) {
  if (!USE_POSTGRES) return jsonDeleteMessage(id);

  await ensureTable();
  const db = getSql();
  const rows = await db`DELETE FROM messages WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
