import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  UserPlus, Users, Trash2, CheckCircle, AlertCircle,
  Search, Mail, Lock, User, Hash, RefreshCw, Copy, Eye, EyeOff,
  GraduationCap, BookOpen, Layers, Award, Activity, AlertTriangle
} from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Data Science'
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const SECTIONS = ['A', 'B', 'C', 'D'];

function Badge({ color, bg, children }) {
  return (
    <span style={{ 
      background: bg, 
      color, 
      fontSize: '0.68rem', 
      fontWeight: 700, 
      padding: '3px 8px', 
      borderRadius: '99px', 
      border: `1px solid ${color}40`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      {children}
    </span>
  );
}

export default function ManageStudents() {
  const [accounts, setAccounts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]         = useState(null);
  const [showPwd, setShowPwd]     = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Comprehensive Student Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    semester: 1,
    section: 'A',
    cgpa: '7.5',
    backlogs: '0',
    attendance: '85'
  });

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const data = await api.getStudentAccounts();
      setAccounts(data.users || []);
    } catch {
      showToast('error', 'Failed to load student accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAccounts(); }, []);

  // Compute live preview metrics
  const previewCgpa = parseFloat(form.cgpa) || 7.0;
  const previewBacklogs = parseInt(form.backlogs, 10) || 0;
  const previewAttendance = parseFloat(form.attendance) || 85.0;

  let previewRisk = 'LOW';
  let previewRiskColor = 'var(--risk-low)';
  let previewRiskBg = 'var(--risk-low-bg)';

  if (previewBacklogs >= 2 || previewAttendance < 70 || previewCgpa < 5.5) {
    previewRisk = 'HIGH';
    previewRiskColor = 'var(--risk-high)';
    previewRiskBg = 'var(--risk-high-bg)';
  } else if (previewBacklogs >= 1 || previewAttendance < 80 || previewCgpa < 6.5) {
    previewRisk = 'MEDIUM';
    previewRiskColor = 'var(--risk-med)';
    previewRiskBg = 'var(--risk-med-bg)';
  }

  const previewScore = Math.max(10, Math.min(99, Math.round((previewCgpa * 5) + (previewAttendance * 0.4) - (previewBacklogs * 7))));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return showToast('error', 'Password must be at least 6 characters');
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        semester: Number(form.semester),
        cgpa: parseFloat(form.cgpa) || 7.5,
        backlogs: parseInt(form.backlogs, 10) || 0,
        attendance: parseFloat(form.attendance) || 85
      };

      const data = await api.registerStudent(payload);
      if (data.success) {
        showToast('success', `✅ Registered ${form.name} with ID ${data.student?.studentId || form.studentId}`);
        setForm({
          name: '',
          email: '',
          password: '',
          studentId: '',
          department: 'Computer Science & Engineering',
          year: '1st Year',
          semester: 1,
          section: 'A',
          cgpa: '7.5',
          backlogs: '0',
          attendance: '85'
        });
        setShowForm(false);
        loadAccounts();
      } else {
        showToast('error', data.error || 'Registration failed');
      }
    } catch {
      showToast('error', 'Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Permanently remove login account and student profile for "${name}"?`)) return;
    setDeletingId(id);
    try {
      await api.deleteStudentAccount(id);
      showToast('success', `Removed account for ${name}`);
      loadAccounts();
    } catch {
      showToast('error', 'Failed to delete account');
    } finally {
      setDeletingId(null);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!';
    let pwd = '';
    for (let i = 0; i < 10; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
    setForm(f => ({ ...f, password: pwd }));
    setShowPwd(true);
  };

  const generateStudentId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const yr = new Date().getFullYear();
    setForm(f => ({ ...f, studentId: `SC-${yr}-${randomNum}` }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => showToast('success', 'Copied to clipboard'));
  };

  const filtered = accounts.filter(u => {
    const p = u.profile || {};
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.studentId?.toLowerCase().includes(q) ||
      p.department?.toLowerCase().includes(q) ||
      p.year?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: toast.type === 'success' ? 'rgba(16,185,129,0.18)' : 'rgba(244,63,94,0.18)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.45)' : 'rgba(244,63,94,0.45)'}`,
          color: toast.type === 'success' ? 'var(--risk-low)' : 'var(--risk-high)',
          padding: '0.85rem 1.25rem',
          borderRadius: '10px',
          fontSize: '0.85rem',
          fontWeight: 600,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          maxWidth: '380px',
          animation: 'slideIn 0.3s ease'
        }}>
          {toast.type === 'success' ? <CheckCircle size={17} /> : <AlertCircle size={17} />}
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Users size={22} color="var(--primary-light)" /> Student Registration & Accounts
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Register new students with full academic credentials and institutional metrics. Each student logs in to their personalized profile.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            onClick={loadAccounts}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.5rem 0.9rem', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button
            onClick={() => {
              setShowForm(f => !f);
              if (!form.studentId) generateStudentId();
            }}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
          >
            <UserPlus size={15} /> {showForm ? 'Close Form' : 'Register New Student'}
          </button>
        </div>
      </div>

      {/* Comprehensive Student Registration Form */}
      {showForm && (
        <div className="glass-card" style={{ padding: '1.85rem', marginBottom: '1.75rem', border: '1px solid rgba(99,102,241,0.35)', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.03))' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={18} color="var(--primary-light)" /> Complete Student Registration
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Provide full student credentials, academic details, and performance indicators.
              </p>
            </div>

            {/* Live Risk & Success Indicator Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              background: 'rgba(0,0,0,0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: `1px solid ${previewRiskColor}35`
            }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Computed Risk</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: previewRiskColor, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {previewRisk === 'HIGH' ? <AlertTriangle size={13} /> : <CheckCircle size={13} />}
                  {previewRisk} RISK
                </div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Success Score</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                  {previewScore} / 100
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister}>
            {/* Section 1: Account & Authentication */}
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={13} /> Account Credentials
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  style={{ width: '100%' }}
                  placeholder="e.g. Shiva Prasad"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Student Email *
                </label>
                <input
                  type="email"
                  className="input-field"
                  style={{ width: '100%' }}
                  placeholder="e.g. shiva@college.edu"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Auto Generate
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="input-field"
                    style={{ width: '100%', paddingRight: '2.5rem' }}
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(p => !p)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                  >
                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {form.password && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(form.password)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.67rem', cursor: 'pointer', marginTop: '0.3rem', padding: 0 }}
                  >
                    <Copy size={10} /> Copy password
                  </button>
                )}
              </div>

              {/* Student ID */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Student Roll / ID *
                  </label>
                  <button
                    type="button"
                    onClick={generateStudentId}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Generate ID
                  </button>
                </div>
                <input
                  type="text"
                  className="input-field"
                  style={{ width: '100%' }}
                  placeholder="e.g. SC-2024-0158"
                  value={form.studentId}
                  onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Section 2: Academic Profile */}
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--ml-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={13} /> Institutional & Department Details
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Department */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Department *
                </label>
                <select
                  className="input-field"
                  style={{ width: '100%', background: 'rgba(18, 24, 38, 0.95)' }}
                  value={form.department}
                  onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d} style={{ background: '#121826' }}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Academic Year *
                </label>
                <select
                  className="input-field"
                  style={{ width: '100%', background: 'rgba(18, 24, 38, 0.95)' }}
                  value={form.year}
                  onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                >
                  {YEARS.map(y => (
                    <option key={y} value={y} style={{ background: '#121826' }}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Semester (1 - 8) *
                </label>
                <select
                  className="input-field"
                  style={{ width: '100%', background: 'rgba(18, 24, 38, 0.95)' }}
                  value={form.semester}
                  onChange={e => setForm(f => ({ ...f, semester: Number(e.target.value) }))}
                >
                  {SEMESTERS.map(s => (
                    <option key={s} value={s} style={{ background: '#121826' }}>Semester {s}</option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Section *
                </label>
                <select
                  className="input-field"
                  style={{ width: '100%', background: 'rgba(18, 24, 38, 0.95)' }}
                  value={form.section}
                  onChange={e => setForm(f => ({ ...f, section: e.target.value }))}
                >
                  {SECTIONS.map(sec => (
                    <option key={sec} value={sec} style={{ background: '#121826' }}>Section {sec}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section 3: Performance & Risk Indicators */}
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--risk-low)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={13} /> Performance Metrics & Risk Factors
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* CGPA */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Current CGPA (0.0 - 10.0) *
                  </label>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                    {form.cgpa}
                  </span>
                </div>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="10"
                  className="input-field"
                  style={{ width: '100%' }}
                  value={form.cgpa}
                  onChange={e => setForm(f => ({ ...f, cgpa: e.target.value }))}
                  required
                />
              </div>

              {/* Current Active Backlogs */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Current Backlogs *
                  </label>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: previewBacklogs > 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                    {form.backlogs}
                  </span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="20"
                  className="input-field"
                  style={{ width: '100%' }}
                  value={form.backlogs}
                  onChange={e => setForm(f => ({ ...f, backlogs: e.target.value }))}
                  required
                />
              </div>

              {/* Attendance Percentage */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Attendance % (0 - 100) *
                  </label>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: previewAttendance >= 75 ? 'var(--risk-low)' : 'var(--risk-high)' }}>
                    {form.attendance}%
                  </span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input-field"
                  style={{ width: '100%' }}
                  value={form.attendance}
                  onChange={e => setForm(f => ({ ...f, attendance: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.55rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.83rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.55rem 1.4rem', fontSize: '0.85rem' }}
                disabled={submitting}
              >
                {submitting ? 'Registering...' : '✓ Register & Save Profile'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Accounts Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px', maxWidth: '360px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
            <input
              type="text"
              className="input-field"
              style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.82rem' }}
              placeholder="Search by student name, email, department, ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {filtered.length} registered student account{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '0.75rem' }} />
            <div>Loading student accounts from database...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem' }}>
            <Users size={36} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {accounts.length === 0
                ? 'No student accounts registered yet. Click "Register New Student" above.'
                : 'No registered accounts match your search filter.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[
                    'Student', 
                    'Roll / ID', 
                    'Department', 
                    'Year / Sem / Sec', 
                    'CGPA', 
                    'Backlogs', 
                    'Attendance', 
                    'Risk Status', 
                    ''
                  ].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.75rem 0.85rem 0.75rem', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const p = u.profile || {};
                  const riskLvl = p.riskLevel || 'LOW';
                  const riskColor = riskLvl === 'HIGH' ? 'var(--risk-high)' : (riskLvl === 'MEDIUM' ? 'var(--risk-med)' : 'var(--risk-low)');
                  const riskBg = riskLvl === 'HIGH' ? 'var(--risk-high-bg)' : (riskLvl === 'MEDIUM' ? 'var(--risk-med-bg)' : 'var(--risk-low-bg)');

                  return (
                    <tr key={u.id || u._id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Name & Email */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.84rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                            {(u.name || 'S')[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{u.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.8rem' }}>
                        {u.studentId ? (
                          <code style={{ color: 'var(--primary-light)', background: 'rgba(99,102,241,0.1)', padding: '2px 7px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {u.studentId}
                          </code>
                        ) : (
                          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Auto-linked</span>
                        )}
                      </td>

                      {/* Department */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {p.department || '—'}
                      </td>

                      {/* Year / Sem / Sec */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                        {p.year ? `${p.year} · Sem ${p.semester || 1} (${p.section || 'A'})` : '—'}
                      </td>

                      {/* CGPA */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {p.academic?.cgpa !== undefined ? p.academic.cgpa.toFixed(2) : '—'}
                      </td>

                      {/* Backlogs */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.82rem', fontWeight: 700, color: (p.academic?.backlogs || 0) > 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                        {p.academic?.backlogs !== undefined ? p.academic.backlogs : 0}
                      </td>

                      {/* Attendance */}
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.82rem', fontWeight: 700, color: (p.attendance?.percentage || 0) >= 75 ? 'var(--risk-low)' : 'var(--risk-high)' }}>
                        {p.attendance?.percentage !== undefined ? `${p.attendance.percentage}%` : '—'}
                      </td>

                      {/* Risk Status */}
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <Badge color={riskColor} bg={riskBg}>
                          {riskLvl} RISK
                        </Badge>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(u.id || u._id, u.name)}
                          disabled={deletingId === (u.id || u._id)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: '6px', padding: '0.3rem 0.65rem', color: 'var(--risk-high)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,63,94,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,63,94,0.1)'}
                        >
                          <Trash2 size={11} />
                          {deletingId === (u.id || u._id) ? 'Removing…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }`}</style>
    </div>
  );
}
