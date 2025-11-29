import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const Reports = () => {
  // State to hold data from the server
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data when page loads
  useEffect(() => {
    console.log("Fetching budget data...");
    
    fetch('http://localhost:5000/get-budget-status')
      .then(response => response.json())
      .then(data => {
        console.log("Got data from server:", data);
        setBudgetStatus(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error connecting to server:", err);
        setLoading(false);
      });
  }, []);

  // Data for the charts
  // If we have data, use it. If not, show 0.
  const pieData = [
    { name: 'Spent', value: budgetStatus ? budgetStatus.currentSpending : 0, color: '#2699FB' },
    { name: 'Remaining', value: 500 - (budgetStatus ? budgetStatus.currentSpending : 0), color: '#ccc' },
  ];

  return (
    <div className="dashboard-grid">
      
      {/* 1. STATUS CARD */}
      <div className="white-card">
        <h3>Budget Health</h3>
        
        {loading ? (
          <p>Loading database...</p>
        ) : (
          <div style={{marginTop: '20px'}}>
            <h1 style={{
                color: budgetStatus?.status === 'SAFE' ? '#10B981' : '#EF4444',
                fontSize: '40px'
            }}>
                {budgetStatus?.status || "NO DATA"}
            </h1>
            <p>
                You have spent <b>${budgetStatus?.currentSpending}</b> of your $500 limit.
            </p>
            <p>Percentage Used: <b>{budgetStatus?.percentageUsed}%</b></p>
          </div>
        )}
      </div>

      {/* 2. CHART */}
      <div className="white-card">
        <h3>Visual Breakdown</h3>
        <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Reports;