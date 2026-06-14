import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AlertPopup() {
  const { alertPopup, setAlertPopup, toggleReminderCompleted, showFeedback } = useApp();

  if (!alertPopup) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: '420px', textAlign: 'center', border: '2px solid var(--primary)' }}>
        <div style={{ backgroundColor: 'var(--primary-glow)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem', color: 'var(--primary)' }}>
          <Bell size={36} />
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>Reminder Alert!</h2>
        <p style={{ fontWeight: '600', fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
          {alertPopup.title}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Scheduled for {alertPopup.petName} at {alertPopup.time} on {alertPopup.date}.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              toggleReminderCompleted(alertPopup.id);
              setAlertPopup(null);
            }}
          >
            Mark as Completed
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              const id = alertPopup.id;
              setAlertPopup(null);
              showFeedback(
                <span>
                  Reminder dismissed.
                  <button 
                    onClick={() => toggleReminderCompleted(id)} 
                    style={{ 
                      background: 'white', 
                      color: 'var(--primary)', 
                      border: 'none', 
                      borderRadius: '6px', 
                      padding: '4px 10px', 
                      marginLeft: '10px', 
                      fontWeight: '700', 
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    Mark Completed
                  </button>
                </span>,
                'info'
              );
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
