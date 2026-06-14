import React from 'react';
import { Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../utils/constants';

export default function ExpenseDonut() {
  const { categoryTotals, totalExpenses, currencySymbol } = useApp();

  const categories = Object.keys(categoryTotals);
  if (categories.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <Info size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No expense data recorded.</p>
      </div>
    );
  }

  const radius = 65;
  const strokeWidth = 16;
  const circum = 2 * Math.PI * radius;
  let accumulatedAngle = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
        {categories.map((cat) => {
          const amount = categoryTotals[cat];
          const percentage = amount / totalExpenses;
          const strokeDashoffset = circum - (percentage * circum);
          const rotation = accumulatedAngle;
          accumulatedAngle += percentage * 360;

          return (
            <circle
              key={cat}
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke={categoryColors[cat] || '#64748b'}
              strokeWidth={strokeWidth}
              strokeDasharray={circum}
              strokeDashoffset={strokeDashoffset}
              style={{
                transformOrigin: '90px 90px',
                transform: `rotate(${rotation}deg)`,
                transition: 'stroke-dashoffset 0.6s ease'
              }}
            />
          );
        })}
        {/* Inner ring for glass effect */}
        <circle cx="90" cy="90" r={radius - strokeWidth / 2 - 1} fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
        {categories.map(cat => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: categoryColors[cat] || '#64748b' }}></span>
            <span style={{ fontWeight: '500' }}>{cat}:</span>
            <span style={{ marginLeft: 'auto', fontWeight: '700' }}>{currencySymbol}{categoryTotals[cat].toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
