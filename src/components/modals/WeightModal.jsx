import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WeightModal() {
  const { 
    showWeightModal, 
    setShowWeightModal, 
    editingWeight, 
    pets, 
    weightForm, 
    setWeightForm, 
    saveWeight, 
    adjustWeight 
  } = useApp();

  if (!showWeightModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>{editingWeight ? 'Edit Weight Record' : 'Log Pet Weight'}</h2>
          <button onClick={() => setShowWeightModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={saveWeight}>
          <div className="form-group">
            <label className="form-label">Select Pet</label>
            <select 
              className="form-select" 
              value={weightForm.petId} 
              onChange={(e) => setWeightForm({ ...weightForm, petId: e.target.value })}
              required
            >
              <option value="" disabled>Choose a pet...</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="number" 
                step="any" 
                placeholder="e.g. 5.4"
                className="form-input" 
                value={weightForm.weight} 
                onChange={(e) => setWeightForm({ ...weightForm, weight: e.target.value })} 
                required 
              />
              <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(-10)}>-10</button>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(-1)}>-1</button>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(1)}>+1</button>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustWeight(10)}>+10</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Date Recorded</label>
            <input 
              type="date" 
              className="form-input" 
              value={weightForm.date} 
              onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowWeightModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingWeight ? 'Save Changes' : 'Log Weight'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
