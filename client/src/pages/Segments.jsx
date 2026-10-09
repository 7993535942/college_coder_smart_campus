import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { PieChart, Users, ChevronRight, Award, AlertTriangle, Briefcase, Zap, ShieldAlert } from 'lucide-react';

export default function Segments({ onFilterBySegment }) {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSegments().then(data => {
      setSegments(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const segmentDescriptions = {
    'High Performers': {
      icon: Award,
      color: '#10b981',
      risk: 'Minimal risk; maintain momentum',
      action: 'Nominate for research fellowships, advanced honors tracks, and peer mentorship leadership roles.'
    },
    'Academic Risk': {
      icon: AlertTriangle,
      color: '#f43f5e',
      risk: 'High backlogs, low course pass ratios, marks declining',
      action: 'Mandatory remedial tutoring, faculty advisor check-ins, and backlog clearance study plan.'
    },
    'Placement Risk': {
      icon: Briefcase,
      color: '#38bdf8',
      risk: 'Strong CGPA but low coding, aptitude, or mock interview scores',
      action: 'Intensive DSA bootcamps, resume review workshops, and campus mock interview clinics.'
    },
    'Hidden Potential': {
      icon: Zap,
      color: '#a855f7',
      risk: 'Moderate CGPA but exceptional technical skills and project drive',
      action: 'Connect with hackathons, startup incubators, and specialized industry capstone projects.'
    },
    'Engagement Risk': {
      icon: ShieldAlert,
      color: '#f59e0b',
      risk: 'Steep negative decline in attendance and LMS activity',
      action: 'Early outreach by department mentor, verify personal/well-being factors, re-engage on LMS modules.'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Student Segmentation Matrix (FR-09)</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Action-oriented cohort segmentation prioritizing tailored institutional interventions.</p>
        </div>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: 'var(--primary-light)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
          <div>Analyzing cohort clusters &amp; computing segment distributions...</div>
        </div>
      ) : !Array.isArray(segments) || segments.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Users size={36} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
          <p>No segmentation data available. Refresh to re-compute cohort segments.</p>
          <button className="btn-secondary" onClick={() => { setLoading(true); api.getSegments().then(d => { setSegments(d); setLoading(false); }); }} style={{ marginTop: '1rem' }}>
            Refresh Segments
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {segments.map(seg => {
            const info = segmentDescriptions[seg.segment] || { icon: Users, color: '#6366f1', risk: 'Standard risk profile', action: 'Standard academic advising' };
            const Icon = info.icon;
            return (
              <div key={seg.segment} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${info.color}` }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ padding: '0.4rem', borderRadius: '8px', background: `${info.color}15`, color: info.color }}>
                        <Icon size={18} />
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{seg.segment}</h3>
                    </div>
                    <span className="badge" style={{ background: `${info.color}15`, color: info.color }}>
                      {seg.count} students
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                    <div>Avg Score: <strong style={{ color: '#fff' }}>{seg.avgScore}/100</strong></div>
                    <div>High Risk: <strong style={{ color: 'var(--risk-high)' }}>{seg.highRiskCount}</strong></div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Primary Driver</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{info.risk}</div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Recommended Institutional Action</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>{info.action}</div>
                  </div>
                </div>

                <button 
                  className="btn-secondary" 
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                  onClick={() => onFilterBySegment(seg.segment)}
                >
                  View Students in Segment <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
