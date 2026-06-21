import React from 'react';
import { Download, Upload, Moon, Sun, Coins, Trash2, ChevronRight, FolderOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { isDesktop, selectStorageDirectory } from '../../utils/desktopStorage';

export default function SettingsTab() {
  const { 
    exportBackup, 
    importBackup, 
    theme, 
    setTheme, 
    currency, 
    setCurrency, 
    resetToFactory,
    storagePath,
    changeStoragePath,
    clearStoragePath
  } = useApp();

  const handleChangeStoragePath = async () => {
    triggerHaptic();
    const path = await selectStorageDirectory();
    if (path) {
      changeStoragePath(path);
    }
  };

  const handleClearStoragePath = (e) => {
    e.stopPropagation();
    triggerHaptic();
    clearStoragePath();
  };

  const isNative = Capacitor.isNativePlatform();

  const triggerHaptic = async () => {
    if (isNative) {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (e) {
        console.error('Haptics error', e);
      }
    }
  };

  const handleToggleTheme = () => {
    triggerHaptic();
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleReset = () => {
    triggerHaptic();
    resetToFactory();
  };

  const handleExport = () => {
    triggerHaptic();
    exportBackup();
  };

  if (isNative) {
    return (
      <div className="mobile-settings-container animate-fade-in">
        {/* Profile/App Header card */}
        <div className="mobile-settings-profile">
          <div className="profile-avatar">
            <span>🐾</span>
          </div>
          <div className="profile-info">
            <h4>Pawfecto Mobile</h4>
            <p>Version 1.0.0 • Local Storage</p>
          </div>
        </div>

        {/* Section 1: Appearance */}
        <div className="mobile-settings-section">
          <h3 className="settings-section-title">Preference & Styling</h3>
          <div className="settings-group-card">
            <div className="settings-row" onClick={handleToggleTheme}>
              <div className="settings-row-left">
                <div className="icon-container theme-icon">
                  {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                </div>
                <span>Theme Mode</span>
              </div>
              <div className="settings-row-right">
                <span className="value-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-left">
                <div className="icon-container currency-icon">
                  <Coins size={18} />
                </div>
                <span>Currency</span>
              </div>
              <div className="settings-row-right">
                <select 
                  className="mobile-select-inline" 
                  value={currency} 
                  onChange={(e) => { triggerHaptic(); setCurrency(e.target.value); }}
                >
                  <option value="THB">THB (฿)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Data & Backup */}
        <div className="mobile-settings-section">
          <h3 className="settings-section-title">Data & Backup</h3>
          <p className="settings-section-desc">Pawfecto stores your data locally. Use these options to manage your database records.</p>
          <div className="settings-group-card">
            <div className="settings-row" onClick={handleExport}>
              <div className="settings-row-left">
                <div className="icon-container export-icon">
                  <Download size={18} />
                </div>
                <span>Export Local Backup</span>
              </div>
              <div className="settings-row-right">
                <span className="value-label">JSON</span>
                <ChevronRight size={16} />
              </div>
            </div>

            <label className="settings-row" style={{ cursor: 'pointer' }}>
              <div className="settings-row-left">
                <div className="icon-container import-icon">
                  <Upload size={18} />
                </div>
                <span>Import Backup File</span>
              </div>
              <div className="settings-row-right">
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={(e) => { triggerHaptic(); importBackup(e); }} 
                  style={{ display: 'none' }} 
                />
                <ChevronRight size={16} />
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Reset */}
        <div className="mobile-settings-section">
          <h3 className="settings-section-title">System</h3>
          <div className="settings-group-card">
            <div className="settings-row danger-row" onClick={handleReset}>
              <div className="settings-row-left">
                <div className="icon-container reset-icon">
                  <Trash2 size={18} />
                </div>
                <span>Reset to Factory Defaults</span>
              </div>
              <div className="settings-row-right">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <div className="col-6">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Data Backup & Security</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Pawfecto is a local-first application. To ensure your pet records are never lost, back them up locally onto your PC or phone.
            </p>
          </div>

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

            {isDesktop() && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontWeight: '600' }}>Custom Storage Folder</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Store all database records in a custom directory (e.g., OneDrive, Dropbox) for easy sync.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" onClick={handleChangeStoragePath} style={{ flexGrow: 1, justifyContent: 'flex-start', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'calc(100% - 75px)' }}>
                    <FolderOpen size={18} /> {storagePath ? storagePath : 'Default Database Storage'}
                  </button>
                  {storagePath && (
                    <button className="btn btn-secondary" onClick={handleClearStoragePath} style={{ color: 'var(--text-danger)' }}>
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
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
