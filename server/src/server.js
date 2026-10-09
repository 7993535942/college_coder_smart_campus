import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';

import authRouter from './routes/auth.js';
import studentsRouter from './routes/students.js';
import analyticsRouter from './routes/analytics.js';
import dataRouter from './routes/data.js';
import simulationRouter from './routes/simulation.js';
import interventionsRouter from './routes/interventions.js';
import aiRouter from './routes/ai.js';
import mlRouter from './routes/ml.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get(['/', '/api'], (req, res) => {
  res.json({
    status: 'online',
    service: 'SmartCampus AI Backend REST API',
    frontendUrl: 'http://localhost:3000',
    note: 'The interactive visual interface is running at http://localhost:3000',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/login',
      students: '/api/students',
      analyticsOverview: '/api/analytics/overview'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SmartCampus AI API', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/data', dataRouter);
app.use('/api/simulation', simulationRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/ml', mlRouter);

import { getAllStudents } from './studentStore.js';
import { User } from './models/User.js';
import { isUsingMemoryStore } from './db.js';

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
