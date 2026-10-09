import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, ShieldAlert } from 'lucide-react';

let studentsCache = null;
let totalCache = 0;

export default function Students({ onSelectStudent, initialFilters = {}, initialSegment = '', initialAgreement = '' }) {
  const [students, setStudents] = useState(studentsCache || []);
  const [total, setTotal] = useState(totalCache || 0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(initialFilters.department || '');
  const [year, setYear] = useState(initialFilters.year || '');
  const [riskLevel, setRiskLevel] = useState(initialFilters.riskLevel || '');
  const [agreement, setAgreement] = useState(initialFilters.agreement || initialAgreement || '');
  const [segment, setSegment] = useState(initialFilters.segment || initialSegment || '');
  const [loading, setLoading] = useState(!studentsCache);

  useEffect(() => {
    setDepartment(initialFilters.department || '');
    setYear(initialFilters.year || '');
    setRiskLevel(initialFilters.riskLevel || '');
    setAgreement(initialFilters.agreement || initialAgreement || '');
    setSegment(initialFilters.segment || initialSegment || '');
    setPage(1);
  }, [initialFilters, initialAgreement, initialSegment]);

  const fetchStudents = async () => {
    if (!studentsCache || search || department || year || riskLevel || segment || agreement || page !== 1) {
      setLoading(true);
    }
    try {
      const params = new URLSearchParams({
        page,
        limit: 15,
        ...(search ? { search } : {}),
        ...(department ? { department } : {}),
        ...(year ? { year } : {}),
        ...(riskLevel ? { riskLevel } : {}),
        ...(segment ? { segment } : {}),
        ...(agreement ? { agreement } : {})
      });
      const data = await api.getStudents(`?${params.toString()}`);
      setStudents(data.students || []);
      setTotal(data.total || 0);
      if (!search && !department && !year && !riskLevel && !segment && !agreement && page === 1) {
        studentsCache = data.students || [];
        totalCache = data.total || 0;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, department, year, riskLevel, agreement, segment]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStudents();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>At-Risk Student Registry</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Multi-category unified cohorts with rule & model-assisted risk assessment ({total} records).</p>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', padding: '1rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative', flex: '1 1 200px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem' }} />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%', paddingLeft: '2.2rem' }}
            placeholder="Search student by name or ID (e.g. Rahul)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>

        <select 
          className="input-field" 
          value={department} 
          onChange={e => { setDepartment(e.target.value); setPage(1); }}
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
          <option value="AI_DS">AI & DS</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <select 
          className="input-field" 
          value={year} 
          onChange={e => { setYear(e.target.value); setPage(1); }}
        >
          <option value="">All Years</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <select 
          className="input-field" 
          value={riskLevel} 
          onChange={e => { setRiskLevel(e.target.value); setPage(1); }}
        >
          <option value="">All Risk Levels</option>
          <option value="HIGH">HIGH Risk</option>
          <option value="MEDIUM">MEDIUM Risk</option>
          <option value="LOW">LOW Risk</option>
        </select>

        <select 
          className="input-field" 
          value={agreement} 
          onChange={e => { setAgreement(e.target.value); setPage(1); }}
        >
          <option value="">All Agreement Statuses</option>
          <option value="Confirmed High">Confirmed High</option>
          <option value="ML Early Warning">ML Early Warning</option>
          <option value="Rules-Only Alert">Rules-Only Alert</option>
          <option value="Aligned">Aligned</option>
        </select>

        {segment && (
          <span className="badge badge-med" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.65rem' }}>
            Cohort: {segment}
            <button onClick={() => setSegment('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 700 }}>✕</button>
          </span>
        )}

        {(department || year || riskLevel || agreement || segment || search) && (
          <button 
            className="btn-secondary" 
            onClick={() => { setDepartment(''); setYear(''); setRiskLevel(''); setAgreement(''); setSegment(''); setSearch(''); setPage(1); }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Students Table */}
      <div className="glass-card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Dept / Year</th>
              <th>Success Score</th>
              <th>Risk Level</th>
              <th>ML Risk Band</th>
              <th>Agreement</th>
              <th>Attendance</th>
              <th>CGPA / Backlogs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>Loading student records...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>No students match the selected filter criteria.</td>
              </tr>
            ) : (
              students.map(s => {
                const riskBadge = s.riskLevel === 'HIGH' ? 'badge-high' : s.riskLevel === 'MEDIUM' ? 'badge-med' : 'badge-low';
                const mlBandBadge = s.ml?.academicRisk?.band === 'HIGH' ? 'badge-high' : s.ml?.academicRisk?.band === 'MEDIUM' ? 'badge-med' : 'badge-low';
                const isMlEscalated = s.riskSource === 'rules+ml';
                return (
                  <tr 
                    key={s.studentId}
                    className="student-table-row"
                    onClick={() => onSelectStudent && onSelectStudent(s.studentId, s)}
                    title={`Click to view profile of ${s.name}`}
                  >
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--primary-light)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{s.studentId}</div>
                    </td>
                    <td>
                      <div>{s.department}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{s.year} • Sec {s.section}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.successScore}/100</div>
                    </td>
                    <td>
                      <span className={`badge ${riskBadge}`}>
                        {s.riskLevel}
                        {isMlEscalated && <span style={{ fontSize: '0.65rem', marginLeft: '2px', opacity: 0.85 }}>(ML)</span>}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${mlBandBadge}`}>
                        {s.ml?.academicRisk?.band || 'LOW'} ({((s.ml?.academicRisk?.probability || 0) * 100).toFixed(0)}%)
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: s.ml?.agreement === 'ML Early Warning' ? 'var(--risk-med)' : (s.ml?.agreement === 'Confirmed High' ? 'var(--risk-high)' : 'var(--text-dim)') }}>
                        {s.ml?.agreement}
                      </span>
                    </td>
                    <td>
                      <div>{(s.attendance?.percentage || 0).toFixed(1)}%</div>
                    </td>
                    <td>
                      <div>{s.academic?.cgpa || 'N/A'} CGPA</div>
                      <div style={{ fontSize: '0.75rem', color: (s.academic?.backlogs || 0) > 0 ? 'var(--risk-high)' : 'var(--text-dim)' }}>
                        {s.academic?.backlogs || 0} backlogs
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent && onSelectStudent(s.studentId, s);
                        }}
                        title={`View ${s.name}'s Profile`}
                      >
                        <Eye size={14} /> Profile
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Showing page {page} of {Math.ceil(total / 15) || 1} ({total} total students)
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn-secondary" 
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{ opacity: page <= 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              className="btn-secondary" 
              disabled={page >= Math.ceil(total / 15)}
              onClick={() => setPage(p => p + 1)}
              style={{ opacity: page >= Math.ceil(total / 15) ? 0.5 : 1 }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
