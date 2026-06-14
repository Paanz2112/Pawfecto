import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VaccineModal() {
  const { 
    showVaccineModal, 
    setShowVaccineModal, 
    editingVaccine, 
    pets, 
    vaccineForm, 
    setVaccineForm, 
    saveVaccine 
  } = useApp();

  if (!showVaccineModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>{editingVaccine ? 'Edit Vaccination Record' : 'Log Vaccination'}</h2>
          <button onClick={() => setShowVaccineModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={saveVaccine}>
          <div className="form-group">
            <label className="form-label">Select Pet</label>
            <select 
              className="form-select" 
              value={vaccineForm.petId} 
              onChange={(e) => setVaccineForm({ ...vaccineForm, petId: e.target.value })}
              required
            >
              <option value="" disabled>Choose a pet...</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Vaccine Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. DHPP Core Vaccine, Rabies booster"
              value={vaccineForm.vaccineName} 
              onChange={(e) => setVaccineForm({ ...vaccineForm, vaccineName: e.target.value })} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brand / Manufacturer</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Nobivac, Defensor 3, Zoetis"
              value={vaccineForm.brand} 
              onChange={(e) => setVaccineForm({ ...vaccineForm, brand: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date Administered</label>
            <input 
              type="date" 
              className="form-input" 
              value={vaccineForm.date} 
              onChange={(e) => {
                const newDate = e.target.value;
                let nextYearStr = '';
                try {
                  const d = new Date(newDate);
                  d.setFullYear(d.getFullYear() + 1);
                  nextYearStr = d.toISOString().split('T')[0];
                } catch(err) {}
                setVaccineForm(prev => ({ 
                  ...prev, 
                  date: newDate, 
                  alertDate: nextYearStr || prev.alertDate 
                }));
              }} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea 
              className="form-input" 
              placeholder="e.g. Next booster due in 12 months, mild lethargy afterwards"
              value={vaccineForm.notes} 
              onChange={(e) => setVaccineForm({ ...vaccineForm, notes: e.target.value })} 
              style={{ minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div className="form-group" style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>
              <input 
                type="checkbox" 
                checked={vaccineForm.createAlert} 
                onChange={(e) => setVaccineForm({ ...vaccineForm, createAlert: e.target.checked })} 
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Create Booster Reminder Alert 🔔</span>
            </label>
          </div>

          {vaccineForm.createAlert && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Next Booster Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={vaccineForm.alertDate} 
                    onChange={(e) => setVaccineForm({ ...vaccineForm, alertDate: e.target.value })} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Alert Time (hh:mm)</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={vaccineForm.alertTime} 
                    onChange={(e) => setVaccineForm({ ...vaccineForm, alertTime: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Boosters Repeat</label>
                <select 
                  className="form-select" 
                  value={vaccineForm.alertRecurrence} 
                  onChange={(e) => setVaccineForm({ ...vaccineForm, alertRecurrence: e.target.value })}
                >
                  <option value="none">One-time event</option>
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowVaccineModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingVaccine ? 'Save Changes' : 'Log Vaccination'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
