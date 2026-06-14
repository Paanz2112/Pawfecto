import React from 'react';
import { Scale } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WeightChart() {
  const { pets, selectedPetId, getFilteredByTimeframe, openAddWeight } = useApp();

  let activePet = pets[0];
  if (selectedPetId !== 'all') {
    activePet = pets.find(p => p.id === selectedPetId);
  }

  if (!activePet || !activePet.weightLogs || activePet.weightLogs.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No weight logs yet for {activePet?.name || 'this pet'}.</p>
        <button className="btn btn-secondary" style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
          Log First Weight
        </button>
      </div>
    );
  }

  const logs = getFilteredByTimeframe(activePet.weightLogs || [], 'date');
  const padding = 30;
  const chartWidth = 500;
  const chartHeight = 160;

  if (logs.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No logs found for this timeframe.</p>
      </div>
    );
  }

  const weights = logs.map(l => l.weight);
  const maxWeight = Math.max(...weights) * 1.15;
  const minWeight = Math.min(...weights) * 0.85;
  const weightRange = maxWeight - minWeight === 0 ? 1 : maxWeight - minWeight;

  const points = logs.map((log, index) => {
    const x = padding + (index * (chartWidth - 2 * padding)) / (logs.length - 1 || 1);
    const y = chartHeight - padding - ((log.weight - minWeight) * (chartHeight - 2 * padding)) / weightRange;
    return { x, y, ...log };
  });

  const pathD = points.reduce((acc, p, index) => {
    return index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : '';

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="var(--border-color)" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="3 3" strokeWidth="1" />

        {areaD && <path d={areaD} fill="url(#chartGrad)" />}

        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {points.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--bg-card)"
              stroke="var(--primary)"
              strokeWidth="3"
            />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--text-main)"
            >
              {p.weight} kg
            </text>
            <text
              x={p.x}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-muted)"
            >
              {p.date.split('-').slice(1).join('/')}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
