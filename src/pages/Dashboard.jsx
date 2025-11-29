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
    <div style={{ minHeight: '100vh' }}>
      <header className="header">
        <div style={{ fontSize: '24px' }}>←</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Expense</span>
        </div>
        <div className="header-title">MINT</div>
        <div className="nav-links">
          <span>Budget</span>
          <span>Report</span>
        </div>
        <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
      </header>

      <div className="dashboard-grid">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="white-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', background: '#2699FB', borderRadius: '50%' }}></div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#2699FB' }}>Name Surname</div>
                <div style={{ fontSize: '12px', color: '#B4B4B4' }}>1h ago</div>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#7E84A3' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua.
            </p>
          </div>

          <p className="text-block">
            Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </p>
        </div>

        <div>
          <div className="blue-card">
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$ 19.99</div>
              <div style={{ fontSize: '14px' }}>PRODUCT</div>
            </div>
            <button style={{ background: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', color: '#2699FB', fontWeight: 'bold', cursor: 'pointer' }}>
              LEARN MORE
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$ 49.99</div>
              <div style={{ fontSize: '12px' }}>Finance</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              Lorem ipsum dolor sit<br/>amet, consectetur.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>$ 99.99</div>
              <div style={{ fontSize: '12px' }}>Movies</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              Lorem ipsum dolor sit<br/>amet, consectetur.
            </div>
          </div>

          <div className="white-card" style={{ height: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>Total Sales</div>
              <div style={{ fontSize: '12px', color: '#7E84A3' }}>Last 12 Months ▼</div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={graphData}>
                <Line type="monotone" dataKey="Online" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Offline" stroke="#2699FB" strokeWidth={2} dot={false} />
                <XAxis dataKey="name" hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '30px', marginBottom: '20px' }}>Last Month</h2>
          
          <div style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'left', fontSize: '12px' }}>
            {pieData.map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', background: item.color }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;