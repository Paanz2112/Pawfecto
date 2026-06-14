import React from 'react';
import { Download, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsTab() {
  const { 
    exportBackup, 
    importBackup, 
    theme, 
    setTheme, 
    currency, 
    setCurrency, 
    resetToFactory 
  } = useApp();

  return (
    <div className="dashboard-grid">
      <div className="col-6">
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.25rem' }}>Data Backup & Security</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Pawfecto is a local-first application. To ensure your pet records are never lost, back them up locally onto your PC or phone.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={exportBackup} style={{ justifyContent: 'flex-start' }}>
              <Download size={18} /> Export / Download Backup (.json)
            </button>

            <div style={{ position: 'relative' }}>
              <label className="btn btn-secondary" style={{ justifyContent: 'flex-start', width: '100%', cursor: 'pointer' }}>
                <Upload size={18} /> Restore / Upload Backup (.json)
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={importBackup} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>App Configuration</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600' }}>Color Mode Theme</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Switch between Light and Dark interface modes.</p>
              </div>
              <button className="btn btn-secondary" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div>
                <p style={{ fontWeight: '600' }}>Preferred Currency</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Select the default currency symbol for expenses.</p>
              </div>
              <select 
                className="form-select" 
                style={{ maxWidth: '140px' }}
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="THB">THB (฿)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div>
                <p style={{ fontWeight: '600' }}>Reset Application</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Clear all customizations and reload default mock pets.</p>
              </div>
              <button className="btn btn-danger" onClick={resetToFactory}>
                Reset App Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
