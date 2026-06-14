import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAge } from '../../utils/helpers';

export default function PetsTab() {
  const { pets, openEditPet, deletePet } = useApp();

  return (
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
              <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => openEditPet(pet)}>
                <Edit3 size={16} />
              </button>
              <button className="btn btn-danger" style={{ padding: '0.5rem', color: 'white' }} onClick={() => deletePet(pet.id, pet.name)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
