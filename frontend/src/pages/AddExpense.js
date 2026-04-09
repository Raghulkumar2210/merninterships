import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI } from '../services/api';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await expenseAPI.create({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Add Expense</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category (e.g., Food, Transport)"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="action-grid">
          <button type="submit" className="btn btn-danger">
            Add Expense
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;