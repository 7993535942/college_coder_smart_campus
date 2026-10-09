import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { 
  ArrowLeft, Sparkles, BookOpen, Clock, Activity, 
  Briefcase, Code2, Users, AlertCircle, CheckCircle, ShieldAlert 
} from 'lucide-react';

export default function StudentDetail({ studentId, initialStudent = null, onBack }) {
  const [student, setStudent] = useState(initialStudent || null);
  const [loading, setLoading] = useState(!initialStudent);
  const [error, setError] = useState(null);
  const [copilotPlan, setCopilotPlan] = useState(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    if (!student || student.studentId !== studentId) {
      setLoading(true);
    }
    setError(null);
    api.getStudent(studentId)
      .then(data => {
        if (data && !data.error) {
          setStudent(data);
        } else if (data && data.error) {
          setError(data.error);
        }
      })
      .catch(err => {
        console.error('Failed to fetch student:', err);
        setError('Could not load student profile.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  const handleGeneratePlan = async () => {
    setGeneratingPlan(true);
    try {
      const plan = await api.getInterventionPlan(student);
      setCopilotPlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPlan(false);
    }
  };

  if (loading && !student) {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ width: 'fit-content' }}>
          <ArrowLeft size={16} /> Back to Student Registry
        </button>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading student profile...
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ width: 'fit-content' }}>
          <ArrowLeft size={16} /> Back to Student Registry
        </button>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--risk-high)' }}>
          <AlertCircle size={24} style={{ marginBottom: '0.5rem', display: 'inline-block' }} />
          <div>{error}</div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ width: 'fit-content' }}>
          <ArrowLeft size={16} /> Back to Student Registry
        </button>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Student profile not found.
        </div>
      </div>
    );
  }

  const riskBadge = student.riskLevel === 'HIGH' ? 'badge-high' : student.riskLevel === 'MEDIUM' ? 'badge-med' : 'badge-low';
  const isMlEscalated = student.riskSource === 'rules+ml';
  const lastSem = student.academic?.semesterHistory?.find(h => h.slot === 'last') || student.academic?.semesterHistory?.[1] || {};
  const prevSem = student.academic?.semesterHistory?.find(h => h.slot === 'prev') || student.academic?.semesterHistory?.[0] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back button */}
      <div>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Student Registry
        </button>
      </div>

      {/* Header Profile Card */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{student.name}</h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{student.studentId}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {student.department} • {student.year} • Semester {student.semester} • Section {student.section}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <span className={`badge ${riskBadge}`}>
              {student.riskLevel} RISK
              {isMlEscalated && <span style={{ marginLeft: '4px' }}>(Rules+ML)</span>}
            </span>
            <span className="badge badge-ml">
              Segment: {student.segment}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
              Agreement: <strong style={{ color: '#fff' }}>{student.ml?.agreement}</strong>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Success Score</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: student.successScore >= 80 ? 'var(--risk-low)' : (student.successScore >= 60 ? 'var(--risk-med)' : 'var(--risk-high)') }}>
              {student.successScore}<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/100</span>
            </div>
          </div>
          <button className="btn-primary" onClick={handleGeneratePlan} disabled={generatingPlan}>
            <Sparkles size={16} /> {generatingPlan ? 'Synthesizing...' : 'AI Copilot Intervention'}
          </button>
        </div>
      </div>

      {/* Generated AI Intervention Plan Banner if active */}
      {copilotPlan && (
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))', border: '1px solid rgba(99,102,241,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Sparkles size={20} color="var(--primary-light)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Intervention Copilot Plan</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>{copilotPlan.summary}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {Object.entries(copilotPlan.recommendedActions || {}).map(([cat, actions]) => (
              <div key={cat} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '0.35rem' }}>{cat}</div>
                <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {actions.map((act, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{act}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6 Performance Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Academic Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <BookOpen size={18} color="var(--primary-light)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Academic Performance (25%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>CGPA: <strong style={{ color: '#fff' }}>{student.academic?.cgpa}</strong></div>
            <div>Backlogs: <strong style={{ color: (student.academic?.backlogs || 0) > 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{student.academic?.backlogs}</strong></div>
            <div>Latest Sem Marks: <strong style={{ color: '#fff' }}>{lastSem.avgMarks || 'N/A'}%</strong></div>
            <div>Prev Sem Marks: <strong style={{ color: '#fff' }}>{prevSem.avgMarks || 'N/A'}%</strong></div>
            <div>Latest Pass Ratio: <strong style={{ color: '#fff' }}>{lastSem.unitsPassed}/{lastSem.unitsEnrolled}</strong></div>
            <div>Entry Score: <strong style={{ color: '#fff' }}>{student.academic?.entryScore || 'N/A'}</strong></div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Clock size={18} color="var(--risk-med)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Biometric Attendance (15%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>Percentage: <strong style={{ color: (student.attendance?.percentage ?? 0) < 65 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{(student.attendance?.percentage ?? 0).toFixed(1)}%</strong></div>
            <div>Monthly Trend: <strong style={{ color: (student.attendance?.trend ?? 0) < 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{(student.attendance?.trend ?? 0) > 0 ? `+${student.attendance.trend}%` : `${student.attendance?.trend ?? 0}%`}</strong></div>
          </div>
        </div>

        {/* LMS Activity Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Activity size={18} color="var(--primary-light)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>LMS Engagement (15%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>Weekly Hours: <strong style={{ color: '#fff' }}>{student.lms?.learningHours} hrs</strong></div>
            <div>Assignments: <strong style={{ color: '#fff' }}>{student.lms?.assignmentCompletion}%</strong></div>
            <div>Logins / Wk: <strong style={{ color: '#fff' }}>{student.lms?.loginFrequency}</strong></div>
            <div>Activity Trend: <strong style={{ color: (student.lms?.activityTrend || 0) < 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{student.lms?.activityTrend}%</strong></div>
          </div>
        </div>

        {/* Placement Readiness */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Briefcase size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Placement Readiness (20%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>Aptitude: <strong style={{ color: '#fff' }}>{student.placement?.aptitude}/100</strong></div>
            <div>Coding: <strong style={{ color: student.placement?.coding < 50 ? 'var(--risk-high)' : '#fff' }}>{student.placement?.coding}/100</strong></div>
            <div>Mock Interview: <strong style={{ color: '#fff' }}>{student.placement?.mockInterview}/100</strong></div>
            <div>Internship: <strong style={{ color: student.placement?.internshipExperience ? 'var(--risk-low)' : 'var(--text-dim)' }}>{student.placement?.internshipExperience ? 'Yes' : 'No'}</strong></div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Code2 size={18} color="var(--risk-low)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Skills & Projects (15%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>Technical: <strong style={{ color: '#fff' }}>{student.skills?.technical}/100</strong></div>
            <div>Soft Skills: <strong style={{ color: '#fff' }}>{student.skills?.soft}/100</strong></div>
            <div>Projects: <strong style={{ color: '#fff' }}>{student.skills?.projectsCompleted} completed</strong></div>
          </div>
        </div>

        {/* Extracurricular */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Users size={18} color="var(--ml-accent)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Campus Engagement (10%)</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div>Events Attended: <strong style={{ color: '#fff' }}>{student.engagement?.eventsAttended}</strong></div>
            <div>Active Clubs: <strong style={{ color: '#fff' }}>{student.engagement?.clubsCount}</strong></div>
            <div>Hackathons: <strong style={{ color: '#fff' }}>{student.engagement?.hackathonsParticipated}</strong></div>
            <div>Score: <strong style={{ color: '#fff' }}>{student.engagement?.extracurricularScore}/100</strong></div>
          </div>
        </div>
      </div>

      {/* Explainability Section: Rules vs ML SHAP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.25rem' }}>
        {/* Rule-Based Contributions */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Rule-Based Score Breakdown (FR-08)</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Transparent indicator contributions out of total 100.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {student.scoreContributions && Object.entries(student.scoreContributions).map(([k, v]) => (
              <div key={k}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'capitalize' }}>
                  <span>{k}</span>
                  <strong>{v} pts</strong>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(v / 25) * 100}%`, height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ML Prediction & SHAP Diverging Factors */}
        <div className="glass-card" style={{ border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>ML Prediction & SHAP Drivers (FR-23)</h4>
            <span className="badge badge-ml">Kaggle Model</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Academic Risk (Model A)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: student.ml?.academicRisk?.band === 'HIGH' ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                {student.ml?.academicRisk?.band} ({((student.ml?.academicRisk?.probability || 0) * 100).toFixed(0)}%)
              </div>
            </div>
            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Placement (Model P)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8' }}>
                {student.ml?.placement?.band} ({((student.ml?.placement?.probability || 0) * 100).toFixed(0)}%)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {(student.ml?.academicRisk?.topFactors || []).map((f, i) => (
              <div key={i} style={{ padding: '0.65rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: f.impact === 'raises_risk' ? '3px solid var(--risk-high)' : '3px solid var(--risk-low)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>{f.feature}</span>
                  <span style={{ color: f.impact === 'raises_risk' ? 'var(--risk-high)' : 'var(--risk-low)' }}>{f.value}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Benchmark: {f.benchmark}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.75rem', fontStyle: 'italic' }}>
            Model estimates are probabilities, not certainties. Features reflect statistical associations, not causal claims.
          </div>
        </div>
      </div>
    </div>
  );
}
