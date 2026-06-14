import React from 'react';
import { 
  LayoutDashboard, 
  PawPrint, 
  Scale, 
  Bell, 
  ShieldAlert, 
  DollarSign, 
  Settings, 
  Sparkles, 
  Moon, 
  Sun 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, theme, setTheme } = useApp();

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div style={{ backgroundColor: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '12px' }}>
          <PawPrint size={24} style={{ color: 'var(--primary)' }} />
        </div>
        <span className="logo-text">Pawfecto</span>
      </div>

      <nav style={{ flexGrow: 1 }}>
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('pets')} 
              className={`nav-item ${activeTab === 'pets' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <PawPrint size={20} />
              Pets Family
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('health')} 
              className={`nav-item ${activeTab === 'health' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <Scale size={20} />
              Weight Logs
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('reminders')} 
              className={`nav-item ${activeTab === 'reminders' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <Bell size={20} />
              Reminders
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('vaccination')} 
              className={`nav-item ${activeTab === 'vaccination' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <ShieldAlert size={20} />
              Vaccinations
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('expenses')} 
              className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <DollarSign size={20} />
              Expenses
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <Settings size={20} />
              Backup & Settings
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('guide')} 
              className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
            >
              <Sparkles size={20} />
              App Guide & Tour
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn-icon" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ width: '38px', height: '38px', borderRadius: '50%' }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
