import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BrainCircuit, CheckCircle2, ShieldCheck, Database, Award, Info } from 'lucide-react';

export default function ModelInsights() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getModels().then(data => {
      setModels(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading verified ML model cards & evaluation metrics...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ML Model Cards & Evaluation Insights (FR-21, FR-25)</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Honest held-out evaluation metrics, SHAP feature rankings, and responsible-AI provenance for trained models.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {models.map(m => (
          <div key={m.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{m.name}</h3>
                <span className="badge badge-ml">{m.version}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Dataset: <strong>{m.dataset}</strong> ({m.datasetRows.toLocaleString()} rows)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Algorithm: <strong style={{ color: '#fff' }}>{m.algorithm}</strong>
              </div>
            </div>

            {/* Held-out Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', padding: '0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>ROC-AUC</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{m.metrics?.rocAuc}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>PR-AUC</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{m.metrics?.prAuc}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>F1-Score</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{m.metrics?.f1Score}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Precision</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{m.metrics?.precision}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Recall</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{m.metrics?.recall}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Brier Score</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{m.metrics?.brierScore}</div>
              </div>
            </div>

            {/* Top Feature Importance */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Top Predictive Feature Importance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {m.topFeatures?.slice(0, 4).map((f, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                      <span>{f.name}</span>
                      <strong>{(f.importance * 100).toFixed(1)}%</strong>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${(f.importance / 0.35) * 100}%`, height: '100%', background: 'var(--ml-accent)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Algorithm Comparison Table */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>5-Fold Cross Validation Benchmarking</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {m.candidateComparison?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span>{c.model}</span>
                    <strong style={{ color: '#fff' }}>ROC-AUC: {c.cvRocAuc}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations & Provenance */}
            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px dashed var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Ethical & Operational Notes:</div>
              <ul style={{ paddingLeft: '1.1rem' }}>
                {m.limitations?.map((l, i) => <li key={i} style={{ marginBottom: '0.15rem' }}>{l}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
