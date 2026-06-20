import React from 'react';
import { Scale } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WeightChart() {
  const { pets, selectedPetId, getFilteredByTimeframe, openAddWeight } = useApp();

  const palette = [
    '#6366f1', // Indigo (Primary)
    '#ec4899', // Pink (Secondary)
    '#10b981', // Emerald (Success)
    '#f59e0b', // Amber (Accent)
    '#ef4444', // Red (Danger)
    '#8b5cf6', // Violet
    '#0ea5e9'  // Sky
  ];

  // If no pets exist at all
  if (!pets || pets.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No registered pets yet.</p>
      </div>
    );
  }

  // Determine which pets' data to display
  const displayPets = selectedPetId === 'all' ? pets : pets.filter(p => p.id === selectedPetId);

  // Map pets to their series data
  const seriesData = displayPets.map((pet, idx) => {
    const rawLogs = pet.weightLogs || [];
    const logs = getFilteredByTimeframe(rawLogs, 'date');
    const color = palette[idx % palette.length];
    return {
      pet,
      logs,
      color
    };
  }).filter(s => s.logs.length > 0);

  // If there are no logs at all for the selected pet(s)
  if (seriesData.length === 0) {
    const activePet = selectedPetId !== 'all' ? pets.find(p => p.id === selectedPetId) : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No weight logs yet for {activePet ? activePet.name : 'any pet'}.</p>
        <button className="btn btn-secondary" style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
          Log First Weight
        </button>
      </div>
    );
  }

  const padding = 30;
  const chartWidth = 500;
  const chartHeight = 160;

  // Extract all weights to determine the Y-axis range
  const allWeights = seriesData.flatMap(s => s.logs.map(l => l.weight));
  const maxWeight = Math.max(...allWeights) * 1.15;
  const minWeight = Math.min(...allWeights) * 0.85;
  const weightRange = maxWeight - minWeight === 0 ? 1 : maxWeight - minWeight;

  // Get all unique dates from all series, sorted chronologically to establish X coordinates
  const allDates = Array.from(new Set(
    seriesData.flatMap(s => s.logs.map(l => l.date))
  )).sort((a, b) => new Date(a) - new Date(b));

  // Map each series' logs to X and Y SVG coordinates
  const seriesWithPoints = seriesData.map(s => {
    const points = s.logs.map(log => {
      const dateIndex = allDates.indexOf(log.date);
      const x = padding + (dateIndex * (chartWidth - 2 * padding)) / (allDates.length - 1 || 1);
      const y = chartHeight - padding - ((log.weight - minWeight) * (chartHeight - 2 * padding)) / weightRange;
      return { x, y, ...log };
    });

    const pathD = points.reduce((acc, p, index) => {
      return index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
      : '';

    return {
      ...s,
      points,
      pathD,
      areaD
    };
  });

  return (
    <div style={{ width: '100%' }}>
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

          {/* Area fill is rendered only if there is a single active series to avoid visual clutter */}
          {seriesWithPoints.length === 1 && seriesWithPoints[0].areaD && (
            <path d={seriesWithPoints[0].areaD} fill="url(#chartGrad)" />
          )}

          {/* Draw trend lines for all active series */}
          {seriesWithPoints.map(s => s.pathD && (
            <path
              key={s.pet.id}
              d={s.pathD}
              fill="none"
              stroke={s.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Draw dots and weight values for all active series */}
          {seriesWithPoints.map(s => (
            <g key={s.pet.id}>
              {s.points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill="var(--bg-card)"
                    stroke={s.color}
                    strokeWidth="3"
                  />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill={s.color}
                  >
                    {p.weight} kg
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* Render chronological date labels once */}
          {allDates.map((date, idx) => {
            const x = padding + (idx * (chartWidth - 2 * padding)) / (allDates.length - 1 || 1);
            return (
              <text
                key={idx}
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-muted)"
              >
                {date.split('-').slice(1).join('/')}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend showing pet names and colors when displaying multiple pets */}
      {seriesWithPoints.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.75rem' }}>
          {seriesWithPoints.map(s => (
            <div key={s.pet.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: s.color, display: 'inline-block' }}></span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{s.pet.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
