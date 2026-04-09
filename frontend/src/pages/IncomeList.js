import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incomeAPI } from '../services/api';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await incomeAPI.getAll();
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await incomeAPI.delete(id);
        setIncomes(incomes.filter(income => income._id !== id));
      } catch (error) {
        console.error('Error deleting income:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h2>Income List</h2>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      {incomes.length === 0 ? (
        <p>No income records found.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr key={income._id}>
                  <td>
                    {new Date(income.date).toLocaleDateString()}
                  </td>
                  <td className="amount-positive">
                    ₹{income.amount.toFixed(2)}
                  </td>
                  <td>{income.category}</td>
                  <td>{income.description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(income._id)}
                      className="btn btn-danger"
                      style={{ padding: '5px 10px', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeList;