import mongoose from 'mongoose';

const InterventionSchema = new mongoose.Schema({
  _id: { type: String, default: () => `int-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` },
  studentId: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  action: { type: String, required: true },
  category: { type: String, enum: ['Immediate', 'Academic', 'Placement', 'Mentoring', 'Monitoring'], default: 'Academic' },
  assignedTo: { type: String, default: 'Faculty Mentor' },
  status: { type: String, enum: ['Recommended', 'Assigned', 'In Progress', 'Completed'], default: 'Recommended', index: true },
  followUpDate: { type: String },
  notes: { type: String, default: '' }
}, { timestamps: true });

export const Intervention = mongoose.model('Intervention', InterventionSchema);
