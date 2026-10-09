import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import app from './app.js';
import { connectDB, isUsingMemoryStore } from './db.js';
import { getAllStudents } from './studentStore.js';
import { User } from './models/User.js';

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../client/dist');

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      service: 'SmartCampus AI Backend REST API',
      note: 'Frontend is running on Vite dev server at http://localhost:3000'
    });
  });
}

async function seedDefaultAdmin() {
  if (isUsingMemoryStore) return; // handled in-memory in auth.js
  try {
    const exists = await User.findOne({ email: 'admin@smartcampus.demo' });
    if (!exists) {
      const admin = new User({
        name: 'Campus Administrator',
        email: 'admin@smartcampus.demo',
        password: 'Demo@123',
        role: 'admin',
        createdBy: 'system'
      });
      await admin.save();
      console.log('Default admin account created');
    }
  } catch (err) {
    console.warn('Could not seed admin user:', err.message);
  }
}

connectDB().then(async () => {
  await seedDefaultAdmin();
  getAllStudents().then(s => console.log(`In-memory cache warmed with ${s.length} students`)).catch(() => {});
  app.listen(PORT, () => {
    console.log(`SmartCampus AI Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
