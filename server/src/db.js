import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Student } from './models/Student.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export let memoryStore = { students: [], interventions: [] };
export let isUsingMemoryStore = false;

export function setUsingMemoryStore(val) { 
  isUsingMemoryStore = Boolean(val); 
}

export async function connectDB() {
  loadMemoryStore(); // Pre-load in-memory dataset immediately as resilient backup

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcampus_ai';
  try {
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Retaining in-memory fallback.');
      isUsingMemoryStore = true;
    });
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully.');
      isUsingMemoryStore = false;
    });
    mongoose.connection.on('error', (err) => {
      console.warn('MongoDB runtime error:', err?.message || err);
      isUsingMemoryStore = true;
    });

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2500,
      socketTimeoutMS: 5000,
      maxIdleTimeMS: 30000,
      family: 4
    });
    console.log('MongoDB connected successfully');
    
    // Auto-seed if empty
    const count = await Student.countDocuments().maxTimeMS(2000);
    if (count === 0) {
      console.log('Database empty, seeding from demo snapshot...');
      await seedFromSnapshot();
    }
  } catch (err) {
    console.warn('MongoDB connection failed. Switching to in-memory fallback store:', err.message);
    isUsingMemoryStore = true;
  }
}

export function findSeedPath() {
  const candidates = [
    path.resolve(process.cwd(), 'data/demo_seed_scored.json'),
    path.resolve(__dirname, '../../data/demo_seed_scored.json'),
    path.resolve(__dirname, '../data/demo_seed_scored.json'),
    path.resolve(process.cwd(), 'server/data/demo_seed_scored.json')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

export async function seedFromSnapshot() {
  const seedPath = findSeedPath();
  if (seedPath) {
    const raw = fs.readFileSync(seedPath, 'utf-8');
    const records = JSON.parse(raw);
    if (!isUsingMemoryStore) {
      try {
        await Student.collection.drop();
      } catch (e) {}
      await Student.insertMany(records, { ordered: false });
    } else {
      memoryStore.students = records;
    }
    console.log(`Seeded ${records.length} students into database`);
    return records.length;
  }
  return 0;
}

export function loadMemoryStore() {
  const seedPath = findSeedPath();
  if (seedPath && memoryStore.students.length === 0) {
    try {
      memoryStore.students = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    } catch (e) {
      console.warn('Could not parse demo seed JSON:', e.message);
    }
  }
}
