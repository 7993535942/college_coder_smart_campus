import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Sparkles, Send, CheckCircle2, Clock, Plus, Bot, Check, AlertCircle, User, ChevronRight, Zap, Search, ArrowUpDown, X, Layers, Filter } from 'lucide-react';

// ─── Chat Message Renderer ─────────────────────────────────────────────────
function ChatMessage({ msg, onSuggestionClick }) {
  if (msg.sender === 'user') {
    return (
      <div style={{ alignSelf: 'flex-end', maxWidth: '80%', padding: '0.6rem 1rem', borderRadius: '18px 18px 4px 18px', background: 'var(--primary)', fontSize: '0.82rem', color: '#fff' }}>
        {msg.text}
      </div>
    );
  }

  const data = msg.data;
  const type = msg.type;

  return (
    <div style={{ alignSelf: 'flex-start', maxWidth: '92%', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem' }}>
        <Bot size={13} color="var(--ml-accent)" />
        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>SmartCampus Agent</span>
        {msg.autoCreatedTask && (
          <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', background: 'rgba(16,185,129,0.15)', color: 'var(--risk-low)', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.3)' }}>
            ✓ Task auto-created
          </span>
        )}
      </div>

      <div style={{ padding: '0.7rem 0.9rem', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.6 }}>
        <FormattedText text={msg.text} />
      </div>

      {type === 'student_profile' && data && <StudentProfileCard data={data} />}
      {type === 'risk_factors' && msg.factors && <RiskFactorsList factors={msg.factors} />}
      {type === 'task_assigned' && msg.autoCreatedTask && <TaskCreatedCard task={msg.autoCreatedTask} />}
      {(type === 'batch_tasks_assigned' || msg.autoCreatedBatch) && <BatchTasksCard batch={msg.autoCreatedBatch} />}
      {type === 'student_list' && msg.students && msg.students.length > 0 && <StudentListCards students={msg.students} />}
      {type === 'not_found' && msg.fuzzyMatches && msg.fuzzyMatches.length > 0 && (
        <NotFoundCard matches={msg.fuzzyMatches} onSelect={(s) => onSuggestionClick(`Give me details about ${s.name}`)} />
      )}
    </div>
  );
}

function FormattedText({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        // Bold **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        return <div key={i} style={{ minHeight: line.trim() === '' ? '0.5rem' : 'auto' }}>{parts}</div>;
      })}
    </div>
  );
}

function StudentProfileCard({ data }) {
  const riskColor = data.riskLevel === 'HIGH' ? 'var(--risk-high)' : data.riskLevel === 'MEDIUM' ? 'var(--risk-med)' : 'var(--risk-low)';
  return (
    <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid var(--border-focus)', borderRadius: '10px', padding: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.75rem' }}>
      {[
        ['Department', data.department],
        ['Year', `Year ${data.year}`],
        ['Success Score', `${data.successScore}/100`],
        ['Risk Level', data.riskLevel],
        ['Attendance', data.attendance != null ? `${Number(data.attendance).toFixed(1)}%` : 'N/A'],
        ['CGPA', data.cgpa ?? 'N/A'],
        ['Backlogs', data.backlogs ?? 0],
        ['LMS Hours', data.lmsHours ?? 'N/A'],
        ['Coding Score', data.codingScore != null ? `${data.codingScore}/100` : 'N/A'],
        ['ML Academic Risk', data.mlAcademicRisk],
        ['ML Agreement', data.mlAgreement],
        ['Segment', data.segment],
      ].map(([label, value]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.025)', borderRadius: '5px' }}>
          <span style={{ color: 'var(--text-dim)' }}>{label}</span>
          <span style={{ fontWeight: 600, color: label === 'Risk Level' ? riskColor : '#fff' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function RiskFactorsList({ factors }) {
  const sevColor = (s) => s === 'CRITICAL' ? 'var(--risk-high)' : s === 'HIGH' ? '#f97316' : 'var(--risk-med)';
  const sevBg = (s) => s === 'CRITICAL' ? 'rgba(239,68,68,0.08)' : s === 'HIGH' ? 'rgba(249,115,22,0.08)' : 'rgba(234,179,8,0.08)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {factors.map((f, i) => (
        <div key={i} style={{ padding: '0.5rem 0.7rem', background: sevBg(f.severity), border: `1px solid ${sevColor(f.severity)}33`, borderLeft: `3px solid ${sevColor(f.severity)}`, borderRadius: '6px', fontSize: '0.75rem' }}>
          <div style={{ fontWeight: 700, color: sevColor(f.severity) }}>{f.factor}</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }}>{f.detail}</div>
        </div>
      ))}
    </div>
  );
}

function TaskCreatedCard({ task }) {
  return (
    <div style={{ padding: '0.7rem 0.9rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <CheckCircle2 size={15} color="var(--risk-low)" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <div style={{ fontWeight: 700, color: 'var(--risk-low)', marginBottom: '0.2rem' }}>Intervention Task Created &amp; Synced</div>
        <div style={{ color: '#e2e8f0' }}>{task.action}</div>
        <div style={{ color: 'var(--text-dim)', marginTop: '0.2rem' }}>
          Assigned to: {task.assignedTo} • Category: {task.category} • Due: {task.followUpDate}
        </div>
      </div>
    </div>
  );
}

function BatchTasksCard({ batch }) {
  if (!batch) return null;
  return (
    <div style={{ padding: '0.8rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: '10px', fontSize: '0.76rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--risk-low)', marginBottom: '0.35rem' }}>
        <CheckCircle2 size={16} />
        <span>⚡ Automated Batch Intervention Dispatched ({batch.count} Tasks)</span>
      </div>
      <div style={{ color: '#cbd5e1', marginBottom: '0.5rem', lineHeight: 1.4 }}>
        All assigned tasks have been saved to the campus database and are <strong>now live and visible on each student's portal</strong>.
      </div>
      {batch.summaryDetails && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.4rem', marginTop: '0.4rem' }}>
          {batch.summaryDetails.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#a78bfa' }}>{s.category}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Criteria: {s.criteria}</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.72rem', marginTop: '2px' }}>
                Assigned: <strong style={{ color: '#34d399' }}>{s.assignedCount}</strong> students
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StudentListCards({ students }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {students.map((s, i) => {
        const riskColor = s.riskLevel === 'HIGH' ? 'var(--risk-high)' : s.riskLevel === 'MEDIUM' ? 'var(--risk-med)' : 'var(--risk-low)';
        const att = s.attendance?.percentage != null ? `${Number(s.attendance.percentage).toFixed(0)}%` : null;
        const cgpa = s.academic?.cgpa != null ? `CGPA: ${s.academic.cgpa}` : null;
        const backlogs = s.academic?.backlogs != null && s.academic.backlogs > 0 ? `${s.academic.backlogs} backlogs` : null;

        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '7px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>{s.name}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>({s.studentId})</span>
                <span style={{ color: '#818cf8', fontSize: '0.7rem' }}>• {s.department}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>
                {att && <span>Att: <strong style={{ color: parseFloat(att) < 75 ? '#f43f5e' : '#34d399' }}>{att}</strong></span>}
                {cgpa && <span>{cgpa}</span>}
                {backlogs && <span style={{ color: '#f59e0b' }}>⚠️ {backlogs}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontWeight: 700, color: riskColor, fontSize: '0.72rem' }}>{s.riskLevel} RISK</span>
              <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>Score: {s.successScore}/100</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NotFoundCard({ matches, onSelect }) {
  if (!matches || matches.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Did you mean?
      </div>
      {matches.map((s, i) => {
        const riskColor = s.riskLevel === 'HIGH' ? 'var(--risk-high)' : s.riskLevel === 'MEDIUM' ? 'var(--risk-med)' : 'var(--risk-low)';
        return (
          <button
            key={i}
            onClick={() => onSelect(s)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(99,102,241,0.06)', border: '1px solid var(--border-focus)', borderRadius: '7px', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            <div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.78rem' }}>{s.name}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginLeft: '0.4rem' }}>({s.studentId})</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginLeft: '0.4rem' }}>• {s.department}</span>
            </div>
            <span style={{ fontWeight: 700, color: riskColor, fontSize: '0.7rem', flexShrink: 0 }}>{s.riskLevel}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Suggestion Chips ──────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Who are the high risk students',
  'Who are the medium risk students',
  'Who are the low risk students',
  'Assign attendance task to all low attendance students',
  'Assign academic task to all backlogs students',
  'Assign placement task to all low coding students',
  'Assign mentoring task to all high risk students',
  'Give me details about Rahul Kumar'
];

// ─── Main Component ──────────────────────────────────────────────────────
export default function AICopilot() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('SC-2023-0142');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [submittingAction, setSubmittingAction] = useState(null);
  const [toast, setToast] = useState('');
  const chatEndRef = useRef(null);

  const [chatQuery, setChatQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      type: 'text',
      text: '👋 I\'m your **SmartCampus AI Agent**. I can look up student details, explain risk factors, recommend interventions, and assign tasks — all from natural language.\n\nTry asking: **"Give me details about Rahul Kumar"** or **"What are the risk factors for Rahul Kumar?"**'
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [interventions, setInterventions] = useState([]);
  

  useEffect(() => {
    api.getStudents('?limit=50').then(data => {
      const list = data.students || [];
      setStudents(list);
      if (list.length > 0 && (!selectedStudentId || !list.some(s => s.studentId === selectedStudentId))) {
        setSelectedStudentId(list[0].studentId);
      }
    }).catch(console.error);
    api.getInterventions().then(setInterventions).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedStudentId) return;
    setLoadingPlan(true);
    api.getStudent(selectedStudentId).then(s => {
      setCurrentStudent(s);
      generatePlan(s);
    }).catch(err => {
      console.error(err);
      setLoadingPlan(false);
    });
  }, [selectedStudentId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  const generatePlan = async (s) => {
    setLoadingPlan(true);
    try {
      const data = await api.getInterventionPlan(s);
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleAsk = async (e, overrideQuery) => {
    if (e) e.preventDefault();
    const q = overrideQuery || chatQuery;
    if (!q.trim()) return;
    // Snapshot current messages to send as history BEFORE adding new user message
    const historySnapshot = chatMessages.map(m => ({ sender: m.sender, text: m.text }));
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setChatQuery('');
    setChatLoading(true);
    try {
      const res = await api.askAssistant(q, historySnapshot);
      const aiMsg = {
        sender: 'ai',
        type: res.type || 'text',
        text: res.answer,
        data: res.type === 'student_profile' ? res.data : null,
        factors: res.type === 'risk_factors' ? res.data : null,
        students: res.type === 'student_list' ? res.data : null,
        fuzzyMatches: res.type === 'not_found' ? (res.data || []) : null,
        autoCreatedTask: res.autoCreatedTask || null,
        autoCreatedBatch: res.autoCreatedBatch || null
      };
      setChatMessages(prev => [...prev, aiMsg]);

      if (res.autoCreatedBatch) {
        api.getInterventions().then(list => {
          if (Array.isArray(list)) setInterventions(list);
        });
        setToast(`⚡ ${res.autoCreatedBatch.count} Tasks Auto-Assigned & Dispatched by Campus Agent!`);
        setTimeout(() => setToast(''), 5000);
      } else if (res.autoCreatedTask) {
        setInterventions(prev => [res.autoCreatedTask, ...prev]);
        setToast(`✅ Task assigned to ${res.autoCreatedTask.studentName} by AI Agent`);
        setTimeout(() => setToast(''), 4000);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', type: 'text', text: '⚠️ Sorry, I encountered an error processing your query. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleTrackAction = async (actionText, category) => {
    if (!currentStudent || submittingAction) return;
    setSubmittingAction(actionText);
    try {
      const created = await api.createIntervention({
        studentId: currentStudent.studentId,
        studentName: currentStudent.name,
        action: actionText,
        category: category || 'Academic',
        assignedTo: 'Faculty Mentor',
        status: 'In Progress',
        followUpDate: '2026-10-24'
      });
      setInterventions(prev => [created, ...prev]);
      setToast(`Assigned: "${actionText}" to Faculty Mentor`);
      setTimeout(() => setToast(''), 4000);
    } catch (err) {
      setToast('Failed to assign intervention');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setSubmittingAction(null);
    }
  };

  const handleToggleStatus = async (item) => {
    const nextStatus = item.status === 'Completed' ? 'In Progress' : 'Completed';
    try {
      await api.updateIntervention(item._id, { status: nextStatus });
      setInterventions(prev => prev.map(i => i._id === item._id ? { ...i, status: nextStatus } : i));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>AI Intervention Copilot &amp; Natural Language Assistant</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated synthesis of multi-source risk evidence into high-impact faculty action plans (FR-14, FR-17, FR-18).</p>
      </div>

      {toast && (
        <div style={{ background: 'var(--risk-low-bg)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--risk-low)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'fadeIn 0.2s ease' }}>
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Left: Student Copilot Intervention Plan */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Sparkles size={18} color="var(--primary-light)" /> Intervention Plan Generator
            </h3>
            <select
              className="input-field"
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              style={{ maxWidth: '200px', fontSize: '0.8rem' }}
            >
              {students.map(s => (
                <option key={s.studentId} value={s.studentId}>
                  {s.name} ({s.studentId})
                </option>
              ))}
            </select>
          </div>

          {loadingPlan ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)' }}>Generating evidence-based plan...</div>
          ) : plan ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.85rem', background: 'rgba(99,102,241,0.08)', borderRadius: '8px', border: '1px solid var(--border-focus)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Executive Synthesis</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', lineHeight: 1.4 }}>{plan.summary}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Top Risk Drivers</div>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {plan.topRiskDrivers?.map((d, i) => <li key={i} style={{ marginBottom: '0.2rem' }}>{d}</li>)}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Recommended Interventions by Category</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.entries(plan.recommendedActions || {}).map(([cat, actions]) => (
                    <div key={cat} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)' }}>{cat}</div>
                      {actions.map((act, i) => {
                        const isAssigned = interventions.some(item => item.action === act && item.studentId === currentStudent?.studentId);
                        const isCurrentSubmitting = submittingAction === act;
                        return (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: isAssigned ? 'var(--text-main)' : 'var(--text-muted)' }}>{act}</span>
                            {isAssigned ? (
                              <span className="badge badge-low" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                <Check size={12} /> Assigned
                              </span>
                            ) : (
                              <button
                                className="btn-secondary"
                                style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}
                                disabled={isCurrentSubmitting}
                                onClick={() => handleTrackAction(act, cat)}
                              >
                                {isCurrentSubmitting ? 'Assigning...' : <><Plus size={12} /> Assign &amp; Track</>}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Sparkles size={28} color="var(--primary-light)" style={{ marginBottom: '0.75rem', opacity: 0.7 }} />
              <p style={{ fontSize: '0.85rem' }}>Select a student above to review their real-time intervention strategy.</p>
              {currentStudent && (
                <button
                  className="btn-primary"
                  style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}
                  onClick={() => generatePlan(currentStudent)}
                >
                  Generate Plan for {currentStudent.name}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Campus Analytics Q&A Agent (FR-17) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '640px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.65rem' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.45rem', margin: 0 }}>
              <Bot size={18} color="var(--ml-accent)" /> Campus Analytics Q&amp;A Agent (FR-17)
              <span style={{ fontSize: '0.65rem', padding: '0.12rem 0.45rem', background: 'rgba(139,92,246,0.15)', color: 'var(--ml-accent)', borderRadius: '999px', border: '1px solid rgba(139,92,246,0.3)', marginLeft: '0.2rem' }}>
                <Zap size={9} style={{ display: 'inline', marginRight: '3px' }} />Agentic
              </span>
            </h3>

            <button
              type="button"
              onClick={() => setChatMessages([])}
              style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.7rem', cursor: 'pointer', padding: '2px 6px' }}
              title="Clear chat messages"
              onMouseEnter={e => e.currentTarget.style.color = '#f43f5e'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              Clear History
            </button>
          </div>

          {/* Smart Campus Agent Chat Stream at Top */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.35rem' }}>
            {chatMessages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} onSuggestionClick={(q) => handleAsk(null, q)} />
            ))}
            {chatLoading && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--ml-accent)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Agent is analyzing records...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Recommendations Just Above the AI Search Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
              <Sparkles size={11} color="var(--ml-accent)" /> Recommended Prompts &amp; Actions:
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '3px' }}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAsk(null, s)}
                  style={{
                    fontSize: '0.66rem',
                    padding: '0.22rem 0.6rem',
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(129,140,248,0.22)',
                    color: '#c7d2fe',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(129,140,248,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(129,140,248,0.22)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* AI Search / Task Bar Placed at the Bottom */}
          <form onSubmit={handleAsk} style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              borderRadius: '8px',
              padding: '0.42rem 0.75rem',
              transition: 'border-color 0.2s ease'
            }}>
              <Search size={14} color="#818cf8" style={{ flexShrink: 0 }} />
              <input
                type="text"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'inherit'
                }}
                placeholder='Ask AI search or assign task (e.g. "Who are high risk students", "Assign attendance task")...'
                value={chatQuery}
                onChange={e => setChatQuery(e.target.value)}
              />
              {chatQuery && (
                <button
                  type="button"
                  onClick={() => setChatQuery('')}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={chatLoading || !chatQuery.trim()}
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', borderRadius: '8px' }}
            >
              <Send size={13} />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
