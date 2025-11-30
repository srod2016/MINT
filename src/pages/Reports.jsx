import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get the expenses for the graphs
    fetch('http://localhost:5000/get-expenses')
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        
        // Group data for charts (Student logic: just loop and add)
        const grouped = [
            { name: 'Food', value: 0, fill: '#2699FB' },
            { name: 'Transport', value: 0, fill: '#76D1DF' },
            { name: 'Shopping', value: 0, fill: '#FFBB28' }
        ];

        data.forEach(e => {
            // Category ID 1=Food, 2=Transport, 3=Shopping
            if(e.categoryId === 1) grouped[0].value += e.amount;
            if(e.categoryId === 2) grouped[1].value += e.amount;
            if(e.categoryId === 3) grouped[2].value += e.amount;
        });
        setChartData(grouped);
      });

    // 2. Get the status for the "Safe/Warning" box
    fetch('http://localhost:5000/get-budget-status')
      .then(res => res.json())
      .then(status => {
        console.log("Budget status:", status);
        setBudgetStatus(status);
        setLoading(false);
      })
      .catch(err => {
        console.log("Backend error:", err);
        setLoading(false);
      });

  }, []);

  // CSV Download Function
  const downloadCSV = () => {
    console.log("Downloading CSV...");
    let csv = "Description,Category,Amount,Date\n";
    expenses.forEach(row => {
        csv += `${row.description},${row.categoryId},${row.amount},${row.date}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "MINT_Report.csv";
    a.click();
  };

  return (
    <div className="mint-container">
      
      {/* HEADER WITH DOWNLOAD BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
            <h2 style={{ margin: 0 }}>Financial Report</h2>
            <small style={{ color: '#eee' }}>Overview of November 2025</small>
        </div>
        <button className="mint-btn" style={{ width: 'auto', background: '#fff', color: '#2699FB' }} onClick={downloadCSV}>
             Download CSV
        </button>
      </div>

      {/* TOP ROW: STATUS + PIE CHART */}
      <div className="dashboard-grid">
        
        {/* 1. BUDGET HEALTH CARD */}
        <div className="white-card">
            <h3>Budget Health</h3>
            {loading ? <p>Loading...</p> : (
                <div style={{ marginTop: '20px' }}>
                    {/* The Big Status Word */}
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

                    {/* Progress Bar */}
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

        {/* 2. PIE CHART CARD */}
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

      {/* BOTTOM ROW: BAR GRAPH (EXPENSES PER GENRE) */}
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