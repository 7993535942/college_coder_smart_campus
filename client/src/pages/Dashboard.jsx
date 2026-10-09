import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { 
  Users, Award, AlertTriangle, Briefcase, CalendarCheck, 
  Sparkles, ChevronRight, BrainCircuit, Info, X 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

let dashCache = null;

export default function Dashboard({ onSelectStudent, setCurrentPage, onNavigateToStudents, onFilterByAgreement }) {
  const [overview, setOverview] = useState(dashCache?.overview || null);
  const [departments, setDepartments] = useState(dashCache?.departments || []);
  const [mlSummary, setMlSummary] = useState(dashCache?.mlSummary || null);
  const [insights, setInsights] = useState(dashCache?.insights || []);
  const [loading, setLoading] = useState(!dashCache);
  const [showFr24Modal, setShowFr24Modal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getOverview(),
      api.getDepartments(),
      api.getMlSummary(),
      api.getInsights()
    ]).then(([ov, depts, ml, ins]) => {
      dashCache = { overview: ov, departments: depts, mlSummary: ml, insights: ins.insights || [] };
      setOverview(ov);
      setDepartments(depts);
      setMlSummary(ml);
      setInsights(ins.insights || []);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading && !overview) {
    return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading live institutional campus intelligence...</div>;
  }

  const kpis = [
    { 
      label: 'Total Enrolled', 
      val: overview?.totalStudents || 0, 
      icon: Users, 
      color: '#6366f1',
      action: () => onNavigateToStudents ? onNavigateToStudents({}) : setCurrentPage('students'),
      tooltip: 'Click to view all enrolled students'
    },
    { 
      label: 'Avg Success Score', 
      val: `${overview?.avgSuccessScore || 0}/100`, 
      icon: Award, 
      color: '#10b981',
      action: () => setShowScoreModal(true),
      tooltip: 'Click to view success score breakdown & methodology'
    },
    { 
      label: 'High Academic Risk', 
      val: overview?.highRiskCount || 0, 
      icon: AlertTriangle, 
      color: '#f43f5e', 
      sub: `${overview?.mediumRiskCount || 0} medium risk`, 
      action: () => onNavigateToStudents ? onNavigateToStudents({ riskLevel: 'HIGH' }) : setCurrentPage('students'),
      tooltip: 'Click to filter High Risk students'
    },
    { 
      label: 'Placement Ready', 
      val: `${overview?.placementReadyPct || 0}%`, 
      icon: Briefcase, 
      color: '#38bdf8',
      action: () => setCurrentPage('segments'),
      tooltip: 'Click to inspect Placement cohorts in Segmentation'
    },
    { 
      label: 'Avg Attendance', 
      val: `${overview?.avgAttendance || 0}%`, 
      icon: CalendarCheck, 
      color: '#a855f7',
      action: () => onNavigateToStudents ? onNavigateToStudents({ segment: 'Engagement Risk' }) : setCurrentPage('students'),
      tooltip: 'Click to inspect attendance & engagement risk cohort'
    },
    { 
      label: 'ML Early Warnings', 
      val: mlSummary?.agreementMatrix?.['ML Early Warning'] || 24, 
      icon: BrainCircuit, 
      color: '#f59e0b', 
      sub: 'Model escalates rule score', 
      action: () => onNavigateToStudents ? onNavigateToStudents({ agreement: 'ML Early Warning' }) : (onFilterByAgreement && onFilterByAgreement('ML Early Warning')),
      tooltip: 'Click to filter ML Early Warning students'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner / Scripted spotlight */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12))', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-ml">SmartCampus AI v2 Live</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Kaggle-harmonized ML + Rule Fusion</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Executive Decision Intelligence Console</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time student risk escalation, explainable SHAP drivers & AI intervention copilot.</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => onSelectStudent('SC-2023-0142')}
        >
          <Sparkles size={16} /> Spotlight Demo: Rahul Kumar (CSE 3rd Yr) <ChevronRight size={16} />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className="glass-card"
              onClick={kpi.action}
              style={{ cursor: kpi.action ? 'pointer' : 'default', transition: 'all 0.15s ease' }}
              onMouseEnter={e => kpi.action && (e.currentTarget.style.borderColor = 'var(--primary)')}
              onMouseLeave={e => kpi.action && (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              title={kpi.tooltip || `Click to inspect ${kpi.label}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>{kpi.label}</span>
                <div style={{ padding: '0.4rem', borderRadius: '8px', background: `${kpi.color}15`, color: kpi.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{kpi.val}</div>
              {kpi.sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>{kpi.sub}</div>}
            </div>
          );
        })}
      </div>

      {/* Charts & Insights Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {/* Department Comparison Bar Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h3 
                style={{ fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => onNavigateToStudents && onNavigateToStudents({})}
                title="Click to view all department students"
              >
                Department Academic Performance
              </h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Click any department bar or chip to filter students</div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Avg Success Score (0-100)</span>
          </div>

          <div style={{ height: '210px', width: '100%', cursor: 'pointer' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={departments} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e?.activePayload?.[0]?.payload?.department && onNavigateToStudents) {
                    onNavigateToStudents({ department: e.activePayload[0].payload.department });
                  }
                }}
              >
                <XAxis dataKey="department" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="avgScore" fill="#6366f1" radius={[4, 4, 0, 0]} name="Avg Score" />
                <Bar dataKey="highRiskCount" fill="#f43f5e" radius={[4, 4, 0, 0]} name="High Risk Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Quick Filter Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            {departments.map(d => (
              <button 
                key={d.department}
                className="btn-secondary"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                onClick={() => onNavigateToStudents && onNavigateToStudents({ department: d.department })}
                title={`Filter students in ${d.department}`}
              >
                {d.department} ({d.students})
              </button>
            ))}
          </div>
        </div>

        {/* Rules vs ML Agreement Breakdown */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Rules vs ML Risk Fusion Matrix</h3>
            <button 
              onClick={() => setShowFr24Modal(true)} 
              className="badge badge-ml" 
              style={{ cursor: 'pointer', border: '1px solid rgba(168, 85, 247, 0.4)', background: 'rgba(168, 85, 247, 0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              title="Click to view FR-24 Risk Fusion Protocol details"
            >
              <span>FR-24 Agreement</span>
              <Info size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mlSummary?.agreementMatrix && Object.entries(mlSummary.agreementMatrix).map(([cat, count]) => {
              const isWarning = cat === 'ML Early Warning';
              const isConfirmed = cat === 'Confirmed High';
              return (
                <div 
                  key={cat} 
                  onClick={() => onFilterByAgreement ? onFilterByAgreement(cat) : (onNavigateToStudents && onNavigateToStudents({ agreement: cat }))}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.65rem 0.85rem', 
                    background: isWarning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)', 
                    borderRadius: '8px', 
                    border: isWarning ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Click to view ${cat} students`}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isWarning ? 'var(--risk-med)' : (isConfirmed ? 'var(--risk-high)' : 'var(--text-main)') }}>
                      {cat}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      {isWarning ? 'Rules rated LOW/MED, but ML model flagged HIGH' : (isConfirmed ? 'Both rules and ML concur on HIGH risk' : (cat === 'Rules-Only Alert' ? 'Rules rated HIGH; model predicted lower' : 'Rules and model predictions in consensus'))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{count}</span>
                    <ChevronRight size={14} color="var(--text-dim)" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dataset-Derived Early Warnings */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Dataset-Derived Early Warning Alerts</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Click any alert to inspect cohort</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {insights.map(item => {
            let action = () => onNavigateToStudents && onNavigateToStudents({});
            if (item.id === 1) action = () => onNavigateToStudents && onNavigateToStudents({ segment: 'Engagement Risk' });
            else if (item.id === 2) action = () => onNavigateToStudents && onNavigateToStudents({ agreement: 'ML Early Warning' });
            else if (item.id === 3) action = () => onNavigateToStudents && onNavigateToStudents({ segment: 'Placement Risk' });
            else if (item.id === 4) action = () => onNavigateToStudents && onNavigateToStudents({ riskLevel: 'HIGH' });

            return (
              <div 
                key={item.id} 
                onClick={action}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.65rem', 
                  padding: '0.85rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                title="Click to view affected student cohort in registry"
              >
                <AlertTriangle size={18} color="var(--risk-med)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {item.text}
                </div>
                <ChevronRight size={14} color="var(--text-dim)" style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* FR-24 Risk Fusion Protocol Modal */}
      {showFr24Modal && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setShowFr24Modal(false)}
        >
          <div 
            className="glass-card" 
            style={{ maxWidth: '640px', width: '100%', background: '#0e1526', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-ml">FR-24 Specification</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Two-Tiered Second Opinion</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Rules vs ML Risk Fusion Matrix Protocol</h3>
              </div>
              <button 
                onClick={() => setShowFr24Modal(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', padding: '0.25rem', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>Scoring & Risk Escalation Policy:</div>
              <div>• <strong>Primary Baseline:</strong> Deterministic rule-based evaluation ensures explainable, compliant risk classification.</div>
              <div>• <strong>ML Escalation:</strong> Model A probability &ge; 0.60 escalates rule-based risk by at most one tier.</div>
              <div>• <strong>Safety Guarantee:</strong> ML model never silently lowers rule-based risk.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {mlSummary?.agreementMatrix && Object.entries(mlSummary.agreementMatrix).map(([cat, count]) => {
                const isWarning = cat === 'ML Early Warning';
                const isConfirmed = cat === 'Confirmed High';
                return (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: isWarning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)', borderRadius: '8px', border: isWarning ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isWarning ? 'var(--risk-med)' : (isConfirmed ? 'var(--risk-high)' : 'var(--text-main)') }}>
                        {cat}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {isWarning ? 'Rules rated LOW/MED, but ML model flagged HIGH' : (isConfirmed ? 'Both rules and ML concur on HIGH risk' : (cat === 'Rules-Only Alert' ? 'Rules rated HIGH risk, while ML predicted lower' : 'Rules and model predictions in consensus'))}
                      </div>
                    </div>
                    <button 
                      className="btn-secondary" 
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      onClick={() => {
                        setShowFr24Modal(false);
                        onFilterByAgreement && onFilterByAgreement(cat);
                      }}
                    >
                      <span>{count} Students</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button 
                className="btn-secondary" 
                style={{ fontSize: '0.8rem' }}
                onClick={() => {
                  setShowFr24Modal(false);
                  setCurrentPage('models');
                }}
              >
                Inspect Model Cards (FR-21 / FR-25) &rarr;
              </button>
              <button 
                className="btn-primary" 
                style={{ fontSize: '0.8rem' }}
                onClick={() => setShowFr24Modal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Score Methodology Modal */}
      {showScoreModal && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setShowScoreModal(false)}
        >
          <div 
            className="glass-card" 
            style={{ maxWidth: '600px', width: '100%', background: '#0e1526', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-low">FR-06 Specification</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Composite Weighted Index</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Student Success Score Framework</h3>
              </div>
              <button 
                onClick={() => setShowScoreModal(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', padding: '0.25rem', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Campus Mean</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--risk-low)' }}>{overview?.avgSuccessScore || 70}/100</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>High Risk (&lt;60)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--risk-high)' }}>{overview?.highRiskCount || 433}</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Medium Risk</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--risk-med)' }}>{overview?.mediumRiskCount || 485}</div>
              </div>
            </div>

            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>Five Component Formula Weights:</div>
              <div>• <strong>Academic CGPA:</strong> 40% weight (historical course mastery & exams)</div>
              <div>• <strong>Attendance:</strong> 20% weight (lecture & lab engagement threshold)</div>
              <div>• <strong>Coding Proficiency:</strong> 15% weight (practical diagnostic assessments)</div>
              <div>• <strong>LMS Activity:</strong> 15% weight (online homework & digital submissions)</div>
              <div>• <strong>Placement Readiness:</strong> 10% weight (soft-skills & mock interviews)</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button 
                className="btn-secondary" 
                style={{ fontSize: '0.8rem' }}
                onClick={() => {
                  setShowScoreModal(false);
                  onNavigateToStudents && onNavigateToStudents({ riskLevel: 'HIGH' });
                }}
              >
                Inspect High Risk Cohort ({overview?.highRiskCount || 433}) &rarr;
              </button>
              <button 
                className="btn-primary" 
                style={{ fontSize: '0.8rem' }}
                onClick={() => {
                  setShowScoreModal(false);
                  onNavigateToStudents && onNavigateToStudents({});
                }}
              >
                View All {overview?.totalStudents || 1250} Students &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
