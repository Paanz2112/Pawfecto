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

  const isMulti = seriesData.length > 1;

  // Modern chart padding (extend right padding for direct labels if multi-pet view)
  const paddingLeft = 45;
  const paddingRight = isMulti ? 105 : 25;
  const paddingTop = 25;
  const paddingBottom = 30;
  
  const chartWidth = 500;
  const chartHeight = 160;

  // Extract all weights to determine the Y-axis range
  const allWeights = seriesData.flatMap(s => s.logs.map(l => l.weight));
  const maxWeight = Math.max(...allWeights) * 1.12;
  const minWeight = Math.max(0, Math.min(...allWeights) * 0.88); // Ensure it doesn't go below 0
  const weightRange = maxWeight - minWeight === 0 ? 1 : maxWeight - minWeight;

  // Get all unique dates from all series, sorted chronologically to establish X coordinates
  const allDates = Array.from(new Set(
    seriesData.flatMap(s => s.logs.map(l => l.date))
  )).sort((a, b) => new Date(a) - new Date(b));

  // Bezier curve helper for smooth modern lines
  const getCurvePath = (points) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p1.x - (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  // Map each series' logs to X and Y SVG coordinates
  const seriesWithPoints = seriesData.map(s => {
    const points = s.logs.map(log => {
      const dateIndex = allDates.indexOf(log.date);
      const x = paddingLeft + (dateIndex * (chartWidth - paddingLeft - paddingRight)) / (allDates.length - 1 || 1);
      const y = chartHeight - paddingBottom - ((log.weight - minWeight) * (chartHeight - paddingTop - paddingBottom)) / weightRange;
      return { x, y, ...log };
    });

    const pathD = getCurvePath(points);

    const areaD = points.length > 0 && pathD
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`
      : '';

    return {
      ...s,
      points,
      pathD,
      areaD
    };
  });

  // Generate 3 nice Y-axis grid levels (Min, Mid, Max)
  const gridLevels = 3;
  const gridLines = [];
  for (let i = 0; i < gridLevels; i++) {
    const val = minWeight + (i * (maxWeight - minWeight)) / (gridLevels - 1 || 1);
    const y = chartHeight - paddingBottom - ((val - minWeight) * (chartHeight - paddingTop - paddingBottom)) / weightRange;
    gridLines.push({ val, y });
  }

  // Calculate direct end-of-line labels with collision avoidance
  const endLabels = [];
  if (isMulti) {
    const labelsRaw = seriesWithPoints
      .filter(s => s.points.length > 0)
      .map(s => {
        const lastPt = s.points[s.points.length - 1];
        return {
          id: s.pet.id,
          name: s.pet.name,
          color: s.color,
          weight: lastPt.weight,
          x: lastPt.x + 8,
          y: lastPt.y
        };
      })
      .sort((a, b) => a.y - b.y);

    // Stacking adjustment (top-down)
    const minSpacing = 12;
    for (let i = 1; i < labelsRaw.length; i++) {
      const prev = labelsRaw[i - 1];
      const curr = labelsRaw[i];
      if (curr.y - prev.y < minSpacing) {
        curr.y = prev.y + minSpacing;
      }
    }
    
    // Boundary check adjustment (bottom-up)
    const maxY = chartHeight - paddingBottom + 5;
    for (let i = labelsRaw.length - 1; i >= 0; i--) {
      if (labelsRaw[i].y > maxY) {
        labelsRaw[i].y = maxY;
        if (i > 0 && labelsRaw[i].y - labelsRaw[i - 1].y < minSpacing) {
          labelsRaw[i - 1].y = labelsRaw[i].y - minSpacing;
        }
      }
    }

    endLabels.push(...labelsRaw);
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-axis labels */}
          {gridLines.map((gl, idx) => (
            <g key={idx}>
              <line
                x1={paddingLeft}
                y1={gl.y}
                x2={chartWidth - paddingRight}
                y2={gl.y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={paddingLeft - 8}
                y={gl.y + 3}
                textAnchor="end"
                fontSize="8.5"
                fontWeight="600"
                fill="var(--text-muted)"
              >
                {gl.val.toFixed(1)} kg
              </text>
            </g>
          ))}

          {/* Vertical Gridlines, Ticks & X-axis labels */}
          {allDates.map((date, idx) => {
            const x = paddingLeft + (idx * (chartWidth - paddingLeft - paddingRight)) / (allDates.length - 1 || 1);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={chartHeight - paddingBottom}
                  stroke="var(--border-color)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1={x}
                  y1={chartHeight - paddingBottom}
                  x2={x}
                  y2={chartHeight - paddingBottom + 4}
                  stroke="var(--border-color)"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fill="var(--text-muted)"
                >
                  {date.split('-').slice(1).join('/')}
                </text>
              </g>
            );
          })}

          {/* Base X-axis Line */}
          <line
            x1={paddingLeft}
            y1={chartHeight - paddingBottom}
            x2={chartWidth - paddingRight}
            y2={chartHeight - paddingBottom}
            stroke="var(--border-color)"
            strokeWidth="1.5"
          />

          {/* Area fill is rendered only if there is a single active series to avoid visual clutter */}
          {!isMulti && seriesWithPoints.length === 1 && seriesWithPoints[0].areaD && (
            <path d={seriesWithPoints[0].areaD} fill="url(#chartGrad)" />
          )}

          {/* Draw curved trend lines for all active series */}
          {seriesWithPoints.map(s => s.pathD && (
            <path
              key={s.pet.id}
              d={s.pathD}
              fill="none"
              stroke={s.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#shadow)"
            />
          ))}

          {/* Draw dots and weight values for all active series */}
          {seriesWithPoints.map(s => (
            <g key={s.pet.id}>
              {s.points.map((p, idx) => (
                <g key={idx}>
                  {/* Subtle outer glowing ring */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="7"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1.5"
                    opacity="0.25"
                  />
                  {/* Outer white core ring */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill="var(--bg-card)"
                    stroke={s.color}
                    strokeWidth="1.5"
                  />
                  {/* Center dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="2.5"
                    fill={s.color}
                  />
                  
                  {/* Weight label: Render ONLY in single pet view to prevent multi-line overlaps and visual clutter */}
                  {!isMulti && (
                    <>
                      {/* White text halo/outline for high-contrast legibility */}
                      <text
                        x={p.x}
                        y={p.y - 12}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="800"
                        fill="var(--bg-card)"
                        stroke="var(--bg-card)"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                        style={{ userSelect: 'none' }}
                      >
                        {p.weight}
                      </text>
                      {/* Foreground weight text */}
                      <text
                        x={p.x}
                        y={p.y - 12}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="800"
                        fill={s.color}
                      >
                        {p.weight}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </g>
          ))}

          {/* Direct Line Labels for Multi-Pet view */}
          {isMulti && endLabels.map((lbl) => (
            <g key={lbl.id}>
              {/* Halo */}
              <text
                x={lbl.x}
                y={lbl.y + 3}
                textAnchor="start"
                fontSize="9"
                fontWeight="800"
                fill="var(--bg-card)"
                stroke="var(--bg-card)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                style={{ userSelect: 'none' }}
              >
                {`${lbl.name} (${lbl.weight}kg)`}
              </text>
              {/* Foreground */}
              <text
                x={lbl.x}
                y={lbl.y + 3}
                textAnchor="start"
                fontSize="9"
                fontWeight="800"
                fill={lbl.color}
              >
                {`${lbl.name} (${lbl.weight}kg)`}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend showing pet names and colors when displaying multiple pets */}
      {seriesWithPoints.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1rem', justifyContent: 'center', marginTop: '1.25rem', fontSize: '0.8rem' }}>
          {seriesWithPoints.map(s => (
            <div key={s.pet.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.5rem', borderRadius: '6px', backgroundColor: `${s.color}10`, border: `1px solid ${s.color}25` }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: s.color, display: 'inline-block' }}></span>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{s.pet.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
