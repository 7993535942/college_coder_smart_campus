import app from '../server/src/app.js';
import { connectDB, loadMemoryStore } from '../server/src/db.js';

let isInitialized = false;

async function ensureReady() {
  if (isInitialized) return;
  loadMemoryStore();
  try {
    await connectDB();
  } catch (err) {
    console.warn('DB initialization notice:', err?.message || err);
  }
  isInitialized = true;
}

export default async function handler(req, res) {
  await ensureReady();
  return app(req, res);
}
