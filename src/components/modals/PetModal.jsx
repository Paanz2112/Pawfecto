import React from 'react';
import { X, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PetModal() {
  const { 
    showPetModal, 
    setShowPetModal, 
    editingPet, 
    petForm, 
    setPetForm, 
    savePet, 
    showFeedback 
  } = useApp();

  if (!showPetModal) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showFeedback('Image must be under 2MB to ensure local storage operates efficiently.', 'danger');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>{editingPet ? 'Edit Pet Profile' : 'Register New Pet'}</h2>
          <button onClick={() => setShowPetModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={savePet}>
          <div className="form-group" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
            <label className="form-label">Profile Image</label>
            <label className="photo-uploader">
              {petForm.photo ? (
                <img src={petForm.photo} alt="Preview" className="photo-preview" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Upload size={24} />
                  <span style={{ fontSize: '0.8rem' }}>Upload Photo (max 2MB)</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Pet Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={petForm.name} 
              onChange={(e) => setPetForm({ ...petForm, name: e.target.value })} 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Species</label>
              <select 
                className="form-select" 
                value={petForm.species} 
                onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
              >
                <option value="Dog">Dog 🐕</option>
                <option value="Cat">Cat 🐈</option>
                <option value="Rabbit">Rabbit 🐇</option>
                <option value="Bird">Bird 🦜</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Breed</label>
              <input 
                type="text" 
                className="form-input" 
                value={petForm.breed} 
                onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Birthdate</label>
            <input 
              type="date" 
              className="form-input" 
              value={petForm.birthdate} 
              onChange={(e) => setPetForm({ ...petForm, birthdate: e.target.value })} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio Notes & Allergies</label>
            <textarea 
              className="form-input" 
              value={petForm.notes} 
              onChange={(e) => setPetForm({ ...petForm, notes: e.target.value })} 
              style={{ minHeight: '85px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowPetModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingPet ? 'Save Changes' : 'Register Pet'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
