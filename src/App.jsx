import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Layout from './modules/Layout';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 1. THE STARTING POINT: The Login Page */}
        {/* This tells React: "When URL is /, show Login" */}
        <Route path="/" element={<Login />} />

        {/* 2. THE DASHBOARD: Protected by Layout */}
        {/* This tells React: "When URL is /home, show Layout + Dashboard" */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/expense" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Reports />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;