import React from 'react';
import { Scale, Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HealthTab() {
  const { 
    selectedPetId, 
    currentPet, 
    weightSort, 
    setWeightSort, 
    openAddWeight, 
    openEditWeight, 
    deleteWeightLog,
    getSortedWeightLogs,
    getFilteredByTimeframe,
    getWeightAnalysis
  } = useApp();

  if (selectedPetId === 'all') {
    return (
      <div className="dashboard-grid">
        <div className="col-12">
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Weight Logs</h3>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              Please select a specific pet from the header to manage weight logs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const logs = currentPet?.weightLogs || [];
  const filteredLogs = getFilteredByTimeframe(logs, 'date');

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Weight Logs</h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <p style={{ fontWeight: '600' }}>Logs for {currentPet?.name}</p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={weightSort}
                  onChange={(e) => setWeightSort(e.target.value)}
                  className="form-select"
                  style={{ padding: '0.35rem 2rem 0.35rem 0.75rem', fontSize: '0.8rem', minWidth: '155px', height: 'auto', fontWeight: '600' }}
                >
                  <option value="date-desc">📅 Date: Newest First</option>
                  <option value="date-asc">📅 Date: Oldest First</option>
                  <option value="weight-desc">⚖️ Weight: Highest First</option>
                  <option value="weight-asc">⚖️ Weight: Lowest First</option>
                </select>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
                  + Add Log
                </button>
              </div>
            </div>
            
            {filteredLogs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No weight logs found for this period.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Weight</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedWeightLogs(logs).map((log) => (
                      <tr key={log.date}>
                        <td>{log.date}</td>
                        <td style={{ fontWeight: '600' }}>{log.weight} kg</td>
                        <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                          <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => openEditWeight(currentPet.id, log)}>
                            <Edit3 size={12} style={{ color: 'var(--primary)' }} />
                          </button>
                          <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => deleteWeightLog(currentPet.id, log.date)}>
                            <Trash2 size={12} style={{ color: 'var(--danger)' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Weight Analysis Summary Card */}
            {filteredLogs.length > 0 && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <Scale size={18} style={{ color: 'var(--primary)' }} />
                  Weight Insights & Analysis
                </h4>
                {(() => {
                  const analysis = getWeightAnalysis(filteredLogs, currentPet);
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average</div>
                          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{analysis.avg} kg</div>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Min / Max</div>
                          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{analysis.min} / {analysis.max} kg</div>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Change</div>
                          <div style={{ 
                            fontWeight: '700', 
                            fontSize: '1.1rem', 
                            color: analysis.status === 'success' ? 'var(--success)' : 
                                   analysis.status === 'warning' ? '#f59e0b' : 
                                   analysis.status === 'danger' ? 'var(--danger)' : 
                                   'var(--text-main)' 
                          }}>{analysis.changeText}</div>
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem', 
                        alignItems: 'flex-start',
                        padding: '0.6rem 0.8rem', 
                        borderRadius: '8px', 
                        fontSize: '0.8rem', 
                        lineHeight: '1.4',
                        backgroundColor: analysis.status === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 
                                         analysis.status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 
                                         analysis.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 
                                         'rgba(99, 102, 241, 0.05)',
                        color: analysis.status === 'danger' ? 'var(--danger)' : 
                               analysis.status === 'warning' ? '#d97706' : 
                               analysis.status === 'success' ? 'var(--success)' : 
                               'var(--text-main)',
                        borderLeft: `3px solid ${
                          analysis.status === 'danger' ? 'var(--danger)' : 
                          analysis.status === 'warning' ? '#f59e0b' : 
                          analysis.status === 'success' ? 'var(--success)' : 
                          'var(--primary)'
                        }`
                      }}>
                        <span>💡</span>
                        <span>{analysis.text}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
