import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { incomeAPI } from '../services/api';

const AddIncome = () => {
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
      await incomeAPI.create({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add income');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>Add Income</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            step="1000"
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
            placeholder="Category (e.g., Salary, Freelance)"
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
          <button type="submit" className="btn btn-success">
            Add Income
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;