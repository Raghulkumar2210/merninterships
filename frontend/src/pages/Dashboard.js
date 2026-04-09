import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { incomeAPI, expenseAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        incomeAPI.getAll(),
        expenseAPI.getAll()
      ]);
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      setError('Failed to fetch data. Make sure the backend server is running on port 5001.');
      console.error('Error fetching data:', error);
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome, {user?.name}</h1>
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card income">
          <h3>Total Income</h3>
          <p className="amount">₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card expense">
          <h3>Total Expenses</h3>
          <p className="amount">₹{totalExpense.toFixed(2)}</p>
        </div>
        <div className="stat-card balance">
          <h3>Balance</h3>
          <p className="amount">₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="action-grid">
        <Link to="/add-income" className="btn btn-success">
          Add Income
        </Link>
        <Link to="/add-expense" className="btn btn-danger">
          Add Expense
        </Link>
      </div>

      <div className="action-grid">
        <Link to="/income-list" className="btn btn-outline-primary">
          View Income List
        </Link>
        <Link to="/expense-list" className="btn btn-outline-danger">
          View Expense List
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;