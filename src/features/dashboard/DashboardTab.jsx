import React from 'react';
import { 
  PawPrint, 
  DollarSign, 
  Bell, 
  CheckCircle2, 
  TrendingUp, 
  Scale 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WeightChart from '../../components/charts/WeightChart';
import ExpenseDonut from '../../components/charts/ExpenseDonut';
import { categoryColors } from '../../utils/constants';

export default function DashboardTab() {
  const { 
    pets, 
    totalExpenses, 
    filteredExpenses,
    filteredReminders, 
    currencySymbol, 
    setActiveTab, 
    openAddWeight, 
    openAddReminder, 
    toggleReminderCompleted,
    selectedPetId,
    currentPet,
    getFilteredByTimeframe,
    getWeightAnalysis,
    getExpenseAnalysis
  } = useApp();

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <div className="quick-stats-row">
          <div className="glass-card stat-card" onClick={() => setActiveTab('pets')} style={{ cursor: 'pointer' }}>
            <div className="stat-icon icon-purple">
              <PawPrint size={24} />
            </div>
            <div>
              <div className="stat-value">{pets.length}</div>
              <div className="stat-label">Registered Pets</div>
            </div>
          </div>

          <div className="glass-card stat-card" onClick={() => setActiveTab('expenses')} style={{ cursor: 'pointer' }}>
            <div className="stat-icon icon-pink">
              <DollarSign size={24} />
            </div>
            <div>
              <div className="stat-value">{currencySymbol}{totalExpenses.toLocaleString()}</div>
              <div className="stat-label">Total Expenses</div>
            </div>
          </div>

          <div className="glass-card stat-card" onClick={() => setActiveTab('reminders')} style={{ cursor: 'pointer' }}>
            <div className="stat-icon icon-amber">
              <Bell size={24} />
            </div>
            <div>
              <div className="stat-value">{filteredReminders.filter(r => !r.completed).length}</div>
              <div className="stat-label">Active Reminders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Left side: Reminders & weight graph */}
      <div className="col-8">
        <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Weight Timeline</h3>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
              + Log Weight
            </button>
          </div>
          <WeightChart />
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Upcoming Tasks & Vaccines</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
              Schedule Task
            </button>
          </div>
          {filteredReminders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No scheduled reminders found.</p>
          ) : (
            <div className="reminders-list">
              {filteredReminders.slice(0, 5).map(rem => {
                const pet = pets.find(p => p.id === rem.petId);
                return (
                  <div key={rem.id} className="reminder-item">
                    <button 
                      onClick={() => toggleReminderCompleted(rem.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: rem.completed ? 'var(--success)' : 'var(--text-muted)' }}
                    >
                      <CheckCircle2 size={24} fill={rem.completed ? 'var(--success-glow)' : 'transparent'} />
                    </button>
                    <div className="reminder-content">
                      <span className="reminder-title" style={{ textDecoration: rem.completed ? 'line-through' : 'none', color: rem.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                        {rem.title}
                      </span>
                      <div className="reminder-meta">
                        <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{pet ? pet.name : 'Unknown Pet'}</span>
                        <span>Due: {rem.date} {rem.time ? `@ ${rem.time}` : ''}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <span className="badge badge-secondary">{rem.type}</span>
                      {rem.recurrence && rem.recurrence !== 'none' && (
                        <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>🔁 {rem.recurrence}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Expense breakdown & insights */}
      <div className="col-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="glass-card" style={{ minHeight: '320px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Expense Breakdown</h3>
          <ExpenseDonut />
        </div>

        <div className="glass-card" style={{ marginTop: '1.75rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
            Dashboard Insights
          </h3>
          
          {/* 1. Weight Analysis */}
          <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Scale size={16} style={{ color: 'var(--primary)' }} />
              Weight Trend ({selectedPetId === 'all' ? (pets[0]?.name || 'No Pet') : (currentPet?.name || 'Selected Pet')})
            </h4>
            {(() => {
              let activePetForWeight = currentPet;
              if (selectedPetId === 'all' && pets.length > 0) {
                activePetForWeight = pets[0];
              }
              const logs = getFilteredByTimeframe(activePetForWeight?.weightLogs || [], 'date');
              if (!activePetForWeight || logs.length === 0) {
                return <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No weight data logged for this period.</p>;
              }
              const analysis = getWeightAnalysis(logs, activePetForWeight);
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Period Avg:</span>
                    <span style={{ fontWeight: '700' }}>{analysis.avg} kg</span>
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

          {/* 2. Expense Analysis */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <DollarSign size={16} style={{ color: 'var(--primary)' }} />
              Expense Category Analysis
            </h4>
            {filteredExpenses.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No expense data logged for this period.</p>
            ) : (
              (() => {
                const analysis = getExpenseAnalysis(filteredExpenses);
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Top Category:</span>
                      <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[analysis.topCategory]}15`, color: categoryColors[analysis.topCategory], padding: '0.1rem 0.5rem', fontSize: '0.75rem' }}>
                        {analysis.topCategory} ({analysis.pct}%)
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.4' }}>
                      💡 {analysis.text}
                    </p>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
