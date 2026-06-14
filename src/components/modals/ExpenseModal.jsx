import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ExpenseModal() {
  const { 
    showExpenseModal, 
    setShowExpenseModal, 
    pets, 
    expenseForm, 
    setExpenseForm, 
    saveExpense, 
    adjustExpense, 
    currencySymbol 
  } = useApp();

  if (!showExpenseModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Track Expense</h2>
          <button onClick={() => setShowExpenseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={saveExpense}>
          <div className="form-group">
            <label className="form-label">Select Pet</label>
            <select 
              className="form-select" 
              value={expenseForm.petId} 
              onChange={(e) => setExpenseForm({ ...expenseForm, petId: e.target.value })}
              required
            >
              <option value="" disabled>Choose a pet...</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select" 
                value={expenseForm.category} 
                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
              >
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Toys">Toys</option>
                <option value="Litter">Litter</option>
                <option value="Grooming">Grooming</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount ({currencySymbol})</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  step="any" 
                  className="form-input" 
                  value={expenseForm.amount} 
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} 
                  required 
                />
                <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(-10)}>-10</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(-1)}>-1</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(1)}>+1</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexGrow: 1 }} onClick={() => adjustExpense(10)}>+10</button>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-input" 
              value={expenseForm.date} 
              onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Vendor</label>
            <input 
              type="text" 
              className="form-input" 
              value={expenseForm.description} 
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowExpenseModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Log Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}
