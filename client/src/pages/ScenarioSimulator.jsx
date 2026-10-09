import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Sliders, ArrowRight, RotateCcw, BrainCircuit, AlertCircle } from 'lucide-react';

export default function ScenarioSimulator() {
  const [params, setParams] = useState({
    attendance: 58,
    backlogs: 3,
    averageMarks: 58,
    codingScore: 48,
    learningHours: 4.5,
    aptitudeScore: 62,
    extracurricularScore: 70
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const data = await api.simulateScore(params);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [params]);

  const resetToRahul = () => {
    setParams({
      attendance: 58,
      backlogs: 3,
      averageMarks: 58,
      codingScore: 48,
      learningHours: 4.5,
      aptitudeScore: 62,
      extracurricularScore: 70
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>What-If Scenario Simulator (FR-15)</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Simulate intervention outcomes: adjust behavioral & academic parameters to re-calculate rule score and model probabilities.</p>
        </div>
        <button className="btn-secondary" onClick={resetToRahul}>
          <RotateCcw size={14} /> Reset to Baseline (Rahul Kumar)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Sliders Input Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Simulation Control Variables</h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Biometric Attendance</span>
              <strong style={{ color: params.attendance < 65 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{params.attendance}%</strong>
            </div>
            <input 
              type="range" min="30" max="100" value={params.attendance}
              onChange={e => setParams(p => ({ ...p, attendance: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Active Backlogs</span>
              <strong style={{ color: params.backlogs > 0 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{params.backlogs} courses</strong>
            </div>
            <input 
              type="range" min="0" max="6" value={params.backlogs}
              onChange={e => setParams(p => ({ ...p, backlogs: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Semester Average Marks</span>
              <strong style={{ color: '#fff' }}>{params.averageMarks}%</strong>
            </div>
            <input 
              type="range" min="35" max="95" value={params.averageMarks}
              onChange={e => setParams(p => ({ ...p, averageMarks: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Technical Coding Diagnostic</span>
              <strong style={{ color: params.codingScore < 50 ? 'var(--risk-high)' : '#fff' }}>{params.codingScore}/100</strong>
            </div>
            <input 
              type="range" min="20" max="98" value={params.codingScore}
              onChange={e => setParams(p => ({ ...p, codingScore: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <span>Weekly Self-Directed Study / LMS</span>
              <strong style={{ color: '#fff' }}>{params.learningHours} hrs/week</strong>
            </div>
            <input 
              type="range" min="1" max="25" step="0.5" value={params.learningHours}
              onChange={e => setParams(p => ({ ...p, learningHours: Number(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Output Outcome Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(18,24,38,0.95), rgba(30,41,59,0.95))' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Simulated Outcome Comparison</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem', textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.25)', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Baseline</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--risk-high)' }}>42/100</div>
                <span className="badge badge-high" style={{ marginTop: '0.25rem' }}>HIGH Risk</span>
              </div>

              <ArrowRight size={24} color="var(--primary-light)" />

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Simulated Scenario</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: result?.scenarioScore >= 80 ? 'var(--risk-low)' : (result?.scenarioScore >= 60 ? 'var(--risk-med)' : 'var(--risk-high)') }}>
                  {result?.scenarioScore ?? '--'}/100
                </div>
                <span className={`badge ${result?.scenarioRisk === 'HIGH' ? 'badge-high' : (result?.scenarioRisk === 'MEDIUM' ? 'badge-med' : 'badge-low')}`} style={{ marginTop: '0.25rem' }}>
                  {result?.scenarioRisk ?? '--'} Risk
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Model-Estimated Academic Risk (Model A)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: result?.mlEstimatedRisk?.band === 'HIGH' ? 'var(--risk-high)' : 'var(--risk-low)', marginTop: '0.2rem' }}>
                  {result?.mlEstimatedRisk?.band} ({((result?.mlEstimatedRisk?.probability || 0) * 100).toFixed(0)}% Probability)
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{result?.mlEstimatedRisk?.note}</div>
              </div>

              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Model-Estimated Placement Likelihood (Model P)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.2rem' }}>
                  {result?.mlEstimatedPlacement?.band} ({((result?.mlEstimatedPlacement?.probability || 0) * 100).toFixed(0)}% Likelihood)
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{result?.mlEstimatedPlacement?.note}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
