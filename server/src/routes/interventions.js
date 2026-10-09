import express from 'express';
import { Intervention } from '../models/Intervention.js';
import { isUsingMemoryStore, memoryStore } from '../db.js';

const router = express.Router();

export let memoryInterventions = [
  {
    _id: 'int-1',
    studentId: 'SC-2023-0142',
    studentName: 'Rahul Kumar',
    action: 'Attendance recovery counseling & mentor check-in',
    category: 'Immediate',
    assignedTo: 'Prof. Ananya Rao',
    status: 'In Progress',
    followUpDate: '2026-10-22',
    notes: 'Agreed to attend remedial Saturday lab sessions.'
  },
  {
    _id: 'int-2',
    studentId: 'SC-2023-0142',
    studentName: 'Rahul Kumar',
    action: 'Enroll in DSA & Coding Foundation Workshop',
    category: 'Placement',
    assignedTo: 'Placement Cell Lead',
    status: 'Assigned',
    followUpDate: '2026-10-25',
    notes: 'Aiming to raise coding diagnostic above 60.'
  }
];

router.get('/', async (req, res) => {
  try {
    const { studentId } = req.query;
    let query = {};
    if (studentId) {
      const cleanId = studentId.trim();
      query.$or = [
        { studentId: { $regex: new RegExp(`^${cleanId}$`, 'i') } },
        { studentName: { $regex: new RegExp(`^${cleanId}$`, 'i') } }
      ];
    }

    if (isUsingMemoryStore) {
      let list = memoryInterventions;
      if (studentId) {
        const sid = studentId.trim().toLowerCase();
        list = list.filter(i => 
          (i.studentId && i.studentId.toLowerCase() === sid) ||
          (i.studentName && i.studentName.toLowerCase() === sid)
        );
      }
      return res.json(list);
    }

    const mongoList = await Intervention.find(query).sort({ createdAt: -1 });
    
    // Merge any memoryInterventions that match query if not already in mongoList
    let combined = [...mongoList];
    const seenActions = new Set(mongoList.map(i => `${i.studentId}_${i.action}`));
    const memoryMatches = studentId
      ? memoryInterventions.filter(i => 
          (i.studentId && i.studentId.toLowerCase() === studentId.trim().toLowerCase()) ||
          (i.studentName && i.studentName.toLowerCase() === studentId.trim().toLowerCase())
        )
      : memoryInterventions;

    for (const mi of memoryMatches) {
      if (!seenActions.has(`${mi.studentId}_${mi.action}`)) {
        combined.push(mi);
      }
    }

    res.json(combined);
  } catch (err) {
    let list = memoryInterventions;
    if (req.query.studentId) {
      const sid = req.query.studentId.trim().toLowerCase();
      list = list.filter(i => 
        (i.studentId && i.studentId.toLowerCase() === sid) ||
        (i.studentName && i.studentName.toLowerCase() === sid)
      );
    }
    res.json(list);
  }
});

router.post('/', async (req, res) => {
  try {
    const item = {
      ...req.body,
      _id: req.body._id || `int-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString()
    };
    memoryInterventions.unshift(item);

    if (!isUsingMemoryStore) {
      try {
        const created = await Intervention.create(req.body);
        return res.status(201).json(created);
      } catch (mongoErr) {
        console.warn('MongoDB single insert warning:', mongoErr.message);
      }
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Array of interventions required' });
    }
    const createdItems = [];
    for (const raw of items) {
      const item = {
        ...raw,
        _id: raw._id || `int-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        createdAt: new Date().toISOString()
      };
      memoryInterventions.unshift(item);
      createdItems.push(item);
    }
    if (!isUsingMemoryStore) {
      try {
        await Intervention.insertMany(items, { ordered: false });
      } catch (mongoErr) {
        console.warn('MongoDB batch save warning:', mongoErr.message);
      }
    }
    res.status(201).json({ count: createdItems.length, items: createdItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Update in memory store
    const idx = memoryInterventions.findIndex(i => String(i._id) === String(id));
    if (idx !== -1) {
      memoryInterventions[idx] = { ...memoryInterventions[idx], ...req.body };
    }

    if (!isUsingMemoryStore) {
      try {
        const updated = await Intervention.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json(updated);
      } catch (mongoErr) {
        // ID might be custom string format like 'int-...'
      }
    }

    if (idx !== -1) {
      return res.json(memoryInterventions[idx]);
    }
    res.status(404).json({ error: 'Intervention not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
