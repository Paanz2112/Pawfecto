import React from 'react';
import { CheckCircle2, X, Plus, BellRing } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function RemindersTab() {
  const { 
    filteredReminders, 
    pets, 
    openAddReminder, 
    toggleReminderCompleted, 
    deleteReminder 
  } = useApp();

  const isNative = Capacitor.isNativePlatform();

  const triggerHaptic = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
    }
  };

  const handleToggle = async (id) => {
    await triggerHaptic();
    toggleReminderCompleted(id);
  };

  const handleDelete = async (id) => {
    await triggerHaptic();
    deleteReminder(id);
  };

  const handleAdd = async () => {
    await triggerHaptic();
    openAddReminder();
  };

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      <div className="dashboard-grid">
        <div className="col-12">
          <div className="glass-card" style={{ padding: isNative ? '1.25rem' : '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Reminders & Tasks</h3>
              {!isNative && (
                <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={handleAdd}>
                  New Reminder
                </button>
              )}
            </div>
            
            {filteredReminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                <BellRing size={44} style={{ color: 'var(--border-focus)', marginBottom: '0.75rem', strokeWidth: '1.5' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.25rem' }}>No Reminders Scheduled</h4>
                <p style={{ fontSize: '0.85rem' }}>Add a reminder to get notified for your pet's needs.</p>
              </div>
            ) : (
              <div className="reminders-list">
                {filteredReminders.map(rem => {
                  const pet = pets.find(p => p.id === rem.petId);
                  return (
                    <div key={rem.id} className="reminder-item" style={{ opacity: rem.completed ? 0.6 : 1, padding: isNative ? '0.85rem' : '1rem' }}>
                      <button 
                        onClick={() => handleToggle(rem.id)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: rem.completed ? 'var(--success)' : 'var(--text-muted)' }}
                      >
                        <CheckCircle2 size={24} fill={rem.completed ? 'var(--success)' : 'transparent'} />
                      </button>
                      <div className="reminder-content">
                        <span className="reminder-title" style={{ textDecoration: rem.completed ? 'line-through' : 'none', color: rem.completed ? 'var(--text-muted)' : 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700' }}>
                          {rem.title}
                        </span>
                        <div className="reminder-meta">
                          <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{pet ? pet.name : 'Unknown Pet'}</span>
                          <span>Due: {rem.date} {rem.time ? `@ ${rem.time}` : ''}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', marginRight: '0.25rem' }}>
                          <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{rem.type}</span>
                          {rem.recurrence && rem.recurrence !== 'none' && (
                            <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>🔁 {rem.recurrence}</span>
                          )}
                        </div>
                        <button className="btn-icon" style={{ width: '32px', height: '32px' }} onClick={() => handleDelete(rem.id)}>
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

      {/* Mobile Floating Action Button */}
      {isNative && (
        <button className="mobile-fab" onClick={handleAdd}>
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
