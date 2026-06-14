import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RemindersTab() {
  const { 
    filteredReminders, 
    pets, 
    openAddReminder, 
    toggleReminderCompleted, 
    deleteReminder 
  } = useApp();

  return (
    <div className="dashboard-grid">
      <div className="col-12">
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>All Reminders</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={openAddReminder}>
              New Reminder
            </button>
          </div>
          {filteredReminders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem' }}>No reminders scheduled.</p>
          ) : (
            <div className="reminders-list">
              {filteredReminders.map(rem => {
                const pet = pets.find(p => p.id === rem.petId);
                return (
                  <div key={rem.id} className="reminder-item" style={{ opacity: rem.completed ? 0.6 : 1 }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', marginRight: '0.5rem' }}>
                        <span className="badge badge-secondary">{rem.type}</span>
                        {rem.recurrence && rem.recurrence !== 'none' && (
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>🔁 {rem.recurrence}</span>
                        )}
                      </div>
                      <button className="btn-icon" style={{ width: '32px', height: '32px' }} onClick={() => deleteReminder(rem.id)}>
                        <X size={14} style={{ color: 'var(--danger)' }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
