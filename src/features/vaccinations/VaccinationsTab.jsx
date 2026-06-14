import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VaccinationsTab() {
  const { 
    selectedPetId, 
    currentPet, 
    openAddVaccine, 
    openEditVaccine, 
    deleteVaccine 
  } = useApp();

  if (selectedPetId === 'all') {
    return (
      <div className="dashboard-grid">
        <div className="col-12">
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Vaccination Log & Brand Records</h3>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>
              Please select a specific pet from the header bar to view and log vaccinations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const logs = currentPet?.vaccineLogs || [];

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Vaccination Log & Brand Records</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddVaccine}>
              Log Vaccination
            </button>
          </div>
          
          <div>
            <p style={{ fontWeight: '600', marginBottom: '1rem' }}>Vaccination Records for {currentPet?.name}</p>
            {logs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No vaccination records logged yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Vaccine Name</th>
                      <th>Brand / Manufacturer</th>
                      <th>Notes</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.date}</td>
                        <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{log.vaccineName}</td>
                        <td>
                          {log.brand ? (
                            <span className="badge badge-secondary" style={{ textTransform: 'none' }}>
                              {log.brand}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>Unspecified Brand</span>
                          )}
                        </td>
                        <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{log.notes || '-'}</td>
                        <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                          <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => openEditVaccine(currentPet.id, log)}>
                            <Edit3 size={12} style={{ color: 'var(--primary)' }} />
                          </button>
                          <button className="btn-icon" style={{ width: '30px', height: '30px', display: 'inline-flex' }} onClick={() => deleteVaccine(currentPet.id, log.id)}>
                            <Trash2 size={12} style={{ color: 'var(--danger)' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
