import mongoose from 'mongoose';
import { Student } from './models/Student.js';
import { isUsingMemoryStore, memoryStore, setUsingMemoryStore } from './db.js';

let cachedStudents = null;
let cachePromise = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function getAllStudents(forceRefresh = false) {
  const now = Date.now();
  // 1. If cache is warm, return instantly in 0ms!
  if (!forceRefresh && cachedStudents && cachedStudents.length > 0 && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedStudents;
  }

  // 2. If memory store is active or mongoose connection is not ready, return memoryStore instantly
  if (isUsingMemoryStore || !mongoose.connection || mongoose.connection.readyState !== 1) {
    if (memoryStore.students && memoryStore.students.length > 0) {
      cachedStudents = memoryStore.students;
      lastCacheTime = now;
      return cachedStudents;
    }
  }

  if (cachePromise) return cachePromise;

  cachePromise = Student.find({}).lean().maxTimeMS(2000).then(data => {
    if (data && data.length > 0) {
      cachedStudents = data;
    } else {
      cachedStudents = memoryStore.students;
    }
    lastCacheTime = Date.now();
    cachePromise = null;
    return cachedStudents;
  }).catch(err => {
    cachePromise = null;
    console.warn('Student.find failed, falling back instantly to memoryStore:', err.message);
    setUsingMemoryStore(true);
    cachedStudents = memoryStore.students;
    lastCacheTime = Date.now();
    return cachedStudents;
  });
  return cachePromise;
}

export function invalidateCache() {
  cachedStudents = null;
  cachePromise = null;
  lastCacheTime = 0;
}
