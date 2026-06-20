import React from 'react';
import { Scale } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function WeightChart() {
  const { pets, selectedPetId, openAddWeight } = useApp();

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '250px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No registered pets yet.</p>
      </div>
    );
  }

  // Determine which pets' data to display
  const displayPets = selectedPetId === 'all' ? pets : pets.filter(p => p.id === selectedPetId);

  // Check if there are any logs at all
  const hasAnyLogs = displayPets.some(p => p.weightLogs && p.weightLogs.length > 0);

  if (!hasAnyLogs) {
    const activePet = selectedPetId !== 'all' ? pets.find(p => p.id === selectedPetId) : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '250px', color: 'var(--text-muted)' }}>
        <Scale size={32} style={{ marginBottom: '0.5rem' }} />
        <p>No weight logs yet for {activePet ? activePet.name : 'any pet'}.</p>
        <button className="btn btn-secondary" style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={openAddWeight}>
          Log First Weight
        </button>
      </div>
    );
  }

  // Get all unique dates from all selected pets, sorted chronologically
  const allDates = Array.from(new Set(
    displayPets.flatMap(p => p.weightLogs?.map(l => l.date) || [])
  )).sort((a, b) => new Date(a) - new Date(b));

  // Format data for Recharts
  // Output format: [ { dateLabel: '01/15', Bella: 12.5, Milo: 4.2 }, ... ]
  const chartData = allDates.map(date => {
    const dataPoint = { 
      dateLabel: date.split('-').slice(1).join('/'), // e.g., "06/15"
      fullDate: date 
    };
    
    displayPets.forEach(pet => {
      const log = pet.weightLogs?.find(l => l.date === date);
      if (log) {
        dataPoint[pet.name] = log.weight;
      }
    });
    return dataPoint;
  });

  // Custom Tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          padding: '1rem',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          minWidth: '150px'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            {payload[0].payload.fullDate}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color, display: 'inline-block' }}></span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{entry.name}:</span>
              <span style={{ fontWeight: '700', marginLeft: 'auto', color: entry.color }}>{entry.value} kg</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.5} />
          
          <XAxis 
            dataKey="dateLabel" 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }} 
            tickMargin={10}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          
          <YAxis 
            stroke="var(--text-muted)" 
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}kg`}
            domain={['auto', 'auto']}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {displayPets.length > 1 && (
            <Legend 
              iconType="circle" 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }}
            />
          )}

          {displayPets.map((pet, idx) => {
            const hasData = pet.weightLogs && pet.weightLogs.length > 0;
            if (!hasData) return null;
            
            const color = palette[idx % palette.length];
            return (
              <Line
                key={pet.id}
                type="monotone"
                dataKey={pet.name}
                stroke={color}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-card)', stroke: color }}
                activeDot={{ r: 6, strokeWidth: 0, fill: color }}
                connectNulls={true}
                animationDuration={800}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
