import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import IncomeList from './pages/IncomeList';
import ExpenseList from './pages/ExpenseList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-income" element={
              <ProtectedRoute>
                <AddIncome />
              </ProtectedRoute>
            } />
            <Route path="/add-expense" element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            } />
            <Route path="/income-list" element={
              <ProtectedRoute>
                <IncomeList />
              </ProtectedRoute>
            } />
            <Route path="/expense-list" element={
              <ProtectedRoute>
                <ExpenseList />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;