import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis } from 'recharts';

const Dashboard = () => {
  
  const pieData = [
    { name: 'Finances', value: 30, color: '#2699FB' },
    { name: 'Food', value: 23, color: '#76D1DF' },
    { name: 'Rent', value: 18, color: '#90CAF9' },
    { name: 'Luxury', value: 15, color: '#BBDEFB' },
    { name: 'Payments', value: 9, color: '#E3F2FD' },
    { name: 'OTHER', value: 5, color: '#64B5F6' },
  ];

  const graphData = [
    { name: 'Jan', Online: 400, Offline: 240 },
    { name: 'Feb', Online: 300, Offline: 139 },
    { name: 'Mar', Online: 200, Offline: 680 },
    { name: 'Apr', Online: 278, Offline: 390 },
    { name: 'May', Online: 189, Offline: 480 },
  ];

  return (
<<<<<<< HEAD
    <div style={{ minHeight: '100vh' }}>

      <div className="dashboard-grid">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="white-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', background: '#2699FB', borderRadius: '50%' }}></div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#2699FB' }}>Name Surname</div>
                <div style={{ fontSize: '12px', color: '#B4B4B4' }}>1h ago</div>
              </div>
=======
    // Note: No <header> tag here, because Layout handles it!
    <div className="dashboard-grid">
      
      {/* LEFT COLUMN: Notifications & Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div className="white-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ width: '40px', height: '40px', background: '#2699FB', borderRadius: '50%' }}></div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#2699FB' }}>Name Surname</div>
              <div style={{ fontSize: '12px', color: '#B4B4B4' }}>1h ago</div>
>>>>>>> main
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#7E84A3', lineHeight: '1.5' }}>
            Your budget for "Food" is nearing its limit. Consider reviewing your expenses for the weekend.
          </p>
        </div>

        <p className="text-block">
          Welcome to MINT. This dashboard provides a real-time overview of your financial health. Use the tabs above to manage expenses, set budgets, and generate detailed reports.
        </p>
      </div>

      {/* CENTER COLUMN: Activity & Main Chart */}
      <div>
        <div className="blue-card">
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$ 19.99</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>PRODUCT</div>
          </div>
          <button style={{ background: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', color: '#2699FB', fontWeight: 'bold', cursor: 'pointer' }}>
            LEARN MORE
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '15px 0' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$ 49.99</div>
              <div style={{ fontSize: '12px' }}>Finance</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', opacity: 0.8 }}>
              Subscription Renewed
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '15px 0' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$ 99.99</div>
              <div style={{ fontSize: '12px' }}>Movies</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', opacity: 0.8 }}>
              Ticket Purchase
            </div>
          </div>
        </div>

        {/* Line Chart Container */}
        <div className="white-card" style={{ height: '250px', background: '#1F2937', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold' }}>Total Sales</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Last 12 Months ▼</div>
          </div>
          <div style={{ height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <Line type="monotone" dataKey="Online" stroke="#10B981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Offline" stroke="#2699FB" strokeWidth={3} dot={false} />
                <XAxis dataKey="name" hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Pie Chart */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Last Month</h2>
        
        <div style={{ width: '100%', height: '300px', marginBottom: '30px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                innerRadius={0}
                outerRadius={120} 
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', fontSize: '14px' }}>
          {pieData.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', background: item.color, borderRadius: '2px' }}></div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;