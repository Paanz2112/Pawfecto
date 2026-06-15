import React from 'react';
import { Edit3, Trash2, Plus, Receipt } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../utils/constants';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function ExpensesTab() {
  const { 
    filteredExpenses, 
    totalExpenses, 
    timeframe, 
    setTimeframe,
    currencySymbol, 
    pets, 
    openAddExpense, 
    openEditExpense, 
    deleteExpense, 
    getExpenseAnalysis 
  } = useApp();

  const isNative = Capacitor.isNativePlatform();

  const triggerHaptic = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
    }
  };

  const handleAdd = () => {
    triggerHaptic();
    openAddExpense();
  };

  const handleEdit = (exp) => {
    triggerHaptic();
    openEditExpense(exp);
  };

  const handleDelete = (id) => {
    triggerHaptic();
    deleteExpense(id);
  };

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    triggerHaptic();
  };

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      {/* Timeframe Segmented Control for Mobile */}
      {isNative && (
        <>
          <div className="mobile-section-header">
            <span className="mobile-section-title">Timeframe</span>
          </div>
          <div className="mobile-segmented-tab-bar" style={{ marginBottom: '1.25rem' }}>
            {['week', 'month', 'year'].map((tf) => (
              <button
                key={tf}
                className={`mobile-tab-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => handleTimeframeChange(tf)}
                style={{ textTransform: 'capitalize' }}
              >
                {tf}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="glass-card" style={{ padding: isNative ? '1.25rem' : '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3>Expense Registry</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Manage and monitor your pet-related expenditures.
            </p>
          </div>
          {!isNative && (
            <button className="btn btn-primary" onClick={handleAdd}>
              Track New Expense
            </button>
          )}
        </div>

        {/* Expense Analysis Summary */}
        {filteredExpenses.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Spent ({timeframe})</span>
                <span className="badge badge-primary" style={{ textTransform: 'capitalize', fontSize: '0.65rem' }}>{timeframe}</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                {currencySymbol}{totalExpenses.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
              {(() => {
                const analysis = getExpenseAnalysis(filteredExpenses);
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Top Category</span>
                      <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[analysis.topCategory]}15`, color: categoryColors[analysis.topCategory], fontSize: '0.65rem' }}>
                        {analysis.topCategory} ({analysis.pct}%)
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic', marginTop: '0.25rem', lineHeight: '1.4' }}>
                      💡 {analysis.text}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {filteredExpenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
            <Receipt size={44} style={{ color: 'var(--border-focus)', marginBottom: '0.75rem', strokeWidth: '1.5' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.25rem' }}>No Expenses Logged</h4>
            <p style={{ fontSize: '0.85rem' }}>Start logging expenses to analyze your budget.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Pet</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(exp => {
                  const pet = pets.find(p => p.id === exp.petId);
                  return (
                    <tr key={exp.id}>
                      <td>{exp.date}</td>
                      <td>
                        <span className="badge badge-primary">{pet ? pet.name : 'Unknown'}</span>
                      </td>
                      <td>
                        <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[exp.category]}15`, color: categoryColors[exp.category], padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}>
                          {exp.category}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{exp.description || '-'}</td>
                      <td style={{ fontWeight: '800' }}>{currencySymbol}{exp.amount.toLocaleString()}</td>
                      <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                        <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => handleEdit(exp)}>
                          <Edit3 size={13} style={{ color: 'var(--primary)' }} />
                        </button>
                        <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => handleDelete(exp.id)}>
                          <Trash2 size={13} style={{ color: 'var(--danger)' }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      {isNative && (
        <button className="mobile-fab" onClick={handleAdd}>
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
