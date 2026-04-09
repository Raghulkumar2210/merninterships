import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expenseAPI } from '../services/api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getAll();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.delete(id);
        setExpenses(expenses.filter(expense => expense._id !== id));
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h2>Expense List</h2>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      {expenses.length === 0 ? (
        <p>No expense records found.</p>
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
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="amount-negative">
                    ₹{expense.amount.toFixed(2)}
                  </td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(expense._id)}
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

export default ExpenseList;