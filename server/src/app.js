import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const sendStatus = (req, res) => {
  res.json({
    status: 'online',
    service: 'SmartCampus AI Backend REST API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/login',
      students: '/api/students',
      analyticsOverview: '/api/analytics/overview'
    }
  });
};

const sendHealth = (req, res) => {
  res.json({ status: 'ok', service: 'SmartCampus AI API', timestamp: new Date().toISOString() });
};

app.get('/api', sendStatus);
app.get('/', sendStatus);

app.get('/api/health', sendHealth);
app.get('/health', sendHealth);

// Mount routes with and without /api prefix for compatibility across Vercel and standalone servers
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);

app.use('/api/students', studentsRouter);
app.use('/students', studentsRouter);

app.use('/api/analytics', analyticsRouter);
app.use('/analytics', analyticsRouter);

app.use('/api/data', dataRouter);
app.use('/data', dataRouter);

app.use('/api/simulation', simulationRouter);
app.use('/simulation', simulationRouter);

app.use('/api/interventions', interventionsRouter);
app.use('/interventions', interventionsRouter);

app.use('/api/ai', aiRouter);
app.use('/ai', aiRouter);

app.use('/api/ml', mlRouter);
app.use('/ml', mlRouter);

export default app;
