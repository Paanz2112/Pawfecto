import React from 'react';
import { Edit3, Trash2, Plus, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAge } from '../../utils/helpers';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function PetsTab() {
  const { pets, openEditPet, deletePet, openAddPet } = useApp();
  const isNative = Capacitor.isNativePlatform();

  const triggerHaptic = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
    }
  };

  const handleDelete = async (id, name) => {
    await triggerHaptic();
    deletePet(id, name);
  };

  const handleEdit = async (pet) => {
    await triggerHaptic();
    openEditPet(pet);
  };

  if (pets.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        gap: '1.25rem'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontSize: '2rem'
        }}>
          🐾
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>No Pets Registered</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '280px', margin: '0 auto' }}>
            Add your first furry companion to begin tracking their health and logs.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => { openAddPet(); triggerHaptic(); }}>
          Add First Pet
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      <div className="pets-grid">
        {pets.map(pet => {
          const latestWeight = pet.weightLogs && pet.weightLogs.length > 0 
            ? `${pet.weightLogs[pet.weightLogs.length - 1].weight} kg` 
            : 'No weight logged';

          return (
            <div key={pet.id} className="glass-card pet-card">
              <div className="pet-card-header">
                {pet.photo ? (
                  <img src={pet.photo} alt={pet.name} className="pet-card-avatar" />
                ) : (
                  <div className="pet-card-avatar" style={{ 
                    backgroundColor: 'var(--primary-glow)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontWeight: '800',
                    fontSize: '2rem'
                  }}>
                    {pet.name[0]}
                  </div>
                )}
                <div className="pet-card-info">
                  <h3>{pet.name}</h3>
                  <span className="badge badge-primary">{pet.species}</span>
                  <p style={{ marginTop: '0.25rem' }}>{pet.breed}</p>
                </div>
              </div>

              <div className="pet-card-stats">
                <div className="pet-card-stat-item">
                  <span className="stat-label">Age</span>
                  <span style={{ fontWeight: '600' }}>{getAge(pet.birthdate)}</span>
                </div>
                <div className="pet-card-stat-item">
                  <span className="stat-label">Current Weight</span>
                  <span style={{ fontWeight: '600' }}>{latestWeight}</span>
                </div>
              </div>

              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: pet.notes ? 'normal' : 'italic' }}>
                  {pet.notes || 'No notes added yet.'}
                </p>
              </div>

              <div className="pet-card-actions">
                <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => handleEdit(pet)}>
                  <Edit3 size={16} />
                </button>
                <button className="btn btn-danger" style={{ padding: '0.5rem', color: 'white' }} onClick={() => handleDelete(pet.id, pet.name)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Floating Action Button */}
      {isNative && (
        <button className="mobile-fab" onClick={() => { openAddPet(); triggerHaptic(); }}>
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
