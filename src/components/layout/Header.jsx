import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { 
    activeTab, 
    selectedPetId, 
    setSelectedPetId, 
    pets, 
    timeframe, 
    setTimeframe, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    specificDate, 
    setSpecificDate,
    openAddPet,
    openAddWeight,
    openAddReminder,
    openAddVaccine,
    openAddExpense
  } = useApp();

  // Helper to map tab names to clean titles
  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'pets': return 'Pets Family';
      case 'health': return 'Weight Logs';
      case 'reminders': return 'Reminders';
      case 'vaccination': return 'Vaccinations';
      case 'expenses': return 'Expenses';
      case 'settings': return 'Backup & Settings';
      case 'guide': return 'App Guide & Tour';
      default: return tab;
    }
  };

  return (
    <header className="header-bar">
      <div className="page-title">
        <h1 style={{ textTransform: 'capitalize' }}>{getTabTitle(activeTab)}</h1>
        <p>Keep track of your furry companions and their logs.</p>
      </div>

      <div className="header-actions">
        {/* Contextual Pet Selector */}
        <div style={{ position: 'relative' }}>
          <select 
            value={selectedPetId} 
            onChange={(e) => setSelectedPetId(e.target.value)} 
            className="form-select"
            style={{ paddingRight: '2.5rem', minWidth: '160px', fontWeight: '600' }}
          >
            <option value="all">🐾 All Pets</option>
            {pets.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Global Timeframe Selector */}
        {['dashboard', 'health', 'expenses'].includes(activeTab) && (
          <div style={{ position: 'relative' }}>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)} 
              className="form-select"
              style={{ paddingRight: '2.5rem', minWidth: '140px', fontWeight: '600' }}
            >
              <option value="week">📅 This Week</option>
              <option value="month">📅 This Month</option>
              <option value="year">📅 This Year</option>
              <option value="2years">📅 Last 2 Years</option>
              <option value="specific">📅 Specific Date</option>
              <option value="custom">📅 Custom Range</option>
            </select>
          </div>
        )}

        {/* Contextual Date Range / Specific Date Inputs */}
        {['dashboard', 'health', 'expenses'].includes(activeTab) && timeframe === 'custom' && (
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'nowrap' }}>
            <input 
              type="date" 
              className="form-input" 
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '120px', minWidth: '110px', fontWeight: '500' }}
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}>to</span>
            <input 
              type="date" 
              className="form-input" 
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '120px', minWidth: '110px', fontWeight: '500' }}
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        )}

        {['dashboard', 'health', 'expenses'].includes(activeTab) && timeframe === 'specific' && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="date" 
              className="form-input" 
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem', width: '140px', minWidth: '120px', fontWeight: '500' }}
              value={specificDate} 
              onChange={(e) => setSpecificDate(e.target.value)} 
            />
          </div>
        )}

        {activeTab === 'pets' && (
          <button className="btn btn-primary" onClick={openAddPet}>
            <Plus size={18} /> Add Pet
          </button>
        )}
        {activeTab === 'health' && (
          <button className="btn btn-primary" onClick={openAddWeight}>
            <Plus size={18} /> Log Weight
          </button>
        )}
        {activeTab === 'reminders' && (
          <button className="btn btn-primary" onClick={openAddReminder}>
            <Plus size={18} /> Add Reminder
          </button>
        )}
        {activeTab === 'vaccination' && (
          <button className="btn btn-primary" onClick={openAddVaccine}>
            <Plus size={18} /> Log Vaccination
          </button>
        )}
        {activeTab === 'expenses' && (
          <button className="btn btn-primary" onClick={openAddExpense}>
            <Plus size={18} /> Track Expense
          </button>
        )}
      </div>
    </header>
  );
}
