import React, { useEffect, useState } from 'react';
import { Scale, Edit3, Trash2, Plus, Info, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import VaccinationsTab from '../vaccinations/VaccinationsTab';

export default function HealthTab() {
  const { 
    selectedPetId, 
    setSelectedPetId,
    pets,
    currentPet, 
    weightSort, 
    setWeightSort, 
    openAddWeight, 
    openEditWeight, 
    deleteWeightLog,
    getSortedWeightLogs,
    getFilteredByTimeframe,
    getWeightAnalysis,
    openAddVaccine
  } = useApp();

  const isNative = Capacitor.isNativePlatform();
  const [activeSubTab, setActiveSubTab] = useState('weight'); // 'weight' or 'vaccines'

  const triggerHaptic = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
    }
  };

  // Auto-focus on first pet on mobile if 'all' is selected
  useEffect(() => {
    if (isNative && selectedPetId === 'all' && pets.length > 0) {
      setSelectedPetId(pets[0].id);
    }
  }, [isNative, selectedPetId, pets, setSelectedPetId]);

  const handlePetSelect = (id) => {
    setSelectedPetId(id);
    triggerHaptic();
  };

  const handleSubTabSelect = (tab) => {
    setActiveSubTab(tab);
    triggerHaptic();
  };

  const handleAddWeight = () => {
    triggerHaptic();
    openAddWeight();
  };

  const handleEditWeight = (petId, log) => {
    triggerHaptic();
    openEditWeight(petId, log);
  };

  const handleDeleteWeight = (petId, date) => {
    triggerHaptic();
    deleteWeightLog(petId, date);
  };

  const handleAddAction = () => {
    triggerHaptic();
    if (activeSubTab === 'weight') {
      openAddWeight();
    } else {
      openAddVaccine();
    }
  };

  // If no pets registered at all
  if (pets.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        gap: '1.25rem'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontSize: '2rem'
        }}>
          ⚖️
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>No Pets Registered</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '280px', margin: '0 auto' }}>
            Please add a pet first to manage weight records and growth charts.
          </p>
        </div>
      </div>
    );
  }

  if (selectedPetId === 'all' && !isNative) {
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
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      {/* Horizontal Pet Selector for Mobile */}
      {isNative && (
        <>
          <div className="mobile-section-header">
            <span className="mobile-section-title">Select Pet</span>
          </div>
          <div className="mobile-pet-scroll-container" style={{ marginBottom: '1rem' }}>
            {pets.map(p => (
              <div 
                key={p.id} 
                className={`mobile-pet-scroll-item ${selectedPetId === p.id ? 'active' : ''}`}
                onClick={() => handlePetSelect(p.id)}
              >
                <div className="mobile-pet-avatar-wrapper">
                  {p.photo ? (
                    <img src={p.photo} alt={p.name} className="mobile-pet-img" />
                  ) : (
                    <span className="mobile-pet-placeholder">{p.name[0]}</span>
                  )}
                </div>
                <span className="mobile-pet-name">{p.name}</span>
              </div>
            ))}
          </div>

          {/* Tab Selector: Weight vs Vaccinations */}
          <div className="mobile-segmented-tab-bar" style={{ marginBottom: '1.25rem' }}>
            <button 
              className={`mobile-tab-btn ${activeSubTab === 'weight' ? 'active' : ''}`}
              onClick={() => handleSubTabSelect('weight')}
            >
              ⚖️ Weight Log
            </button>
            <button 
              className={`mobile-tab-btn ${activeSubTab === 'vaccines' ? 'active' : ''}`}
              onClick={() => handleSubTabSelect('vaccines')}
            >
              💉 Vaccinations
            </button>
          </div>
        </>
      )}

      {isNative && activeSubTab === 'vaccines' ? (
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <VaccinationsTab />
        </div>
      ) : (
        <div className="dashboard-grid">
          <div className="col-12">
            <div className="glass-card" style={{ padding: isNative ? '1.25rem' : '1.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <p style={{ fontWeight: '800', fontSize: '1.05rem' }}>Logs for {currentPet?.name}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'nowrap' }}>
                    <select
                      value={weightSort}
                      onChange={(e) => { setWeightSort(e.target.value); triggerHaptic(); }}
                      className="form-select"
                      style={{ padding: '0.35rem 2rem 0.35rem 0.75rem', fontSize: '0.8rem', minWidth: '155px', height: 'auto', fontWeight: '600' }}
                    >
                      <option value="date-desc">📅 Date: Newest First</option>
                      <option value="date-asc">📅 Date: Oldest First</option>
                      <option value="weight-desc">⚖️ Weight: Highest First</option>
                      <option value="weight-asc">⚖️ Weight: Lowest First</option>
                    </select>
                    {!isNative && (
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={handleAddWeight}>
                        + Add Log
                      </button>
                    )}
                  </div>
                </div>
                
                {filteredLogs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1.5rem', color: 'var(--text-muted)' }}>
                    <Scale size={36} style={{ color: 'var(--border-focus)', marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.9rem' }}>No weight logs found for this period.</p>
                  </div>
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
                            <td style={{ fontWeight: '700' }}>{log.weight} kg</td>
                            <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                              <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => handleEditWeight(currentPet.id, log)}>
                                <Edit3 size={13} style={{ color: 'var(--primary)' }} />
                              </button>
                              <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => handleDeleteWeight(currentPet.id, log.date)}>
                                <Trash2 size={13} style={{ color: 'var(--danger)' }} />
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
                    <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: '800' }}>
                      <Scale size={18} style={{ color: 'var(--primary)' }} />
                      Weight Insights & Analysis
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                        <div style={{ padding: '0.5rem 0.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Average</div>
                          <div style={{ fontWeight: '800', fontSize: '1rem', marginTop: '2px' }}>{getWeightAnalysis(filteredLogs, currentPet).avg} kg</div>
                        </div>
                        <div style={{ padding: '0.5rem 0.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Min/Max</div>
                          <div style={{ fontWeight: '800', fontSize: '1rem', marginTop: '2px' }}>
                            {`${getWeightAnalysis(filteredLogs, currentPet).min} / ${getWeightAnalysis(filteredLogs, currentPet).max}`}
                          </div>
                        </div>
                        <div style={{ padding: '0.5rem 0.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>Change</div>
                          <div style={{ 
                            fontWeight: '800', 
                            fontSize: '1rem', 
                            marginTop: '2px',
                            color: getWeightAnalysis(filteredLogs, currentPet).status === 'success' ? 'var(--success)' : 
                                   getWeightAnalysis(filteredLogs, currentPet).status === 'warning' ? '#d97706' : 
                                   getWeightAnalysis(filteredLogs, currentPet).status === 'danger' ? 'var(--danger)' : 
                                   'var(--text-main)' 
                          }}>{getWeightAnalysis(filteredLogs, currentPet).changeText}</div>
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
                        backgroundColor: getWeightAnalysis(filteredLogs, currentPet).status === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 
                                         getWeightAnalysis(filteredLogs, currentPet).status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 
                                         getWeightAnalysis(filteredLogs, currentPet).status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 
                                         'rgba(99, 102, 241, 0.05)',
                        color: getWeightAnalysis(filteredLogs, currentPet).status === 'danger' ? 'var(--danger)' : 
                               getWeightAnalysis(filteredLogs, currentPet).status === 'warning' ? '#d97706' : 
                               getWeightAnalysis(filteredLogs, currentPet).status === 'success' ? 'var(--success)' : 
                               'var(--text-main)',
                        borderLeft: '3px solid ' + (
                          getWeightAnalysis(filteredLogs, currentPet).status === 'danger' ? 'var(--danger)' : 
                          getWeightAnalysis(filteredLogs, currentPet).status === 'warning' ? '#f95f00' : 
                          getWeightAnalysis(filteredLogs, currentPet).status === 'success' ? 'var(--success)' : 
                          'var(--primary)'
                        )
                      }}>
                        <span>💡</span>
                        <span>{getWeightAnalysis(filteredLogs, currentPet).text}</span>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Mobile Floating Action Button */}
      {isNative && (
        <button className="mobile-fab" onClick={handleAddAction}>
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
