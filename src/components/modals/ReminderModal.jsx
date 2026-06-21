import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ReminderModal() {
  const { 
    showReminderModal, 
    setShowReminderModal, 
    pets, 
    reminderForm, 
    setReminderForm, 
    saveReminder,
    editingReminder
  } = useApp();

  if (!showReminderModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>{editingReminder ? 'Edit Reminder' : 'Schedule Reminder'}</h2>
          <button onClick={() => setShowReminderModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={saveReminder}>
          <div className="form-group">
            <label className="form-label">Select Pet</label>
            <select 
              className="form-select" 
              value={reminderForm.petId} 
              onChange={(e) => setReminderForm({ ...reminderForm, petId: e.target.value })}
              required
            >
              <option value="" disabled>Choose a pet...</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select 
              className="form-select" 
              value={reminderForm.type} 
              onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
            >
              <option value="Vaccine">Vaccination</option>
              <option value="Medication">Medication</option>
              <option value="Grooming">Grooming/Bath</option>
              <option value="Checkup">Clinic Checkup</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Task Details</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Feline Leukemia Booster"
              value={reminderForm.title} 
              onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })} 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Scheduled Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={reminderForm.date} 
                onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Scheduled Time (hh:mm)</label>
              <input 
                type="time" 
                className="form-input" 
                value={reminderForm.time} 
                onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Repeat / Recurrence</label>
            <select 
              className="form-select" 
              value={reminderForm.recurrence} 
              onChange={(e) => setReminderForm({ ...reminderForm, recurrence: e.target.value })}
            >
              <option value="none">One-time event</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Early Reminder Option</label>
            <select 
              className="form-select" 
              value={reminderForm.earlyReminder || '0'} 
              onChange={(e) => setReminderForm({ ...reminderForm, earlyReminder: e.target.value })}
            >
              <option value="0">At time of event</option>
              <option value="5">5 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1.25rem 0 0.5rem 0' }}>
            <input 
              type="checkbox" 
              id="addToCalendar"
              checked={reminderForm.addToCalendar || false}
              onChange={(e) => setReminderForm({ ...reminderForm, addToCalendar: e.target.checked })}
              style={{ cursor: 'pointer', width: '17px', height: '17px', accentColor: 'var(--primary)' }}
            />
            <label htmlFor="addToCalendar" style={{ cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-main)', userSelect: 'none', fontWeight: '700', margin: 0 }}>
              Export / Add to Calendar (Google / iCal)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowReminderModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingReminder ? 'Save Changes' : 'Schedule Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
