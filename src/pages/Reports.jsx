import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import ExportMenu from '../modules/ExportMenu'; 

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:5000/get-expenses')
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        
        const grouped = [
            { name: 'Food', value: 0, fill: '#2699FB' },
            { name: 'Transport', value: 0, fill: '#76D1DF' },
            { name: 'Shopping', value: 0, fill: '#FFBB28' }
        ];

        data.forEach(e => {
            if(e.categoryId === 1) grouped[0].value += e.amount;
            if(e.categoryId === 2) grouped[1].value += e.amount;
            if(e.categoryId === 3) grouped[2].value += e.amount;
        });
        setChartData(grouped);
      });

    fetch('http://localhost:5000/get-budget-status')
      .then(res => res.json())
      .then(status => {
        setBudgetStatus(status);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  const getCategoryName = (id) => {
      const names = { 1: 'Food', 2: 'Transport', 3: 'Shopping' };
      return names[id] || 'Other';
  };

  const formattedData = expenses.map(item => ({
      Date: item.date,
      Description: item.description,
      Category: getCategoryName(item.categoryId),
      Amount: `$${item.amount.toFixed(2)}`
  }));

  return (
    <div className="mint-container">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
            <h2 style={{ margin: 0 }}>Financial Report</h2>
            <small style={{ color: '#eee' }}>Overview of November 2025</small>
        </div>

        <ExportMenu data={formattedData} filename="MINT_Report" />

      </div>

      <div className="dashboard-grid">
        <div className="white-card">
            <h3>Budget Health</h3>
            {loading ? <p>Loading...</p> : (
                <div style={{ marginTop: '20px' }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        color: budgetStatus?.status === 'SAFE' ? '#10B981' : 
                               budgetStatus?.status === 'WARNING' ? '#F59E0B' : '#EF4444',
                        margin: '10px 0'
                    }}>
                        {budgetStatus?.status || "SAFE"}
                    </h1>
                    
                    <p style={{ color: '#888', marginBottom: '15px' }}>
                        Spent <b>${budgetStatus?.currentSpending}</b> of $500.00 Limit
                    </p>

                    <div style={{ width: '100%', height: '10px', background: '#eee', borderRadius: '5px' }}>
                        <div style={{ 
                            height: '100%', 
                            width: `${Math.min(budgetStatus?.percentageUsed || 0, 100)}%`,
                            background: budgetStatus?.status === 'EXCEEDED' ? '#EF4444' : '#2699FB',
                            borderRadius: '5px',
                            transition: 'width 0.5s'
                        }}></div>
                    </div>
                    <p style={{ textAlign: 'right', fontSize: '12px', marginTop: '5px' }}>
                        {budgetStatus?.percentageUsed}% Used
                    </p>
                </div>
            )}
        </div>

        <div className="white-card">
            <h3>Distribution</h3>
            <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={chartData} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="white-card" style={{ marginTop: '30px' }}>
        <h3>Expenses per Genre</h3>
        <div style={{ height: '300px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#333" />
                    <Tooltip cursor={{fill: '#f0f0f0'}} />
                    <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Reports;