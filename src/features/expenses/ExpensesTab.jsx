import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../utils/constants';

export default function ExpensesTab() {
  const { 
    filteredExpenses, 
    totalExpenses, 
    timeframe, 
    currencySymbol, 
    pets, 
    openAddExpense, 
    openEditExpense, 
    deleteExpense, 
    getExpenseAnalysis 
  } = useApp();

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3>Expense Registry</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage and monitor your pet-related expenditures.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddExpense}>
          Track New Expense
        </button>
      </div>

      {/* Expense Analysis Summary */}
      {filteredExpenses.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Spent ({timeframe})</span>
              <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>{timeframe}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>
              {currencySymbol}{totalExpenses.toLocaleString()}
            </div>
          </div>

          <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-card)' }}>
            {(() => {
              const analysis = getExpenseAnalysis(filteredExpenses);
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Top Spending Category</span>
                    <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[analysis.topCategory]}15`, color: categoryColors[analysis.topCategory] }}>
                      {analysis.topCategory} ({analysis.pct}%)
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.25rem', lineHeight: '1.4' }}>
                    💡 {analysis.text}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {filteredExpenses.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>No expense records found.</p>
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
                      <span className="badge badge-secondary" style={{ backgroundColor: `${categoryColors[exp.category]}15`, color: categoryColors[exp.category] }}>
                        {exp.category}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{exp.description || '-'}</td>
                    <td style={{ fontWeight: '700' }}>{currencySymbol}{exp.amount.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                      <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => openEditExpense(exp)}>
                        <Edit3 size={14} style={{ color: 'var(--primary)' }} />
                      </button>
                      <button className="btn-icon" style={{ width: '32px', height: '32px', display: 'inline-flex' }} onClick={() => deleteExpense(exp.id)}>
                        <Trash2 size={14} style={{ color: 'var(--danger)' }} />
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
  );
}
