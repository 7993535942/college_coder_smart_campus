import express from 'express';
import mongoose from 'mongoose';
import { Student } from '../models/Student.js';
import { getAllStudents } from '../studentStore.js';

const router = express.Router();

async function getStudentsList(query = {}) {
  let list = await getAllStudents();
  if (query.department) list = list.filter(s => s.department === query.department);
  if (query.year) list = list.filter(s => s.year === query.year);
  if (query.riskLevel) list = list.filter(s => s.riskLevel === query.riskLevel);
  if (query.segment) list = list.filter(s => s.segment === query.segment);
  if (query.agreement) list = list.filter(s => s.ml?.agreement === query.agreement);
  if (query.mlBand) list = list.filter(s => s.ml?.academicRisk?.band === query.mlBand);
  if (query.search) {
    const q = query.search.toLowerCase();
    list = list.filter(s => (s.name && s.name.toLowerCase().includes(q)) || (s.studentId && s.studentId.toLowerCase().includes(q)));
  }
  return list;
}

router.get('/', async (req, res) => {
  try {
    const list = await getStudentsList(req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);
    res.json({
      total: list.length,
      page,
      limit,
      totalPages: Math.ceil(list.length / limit),
      students: paginated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const param = (req.params.id || '').trim();
    const paramLower = param.toLowerCase();
    const list = await getAllStudents();
    let s = list.find(x => 
      (x.studentId && x.studentId.toLowerCase() === paramLower) ||
      (x.email && x.email.toLowerCase() === paramLower) ||
      (x._id && x._id.toString() === param)
    );

    if (!s && mongoose.connection.readyState === 1) {
      try {
        s = await Student.findOne({
          $or: [
            { studentId: new RegExp(`^${param}$`, 'i') },
            { email: paramLower }
          ]
        }).lean().maxTimeMS(2000);
      } catch {}
    }

    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/score', async (req, res) => {
  try {
    const list = await getAllStudents();
    const s = list.find(x => x.studentId === req.params.id || x._id === req.params.id)
      || await Student.findOne({ studentId: req.params.id }).lean();
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json({
      studentId: s.studentId,
      name: s.name,
      successScore: s.successScore,
      riskLevel: s.riskLevel,
      contributions: s.scoreContributions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/explanation', async (req, res) => {
  try {
    const list = await getAllStudents();
    const s = list.find(x => x.studentId === req.params.id || x._id === req.params.id)
      || await Student.findOne({ studentId: req.params.id }).lean();
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json({
      studentId: s.studentId,
      name: s.name,
      riskLevel: s.riskLevel,
      riskSource: s.riskSource,
      riskFactors: s.riskFactors,
      scoreContributions: s.scoreContributions,
      mlFactors: s.ml?.academicRisk?.topFactors || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/ml', async (req, res) => {
  try {
    const list = await getAllStudents();
    const s = list.find(x => x.studentId === req.params.id || x._id === req.params.id)
      || await Student.findOne({ studentId: req.params.id }).lean();
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json(s.ml || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
