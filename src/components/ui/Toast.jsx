import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      backgroundColor: toast.type === 'danger' ? 'var(--danger)' : toast.type === 'info' ? 'var(--secondary)' : 'var(--success)',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 1000,
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      animation: 'slideUp 0.3s ease'
    }}>
      <span>{toast.message}</span>
    </div>
  );
}
