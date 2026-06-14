import React from 'react';
import { useApp } from '../../context/AppContext';

export default function GuideTab() {
  const { 
    openAddPet, 
    openAddWeight, 
    openAddExpense, 
    openAddReminder 
  } = useApp();

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>Interactive Onboarding Missions</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Complete these tutorial steps to understand how Pawfecto keeps your pet's life structured.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>🐾 Mission 1: Add a Pet Profile</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Register your pet's basic bio, birthdate, and breed details.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddPet}>
                Launch Mission
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>⚖️ Mission 2: Log weight history</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Record weight to render interactive growth curves.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
                Launch Mission
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>💰 Mission 3: Log a food/medical bill</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Map items to populate your category financial donut chart.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddExpense}>
                Launch Mission
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>⏰ Mission 4: Set a recurring vaccine alarm</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose times, frequencies, and trigger desktop alerts.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
                Launch Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
